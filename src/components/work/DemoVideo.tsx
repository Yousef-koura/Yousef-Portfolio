"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, X } from "lucide-react";
import type { ProjectVideo } from "@/content/projects";

type DemoVideoProps = {
  video: ProjectVideo;
  /** Project still — doubles as the video poster and the static resting state */
  poster: { src: string; alt: string; width: number; height: number };
  sizes: string;
  /** Accessible name for the controls, e.g. "Agri-Bot demo" */
  label: string;
  /**
   * Optional explicit frame ratio (e.g. "16 / 9") overriding the poster's
   * intrinsic dimensions so the frame never jumps between states.
   */
  aspect?: string;
  className?: string;
};

/**
 * Demo-capture player for WORK entries — click-to-play WITH audio
 * (supersedes the earlier hover-autoplay-muted behavior):
 *
 * - Static poster renders until explicit user action; nothing ever plays
 *   on load, hover, scroll, or viewport entry. Playback starts exclusively
 *   from the play button's click handler.
 * - Audio is never muted by the player — the captures carry real voiceover.
 * - While active: Play/Pause toggle plus an explicit close control that
 *   unmounts the video and returns to the poster; playback end does the same.
 * - Controls are real focusable buttons (Enter/Space work natively).
 * - Any load/playback failure reverts to the poster state.
 */
export function DemoVideo({ video, poster, sizes, label, aspect, className = "" }: DemoVideoProps) {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);

  // Mount-on-click only: this effect runs strictly as a result of the play
  // button's click handler below — never on render, hover, or visibility.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !active) return;
    el.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setActive(false);
      setPlaying(false);
      setFailed(true);
    });
  }, [active]);

  const startPlayback = useCallback(() => {
    if (failed) return;
    if (!active) {
      setActive(true);
      setPlaying(true);
      return;
    }
    void videoRef.current?.play();
  }, [active, failed]);

  const pausePlayback = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const togglePlayback = useCallback(() => {
    if (playing && active) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }, [active, playing, pausePlayback, startPlayback]);

  // Return the entry to its static poster state.
  const close = useCallback(() => {
    setActive(false);
    setPlaying(false);
    playButtonRef.current?.focus();
  }, []);

  return (
    <div
      className={`demovideo relative overflow-hidden bg-surface ${className}`}
      style={{ aspectRatio: aspect ?? `${poster.width} / ${poster.height}` }}
      data-demo-video={label}
      data-video-state={failed ? "failed" : active ? (playing ? "playing" : "paused") : "idle"}
    >
      {active ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          preload="auto"
          poster={poster.src}
          tabIndex={-1}
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setActive(false);
            setPlaying(false);
            setFailed(true);
          }}
          onEnded={() => {
            setActive(false);
            setPlaying(false);
          }}
        >
          {video.webm ? <source src={video.webm} type="video/webm" /> : null}
          <source src={video.mp4} type="video/mp4" />
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

      {/* Play/pause — the single primary control, visible in every state */}
      <button
        ref={playButtonRef}
        type="button"
        onClick={togglePlayback}
        disabled={failed}
        aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        className={`absolute bottom-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-obsidian/80 backdrop-blur-md transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:bottom-4 sm:right-4 sm:h-11 sm:w-11 ${
          playing ? "text-champagne" : "text-ink hover:border-champagne/60"
        }`}
      >
        {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
      </button>

      {/* Close — returns the frame to its static poster state */}
      {active ? (
        <button
          type="button"
          onClick={close}
          aria-label={`Close ${label}`}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-obsidian/80 backdrop-blur-md text-ink transition-colors duration-300 hover:border-champagne/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X size={14} aria-hidden="true" />
        </button>
      ) : null}

      {failed ? (
        <span className="sr-only" role="status">
          {`${label} could not be loaded.`}
        </span>
      ) : null}
    </div>
  );
}
