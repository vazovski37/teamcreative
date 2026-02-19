import { HeroSection } from "@/components/home/HeroSection";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
import { Slider3D } from "@/components/home/Slider3D";
import { ServicesList } from "@/components/home/ServicesList";
import { FreelancerSelectionSection } from "@/components/home/FreelancerSelectionSection";
import { ContactContent } from "@/components/contact/ContactContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <HeroSection />
      <Slider3D />
      <ServicesList />
      <WhoWeAreSection />
      <FreelancerSelectionSection />
      <ContactContent />
    </div>
  );
}
