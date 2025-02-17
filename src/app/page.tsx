"use client";

import TypewriterText from "@/components/UI/TypewriterText";
import StatsForm from "@/components/Stats/StatsForm";
import ExtraInfo from "@/components/Stats/ExtraInfo";
import Setup from "@/components/Stats/Setup";
import CascadingText from "@/components/UI/CascadingText";
import ProfileCard from "@/components/UI/ProfileCard";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/utils/style";
import { getUserProfile } from "@/services/spotify";

export default function Home() {
  const [animationStep, setAnimationStep] = useState(0);
  const hasTriggeredTypewriter = useRef(false);
  const [isDancing, setIsDancing] = useState(false);
  const [profile, setProfile] = useState<{
    username: string;
    imageUrl: string;
  } | null>(null);
  // 0: Initial state
  // 1: Show music note
  // 2: Show typewriter
  // 3: Show stats form

  const handleCascadeComplete = useCallback(() => {
    setAnimationStep(1);
  }, []);

  const handleTypewriterComplete = useCallback(() => {
    setAnimationStep(3);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("spotifyToken");
    if (token) {
      getUserProfile(token)
        .then((data) => {
          setProfile({
            username: data.display_name,
            imageUrl: data.images[0]?.url || "/default-avatar.png", // You might want to add a default avatar image
          });
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
        });
    }
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6 relative">
        {profile && (
          <div className="absolute right-0 top-0">
            <ProfileCard
              username={profile.username}
              imageUrl={profile.imageUrl}
            />
          </div>
        )}

        <header className="space-y-2 text-center relative select-none">
          <div className="flex items-center justify-center gap-4">
            <CascadingText
              text="melody lane"
              className="text-4xl md:text-6xl bg-clip-text bg-gradient-to-r from-sand-600 to-sand-800"
              onComplete={handleCascadeComplete}
            />
            <span
              className={cn(
                "text-2xl md:text-4xl",
                animationStep >= 1
                  ? isDancing
                    ? "animate-dance"
                    : "animate-slideDown"
                  : "opacity-0 translate-y-[-100%]"
              )}
              style={{
                transitionProperty: "all",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "500ms",
              }}
              onAnimationEnd={(e) => {
                if (
                  e.animationName.includes("slideDown") &&
                  !hasTriggeredTypewriter.current
                ) {
                  hasTriggeredTypewriter.current = true;
                  setAnimationStep(2);
                  setTimeout(() => setIsDancing(true), 100);
                }
              }}
            >
              🎶
            </span>
          </div>
          <div className="h-[24px]">
            {animationStep >= 2 && (
              <TypewriterText
                text="a trip down musical memory lane"
                className={"text-sand-600"}
                onComplete={handleTypewriterComplete}
              />
            )}
          </div>
        </header>

        {animationStep >= 3 && (
          <div className={"space-y-6 duration-500 animate-fadeIn"}>
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-sand-800 flex items-center">
                Your Stats
                <ExtraInfo />
                <Setup />
              </h2>
            </div>
            <StatsForm />
          </div>
        )}
      </div>
    </main>
  );
}
