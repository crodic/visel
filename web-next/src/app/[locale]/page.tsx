import LanguageSwitcher from "@/components/language-switcher";
import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import Layout from "@/components/layouts/layout";

export default function RootPage() {
  return (
    <Layout>
      <Header />
      <div className="flex min-h-screen items-center justify-center">
        <LanguageSwitcher />
      </div>
      <Footer />
    </Layout>
  );
}
