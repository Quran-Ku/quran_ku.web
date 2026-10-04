"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, X, SkipForward, SkipBack } from "lucide-react";
import { AVAILABLE_RECITERS, ReciterId } from "@/client/domain/quran/entity/reciter";
import { Container } from "../ui/Container";

export interface AudioPlayerBarProps {
  title: string;
  subtitle?: string;
  audioUrl?: string;
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  reciter?: ReciterId;
  onReciterChange?: (reciter: ReciterId) => void;
}

export function AudioPlayerBar({
  title,
  subtitle,
  audioUrl,
  onClose,
  onNext,
  onPrev,
  reciter = "alafasy",
  onReciterChange,
}: AudioPlayerBarProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
      setCurrentTime(target);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number): string => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!audioUrl) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 animate-slide-up">
      <Container size="default" className="px-0">
        <div className="bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md rounded-2xl border border-primary-1/20 dark:border-dark-border p-3.5 sm:p-4 shadow-glow flex flex-col gap-2">
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setIsPlaying(false);
              if (onNext) onNext();
            }}
            preload="auto"
          />

          <div className="flex items-center justify-between gap-4">
            {/* Title / Reciter Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white shrink-0 shadow-sm">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-900 dark:text-dark-textPrimary truncate">
                  {title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-dark-textMuted truncate">
                  {subtitle || "Audio Murattal"}
                </p>
              </div>
            </div>

            {/* Reciter Selector */}
            {onReciterChange && (
              <div className="hidden lg:flex items-center gap-2">
                <select
                  value={reciter}
                  onChange={(e) => onReciterChange(e.target.value as ReciterId)}
                  className="bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-xs font-medium px-3 py-1.5 text-gray-700 dark:text-dark-textPrimary focus:outline-none focus:ring-1 focus:ring-primary-1 cursor-pointer"
                  aria-label="Pilih Qari"
                >
                  {AVAILABLE_RECITERS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Main Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="p-2 text-gray-600 dark:text-dark-textMuted hover:text-primary-1 dark:hover:text-primary-3 transition-colors"
                  aria-label="Ayat sebelumnya"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-primary-1 text-white hover:bg-primary-2 flex items-center justify-center shadow-soft active:scale-95 transition-all"
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              {onNext && (
                <button
                  onClick={onNext}
                  className="p-2 text-gray-600 dark:text-dark-textMuted hover:text-primary-1 dark:hover:text-primary-3 transition-colors"
                  aria-label="Ayat selanjutnya"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={toggleMute}
                className="hidden sm:inline-flex p-2 text-gray-600 dark:text-dark-textMuted hover:text-gray-900 dark:hover:text-dark-textPrimary transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-dark-textPrimary transition-colors"
                  aria-label="Close player"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Slider */}
          <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-dark-textMuted px-1">
            <span className="w-9 text-right font-mono">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-gray-200 dark:bg-dark-card rounded-lg appearance-none cursor-pointer accent-primary-1"
              aria-label="Audio progress slider"
            />
            <span className="w-9 font-mono">{formatTime(duration)}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
