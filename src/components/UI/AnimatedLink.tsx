"use client";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function AnimatedLink({ href, children }: AnimatedLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative font-semibold text-sand-700 hover:text-sand-800 transition-colors"
    >
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sand-700 origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
    </a>
  );
}
