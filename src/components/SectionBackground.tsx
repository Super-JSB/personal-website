import Image from "next/image";

export default function SectionBackground({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image src={src} alt="" fill priority={priority} className="object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/20 via-[var(--background)]/35 to-[var(--background)]/85" />
    </div>
  );
}
