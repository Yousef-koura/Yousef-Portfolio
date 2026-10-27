/* ogl ^0.0.116 has no bundled TypeScript declarations (ESM, `./src/index.mjs`).
   This file declares only the surface the gallery uses. `any` is used for
   ogl internals that have no type surface; it is scoped to this file. */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "ogl" {
  export class Renderer {
    constructor(params?: {
      canvas?: HTMLCanvasElement;
      width?: number;
      height?: number;
      dpr?: number;
      alpha?: boolean;
      depth?: boolean;
      stencil?: boolean;
      antialias?: boolean;
      premultipliedAlpha?: boolean;
      preserveDrawingBuffer?: boolean;
      powerPreference?: string;
      autoClear?: boolean;
      webgl?: number;
    });
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    width: number;
    height: number;
    dpr: number;
    isWebgl2: boolean;
    state: { currentProgram: number; [key: string]: any };
    setSize(width: number, height: number): void;
    setViewport(width: number, height: number, x?: number, y?: number): void;
    render(params: {
      scene: any;
      camera: any;
      target?: any;
      update?: boolean;
      sort?: boolean;
      frustumCull?: boolean;
      clear?: boolean;
    }): void;
  }

  export class Camera {
    constructor(gl: any, params?: {
      near?: number;
      far?: number;
      fov?: number;
      aspect?: number;
      left?: number;
      right?: number;
      bottom?: number;
      top?: number;
      zoom?: number;
    });
    projectionMatrix: any;
    viewMatrix: any;
    projectionViewMatrix: any;
    worldPosition: any;
    position: any;
    scale: any;
    rotation: any;
    near: number;
    far: number;
    fov: number;
    aspect: number;
    perspective(params?: {
      near?: number;
      far?: number;
      fov?: number;
      aspect?: number;
    }): void;
    orthographic(params?: {
      near?: number;
      far?: number;
      left?: number;
      right?: number;
      bottom?: number;
      top?: number;
      zoom?: number;
    }): void;
    updateMatrixWorld(): void;
  }

  export class Transform {
    parent: Transform | null;
    children: Transform[];
    visible: boolean;
    matrixAutoUpdate: boolean;
    position: any;
    quaternion: any;
    scale: any;
    rotation: any;
    up: any;
    matrix: any;
    worldMatrix: any;
    worldMatrixNeedsUpdate: boolean;
    setParent(parent: Transform, notifyParent?: boolean): void;
    addChild(child: Transform, notifyChild?: boolean): void;
    removeChild(child: Transform, notifyChild?: boolean): void;
    updateMatrixWorld(force?: boolean): void;
    updateMatrix(): void;
    traverse(callback: (node: this) => void | boolean): void;
    lookAt(target: any, invert?: boolean): void;
  }

  export class Mesh extends Transform {
    constructor(
      gl: any,
      params?: {
        geometry?: any;
        program?: any;
        mode?: number;
        frustumCulled?: boolean;
        renderOrder?: number;
      },
    );
    gl: any;
    geometry: any;
    program: any;
    mode: number;
    frustumCulled: boolean;
    renderOrder: number;
    modelViewMatrix: any;
    normalMatrix: any;
    beforeRenderCallbacks: Array<(info: { mesh: this; camera: any }) => void>;
    afterRenderCallbacks: Array<(info: { mesh: this; camera: any }) => void>;
    onBeforeRender(f: (info: { mesh: this; camera: any }) => void): this;
    onAfterRender(f: (info: { mesh: this; camera: any }) => void): this;
    draw(params?: { camera: any }): void;
  }

  export class Geometry {
    constructor(gl: any, attributes?: any);
    gl: any;
    attributes: any;
    VAOs: { [key: string]: any };
    drawRange: { start: number; count: number };
    instancedCount: number;
    isInstanced: boolean;
    draw(params: { program: any; mode?: number }): void;
    setIndex(attr: any): void;
    setDrawRange(start: number, count: number): void;
    setInstancedCount(value: number): void;
    remove(): void;
  }

  export class Program {
    constructor(gl: any, params?: {
      vertex?: string;
      fragment?: string;
      uniforms?: any;
      transparent?: boolean;
      cullFace?: number | null;
      frontFace?: number;
      depthTest?: boolean;
      depthWrite?: boolean;
      depthFunc?: number;
    });
    gl: any;
    uniforms: any;
    transparent: boolean;
    cullFace: number | null;
    depthTest: boolean;
    depthWrite: boolean;
    use(params?: { flipFaces?: boolean }): void;
    remove(): void;
  }

  export class Texture {
    constructor(gl: any, params?: {
      image?: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | null;
      target?: number;
      type?: number;
      format?: number;
      internalFormat?: number;
      wrapS?: number;
      wrapT?: number;
      generateMipmaps?: boolean;
      minFilter?: number;
      magFilter?: number;
      premultiplyAlpha?: boolean;
      unpackAlignment?: number;
      flipY?: boolean;
      anisotropy?: number;
      level?: number;
      width?: number;
      height?: number;
    });
    gl: any;
    image: any;
    target: number;
    width: number;
    height: number;
    needsUpdate: boolean;
    texture: WebGLTexture | null;
    update(textureUnit?: number): void;
    onUpdate: (() => void) | null;
  }

  export class Plane extends Geometry {
    constructor(gl: any, params?: {
      width?: number;
      height?: number;
      widthSegments?: number;
      heightSegments?: number;
      attributes?: any;
    });
  }

  export class Vec3 extends Array<number> {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y?: number, z?: number): this;
    copy(v: Vec3): this;
    add(va: Vec3, vb?: Vec3): this;
    sub(va: Vec3, vb?: Vec3): this;
    scale(v: number): this;
    lerp(v: Vec3, t: number): this;
    clone(): Vec3;
  }

  export class Mat4 {
    constructor();
    identity(): this;
    copy(m: Mat4): this;
    multiply(a: Mat4, b: Mat4): this;
    inverse(m: Mat4): this;
    fromPerspective(params: { fov: number; aspect: number; near: number; far: number }): this;
    fromOrthogonal(params: { left: number; right: number; bottom: number; top: number; near: number; far: number }): this;
    getTranslation(v: Vec3): Vec3;
    getMaxScaleOnAxis(): number;
    determinant(): number;
    lookAt(eye: any, target: any, up: any): this;
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
  }

  export class Quat {
    constructor(x?: number, y?: number, z?: number, w?: number);
    fromEuler(euler: Euler): this;
  }

  export class Color {
    constructor(r?: number, g?: number, b?: number);
    r: number;
    g: number;
    b: number;
    setHex(hex: number): this;
    setScalar(scalar: number): this;
    toArray(a?: number[]): number[];
  }
}
