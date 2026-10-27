/**
 * Shared GLSL ES 1.00 preamble for the site's raw-WebGL effects.
 *
 * Keep this dependency-free and side-effect-free: it is concatenated into a
 * fragment shader above the effect's own body. It provides:
 *   - hash21      — hashed white noise on a 2D coordinate
 *   - valueNoise  — smoothed, hashed value noise
 *   - fbm         — six-octave value-noise fbm (rotated between octaves)
 *   - domainWarp  — two-level domain warp (broad q field + detail r field)
 *
 * The halftone CTA backdrop is the first consumer; reuse it for future
 * shader work instead of copying noise helpers between components.
 */
export const GLSL_PREAMBLE = /* glsl */ `
  float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
      value += amplitude * valueNoise(p);
      p = mat2(0.80, 0.60, -0.60, 0.80) * p * 2.03 + 17.3;
      amplitude *= 0.5;
    }
    return value;
  }

  // Two rounds of warping: q pulls the field broadly, r adds the finer folds.
  vec2 domainWarp(vec2 p, float t) {
    vec2 q = vec2(
      fbm(p + vec2(0.0, t * 0.12)),
      fbm(p + vec2(5.2, 1.3) - vec2(t * 0.10, 0.0))
    );
    vec2 r = vec2(
      fbm(p + 2.4 * q + vec2(1.7, 9.2)),
      fbm(p + 2.4 * q + vec2(8.3, 2.8))
    );
    return p + 1.25 * (q - 0.5) + 0.55 * (r - 0.5);
  }
`;
