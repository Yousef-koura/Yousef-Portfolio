"use client";

import { useEffect, useRef, useState } from "react";
import { GLSL_PREAMBLE } from "@/lib/glsl/preamble";

/**
 * HalftoneBackdrop — raw-WebGL halftone rendered as the final CTA section's
 * full-bleed background (absolutely positioned, never fixed full-viewport).
 *
 * The effect follows the owner's spec:
 *  - the fragment coordinate is floored to a fixed 34-cell lattice
 *  - the cell centre is run through the shared two-level domain warp and a
 *    six-octave fbm; that single field value sets the dot radius for the cell
 *  - a clock drifts the warp so the field breathes instead of sitting still
 *  - pointer movement raises a smoothed intensity uniform that enlarges and
 *    brightens the dots beneath the cursor, then eases back out
 *  - ground + dots are resolved from the live --tk-* tokens (two values, one
 *    material; no champagne accent in the shader)
 *  - no WebGL: a static dot panel behind the canvas is revealed
 *  - reduced motion: one frozen frame, no animation loop
 *  - pauses off-screen / tab hidden; DPR + draw width capped; full teardown
 *    with WebGL context loss and restoration handling
 */

type HalftoneProps = {
  className?: string;
};

const MAX_DRAW_WIDTH = 2200;
const HALFTONE_COLUMNS = 34;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  if (h.length === 3) {
    const expanded = h.split("").map((c) => c + c).join("");
    return hexToRgb(expanded);
  }
  const value = parseInt(h, 16);
  if (Number.isNaN(value)) return [0, 0, 0];
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}

function resolveTokenColors(): {
  ground: [number, number, number];
  dot: [number, number, number];
} | null {
  if (typeof document === "undefined") return null;
  const cs = getComputedStyle(document.documentElement);
  const get = (name: string) => cs.getPropertyValue(name).trim() || undefined;
  const background = get("--tk-background");
  const ink = get("--tk-ink");
  if (!background || !ink) return null;
  const muted = get("--tk-muted") ?? ink;
  const groundRgb = hexToRgb(background);
  const inkRgb = hexToRgb(ink);
  const mutedRgb = hexToRgb(muted);
  // Two-value palette: the ground plus a quiet ink/muted dot. No accent hue.
  const dot: [number, number, number] = [
    inkRgb[0] * 0.72 + mutedRgb[0] * 0.28,
    inkRgb[1] * 0.72 + mutedRgb[1] * 0.28,
    inkRgb[2] * 0.72 + mutedRgb[2] * 0.28,
  ];
  return { ground: groundRgb, dot };
}

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uPointerIntensity;
  uniform float uTime;
  uniform vec3 uGround;
  uniform vec3 uDot;

  ${GLSL_PREAMBLE}

  const float COLS = ${HALFTONE_COLUMNS.toFixed(1)};

  void main() {
    vec2 frag = gl_FragCoord.xy;

    // Square-pixel lattice: 34 cells across, floored to the cell centre.
    float cellPx = uResolution.x / COLS;
    vec2 cell = floor(frag / cellPx);
    vec2 centre = (cell + 0.5) * cellPx;

    // Aspect-correct, centred coordinate of this cell's centre.
    vec2 p = (centre - 0.5 * uResolution) / uResolution.x;

    // One field evaluation per cell centre, through the shared warp.
    vec2 warped = domainWarp(p * 2.2, uTime);
    float field = fbm(warped * 1.35);
    float shape = smoothstep(0.22, 0.78, clamp(field, 0.0, 1.0));

    // The clock also gives each cell a slow, field-locked breath.
    float pulse = 0.5 + 0.5 * sin(uTime * 0.55 + field * 6.2831853);
    float radius = cellPx * (0.08 + shape * 0.30) * (0.94 + pulse * 0.12);

    // Pointer halo: dots under the cursor grow and brighten.
    vec2 pointerPx = uPointer * uResolution;
    float cellDistance = length(centre - pointerPx) / cellPx;
    float halo = (1.0 - smoothstep(0.0, 6.0, cellDistance)) * uPointerIntensity;
    radius *= 1.0 + halo * 0.55;
    radius = min(radius, cellPx * 0.497);

    float distanceToCentre = length(frag - centre);
    float edge = max(0.75, cellPx * 0.035);
    float dotMask = 1.0 - smoothstep(radius - edge, radius + edge, distanceToCentre);

    float light = (0.16 + shape * 0.30 + pulse * 0.05) * (1.0 + halo * 0.8);
    vec3 color = mix(uGround, uDot, clamp(dotMask * light, 0.0, 1.0));

    // Static 1/255 dither keeps the near-black ground free of banding.
    color += (hash21(frag) - 0.5) / 255.0;
    gl_FragColor = vec4(color, 1.0);
  }
`;

type Uniforms = {
  resolution: WebGLUniformLocation | null;
  pointer: WebGLUniformLocation | null;
  pointerIntensity: WebGLUniformLocation | null;
  time: WebGLUniformLocation | null;
  ground: WebGLUniformLocation | null;
  dot: WebGLUniformLocation | null;
};

class HalftoneApp {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  program: WebGLProgram;
  buffer: WebGLBuffer | null = null;
  uniforms: Uniforms;
  reducedMotion: boolean;
  private running = false;
  private destroyed = false;
  private raf = 0;
  private lastFrame = 0;
  private time = 0;
  private pointer = { x: 0.5, y: 0.5 };
  private pointerIntensity = 0;
  private targetIntensity = 0;
  private colors: {
    ground: [number, number, number];
    dot: [number, number, number];
  };

  constructor(canvas: HTMLCanvasElement, reducedMotion: boolean) {
    this.canvas = canvas;
    this.reducedMotion = reducedMotion;
    const options: WebGLContextAttributes = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    };
    const gl = (canvas.getContext("webgl2", options) ||
      canvas.getContext("webgl", options)) as
      | WebGLRenderingContext
      | WebGL2RenderingContext
      | null;
    if (!gl) throw new Error("WebGL not available");
    this.gl = gl;
    this.colors = resolveTokenColors() ?? {
      ground: [0.031, 0.035, 0.051],
      dot: [0.859, 0.878, 0.922],
    };
    this.program = this.createProgram();
    this.uniforms = this.getUniforms();
    this.resize();
    this.gl.useProgram(this.program);
    this.gl.uniform3fv(this.uniforms.ground, this.colors.ground);
    this.gl.uniform3fv(this.uniforms.dot, this.colors.dot);
    this.redraw();
  }

  private createProgram(): WebGLProgram {
    const gl = this.gl;
    const vs = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program) throw new Error("WebGL program could not be created");
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, "position");
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(log ?? "WebGL program link failed");
    }

    const position = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    this.buffer = buffer;
    return program;
  }

  private compileShader(type: number, source: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) throw new Error("WebGL shader could not be created");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(log ?? "WebGL shader compile failed");
    }
    return shader;
  }

  private getUniforms(): Uniforms {
    const gl = this.gl;
    return {
      resolution: gl.getUniformLocation(this.program, "uResolution"),
      pointer: gl.getUniformLocation(this.program, "uPointer"),
      pointerIntensity: gl.getUniformLocation(
        this.program,
        "uPointerIntensity",
      ),
      time: gl.getUniformLocation(this.program, "uTime"),
      ground: gl.getUniformLocation(this.program, "uGround"),
      dot: gl.getUniformLocation(this.program, "uDot"),
    };
  }

  resize() {
    const parent = this.canvas.parentElement;
    const cssWidth = parent?.clientWidth ?? this.canvas.clientWidth;
    const cssHeight = parent?.clientHeight ?? this.canvas.clientHeight;
    if (cssWidth <= 0 || cssHeight <= 0) return;

    const gl = this.gl;
    const mobile = cssWidth < 760;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    const renderScale = mobile ? 0.7 : 0.85;
    const baseWidth = cssWidth * dpr * renderScale;
    const cap = Math.min(1, MAX_DRAW_WIDTH / baseWidth);
    const drawWidth = Math.max(1, Math.round(baseWidth * cap));
    const drawHeight = Math.max(1, Math.round(cssHeight * dpr * renderScale * cap));

    if (this.canvas.width !== drawWidth) this.canvas.width = drawWidth;
    if (this.canvas.height !== drawHeight) this.canvas.height = drawHeight;

    gl.useProgram(this.program);
    gl.viewport(0, 0, drawWidth, drawHeight);
    gl.uniform2f(this.uniforms.resolution, drawWidth, drawHeight);
  }

  setPointer(x: number, y: number, inside: boolean) {
    // gl_FragCoord's origin is bottom-left; DOM pointer coordinates are top-left.
    this.pointer = { x, y: 1 - y };
    this.targetIntensity = inside ? 1 : 0;
  }

  setHover(inside: boolean) {
    this.targetIntensity = inside ? 1 : 0;
  }

  redraw() {
    this.draw(0);
  }

  private draw(dt: number) {
    if (this.destroyed) return;
    const gl = this.gl;
    gl.useProgram(this.program);

    if (this.reducedMotion) {
      this.pointerIntensity = this.targetIntensity;
    } else {
      const ease = 1 - Math.exp(-Math.max(0, dt) * 6.0);
      this.pointerIntensity += (this.targetIntensity - this.pointerIntensity) * ease;
    }

    gl.uniform1f(this.uniforms.time, this.reducedMotion ? 0 : this.time);
    gl.uniform1f(this.uniforms.pointerIntensity, this.pointerIntensity);
    gl.uniform2f(this.uniforms.pointer, this.pointer.x, this.pointer.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  start() {
    if (this.destroyed || this.reducedMotion || this.running) return;
    this.running = true;
    this.lastFrame = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  pause() {
    this.running = false;
    if (this.raf !== 0) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private tick = (now: number) => {
    if (this.destroyed || !this.running) return;
    const dt = Math.min(0.05, Math.max(0, (now - this.lastFrame) / 1000));
    this.lastFrame = now;
    this.time += dt;
    this.draw(dt);
    this.raf = requestAnimationFrame(this.tick);
  };

  updateColors() {
    const next = resolveTokenColors();
    if (!next) return;
    this.colors = next;
    this.gl.useProgram(this.program);
    this.gl.uniform3fv(this.uniforms.ground, next.ground);
    this.gl.uniform3fv(this.uniforms.dot, next.dot);
    this.redraw();
  }

  destroy(release = true) {
    this.destroyed = true;
    this.pause();
    if (release) {
      const gl = this.gl;
      if (this.buffer) gl.deleteBuffer(this.buffer);
      gl.deleteProgram(this.program);
    }
    this.buffer = null;
  }
}

const HalftoneBackdrop = (props: HalftoneProps) => {
  const { className = "" } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fallbackVisible, setFallbackVisible] = useState(true);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let active = true;
    let inView = false;
    let contextLost = false;
    let app: HalftoneApp | null = null;

    // Created imperatively so StrictMode remounts always bind a fresh canvas.
    const canvas = document.createElement("canvas");
    canvas.className = "portal-halftone__canvas";
    canvas.setAttribute("aria-hidden", "true");
    wrapper.appendChild(canvas);

    const mount = () => {
      // After a context loss the old program/buffer no longer belong to the
      // restored context; release them only when the context is healthy.
      app?.destroy(!contextLost);
      app = null;
      try {
        app = new HalftoneApp(canvas, reducedMotion);
        contextLost = false;
        canvas.style.visibility = "";
        if (active) setFallbackVisible(false);
        if (inView && !document.hidden) app.start();
      } catch (error) {
        console.warn("HalftoneBackdrop: WebGL unavailable", error);
        app?.destroy(!contextLost);
        app = null;
        canvas.style.visibility = "hidden";
        if (active) setFallbackVisible(true);
      }
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    mount();

    const onMotionPreference = () => {
      reducedMotion = motionQuery.matches;
      mount();
    };
    motionQuery.addEventListener("change", onMotionPreference);

    const themeObserver = new MutationObserver(() => app?.updateColors());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inView = Boolean(entry?.isIntersecting);
        if (inView && !document.hidden) app?.start();
        else app?.pause();
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(wrapper);

    const resizeObserver = new ResizeObserver(() => {
      if (!app) return;
      app.resize();
      if (app.reducedMotion) app.redraw();
    });
    resizeObserver.observe(wrapper);

    const onResize = () => {
      if (!app) return;
      app.resize();
      if (app.reducedMotion) app.redraw();
    };

    const onVisibility = () => {
      if (document.hidden) app?.pause();
      else if (inView) app?.start();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!app || event.pointerType === "touch") return;
      const rect = wrapper.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      app.setPointer(x, y, inside);
    };
    const onPointerLeave = () => app?.setHover(false);
    const onPointerCancel = () => app?.setHover(false);

    // No WebGL context: show the static panel, hide the canvas. If the context
    // comes back, rebuild the program on the same canvas.
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      app?.pause();
      canvas.style.visibility = "hidden";
      if (active) setFallbackVisible(true);
    };
    const onContextRestored = () => mount();

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    const pointerTarget = wrapper.parentElement ?? wrapper;
    pointerTarget.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    pointerTarget.addEventListener("pointerleave", onPointerLeave);
    pointerTarget.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      app?.destroy(!contextLost);
      app = null;
      canvas.remove();
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      motionQuery.removeEventListener("change", onMotionPreference);
      pointerTarget.removeEventListener("pointermove", onPointerMove);
      pointerTarget.removeEventListener("pointerleave", onPointerLeave);
      pointerTarget.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`portal-halftone ${className}`.trim()}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        className="portal-halftone__fallback"
        data-visible={fallbackVisible ? "true" : "false"}
        aria-hidden="true"
      />
    </div>
  );
};

export default HalftoneBackdrop;
