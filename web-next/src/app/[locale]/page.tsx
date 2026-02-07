import ArtworkCard from "@/components/features/artwork-card";
import { PaginationWithLinks } from "@/components/features/pagination-with-links";
import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import Layout from "@/components/layouts/layout";

export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const page = (await searchParams).page || 1;

  return (
    <Layout>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center px-8 py-24 md:px-24">
        <section className="w-full pb-24">
          <h1 className="text-center text-4xl font-bold">
            Welcome to{" "}
            <span className="text-primary dancing-script-font text-5xl">
              Visel Art
            </span>
          </h1>
        </section>
        <section className="w-full space-y-4">
          <div>
            <h1 className="text-4xl font-bold">Latest Artworks</h1>
            <p className="text-muted-foreground mt-4">
              Check out the latest artworks
            </p>
          </div>
          <div className="mx-auto grid w-full grid-cols-2 gap-4 md:grid-cols-6">
            {Array.from({ length: 100 }).map((_, index) => (
              <ArtworkCard
                key={index}
                artwork={{ name: "Hello", slug: "/1" }}
              />
            ))}
          </div>
          <PaginationWithLinks
            page={Number(page)}
            pageSize={20}
            totalCount={100}
            navigationMode="router"
          />
        </section>
      </div>
      <Footer />
    </Layout>
  );
}
