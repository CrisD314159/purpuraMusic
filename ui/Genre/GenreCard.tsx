// si usas clsx o una función cn
import { Genre } from "@/lib/definitions/definitions";
import Link from "next/link";

interface GenreCardProps {
  genre: Genre;
}

export default function GenreCard({ genre }: GenreCardProps) {
  return (
    <Link href={`/dashboard/genres/${genre.id}`}>
      <button
        className="relative group rounded-2xl overflow-hidden p-4 min-w-[140px] h-[120px] flex items-end shadow-md transition-transform duration-200 hover:scale-[1.05]"
        style={{
          background: `linear-gradient(135deg, ${genre.color} 0%, ${genre.color}99 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-[radial-gradient(circle_at_20%_20%,white_1%,transparent_60%)]" />
        
        <p className="z-10 font-semibold text-lg drop-shadow">{genre.name}</p>
      </button>
    </Link>
  );
}