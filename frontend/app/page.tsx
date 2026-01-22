import { HeroSection } from "@/components/home/HeroSection";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
import { Slider3D } from "@/components/home/Slider3D";
import { ContactSection } from "@/components/home/ContactSection";
import { ServicesList } from "@/components/home/ServicesList";
import { FreelancerSelectionSection } from "@/components/home/FreelancerSelectionSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <HeroSection />
      <Slider3D />
      <ServicesList />
      <WhoWeAreSection />
      <FreelancerSelectionSection />
      <ContactSection />
    </div>
  );
}
