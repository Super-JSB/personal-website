import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Plans from "@/components/Plans";
import CSWork from "@/components/CSWork";
import BuildStack from "@/components/BuildStack";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Interests />
        <Plans />
        <CSWork />
        <BuildStack />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
}
