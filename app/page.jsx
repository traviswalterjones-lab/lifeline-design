import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import LivesLost from "@/components/LivesLost";
import VideoWall from "@/components/VideoWall";
import AuthorIntro from "@/components/AuthorIntro";
import Praise from "@/components/Praise";
import Events from "@/components/Events";
import Reviews from "@/components/Reviews";
import Media from "@/components/Media";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="page">
      <Nav />
      <main>
        <Hero />
        <Events />
        <Reviews />
        <LivesLost />
        <VideoWall />
        <Story />
        <AuthorIntro />
        <Praise />
        <Media />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
