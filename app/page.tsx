import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSobek from "@/components/AboutSobek";
import WhyChooseSobek from "@/components/WhyChooseSobek";
import AboutRightLine from "@/components/AboutRightLine";
import OurServices from "@/components/OurServices";
import FindYourCargo from "@/components/FindYourCargo";
import ShipSchedule from "@/components/ShipSchedule";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutSobek />
      <WhyChooseSobek />
      <AboutRightLine />
      <OurServices />
      <FindYourCargo />
      <ShipSchedule />
      <IndustriesWeServe />
      <GetInTouch />
    </main>
  );
}

