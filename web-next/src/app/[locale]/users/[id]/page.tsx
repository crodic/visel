import ArtworkCard from "@/components/features/artwork-card";
import { PaginationWithLinks } from "@/components/features/pagination-with-links";
import { FileImageIcon } from "lucide-react";

export default async function UserProfile({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const page = (await searchParams).page || 1;

  return (
    <section className="w-full space-y-8">
      <div className="flex items-center gap-2">
        <FileImageIcon />
        <h1 className="text-2xl font-bold">My Artworks</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-6">
        {Array.from({ length: 100 }).map((_, index) => (
          <ArtworkCard key={index} artwork={{}} />
        ))}
      </div>
      <PaginationWithLinks
        page={Number(page)}
        pageSize={20}
        totalCount={100}
        navigationMode="link"
      />
    </section>
  );
}
