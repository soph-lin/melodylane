"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessTokenFromURL } from "@/utils/spotify-auth";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessTokenFromURL();
    if (token) {
      localStorage.setItem("melodylane-spotify-token", token);
      router.push("/");
    }
  }, [router]);

  return <div>Authenticating...</div>;
}
