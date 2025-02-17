"use client";

import { useEffect, useRef } from "react";
import { SpotifyTrack } from "@/types/stats";
import Image from "next/image";

interface ParticleProps {
  imgSrc: string;
  link: string;
  name: string;
  track: SpotifyTrack;
  containerWidth: number;
  containerHeight: number;
}

export default function Particle({
  imgSrc,
  link,
  name,
  track,
  containerWidth,
  containerHeight,
}: ParticleProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({
    x: 0,
    y: 0,
    z: 0,
  });
  const velocityRef = useRef({
    x: (Math.random() - 0.5) * 0.5 || 0.3 * (Math.random() > 0.5 ? 1 : -1),
    y: (Math.random() - 0.5) * 0.5 || 0.3 * (Math.random() > 0.5 ? 1 : -1),
    z: (Math.random() - 0.5) * 0.5 || 0.3 * (Math.random() > 0.5 ? 1 : -1),
  });
  const accelerationRef = useRef({
    x: (Math.random() - 0.5) * 0.005 || 0.002 * (Math.random() > 0.5 ? 1 : -1),
    y: (Math.random() - 0.5) * 0.005 || 0.002 * (Math.random() > 0.5 ? 1 : -1),
    z: (Math.random() - 0.5) * 0.005 || 0.002 * (Math.random() > 0.5 ? 1 : -1),
  });

  const size = useRef(40 + Math.random() * 50);

  useEffect(() => {
    if (!elementRef.current) return;

    // Initialize position
    const radius = Math.min(containerWidth, containerHeight) / 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    positionRef.current = {
      x: containerWidth / 2 + radius * Math.sin(phi) * Math.cos(theta),
      y: containerHeight / 2 + radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta),
    };

    let animationFrameId: number;
    let lastTime = performance.now();

    const update = (currentTime: number) => {
      if (!elementRef.current) return;

      const deltaTime = (currentTime - lastTime) / 16;
      lastTime = currentTime;

      // Update velocity with deltaTime
      velocityRef.current.x += accelerationRef.current.x * deltaTime;
      velocityRef.current.y += accelerationRef.current.y * deltaTime;
      velocityRef.current.z += accelerationRef.current.z * deltaTime;

      // Update position with deltaTime
      positionRef.current.x += velocityRef.current.x * deltaTime;
      positionRef.current.y += velocityRef.current.y * deltaTime;
      positionRef.current.z += velocityRef.current.z * deltaTime;

      // Bounce off container walls
      if (positionRef.current.x < 0 || positionRef.current.x > containerWidth) {
        velocityRef.current.x *= -0.8;
      }
      if (
        positionRef.current.y < 0 ||
        positionRef.current.y > containerHeight
      ) {
        velocityRef.current.y *= -0.8;
      }
      if (positionRef.current.z < 0 || positionRef.current.z > containerWidth) {
        velocityRef.current.z *= -0.8;
      }

      // Use transform3d for better performance
      elementRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, ${positionRef.current.z}px)`;

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [containerWidth, containerHeight]);

  return (
    <div
      ref={elementRef}
      className="absolute cursor-pointer will-change-transform group"
      onClick={() => window.open(link, "_blank")}
    >
      <div className="absolute invisible group-hover:visible whitespace-pre bg-sand-50/95 backdrop-blur-sm px-4 py-2 rounded-lg -translate-y-full border border-sand-200 text-sand-700">
        <div>{name}</div>
        <div className="text-sm text-sand-600">
          {new Date(track.added_at.split("T")[0] + " ").toLocaleDateString()}
        </div>
      </div>
      <Image
        src={imgSrc}
        alt={name}
        width={90}
        height={90}
        className="rounded-lg object-cover"
        style={{
          width: `${size.current}px`,
          height: "auto",
        }}
      />
    </div>
  );
}
