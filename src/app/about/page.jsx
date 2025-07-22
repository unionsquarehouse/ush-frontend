"use client";


import ProfessionalGuidance from "../components/about/ProfessionalGuidance";
import OurMission from "../components/about/OurMission";
import OurServices from "../components/about/OurServices";
import ContactCTA from "../components/about/ContactCTA";
import TeamGrid from "../components/TeamGrid";
import AboutHero from "../components/about/AboutHero";
import Services from "../components/Services";
import CallToAction from "../components/CallToAction";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutHero />
      <ProfessionalGuidance />
      <OurMission />
      <Services/>
      {/* <OurServices /> */}
            <CallToAction/>
      
      {/* <ContactCTA /> */}
    </div>
  );
}
