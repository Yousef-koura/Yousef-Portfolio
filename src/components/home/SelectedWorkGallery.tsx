"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Camera,
  Geometry,
  Mesh,
  Plane,
  Program,
  Renderer,
  Transform,
  Texture,
} from "ogl";
import { QuietLink } from "@/components/ui/QuietLink";
import {
  featuredProject,
  secondaryProjects,
  getProjectDetail,
} from "@/content/projects";

/* ---------------------------------------------------------------------------
   Gallery data — the five curated projects, in curated order. Every field
   traces to src/content/projects.ts; nothing is invented.
--------------------------------------------------------------------------- */

type GalleryItem = {
  name: string;
  status: "Live" | "Completed";
  summary: string;
  evidence: string;
  linkLabel: string;
  linkHref: string;
  external: boolean;
  image: { src: string; alt: string; width: number; height: number };
};

const cops = getProjectDetail("flyrank-content-opportunity-scoring");

const GALLERY: GalleryItem[] = [
  {
    name: featuredProject.name,
    status: featuredProject.status,
    summary: featuredProject.summary,
    evidence: featuredProject.evidence,
    linkLabel: featuredProject.links[0].label,
    linkHref: featuredProject.links[0].href,
    external: Boolean(featuredProject.links[0].external),
    image: featuredProject.image,
  },
  {
    name: secondaryProjects[1].name, // Personal RAG Chatbot
    status: secondaryProjects[1].status,
    summary: secondaryProjects[1].summary,
    evidence: secondaryProjects[1].evidence,
    linkLabel: secondaryProjects[1].links[0].label,
    linkHref: secondaryProjects[1].links[0].href,
    external: Boolean(secondaryProjects[1].links[0].external),
    image: secondaryProjects[1].image,
  },
  {
    name: secondaryProjects[0].name, // Agri-Bot
    status: secondaryProjects[0].status,
    summary: secondaryProjects[0].summary,
    evidence: secondaryProjects[0].evidence,
    linkLabel: secondaryProjects[0].links[0].label,
    linkHref: secondaryProjects[0].links[0].href,
    external: Boolean(secondaryProjects[0].links[0].external),
    image: secondaryProjects[0].image,
  },
  {
    name: secondaryProjects[2].name, // FMCG Data Engineering Pipeline
    status: secondaryProjects[2].status,
    summary: secondaryProjects[2].summary,
    evidence: secondaryProjects[2].evidence,
    linkLabel: secondaryProjects[2].links[0].label,
    linkHref: secondaryProjects[2].links[0].href,
    external: Boolean(secondaryProjects[2].links[0].external),
    image: secondaryProjects[2].image,
  },
  {
    name: cops?.name ?? "Content Opportunity Scoring",
    status: (cops?.status ?? "Completed") as "Live" | "Completed",
    summary: cops?.summary ?? "",
    evidence: cops?.stack.map((t) => t.label).join(" · ") ?? "",
    linkLabel: cops?.links[0]?.label ?? "View repository",
    linkHref: cops?.links[0]?.href ?? "",
    external: Boolean(cops?.links[0]?.external),
    image: cops?.image ?? {
      src: "/projects/flyrank-capstone-cover.jpg",
      alt: "Content Opportunity Scoring — decision-support ranking for content-refresh review",
      width: 1897,
      height: 842,
    },
  },
];

const ITEM_COUNT = GALLERY.length; // 5
const COPIES = 3;
const TOTAL = ITEM_COUNT * COPIES; // 15 planes, three copies for the infinite loop
const MIDDLE_START = ITEM_COUNT; // index 5 = first item of the middle copy (goTo(0))
const HALF = TOTAL / 2; // 7.5 — shortest-path boundary on the circle

/* ---------------------------------------------------------------------------
   WebGL application (ogl ^0.0.116). One instance per mounted gallery.
   Disposed on unmount, paused off-screen / tab hidden.
--------------------------------------------------------------------------- */

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

function resolveBackground(): [number, number, number] {
  if (typeof document === "undefined") return [0.043, 0.047, 0.055];
  const cs = getComputedStyle(document.documentElement);
  const bg = cs.getPropertyValue("--tk-background").trim() || "#0b0c0e";
  return hexToRgb(bg);
}

const VERTEX_SHADER = `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform sampler2D uMap;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(uMap, vUv);
  }
`;

type WheelListener = {
  target: Element;
  handler: EventListener;
};
type PointerListener = {
  target: HTMLCanvasElement;
  handler: EventListener;
};
type Lifecycle = {
  io: IntersectionObserver;
  onVisibility: () => void;
  onResize: () => void;
  observer: MutationObserver;
};

class SelectedWorkApp {
  readonly canvas: HTMLCanvasElement;
  readonly gl: WebGLRenderingContext | WebGL2RenderingContext;
  readonly renderer: Renderer;
  readonly camera: Camera;
  readonly scene: Transform;
  readonly program: Program;
  readonly geometry: Geometry;
  readonly planes: Mesh[] = [];
  readonly textures: Texture[] = [];
  readonly images: HTMLImageElement[] = [];

  raf = 0;
  destroyed = false;
  paused = false;
  width = 0;
  height = 0;
  dpr = 1;

  // scroll model
  current = MIDDLE_START;
  target = MIDDLE_START;
  dragging = false;
  dragStartX = 0;
  dragStartTarget = MIDDLE_START;
  wheelAccum = 0;

  private input: { wheel: WheelListener; pointers: PointerListener[] } | null =
    null;
  private life: Lifecycle | null = null;

  onActiveChange: (index: number) => void;

  constructor(
    canvas: HTMLCanvasElement,
    onActiveChange: (index: number) => void,
  ) {
    this.canvas = canvas;
    this.onActiveChange = onActiveChange;

    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null);
    if (!gl) throw new Error("WebGL not available");
    this.gl = gl;

    const bg = resolveBackground();
    gl.clearColor(bg[0], bg[1], bg[2], 1);

    this.renderer = new Renderer({
      canvas,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
      depth: true,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });
    this.dpr = this.renderer.dpr;

    this.camera = new Camera(gl, { fov: 45, near: 0.1, far: 100 });
    this.camera.position.z = 4.2;

    // group is the rotating carousel container
    this.scene = new Transform();
    this.program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      transparent: true,
      cullFace: null, // double-sided cards
      depthTest: true,
    });

    this.geometry = new Plane(gl, {
      width: 1.15,
      height: 1.6,
      widthSegments: 2,
      heightSegments: 2,
    });

    this.images = GALLERY.map(() => new Image());
    // Anything below this point that throws leaves a half-built app whose
    // pending loadImages promise would still fire buildPlanes/render, so mark
    // the instance destroyed before letting the error propagate.
    try {
      this.loadImages().then(
        () => {
          if (this.destroyed || !this.renderer) return;
          this.buildPlanes();
          this.resize();
          this.setActiveFromCurrent();
          this.render();
          if (!this.paused) this.loop();
        },
        () => {
          // texture load failure -> caller renders the CSS fallback
          if (this.destroyed) return;
          throw new Error("gallery texture load failed");
        },
      );

      this.attachInput();
      this.attachLifecycle();
    } catch (err) {
      this.destroyed = true;
      throw err;
    }
  }

  private loadImages(): Promise<void> {
    return new Promise((resolve, reject) => {
      let loaded = 0;
      const total = this.images.length;
      const onLoad = () => {
        loaded += 1;
        if (loaded === total) resolve();
      };
      const onError = () => reject(new Error("image failed to load"));
      this.images.forEach((img, i) => {
        img.src = GALLERY[i].image.src;
        img.alt = GALLERY[i].image.alt;
        if (img.decode) {
          img.decode().then(onLoad).catch(onError);
        } else {
          img.onload = onLoad;
          img.addEventListener("error", onError, { once: true });
        }
        if (img.complete && img.width && img.height) onLoad();
      });
    });
  }

  private buildPlanes() {
    if (this.destroyed) return;
    const { gl } = this;
    const angleStep = (2 * Math.PI) / TOTAL;
    const radius = 1.62;

    for (let i = 0; i < TOTAL; i++) {
      const texture = new Texture(gl, {
        image: this.images[i % ITEM_COUNT],
        flipY: false,
      });
      this.textures.push(texture);

      const mesh = new Mesh({
        gl,
        geometry: this.geometry,
        program: this.program,
        frustumCulled: true,
      }) as Mesh & { userData?: { texture: Texture; index: number } };
      mesh.userData = { texture, index: i };

      // base position on the circle (angle i), card faces inward
      const baseAngle = i * angleStep;
      mesh.position.x = Math.sin(baseAngle) * radius;
      mesh.position.z = -Math.cos(baseAngle) * radius;
      mesh.rotation.y = -baseAngle;

      mesh.onBeforeRender(() => {
        mesh.program.uniforms.uMap = { value: mesh.userData!.texture };
      });

      this.planes.push(mesh);
      this.scene.addChild(mesh);
    }

    (this.program.uniforms as { uMap?: { value: Texture } }).uMap = {
      value: this.textures[0],
    };
  }

  /* scroll model ---------------------------------------------------------- */

  euclid(v: number, m: number): number {
    return ((v % m) + m) % m;
  }

  activeIndexFromCurrent(current: number): number {
    return this.euclid(Math.round(current), TOTAL) % ITEM_COUNT;
  }

  setActiveFromCurrent() {
    const index = this.activeIndexFromCurrent(this.current);
    this.onActiveChange(index);
  }

  goTo(itemIndex: number) {
    // goTo(0) starts at the middle copy (index MIDDLE_START = 5)
    const target = this.euclid(MIDDLE_START + itemIndex, TOTAL);
    this.target = target;
    this.current = target; // instant snap for programmatic navigation
    this.setActiveFromCurrent();
    if (!this.paused) this.render();
  }

  next() {
    const next = this.euclid(this.target + 1, TOTAL);
    this.target = next;
    this.current = next;
    this.setActiveFromCurrent();
    if (!this.paused) this.render();
  }

  prev() {
    const prev = this.euclid(this.target - 1, TOTAL);
    this.target = prev;
    this.current = prev;
    this.setActiveFromCurrent();
    if (!this.paused) this.render();
  }

  /* input ----------------------------------------------------------------- */

  private attachInput() {
    const canvas = this.canvas;
    const wrapper = canvas.parentElement;
    if (!wrapper) return; // canvas not attached yet; input skipped

    const onWheel = (e: WheelEvent) => {
      if (this.destroyed || this.paused) return;
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!horizontal) return; // vertical wheel still scrolls the page
      e.preventDefault();
      this.wheelAccum += e.deltaX;
      const step = 55; // px per item
      while (this.wheelAccum > step) {
        this.wheelAccum -= step;
        this.next();
      }
      while (this.wheelAccum < -step) {
        this.wheelAccum += step;
        this.prev();
      }
    };

    this.input = {
      wheel: { target: wrapper, handler: onWheel as EventListener },
      pointers: [
        { target: canvas, handler: this.pointerDownHandler as EventListener },
        { target: canvas, handler: this.pointerMoveHandler as EventListener },
        { target: canvas, handler: this.pointerUpHandler as EventListener },
        { target: canvas, handler: this.pointerCancelHandler as EventListener },
      ],
    };

    wrapper.addEventListener(
      "wheel",
      this.input.wheel.handler,
      { passive: false } as AddEventListenerOptions,
    );
    canvas.addEventListener("pointerdown", this.pointerDownHandler);
    canvas.addEventListener("pointermove", this.pointerMoveHandler);
    canvas.addEventListener("pointerup", this.pointerUpHandler);
    canvas.addEventListener("pointercancel", this.pointerCancelHandler);
  }

  private attachLifecycle() {
    const el = this.canvas.parentElement;
    if (!el) return; // canvas not attached yet; lifecycle skipped
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.paused = !entry.isIntersecting;
          if (!this.paused && !this.destroyed) this.loop();
        });
      },
      { threshold: 0.05 },
    );
    io.observe(el);

    const onVisibility = () => {
      this.paused = document.hidden;
      if (!this.paused && !this.destroyed) this.loop();
    };
    window.addEventListener("visibilitychange", onVisibility);

    const onResize = () => this.resize();
    window.addEventListener("resize", onResize);

    const observer = new MutationObserver(() => {
      const bg = resolveBackground();
      this.gl.clearColor(bg[0], bg[1], bg[2], 1);
      this.render();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    this.life = { io, onVisibility, onResize, observer };
  }

  /* render loop ----------------------------------------------------------- */

  loop() {
    if (this.destroyed || this.paused) return;
    this.step();
    this.render();
    this.raf = requestAnimationFrame(() => this.loop());
  }

  step() {
    if (this.dragging) return;
    // shortest-path lerp around the circle
    const delta = this.euclid(this.target - this.current + HALF, TOTAL) - HALF;
    this.current += delta * 0.16;
    this.current = this.euclid(this.current, TOTAL);
    this.target = this.euclid(this.target, TOTAL);
  }

  updatePlanes() {
    const { current } = this;
    const angleStep = (2 * Math.PI) / TOTAL;
    const radius = 1.62;
    const depth = 1.05;

    for (let i = 0; i < TOTAL; i++) {
      const mesh = this.planes[i];
      // effective signed distance from the scroll centre (plane units)
      const dist = this.euclid(i - current + HALF, TOTAL) - HALF;
      const angle = dist * angleStep;

      mesh.position.x = Math.sin(angle) * radius;
      mesh.position.z = (1 - Math.cos(angle)) * depth; // centre closest
      mesh.rotation.y = -angle;

      const scale = Math.max(0.45, 1 - Math.abs(dist) * 0.15);
      mesh.scale.set(scale, scale, 1);
    }
    this.scene.updateMatrixWorld();
  }

  render() {
    if (this.destroyed) return;
    this.updatePlanes();
    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
      clear: true,
    });
  }

  resize() {
    if (this.destroyed) return;
    const wrapper = this.canvas.parentElement;
    if (!wrapper) return; // canvas not yet attached to the DOM
    const { clientWidth, clientHeight } = wrapper;
    this.width = clientWidth;
    this.height = clientHeight;
    this.renderer.setSize(clientWidth, clientHeight);
    this.camera.perspective({
      fov: 45,
      aspect: clientWidth / clientHeight,
    });
    this.canvas.style.width = `${clientWidth}px`;
    this.canvas.style.height = `${clientHeight}px`;
    this.render();
  }

  pause() {
    this.paused = true;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  resume() {
    if (this.destroyed || this.paused === false) return;
    this.paused = false;
    this.loop();
  }

  destroy() {
    this.destroyed = true;
    this.pause();
    const input = this.input;
    if (input) {
      input.wheel.target.removeEventListener(
        "wheel",
        input.wheel.handler,
        { passive: false } as AddEventListenerOptions,
      );
    }
    const canvas = this.canvas;
    canvas.removeEventListener("pointerdown", this.pointerDownHandler as EventListener);
    canvas.removeEventListener("pointermove", this.pointerMoveHandler as EventListener);
    canvas.removeEventListener("pointerup", this.pointerUpHandler as EventListener);
    canvas.removeEventListener("pointercancel", this.pointerCancelHandler as EventListener);

    const life = this.life;
    if (life) {
      life.io.disconnect();
      window.removeEventListener("visibilitychange", life.onVisibility);
      window.removeEventListener("resize", life.onResize);
      life.observer.disconnect();
    }

    this.planes.forEach((m) => this.scene.removeChild(m));
    this.textures.forEach((t) => {
      const gl = this.gl;
      gl.deleteTexture(t.texture as WebGLTexture);
    });
    this.geometry.remove();
    this.program.remove();
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }

  // Stable handler references so they can be removed in destroy().
  private pointerDownHandler = (e: PointerEvent) => {
    if (e.button !== 0) return;
    if (this.destroyed || this.paused) return;
    this.dragging = true;
    this.dragStartX = e.clientX;
    this.dragStartTarget = this.target;
    this.canvas.setPointerCapture?.(e.pointerId);
  };
  private pointerMoveHandler = (e: PointerEvent) => {
    if (!this.dragging || this.destroyed || this.paused) return;
    const delta = e.clientX - this.dragStartX;
    this.target = this.euclid(this.dragStartTarget + delta * 0.02, TOTAL);
    this.current = this.target;
    this.setActiveFromCurrent();
    this.render();
  };
  private pointerUpHandler = () => {
    if (!this.dragging) return;
    this.dragging = false;
    this.current = this.target;
    this.setActiveFromCurrent();
    this.render();
  };
  private pointerCancelHandler = () => {
    this.dragging = false;
  };
}

/* ---------------------------------------------------------------------------
   React component
--------------------------------------------------------------------------- */

type SelectedWorkGalleryProps = {
  className?: string;
};

export function SelectedWorkGallery({ className = "" }: SelectedWorkGalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglReady, setWebglReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const appRef = useRef<SelectedWorkApp | null>(null);
  const destroyedRef = useRef(false);

  const setActive = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const next = useCallback(() => {
    appRef.current?.next();
  }, []);

  const prev = useCallback(() => {
    appRef.current?.prev();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    let app: SelectedWorkApp | null = null;
    let initFailed = false;
    try {
      app = new SelectedWorkApp(canvas, setActive);
      appRef.current = app;
    } catch (err) {
      console.warn("SelectedWorkGallery: WebGL unavailable, falling back", err);
      initFailed = true;
      canvas.style.display = "none";
    }
    // Defer the state update so it is not synchronous in the effect body.
    queueMicrotask(() => {
      if (destroyedRef.current) return;
      if (initFailed) setWebglFailed(true);
      else setWebglReady(true);
    });

    return () => {
      destroyedRef.current = true;
      appRef.current = null;
      app?.destroy();
    };
  }, [setActive]);

  // Arrow key navigation scoped to the gallery
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper || !wrapper.contains(e.target as Node)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  const item = GALLERY[activeIndex];

  return (
    <section
      id="work"
      className={`portal-gallery-section ${className}`}
      aria-label="Selected work"
    >
      <div className="portal-gallery__head">
        <p className="portal-label">Selected work</p>
        <h2 className="portal-gallery__title">Selected work</h2>
        <QuietLink href="/work" className="portal-ql">
          All work
        </QuietLink>
      </div>

      <div className="portal-gallery__wrap" ref={wrapperRef}>
        <canvas
          ref={canvasRef}
          className={`portal-gallery__canvas ${webglReady ? "" : "portal-gallery__canvas--hidden"}`}
          aria-hidden="true"
        />

        {/* CSS scroll-snap fallback (shown when WebGL is unavailable / failed) */}
        <div
          className={`portal-gallery__fallback ${webglFailed || !webglReady ? "" : "portal-gallery__fallback--hidden"}`}
        >
          <div className="portal-gallery__track">
            {GALLERY.map((it) => (
              <div
                key={it.name}
                className={`portal-gallery__card ${activeIndex === GALLERY.indexOf(it) ? "portal-gallery__card--active" : ""}`}
              >
                <img
                  src={it.image.src}
                  alt={it.image.alt}
                  width={it.image.width}
                  height={it.image.height}
                  className="portal-gallery__card__image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="portal-gallery__card__body">
                  <div className="portal-gallery__card__status">
                    <span aria-hidden="true" className="portal-gallery__card__dot" />
                    {it.status}
                  </div>
                  <h3 className="portal-gallery__card__name">{it.name}</h3>
                  <p className="portal-gallery__card__summary">{it.summary}</p>
                  <p className="portal-gallery__card__evidence">{it.evidence}</p>
                  <a
                    href={it.linkHref}
                    target={it.external ? "_blank" : undefined}
                    rel={it.external ? "noopener noreferrer" : undefined}
                    className="portal-gallery__card__link"
                  >
                    {it.linkLabel}
                    {it.external && (
                      <span className="sr-only"> (opens in a new tab)</span>
                    )}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="portal-gallery__fallback__note">
            Item {activeIndex + 1} of {ITEM_COUNT}
          </p>
        </div>
      </div>

      {/* Active-item caption, synced to the gallery, aria-live="polite" */}
      <div className="portal-gallery__caption" aria-live="polite">
        <div className="portal-gallery__caption__inner">
          <div className="portal-gallery__caption__status">
            <span aria-hidden="true" className="portal-gallery__caption__dot" />
            {item.status}
          </div>
          <h3 className="portal-gallery__caption__name">{item.name}</h3>
          <p className="portal-gallery__caption__summary">{item.summary}</p>
          <p className="portal-gallery__caption__evidence">{item.evidence}</p>
          <a
            href={item.linkHref}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="portal-gallery__caption__link"
          >
            {item.linkLabel}
            {item.external && (
              <span className="sr-only"> (opens in a new tab)</span>
            )}
          </a>
        </div>
      </div>

      <div className="portal-gallery__nav">
        <button
          type="button"
          onClick={prev}
          className="portal-gallery__nav__button"
          aria-label="Previous project"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          <span className="portal-gallery__nav__label">Prev</span>
        </button>
        <button
          type="button"
          onClick={next}
          className="portal-gallery__nav__button"
          aria-label="Next project"
        >
          <span className="portal-gallery__nav__label">Next</span>
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
