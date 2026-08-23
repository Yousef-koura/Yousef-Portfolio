"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { ProjectVideo } from "@/content/projects";

type HoverVideoProps = {
  video: ProjectVideo;
  /** Project still — doubles as the video poster and the static fallback */
  poster: { src: string; alt: string; width: number; height: number };
  sizes: string;
  /** Accessible name for the play control, e.g. "Movenue demo" */
  label: string;
  /**
   * Optional explicit frame ratio (e.g. "16 / 9") overriding the poster's
   * intrinsic dimensions — used when a landscape demo clip sits behind a
   * differently-shaped poster so the frame never jumps between states.
   */
  aspect?: string;
  className?: string;
};

/**
 * Demo-capture video layer for WORK entries. The <video> element only mounts
 * on interaction intent — never eagerly preloaded across the page:
 *
 * - Desktop fine pointer: plays on hover-in, stops on hover-out.
 * - Touch: tap the visible play affordance (no autoplay, respects data).
 * - Keyboard: the affordance is a real focusable button (Enter/Space).
 * - prefers-reduced-motion: hover never autoplays; explicit control only.
 * - Any load/playback failure reverts to the poster still, which is also what
 *   renders before any interaction — the entry is fully understandable with
 *   zero video interaction.
 */
export function HoverVideo({ video, poster, sizes, label, aspect, className = "" }: HoverVideoProps) {
  const [active, setActive] = useState(false);
  const [manual, setManual] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseMq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => {
      setReduceMotion(reduceMq.matches);
      setCoarsePointer(coarseMq.matches);
    };
    sync();
    reduceMq.addEventListener("change", sync);
    coarseMq.addEventListener("change", sync);
    return () => {
      reduceMq.removeEventListener("change", sync);
      coarseMq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !active) return;
    el.play().catch((error: unknown) => {
      // A rejected play() is expected when intent ends mid-autoplay-request;
      // only genuine load/decode problems fall back to the poster.
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFailed(true);
    });
  }, [active]);

  const beginIntent = useCallback(() => {
    if (reduceMotion || coarsePointer || failed) return;
    setActive(true);
  }, [reduceMotion, coarsePointer, failed]);

  const endIntent = useCallback(() => {
    if (manual) return;
    setActive(false);
  }, [manual]);

  const toggle = useCallback(() => {
    if (failed) return;
    if (manual) {
      setManual(false);
      setActive(false);
      return;
    }
    setManual(true);
    setActive(true);
  }, [manual, failed]);

  const playing = active && !failed;

  return (
    <div
      className={`hovervideo group/hv relative cursor-pointer overflow-hidden border border-line bg-surface ${className}`}
      style={{ aspectRatio: aspect ?? `${poster.width} / ${poster.height}` }}
      onMouseEnter={beginIntent}
      onMouseLeave={endIntent}
      onClick={toggle}
      data-demo-video={label}
      data-video-state={failed ? "failed" : playing ? "playing" : "idle"}
    >
      {playing ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster={poster.src}
          tabIndex={-1}
          aria-hidden="true"
        >
          {video.webm ? <source src={video.webm} type="video/webm" /> : null}
          <source src={video.mp4} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      ) : (
        <Image
          src={poster.src}
          alt={poster.alt}
          width={poster.width}
          height={poster.height}
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Play affordance — always visible on touch and reduced-motion; on fine
          pointers it appears on hover/focus via the .hovervideo rules in
          globals.css. Real button either way: keyboard and SR equivalent. */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          toggle();
        }}
        disabled={failed}
        aria-pressed={playing}
        aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        className={`hovervideo__control absolute bottom-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-obsidian/70 backdrop-blur-md transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
          playing ? "text-champagne" : "text-ink hover:border-champagne/60"
        }`}
      >
        {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
      </button>
    </div>
  );
}
