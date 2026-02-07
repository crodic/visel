import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Link } from "@/i18n/navigation";

interface ArtworkCardProps {
  artwork: any;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <div className="artwork-card w-full md:max-w-48">
      <div className="group relative flex flex-col">
        <Link href={`/artworks/1`} className="relative block">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg">
            <Image
              src="/test.jpg"
              alt="Photo"
              fill
              className="rounded-lg object-cover object-top"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
          </AspectRatio>
        </Link>
      </div>
      <div className="hidden md:block">
        <Link href={`/artworks/1`}>
          <h3 className="line-clamp-1 truncate font-semibold">Yamashiro Ren</h3>
        </Link>
        <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm hover:underline">
          Crodic Crystal
        </span>
      </div>
    </div>
  );
}
