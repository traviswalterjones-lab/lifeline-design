import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import AuthorIntro from "@/components/AuthorIntro";
import Praise from "@/components/Praise";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="page">
      <Nav />
      <main>
        <Hero />
        <Story />
        <AuthorIntro />
        <Praise />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
