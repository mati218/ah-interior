import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  bio?: string | null;
  photo?: string | null;
}

export function TeamCard({ name, role, bio, photo }: TeamCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
        {photo && (
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          />
        )}
      </div>
      <p className="mt-5 font-display text-xl text-charcoal">{name}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-gold">{role}</p>
      {bio && <p className="mt-3 text-sm leading-relaxed text-taupe">{bio}</p>}
    </div>
  );
}
