"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl";
import { QuietLink } from "@/components/ui/QuietLink";
import {
  featuredProject,
  secondaryProjects,
  getProjectDetail,
} from "@/content/projects";

/* ---------------------------------------------------------------------------
   Gallery data — the five curated projects, in curated order. Every field
   traces to src/content/projects.ts; nothing is invented. A module-level
   constant is stable, and the component memoizes it for the effect.
--------------------------------------------------------------------------- */

type GalleryItem = {
  name: string;
  slug: string;
  status: "Live" | "Completed";
  summary: string;
  evidence: string;
  linkLabel: string;
  linkHref: string;
  external: boolean;
  image: { src: string; alt: string; width: number; height: number };
  /** Optional Home-only gallery cover. Only SelectedWorkGallery reads it;
      falls back to `image` when not set. The shared `image` field is never
      changed or repointed, so /work, /work/movenue, and every other consumer
      keep the real Movenue screenshot. */
  galleryImage?: { src: string; alt: string; width: number; height: number };
};

const cops = getProjectDetail("flyrank-content-opportunity-scoring");

const GALLERY: GalleryItem[] = [
  {
    name: featuredProject.name,
    slug: "movenue",
    status: featuredProject.status,
    summary: featuredProject.summary,
    evidence: featuredProject.evidence,
    linkLabel: "View project",
    linkHref: "/work/movenue",
    external: false,
    image: featuredProject.image,
    galleryImage: {
      src: "/projects/covers/movenue-cover-1400x1800.png",
      alt: "Movenue brand cover",
      width: 1400,
      height: 1800,
    },
  },
  {
    name: secondaryProjects[1].name, // Personal RAG Chatbot
    slug: "personal-rag-chatbot",
    status: secondaryProjects[1].status,
    summary: secondaryProjects[1].summary,
    evidence: secondaryProjects[1].evidence,
    linkLabel: "View project",
    linkHref: "/work/personal-rag-chatbot",
    external: false,
    image: secondaryProjects[1].image,
    galleryImage: {
      src: "/projects/covers/rag-chatbot-cover-1400x1800.png",
      alt: "Personal RAG Chatbot project cover",
      width: 1400,
      height: 1800,
    },
  },
  {
    name: secondaryProjects[0].name, // Agri-Bot
    slug: "agri-bot",
    status: secondaryProjects[0].status,
    summary: secondaryProjects[0].summary,
    evidence: secondaryProjects[0].evidence,
    linkLabel: "View project",
    linkHref: "/work/agri-bot",
    external: false,
    image: secondaryProjects[0].image,
    galleryImage: {
      src: "/projects/covers/agribot-cover-1400x1800.png",
      alt: "Agri-Bot project cover",
      width: 1400,
      height: 1800,
    },
  },
  {
    name: secondaryProjects[2].name, // FMCG Data Engineering Pipeline
    slug: "fmcg-pipeline",
    status: secondaryProjects[2].status,
    summary: secondaryProjects[2].summary,
    evidence: secondaryProjects[2].evidence,
    linkLabel: "View project",
    linkHref: "/work/fmcg-pipeline",
    external: false,
    image: secondaryProjects[2].image,
    galleryImage: {
      src: "/projects/covers/fmcg-pipeline-cover-1400x1800.png",
      alt: "FMCG Data Engineering Pipeline project cover",
      width: 1400,
      height: 1800,
    },
  },
  {
    name: cops?.name ?? "Content Opportunity Scoring",
    slug: "flyrank-content-opportunity-scoring",
    status: (cops?.status ?? "Completed") as "Live" | "Completed",
    summary: cops?.summary ?? "",
    evidence: cops?.stack.map((t) => t.label).join(" · ") ?? "",
    linkLabel: "View project",
    linkHref: "/work/flyrank-content-opportunity-scoring",
    external: false,
    image: cops?.image ?? {
      src: "/projects/flyrank-capstone-cover.jpg",
      alt: "Content Opportunity Scoring — decision-support ranking for content-refresh review",
      width: 1897,
      height: 842,
    },
    galleryImage: {
      src: "/projects/covers/content-opportunity-scoring-cover-1400x1800.png",
      alt: "Content Opportunity Scoring project cover",
      width: 1400,
      height: 1800,
    },
  },
];

/* Reference values (supplied OGL CircularGallery). */
const COPIES = 2;
const BEND = 3.5;
const BORDER_RADIUS = 0.08;
const SCROLL_SPEED = 2.5;
const SCROLL_EASE = 0.03;
const DRAG_FACTOR = SCROLL_SPEED * 0.025; // world units per dragged pixel
const WHEEL_FACTOR = 0.02;
const SNAP_DELAY = 180;
const MAX_DEVICE_PIXEL_RATIO = 2;

type FallbackReason =
  | "webgl-unavailable"
  | "init-failed"
  | "image-load-failed"
  | "context-lost";

type GL = Renderer["gl"];

/* ---------------------------------------------------------------------------
   Small helpers
--------------------------------------------------------------------------- */

function euclid(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

class GalleryInitError extends Error {
  readonly reason: FallbackReason;
  readonly originalError: unknown;

  constructor(reason: FallbackReason, originalError?: unknown) {
    super(`SelectedWorkGallery could not start (${reason})`);
    this.name = "GalleryInitError";
    this.reason = reason;
    this.originalError = originalError;
  }
}

class ImageLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageLoadError";
  }
}

function reportFallback(reason: FallbackReason, error: unknown): void {
  if (process.env.NODE_ENV === "production") return;
  console.warn(
    `[SelectedWorkGallery] CSS card fallback active — reason: ${reason}`,
    error,
  );
}

function resolveTitleColor(): string {
  if (typeof document === "undefined") return "inherit";
  const token = getComputedStyle(document.documentElement)
    .getPropertyValue("--tk-ink")
    .trim();
  if (token) return token;
  return getComputedStyle(document.body).color || "inherit";
}

function readDisplayFontFamily(): string {
  if (typeof document === "undefined") return "sans-serif";
  const title = document.querySelector<HTMLElement>(".portal-gallery__title");
  if (title) {
    const family = getComputedStyle(title).fontFamily;
    if (family) return family;
  }
  const probe = document.createElement("span");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.fontFamily = "var(--font-display)";
  document.body.appendChild(probe);
  const family = getComputedStyle(probe).fontFamily;
  probe.remove();
  return family || "sans-serif";
}

async function waitForFonts(): Promise<string> {
  if (typeof document === "undefined") return "sans-serif";
  try {
    await document.fonts.ready;
  } catch {
    // Build with the fallback font rather than failing the gallery.
  }
  const family = readDisplayFontFamily();
  const firstFamily = family.split(",")[0]?.replace(/["']/g, "").trim();
  if (firstFamily) {
    try {
      await document.fonts.load(`600 64px "${firstFamily}"`);
    } catch {
      // The display family may be a local/system fallback; keep going.
    }
  }
  return family;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    let settled = false;
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new ImageLoadError(`Timed out loading ${src}`));
    }, 15000);

    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(image);
    };
    const fail = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      reject(new ImageLoadError(`Failed to load ${src}`));
    };

    image.decoding = "async";
    image.onload = () => {
      if (image.decode) image.decode().then(finish, finish);
      else finish();
    };
    image.onerror = fail;

    if (image.complete && image.naturalWidth > 0) {
      finish();
      return;
    }
    image.src = src;
  });
}

async function loadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(srcs.map(loadImage));
}

/* ---------------------------------------------------------------------------
   Shaders — the supplied OGL CircularGallery vertex/fragment pair (wave +
   cover-fit + rounded-box SDF), plus its title texture shader.
--------------------------------------------------------------------------- */

const MEDIA_VERTEX = `
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpeed;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const MEDIA_FRAGMENT = `
  precision highp float;
  uniform vec2 uImageSizes;
  uniform vec2 uPlaneSizes;
  uniform sampler2D tMap;
  uniform float uBorderRadius;
  varying vec2 vUv;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b;
    return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
  }

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec4 color = texture2D(tMap, uv);

    float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);

    // Smooth antialiasing for edges
    float edgeSmooth = 0.002;
    float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

    gl_FragColor = vec4(color.rgb, alpha);
  }
`;

const TITLE_VERTEX = `
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

const TITLE_FRAGMENT = `
  precision highp float;
  uniform sampler2D tMap;
  varying vec2 vUv;
  void main() {
    vec4 color = texture2D(tMap, vUv);
    if (color.a < 0.1) discard;
    gl_FragColor = color;
  }
`;

/* ---------------------------------------------------------------------------
   Title texture — the project name painted below each capture in the live
   display face. Colour comes from --tk-ink; long names wrap to two lines so
   they stay inside the card width.
--------------------------------------------------------------------------- */

class Title {
  private readonly gl: GL;
  private readonly plane: Mesh;
  private readonly canvas = document.createElement("canvas");
  private readonly ctx: CanvasRenderingContext2D;
  private readonly text: string;
  private readonly family: string;
  private color: string;
  private lines: string[] = [];
  private texture!: Texture;
  private program!: Program;
  private mesh!: Mesh;

  constructor(
    gl: GL,
    geometry: Plane,
    plane: Mesh,
    text: string,
    color: string,
    family: string,
  ) {
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2D canvas context unavailable");
    this.ctx = context;
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.color = color;
    this.family = family;

    this.paint();
    this.texture = new Texture(gl, {
      image: this.canvas,
      generateMipmaps: false,
    });
    this.program = new Program(gl, {
      vertex: TITLE_VERTEX,
      fragment: TITLE_FRAGMENT,
      uniforms: { tMap: { value: this.texture } },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    this.mesh = new Mesh(gl, { geometry, program: this.program });
    this.mesh.setParent(plane);
    this.layout();
  }

  private paint(): void {
    const { ctx, canvas } = this;
    const fontSize = 64;
    const lineHeight = Math.round(fontSize * 1.12);
    const padX = 24;
    const padY = 18;

    ctx.font = `600 ${fontSize}px ${this.family}`;
    const words = this.text.trim().split(/\s+/);
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(candidate).width > 760) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
    if (!lines.length) lines.push(this.text);

    ctx.font = `600 ${fontSize}px ${this.family}`;
    const widths = lines.map((entry) => ctx.measureText(entry).width);
    canvas.width = Math.max(1, Math.ceil(Math.max(...widths) + padX * 2));
    canvas.height = Math.max(1, Math.ceil(lineHeight * lines.length + padY * 2));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `600 ${fontSize}px ${this.family}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.color;
    lines.forEach((entry, index) => {
      ctx.fillText(
        entry,
        canvas.width / 2,
        padY + lineHeight * (index + 0.5),
      );
    });

    this.lines = lines;
  }

  layout(): void {
    if (!this.mesh) return;
    /* The title is parented to the media plane (as in the reference), so
       OGL multiplies its local transform by the plane's scale. Divide the
       intended world-space size/offset back out; otherwise a 1.5-unit title
       becomes ~15 units tall and sits ~58 units below the card. */
    const parentWidth = this.plane.scale.x || 1;
    const parentHeight = this.plane.scale.y || 1;
    const aspect = this.canvas.width / Math.max(1, this.canvas.height);
    const maxWidth = parentWidth * 0.98;
    let height = parentHeight * 0.15;
    let width = height * aspect;
    if (width > maxWidth) {
      const fit = maxWidth / width;
      width = maxWidth;
      height *= fit;
    }
    this.mesh.scale.set(width / parentWidth, height / parentHeight, 1);
    const worldY = -parentHeight * 0.5 - height * 0.5 - 0.1;
    this.mesh.position.set(0, worldY / parentHeight, 0);
  }

  setColor(color: string): void {
    if (!color || color === this.color) return;
    this.color = color;
    this.paint();
    this.texture.needsUpdate = true;
  }

  destroy(): void {
    this.plane.removeChild(this.mesh);
    this.program.remove();
    if (this.texture.texture) this.gl.deleteTexture(this.texture.texture);
  }
}

/* ---------------------------------------------------------------------------
   One capture plane: shader, image texture, title texture, arc placement.
--------------------------------------------------------------------------- */

type MediaOptions = {
  gl: GL;
  geometry: Plane;
  titleGeometry: Plane;
  image: HTMLImageElement;
  index: number;
  length: number;
  scene: Transform;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  text: string;
  titleColor: string;
  titleFamily: string;
};

class Media {
  readonly plane: Mesh;
  width = 1;
  widthTotal = 1;

  private readonly gl: GL;
  private readonly index: number;
  private readonly length: number;
  private readonly scene: Transform;
  private readonly planeGeometry: Plane;
  private readonly titleGeometry: Plane;
  private readonly texture: Texture;
  private readonly program: Program;
  private readonly timeOffset = 100 * Math.random();
  private screen: { width: number; height: number };
  private viewport: { width: number; height: number };
  private title: Title | null = null;

  constructor(options: MediaOptions) {
    this.gl = options.gl;
    this.index = options.index;
    this.length = options.length;
    this.scene = options.scene;
    this.planeGeometry = options.geometry;
    this.titleGeometry = options.titleGeometry;
    this.screen = options.screen;
    this.viewport = options.viewport;

    this.texture = new Texture(options.gl, {
      image: options.image,
      generateMipmaps: true,
    });

    this.program = new Program(options.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: MEDIA_VERTEX,
      fragment: MEDIA_FRAGMENT,
      uniforms: {
        tMap: { value: this.texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: {
          value: [options.image.naturalWidth, options.image.naturalHeight],
        },
        uSpeed: { value: 0 },
        uTime: { value: this.timeOffset },
        uBorderRadius: { value: BORDER_RADIUS },
      },
      transparent: true,
    });

    this.plane = new Mesh(options.gl, {
      geometry: this.planeGeometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);

    this.onResize({ screen: this.screen, viewport: this.viewport });

    this.title = new Title(
      options.gl,
      this.titleGeometry,
      this.plane,
      options.text,
      options.titleColor,
      options.titleFamily,
    );
  }

  update(
    current: number,
    speed: number,
    reducedMotion: boolean,
    clock: number,
  ): void {
    const halfTotal = this.widthTotal / 2;
    const x =
      euclid(
        this.index * this.width - current + halfTotal,
        this.widthTotal,
      ) - halfTotal;
    this.plane.position.x = x;

    const halfViewport = this.viewport.width / 2;
    const bend: number = BEND;
    if (bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(bend);
      const radius =
        (halfViewport * halfViewport + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfViewport);
      const arc =
        radius - Math.sqrt(Math.max(0, radius * radius - effectiveX * effectiveX));
      if (bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z =
          -Math.sign(x) * Math.asin(effectiveX / radius);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z =
          Math.sign(x) * Math.asin(effectiveX / radius);
      }
    }

    this.program.uniforms.uSpeed.value = reducedMotion
      ? -0.2
      : clamp(speed, -1.5, 1.5);
    this.program.uniforms.uTime.value = reducedMotion
      ? this.timeOffset
      : this.timeOffset + clock;
  }

  onResize({
    screen,
    viewport,
  }: {
    screen: { width: number; height: number };
    viewport: { width: number; height: number };
  }): void {
    this.screen = screen;
    this.viewport = viewport;
    const scale = this.screen.height / 1500;
    this.plane.scale.y =
      (this.viewport.height * (900 * scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (700 * scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
    const padding = 2;
    this.width = this.plane.scale.x + padding;
    this.widthTotal = this.width * this.length;
    this.title?.layout();
  }

  setTitleColor(color: string): void {
    this.title?.setColor(color);
  }

  destroy(): void {
    this.title?.destroy();
    this.scene.removeChild(this.plane);
    this.program.remove();
    if (this.texture.texture) this.gl.deleteTexture(this.texture.texture);
  }
}

/* ---------------------------------------------------------------------------
   WebGL application — one instance per mount. Canvas is created imperatively
   inside the React-owned host so StrictMode cleanup can never remove a
   React-managed node.
--------------------------------------------------------------------------- */

type AppOptions = {
  host: HTMLElement;
  items: GalleryItem[];
  onActiveIndex: (index: number) => void;
  onReady: () => void;
  onFallback: (reason: FallbackReason, error: unknown) => void;
};

class SelectedWorkApp {
  private readonly host: HTMLElement;
  private readonly items: GalleryItem[];
  private readonly onActiveIndex: (index: number) => void;
  private readonly onReady: () => void;
  private readonly onFallback: (reason: FallbackReason, error: unknown) => void;

  private readonly canvas: HTMLCanvasElement;
  private readonly gl: GL;
  private readonly renderer: Renderer;
  private readonly camera: Camera;
  private readonly scene = new Transform();
  private readonly planeGeometry: Plane;
  private readonly titleGeometry: Plane;
  private readonly motionQuery: MediaQueryList;

  private readonly medias: Media[] = [];
  private readonly scroll = {
    ease: SCROLL_EASE,
    current: 0,
    target: 0,
  };

  private screen = { width: 0, height: 0 };
  private viewport = { width: 0, height: 0 };
  private itemCount = 0;
  private total = 0;
  private width = 0;
  private clock = 0;
  private activeIndex = -1;

  private raf = 0;
  private resizeRaf = 0;
  private snapTimer = 0;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  private visible = false;
  private paused = true;
  private ready = false;
  private destroyed = false;
  private failed = false;
  private reducedMotion = false;

  private dragging = false;
  private pointerDown = false;
  private pointerAxis: "x" | "y" | null = null;
  private pointerId: number | null = null;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartTarget = 0;

  constructor(options: AppOptions) {
    this.host = options.host;
    this.items = options.items;
    this.onActiveIndex = options.onActiveIndex;
    this.onReady = options.onReady;
    this.onFallback = options.onFallback;

    this.canvas = document.createElement("canvas");
    this.canvas.className = "portal-gallery__canvas";
    this.canvas.setAttribute("aria-hidden", "true");
    this.canvas.draggable = false;

    const attributes: WebGLContextAttributes = {
      alpha: true,
      depth: true,
      antialias: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    };

    let gl: GL | null = null;
    try {
      gl =
        (this.canvas.getContext("webgl2", attributes) as GL | null) ??
        (this.canvas.getContext("webgl", attributes) as GL | null);
    } catch (error) {
      throw new GalleryInitError("webgl-unavailable", error);
    }
    if (!gl) {
      throw new GalleryInitError(
        "webgl-unavailable",
        new Error("WebGL context could not be created"),
      );
    }
    this.gl = gl;

    try {
      this.renderer = new Renderer({
        canvas: this.canvas,
        dpr: Math.min(
          window.devicePixelRatio || 1,
          MAX_DEVICE_PIXEL_RATIO,
        ),
        alpha: true,
        depth: true,
        antialias: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      });
    } catch (error) {
      try {
        this.gl.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        // Context release is best-effort here.
      }
      throw new GalleryInitError("init-failed", error);
    }

    this.gl.clearColor(0, 0, 0, 0);

    this.camera = new Camera(this.gl, {
      fov: 45,
      near: 0.1,
      far: 100,
    });
    this.camera.position.z = 20;

    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
    this.titleGeometry = new Plane(this.gl);

    this.motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    this.reducedMotion = this.motionQuery.matches;

    this.resize();

    this.host.appendChild(this.canvas);
    this.canvas.addEventListener(
      "webglcontextlost",
      this.onContextLost,
      false,
    );

    this.attachInput();
    this.attachLifecycle();
  }

  async init(): Promise<void> {
    try {
      const [titleFamily, images] = await Promise.all([
        waitForFonts(),
        loadImages(
          this.items.map(
            (item) => item.galleryImage?.src ?? item.image.src,
          ),
        ),
      ]);
      if (this.destroyed) return;

      if (!this.resize()) {
        this.fail(
          "init-failed",
          new Error("Gallery container has no measurable size"),
        );
        return;
      }

      this.build(images, titleFamily);
      this.ready = true;
      this.clock = 0;
      this.updateMedias(0);
      this.renderFrame();
      this.canvas.classList.add("portal-gallery__canvas--ready");
      this.onReady();
      this.syncPause();
    } catch (error) {
      if (this.destroyed || this.failed) return;
      this.fail(
        error instanceof ImageLoadError
          ? "image-load-failed"
          : "init-failed",
        error,
      );
    }
  }

  private build(
    images: HTMLImageElement[],
    titleFamily: string,
  ): void {
    this.itemCount = this.items.length;
    this.total = this.itemCount * COPIES;
    const titleColor = resolveTitleColor();

    for (let index = 0; index < this.total; index += 1) {
      const item = this.items[index % this.itemCount];
      const image = images[index % this.itemCount];
      if (!item || !image) continue;
      const media = new Media({
        gl: this.gl,
        geometry: this.planeGeometry,
        titleGeometry: this.titleGeometry,
        image,
        index,
        length: this.total,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        text: item.name,
        titleColor,
        titleFamily,
      });
      this.medias.push(media);
    }

    this.width = this.medias[0]?.width ?? 0;
    if (this.width > 0) {
      this.scroll.current = this.itemCount * this.width;
      this.scroll.target = this.scroll.current;
    }
    this.emitActive();
  }

  private attachInput(): void {
    this.host.addEventListener("wheel", this.handleWheel, {
      passive: false,
    });
    this.host.addEventListener(
      "pointerdown",
      this.handlePointerDown,
    );
    this.host.addEventListener(
      "pointermove",
      this.handlePointerMove,
    );
    this.host.addEventListener("pointerup", this.handlePointerUp);
    this.host.addEventListener(
      "pointercancel",
      this.handlePointerCancel,
    );
    this.host.addEventListener(
      "lostpointercapture",
      this.handleLostPointerCapture,
    );
  }

  private attachLifecycle(): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.destroyed || this.resizeRaf) return;
      this.resizeRaf = window.requestAnimationFrame(() => {
        this.resizeRaf = 0;
        if (!this.destroyed) this.resize();
      });
    });
    this.resizeObserver.observe(this.host);

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.visible = entries.some(
          (entry) => entry.isIntersecting,
        );
        this.syncPause();
      },
      { threshold: 0.01 },
    );
    this.intersectionObserver.observe(this.host);

    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );
    this.motionQuery.addEventListener(
      "change",
      this.handleMotionChange,
    );

    this.mutationObserver = new MutationObserver(
      this.handleThemeChange,
    );
    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  private syncPause(): void {
    const nextPaused = !this.visible || document.hidden || this.destroyed;
    if (nextPaused) {
      this.paused = true;
      this.stopLoop();
      return;
    }
    this.paused = false;
    if (this.ready) this.startLoop();
  }

  private startLoop(): void {
    if (this.destroyed || this.paused || !this.ready) return;
    if (this.reducedMotion) {
      this.renderFrame();
      return;
    }
    if (this.raf) return;
    this.raf = window.requestAnimationFrame(this.loop);
  }

  private stopLoop(): void {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  private loop = (): void => {
    this.raf = 0;
    if (this.destroyed || this.paused || !this.ready) return;
    this.step();
    this.renderFrame();
    this.raf = window.requestAnimationFrame(this.loop);
  };

  private step(): void {
    const previous = this.scroll.current;
    if (!this.dragging) {
      const difference = this.scroll.target - this.scroll.current;
      if (Math.abs(difference) <= 0.0001) {
        this.scroll.current = this.scroll.target;
      } else {
        this.scroll.current += difference * this.scroll.ease;
      }
    }
    const speed = this.scroll.current - previous;
    if (!this.reducedMotion) this.clock += 0.04;
    this.updateMedias(speed);
  }

  private renderFrame(): void {
    if (this.destroyed) return;
    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });
  }

  private updateMedias(speed: number): void {
    for (const media of this.medias) {
      media.update(
        this.scroll.current,
        speed,
        this.reducedMotion,
        this.clock,
      );
    }
  }

  private emitActive(): void {
    if (!this.width || !this.itemCount || !this.total) return;
    const raw = Math.round(this.scroll.target / this.width);
    const wrapped = euclid(raw, this.total) % this.itemCount;
    if (wrapped === this.activeIndex) return;
    this.activeIndex = wrapped;
    this.onActiveIndex(wrapped);
  }

  private moveBy(direction: -1 | 1): void {
    if (!this.ready || !this.width) return;
    const base =
      Math.round(this.scroll.target / this.width) * this.width;
    this.scroll.target = base + direction * this.width;
    this.emitActive();
    if (this.reducedMotion) {
      this.syncToTarget();
    } else {
      this.startLoop();
    }
  }

  next(): void {
    this.moveBy(1);
  }

  prev(): void {
    this.moveBy(-1);
  }

  private syncToTarget(): void {
    this.scroll.current = this.scroll.target;
    this.updateMedias(0);
    this.renderFrame();
  }

  private snap(): void {
    if (this.destroyed || !this.width) return;
    this.scroll.target =
      Math.round(this.scroll.target / this.width) * this.width;
    this.emitActive();
    if (this.reducedMotion) this.syncToTarget();
    else this.startLoop();
  }

  private scheduleSnap(): void {
    if (this.snapTimer) window.clearTimeout(this.snapTimer);
    this.snapTimer = window.setTimeout(() => {
      this.snapTimer = 0;
      if (!this.destroyed) this.snap();
    }, SNAP_DELAY);
  }

  private resize(): boolean {
    if (this.destroyed) return false;
    const width = this.host.clientWidth;
    const height = this.host.clientHeight;
    if (!width || !height) return false;

    const changed =
      this.screen.width !== width || this.screen.height !== height;
    this.screen = { width, height };
    this.renderer.setSize(width, height);
    this.camera.perspective({ fov: 45, aspect: width / height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const viewportHeight =
      2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = {
      width: viewportHeight * this.camera.aspect,
      height: viewportHeight,
    };

    const previousWidth = this.width;
    for (const media of this.medias) {
      media.onResize({
        screen: this.screen,
        viewport: this.viewport,
      });
    }
    if (this.medias[0]) {
      this.width = this.medias[0].width;
      if (
        previousWidth > 0 &&
        this.width > 0 &&
        previousWidth !== this.width
      ) {
        const scale = this.width / previousWidth;
        this.scroll.current *= scale;
        this.scroll.target *= scale;
      }
    }

    if (this.ready && changed) {
      this.updateMedias(0);
      this.renderFrame();
    }
    return true;
  }

  private handleWheel = (event: WheelEvent): void => {
    if (this.destroyed || this.paused || !this.ready) return;
    const deltaMode =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? this.host.clientWidth
          : 1;
    const horizontal =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;
    if (!horizontal) return;

    if (event.cancelable) event.preventDefault();
    const amount = clamp(
      horizontal * deltaMode * WHEEL_FACTOR,
      -4,
      4,
    );
    if (!amount) return;
    this.scroll.target += amount;
    this.emitActive();
    if (this.reducedMotion) this.syncToTarget();
    else this.startLoop();
    this.scheduleSnap();
  };

  private handlePointerDown = (event: PointerEvent): void => {
    if (this.destroyed || this.paused || !this.ready) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    this.pointerDown = true;
    this.pointerAxis = null;
    this.dragging = false;
    this.pointerId = event.pointerId;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragStartTarget = this.scroll.target;
    try {
      this.host.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is an enhancement; drag still works without it.
    }
  };

  private handlePointerMove = (event: PointerEvent): void => {
    if (!this.pointerDown || this.destroyed) return;
    const dx = event.clientX - this.dragStartX;
    const dy = event.clientY - this.dragStartY;

    if (!this.pointerAxis) {
      if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      this.pointerAxis =
        Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (this.pointerAxis === "x") {
        this.dragging = true;
        this.host.classList.add("is-dragging");
      }
    }
    if (this.pointerAxis !== "x") return;

    const previous = this.scroll.current;
    const target =
      this.dragStartTarget + (this.dragStartX - event.clientX) * DRAG_FACTOR;
    this.scroll.target = target;
    this.scroll.current = target;
    this.emitActive();
    this.updateMedias(this.scroll.current - previous);
    this.renderFrame();
    this.startLoop();
  };

  private handlePointerUp = (): void => {
    this.endPointer();
  };

  private handlePointerCancel = (): void => {
    this.endPointer();
  };

  private handleLostPointerCapture = (): void => {
    if (!this.pointerDown) return;
    this.endPointer();
  };

  private endPointer(): void {
    if (!this.pointerDown) return;
    this.pointerDown = false;
    this.pointerAxis = null;
    this.host.classList.remove("is-dragging");
    const pointerId = this.pointerId;
    this.pointerId = null;
    if (
      pointerId !== null &&
      this.host.hasPointerCapture(pointerId)
    ) {
      try {
        this.host.releasePointerCapture(pointerId);
      } catch {
        // Capture may already be gone.
      }
    }
    if (this.dragging) {
      this.dragging = false;
      this.snap();
    }
  }

  private handleVisibilityChange = (): void => {
    this.syncPause();
  };

  private handleMotionChange = (): void => {
    this.reducedMotion = this.motionQuery.matches;
    if (this.reducedMotion) {
      this.scroll.current = this.scroll.target;
      this.stopLoop();
      this.updateMedias(0);
      this.renderFrame();
    } else {
      this.startLoop();
    }
  };

  private handleThemeChange = (): void => {
    if (this.destroyed) return;
    const color = resolveTitleColor();
    for (const media of this.medias) media.setTitleColor(color);
    if (this.reducedMotion) {
      this.renderFrame();
    } else if (!this.paused) {
      this.startLoop();
    }
  };

  private onContextLost = (event: Event): void => {
    event.preventDefault();
    this.fail("context-lost", new Error("WebGL context lost"));
  };

  private fail(reason: FallbackReason, error: unknown): void {
    if (this.destroyed || this.failed) return;
    this.failed = true;
    this.onFallback(reason, error);
    this.destroy();
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.stopLoop();
    if (this.resizeRaf) {
      window.cancelAnimationFrame(this.resizeRaf);
      this.resizeRaf = 0;
    }
    if (this.snapTimer) {
      window.clearTimeout(this.snapTimer);
      this.snapTimer = 0;
    }

    this.host.removeEventListener("wheel", this.handleWheel);
    this.host.removeEventListener(
      "pointerdown",
      this.handlePointerDown,
    );
    this.host.removeEventListener(
      "pointermove",
      this.handlePointerMove,
    );
    this.host.removeEventListener("pointerup", this.handlePointerUp);
    this.host.removeEventListener(
      "pointercancel",
      this.handlePointerCancel,
    );
    this.host.removeEventListener(
      "lostpointercapture",
      this.handleLostPointerCapture,
    );
    this.canvas.removeEventListener(
      "webglcontextlost",
      this.onContextLost,
    );

    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.mutationObserver?.disconnect();
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );
    this.motionQuery.removeEventListener(
      "change",
      this.handleMotionChange,
    );

    for (const media of this.medias) media.destroy();
    this.medias.length = 0;
    this.planeGeometry.remove();
    this.titleGeometry.remove();

    this.host.classList.remove("is-dragging");
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }

    try {
      this.gl.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      // Context release is best-effort on teardown.
    }
  }
}

/* ---------------------------------------------------------------------------
   React component
--------------------------------------------------------------------------- */

type SelectedWorkGalleryProps = {
  className?: string;
};

export function SelectedWorkGallery({
  className = "",
}: SelectedWorkGalleryProps) {
  const items = useMemo(() => GALLERY, []);
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<SelectedWorkApp | null>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const fallbackTrackRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<
    "loading" | "ready" | "fallback"
  >("loading");
  const [fallbackReason, setFallbackReason] =
    useState<FallbackReason | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let app: SelectedWorkApp | null = null;

    const handleFallback = (
      reason: FallbackReason,
      error: unknown,
    ) => {
      if (cancelled) return;
      reportFallback(reason, error);
      setFallbackReason(reason);
      setActiveIndex(0);
      setStatus("fallback");
      appRef.current = null;
    };

    try {
      app = new SelectedWorkApp({
        host,
        items,
        onActiveIndex: (index) => {
          if (!cancelled) setActiveIndex(index);
        },
        onReady: () => {
          if (!cancelled) setStatus("ready");
        },
        onFallback: handleFallback,
      });
      appRef.current = app;
      void app.init();
    } catch (error) {
      const reason =
        error instanceof GalleryInitError
          ? error.reason
          : "init-failed";
      queueMicrotask(() => {
        if (cancelled) return;
        reportFallback(reason, error);
        setFallbackReason(reason);
        setActiveIndex(0);
        setStatus("fallback");
      });
    }

    return () => {
      cancelled = true;
      appRef.current = null;
      app?.destroy();
    };
  }, [items]);

  const updateActiveFromFallback = useCallback(() => {
    const scroller = fallbackRef.current;
    const track = fallbackTrackRef.current;
    if (!scroller || !track) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const distance = Math.abs(
        element.offsetLeft + element.offsetWidth / 2 - center,
      );
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    setActiveIndex(best);
  }, []);

  const move = useCallback(
    (direction: -1 | 1) => {
      const app = appRef.current;
      if (app) {
        if (direction > 0) app.next();
        else app.prev();
        return;
      }
      const scroller = fallbackRef.current;
      const track = fallbackTrackRef.current;
      if (!scroller || !track) return;
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;
      const targetIndex = clamp(
        activeIndex + direction,
        0,
        cards.length - 1,
      );
      const card = cards[targetIndex];
      if (!card) return;
      scroller.scrollTo({
        left:
          card.offsetLeft -
          (scroller.clientWidth - card.offsetWidth) / 2,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      setActiveIndex(targetIndex);
    },
    [activeIndex, reducedMotion],
  );

  const next = useCallback(() => move(1), [move]);
  const prev = useCallback(() => move(-1), [move]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    },
    [move],
  );

  const item = items[activeIndex] ?? items[0];

  return (
    <section
      id="work"
      className={`portal-gallery-section ${className}`}
      aria-label="Selected work"
      aria-busy={status === "loading"}
      onKeyDown={handleKeyDown}
    >
      <div className="portal-gallery__head">
        <h2 className="portal-gallery__title">Selected work</h2>
        <QuietLink href="/work" className="portal-ql">
          All work
        </QuietLink>
      </div>

      <div
        className="portal-gallery__wrap"
        tabIndex={0}
        role="region"
        aria-label="Project gallery. Use the left and right arrow keys to browse."
      >
        <div
          ref={hostRef}
          className="portal-gallery__host"
          aria-hidden="true"
        />

        {status === "fallback" && (
          <div
            ref={fallbackRef}
            className="portal-gallery__fallback"
            data-fallback-reason={fallbackReason ?? undefined}
            onScroll={updateActiveFromFallback}
          >
            <div
              ref={fallbackTrackRef}
              className="portal-gallery__track"
            >
              {items.map((entry, index) => {
                const cover = entry.galleryImage;
                return (
                  <div
                    key={entry.name}
                    className={`portal-gallery__card ${
                      activeIndex === index
                        ? "portal-gallery__card--active"
                        : ""
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- fallback uses the same local captures at their real dimensions */}
                    <img
                      src={cover?.src ?? entry.image.src}
                      alt={cover?.alt ?? entry.image.alt}
                      width={cover?.width ?? entry.image.width}
                      height={cover?.height ?? entry.image.height}
                      className={`portal-gallery__card__image${
                        cover ? " portal-gallery__card__image--cover" : ""
                      }`}
                      loading="lazy"
                      decoding="async"
                    onError={(event) => {
                      event.currentTarget.classList.add(
                        "portal-gallery__card__image--missing",
                      );
                    }}
                  />
                  <div className="portal-gallery__card__body">
                    <div className="portal-gallery__card__status">
                      <span
                        aria-hidden="true"
                        className="portal-gallery__card__dot"
                      />
                      {entry.status}
                    </div>
                    <h3 className="portal-gallery__card__name">
                      {entry.name}
                    </h3>
                    <p className="portal-gallery__card__summary">
                      {entry.summary}
                    </p>
                    <p className="portal-gallery__card__evidence">
                      {entry.evidence}
                    </p>
                    <a
                      href={entry.linkHref}
                      target={entry.external ? "_blank" : undefined}
                      rel={
                        entry.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="portal-gallery__card__link"
                    >
                      {entry.linkLabel}
                      {entry.external && (
                        <span className="sr-only">
                          {" "}
                          (opens in a new tab)
                        </span>
                      )}
                    </a>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Active-item caption, synced to the gallery, aria-live="polite".
          Minimal centered description: status dot + status, project name,
          summary, evidence/tech line, single "View project" link to the
          /work/[slug] detail page. */}
      <div
        className="portal-gallery__caption"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="portal-gallery__caption__inner">
          <div className="portal-gallery__caption__status">
            <span
              aria-hidden="true"
              className="portal-gallery__caption__dot"
            />
            {item.status}
          </div>
          <h3 className="portal-gallery__caption__name">
            {item.name}
          </h3>
          <p className="portal-gallery__caption__summary">
            {item.summary}
          </p>
          <p className="portal-gallery__caption__evidence">
            {item.evidence}
          </p>
          <a href={item.linkHref} className="portal-gallery__caption__link">
            {item.linkLabel}
          </a>
        </div>
      </div>

      {/* Controls sit directly beneath the caption. The 01 / 05 counter is
          placed between the two buttons so it cannot collide with the
          status label above. Wrap-around at both edges is intentional. */}
      <div className="portal-gallery__nav">
        <button
          type="button"
          onClick={prev}
          className="portal-gallery__nav__button"
          aria-label="Previous project"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span className="portal-gallery__nav__label">Prev</span>
        </button>
        <span className="portal-gallery__nav__count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={next}
          className="portal-gallery__nav__button"
          aria-label="Next project"
        >
          <span className="portal-gallery__nav__label">Next</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
