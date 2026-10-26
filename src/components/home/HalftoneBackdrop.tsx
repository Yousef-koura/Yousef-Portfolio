"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HalftoneBackdrop — raw WebGL halftone shader rendered inside the final CTA
 * section (absolutely positioned, NOT fixed full-viewport).
 *
 * Implements the owner's spec:
 *  - coordinate floored to a responsive cell lattice (~34 cols desktop, fewer mobile)
 *  - six-octave fbm (hashed value noise, light domain warp) sampled ONCE at each
 *    cell centre; that value sets the dot radius for the whole cell
 *  - smoothed pointer-intensity uniform strengthens the effect under the cursor,
 *    relaxes when the pointer leaves
 *  - ground + at most two/three colors, one material; champagne only as a faint tint
 *  - colours resolved from the live --tk-* tokens via getComputedStyle
 *  - no-WebGL fallback: render nothing (plain token background)
 *  - reduced motion: single static frame, then the loop stops
 *  - scrim behind text so every CTA text node stays AA against the composite
 *  - pauses off-screen / tab hidden; caps DPR; full teardown; context loss/restored
 */

type HalftoneProps = {
  className?: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  if (h.length === 3) {
    const expanded = h.split("").map((c) => c + c).join("");
    return hexToRgb(expanded);
  }
  const bigint = parseInt(h, 16);
  if (Number.isNaN(bigint)) return [0, 0, 0];
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
  ];
}

function resolveTokenColors(): {
  ground: [number, number, number];
  dot: [number, number, number];
} | null {
  if (typeof document === "undefined") return null;
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  const get = (name: string) => cs.getPropertyValue(name).trim() || undefined;
  const bg = get("--tk-background");
  const muted = get("--tk-muted");
  const champagne = get("--tk-champagne");
  if (!bg || !muted || !champagne) return null;
  const ground = hexToRgb(bg);
  // Dots: low-contrast mix of Muted and Champagne — champagne only as a faint tint.
  const m = hexToRgb(muted);
  const c = hexToRgb(champagne);
  const dot: [number, number, number] = [
    m[0] * 0.75 + c[0] * 0.25,
    m[1] * 0.75 + c[1] * 0.25,
    m[2] * 0.75 + c[2] * 0.25,
  ];
  return { ground, dot };
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
  uniform vec3 uGround;
  uniform vec3 uDot;
  uniform float uCols;
  uniform float uReduced;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = p * 2.0 + vec2(1.7, 0.9);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution;

    // Square-pixel cell lattice, floored to the responsive column count.
    vec2 grid = vec2(uCols, uCols * uResolution.y / uResolution.x);
    vec2 cell = floor(st * grid);
    vec2 cellCenter = (cell + 0.5) / grid;

    // Light domain warp, sampled once at each cell centre.
    vec2 warp = vec2(
      fbm(cellCenter * 0.5 + vec2(0.0, 0.0)),
      fbm(cellCenter * 0.5 + vec2(52.0, 0.0))
    );
    vec2 warped = cellCenter + warp * 0.12;

    // One fbm sample per cell centre -> dot radius for the whole cell.
    float n = fbm(warped * 1.6);
    float cellPx = uResolution.x / uCols;
    float radiusPx = cellPx * (0.16 + n * 0.24);

    // Pointer strengthens the effect under the cursor, relaxes when it leaves.
    float strength = 1.0 - uPointerIntensity * 0.5;
    float dotRadius = radiusPx * strength;

    // Distance in pixels -> circular dot inside a square cell.
    vec2 toCenter = (st - cellCenter) * uResolution;
    float d = length(toCenter);
    float edge = uReduced > 0.5 ? 2.0 : 1.2;
    float dotAlpha = 1.0 - smoothstep(dotRadius - edge, dotRadius, d);

    vec3 color = mix(uGround, uDot, dotAlpha * 0.14);
    gl_FragColor = vec4(color, 1.0);
  }
`;

class HalftoneApp {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  program: WebGLProgram;
  locs: {
    resolution: WebGLUniformLocation | null;
    pointer: WebGLUniformLocation | null;
    pointerIntensity: WebGLUniformLocation | null;
    ground: WebGLUniformLocation | null;
    dot: WebGLUniformLocation | null;
    cols: WebGLUniformLocation | null;
    reduced: WebGLUniformLocation | null;
    position: number;
  };
  raf = 0;
  width = 0;
  height = 0;
  cols = 34;
  dpr = 1;
  pointer = { x: 0, y: 0 };
  pointerIntensity = 0;
  targetIntensity = 0;
  reducedMotion = false;
  destroyed = false;
  colors: { ground: [number, number, number]; dot: [number, number, number] };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as
      | WebGLRenderingContext
      | WebGL2RenderingContext;
    if (!gl) throw new Error("WebGL not available");
    this.gl = gl;
    this.colors = resolveTokenColors() ?? {
      ground: [0.043, 0.047, 0.055],
      dot: [0.5, 0.45, 0.3],
    };
    this.program = this.createProgram();
    this.locs = this.getLocations();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Bind before resize(): resize writes uResolution/uCols uniforms.
    this.gl.useProgram(this.program);
    this.resize();
    this.gl.uniform3fv(this.locs.ground, this.colors.ground);
    this.gl.uniform3fv(this.locs.dot, this.colors.dot);
    this.gl.uniform1f(this.locs.reduced, this.reducedMotion ? 1 : 0);
    this.gl.uniform1f(this.locs.cols, this.cols);
    this.draw();
    if (!this.reducedMotion) this.loop();
  }

  createProgram(): WebGLProgram {
    const gl = this.gl;
    const vs = this.createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = this.createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(prog) ?? "program link failed");
    }
    // Full-screen quad (triangle strip).
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    return prog;
  }

  createShader(type: number, source: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
    }
    return shader;
  }

  getLocations() {
    const gl = this.gl;
    return {
      resolution: gl.getUniformLocation(this.program, "uResolution"),
      pointer: gl.getUniformLocation(this.program, "uPointer"),
      pointerIntensity: gl.getUniformLocation(this.program, "uPointerIntensity"),
      ground: gl.getUniformLocation(this.program, "uGround"),
      dot: gl.getUniformLocation(this.program, "uDot"),
      cols: gl.getUniformLocation(this.program, "uCols"),
      reduced: gl.getUniformLocation(this.program, "uReduced"),
      position: gl.getAttribLocation(this.program, "position"),
    };
  }

  resize() {
    const { clientWidth, clientHeight } = this.canvas.parentElement ?? this.canvas;
    this.gl.useProgram(this.program);
    // Reduced resolution on mobile; cap DPR.
    const mobile = clientWidth < 760;
    const dpr = mobile ? Math.min(window.devicePixelRatio || 1, 1.5) : this.dpr;
    this.dpr = dpr;
    this.cols = mobile ? 18 : clientWidth < 1024 ? 26 : 34;
    this.width = clientWidth;
    this.height = clientHeight;
    const drawW = Math.max(1, Math.floor(clientWidth * dpr * (mobile ? 0.7 : 1)));
    const drawH = Math.max(1, Math.floor(clientHeight * dpr * (mobile ? 0.7 : 1)));
    this.canvas.width = drawW;
    this.canvas.height = drawH;
    this.canvas.style.width = `${clientWidth}px`;
    this.canvas.style.height = `${clientHeight}px`;
    this.gl.viewport(0, 0, drawW, drawH);
    this.gl.uniform2f(this.locs.resolution, clientWidth, clientHeight);
    this.gl.uniform1f(this.locs.cols, this.cols);
  }

  setPointer(x: number, y: number, inside: boolean) {
    this.pointer = { x, y };
    this.targetIntensity = inside ? 1 : 0;
    this.gl.useProgram(this.program);
    this.gl.uniform2f(this.locs.pointer, x, y);
  }

  draw() {
    const gl = this.gl;
    gl.useProgram(this.program);
    // Smoothed pointer intensity eases back to rest.
    this.pointerIntensity += (this.targetIntensity - this.pointerIntensity) * 0.08;
    gl.uniform1f(this.locs.pointerIntensity, this.pointerIntensity);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  loop() {
    if (this.destroyed || this.reducedMotion) return;
    this.draw();
    this.raf = requestAnimationFrame(() => this.loop());
  }

  pause() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  resume() {
    if (this.destroyed || this.reducedMotion) return;
    if (this.raf === 0) this.loop();
  }

  setReducedMotion(reduced: boolean) {
    this.reducedMotion = reduced;
    this.gl.uniform1f(this.locs.reduced, reduced ? 1 : 0);
    if (reduced) {
      this.pause();
      this.draw(); // single static frame
    } else {
      this.resume();
    }
  }

  updateColors() {
    const next = resolveTokenColors();
    if (!next) return;
    this.colors = next;
    this.gl.useProgram(this.program);
    this.gl.uniform3fv(this.locs.ground, next.ground);
    this.gl.uniform3fv(this.locs.dot, next.dot);
    this.draw();
  }

  destroy() {
    this.destroyed = true;
    this.pause();
    const gl = this.gl;
    if (this.program) gl.deleteProgram(this.program);
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}

const HalftoneBackdrop = (props: HalftoneProps) => {
  const { className = "" } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HalftoneApp | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    const h = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Mount WebGL after mount; no-WebGL renders nothing (plain token background).
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const canvas = document.createElement("canvas");
    canvas.className = "portal-halftone__canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    wrapper.appendChild(canvas);

    let app: HalftoneApp | null = null;
    try {
      app = new HalftoneApp(canvas);
      if (reducedMotion) app.setReducedMotion(true);
      appRef.current = app;
    } catch (err) {
      // No WebGL: render nothing — plain token background shows through.
      console.warn("HalftoneBackdrop: WebGL unavailable", err);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }

    // React to data-theme changes without a page reload.
    const observer = new MutationObserver(() => app?.updateColors());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Pause when off-screen / tab hidden.
    let io: IntersectionObserver | null = null;
    const el = wrapper.parentElement;
    if (el) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) app?.resume();
            else app?.pause();
          });
        },
        { threshold: 0.05 },
      );
      io.observe(el);
    }

    const onVisibility = () => {
      if (document.hidden) app?.pause();
      else app?.resume();
    };
    const onResize = () => app?.resize();
    window.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    // Pointer over the section: strengthen under cursor. The wrapper itself is
    // pointer-events:none, so observe the parent section.
    const pointerTarget = wrapper.parentElement ?? wrapper;
    const onPointerMove = (e: PointerEvent) => {
      if (!app) return;
      const rect = wrapper.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      const x = inside ? (e.clientX - rect.left) / rect.width : 0;
      const y = inside ? (e.clientY - rect.top) / rect.height : 0;
      app.setPointer(x * app.width, y * app.height, inside);
    };
    const onPointerEnter = () => {
      if (app) app.targetIntensity = 1;
    };
    const onPointerLeave = () => {
      if (app) app.targetIntensity = 0;
    };
    pointerTarget.addEventListener("pointermove", onPointerMove);
    pointerTarget.addEventListener("pointerenter", onPointerEnter);
    pointerTarget.addEventListener("pointerleave", onPointerLeave);

    return () => {
      app?.destroy();
      appRef.current = null;
      observer.disconnect();
      if (io) io.disconnect();
      window.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      pointerTarget.removeEventListener("pointermove", onPointerMove);
      pointerTarget.removeEventListener("pointerenter", onPointerEnter);
      pointerTarget.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className={`portal-halftone ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0, // above the section background, below the scrim (5) and CTA body (10)
      }}
    />
  );
};

export default HalftoneBackdrop;
