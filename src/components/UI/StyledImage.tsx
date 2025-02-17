"use client";

import Image from "next/image";

type StyledImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function StyledImage({
  src,
  alt,
  width,
  height,
}: StyledImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="rounded-lg transition-transform duration-300 hover:scale-[103%] cursor-pointer border-2 border-sand-700 select-none"
    />
  );
}
