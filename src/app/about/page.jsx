"use client";

import ProfessionalGuidance from "../components/about/ProfessionalGuidance";
import OurMission from "../components/about/OurMission";
import OurServices from "../components/about/OurServices";
import ContactCTA from "../components/about/ContactCTA";
import TeamGrid from "../components/TeamGrid";
import AboutHero from "../components/about/AboutHero";
import Services from "../components/Services";
import CallToAction from "../components/CallToAction";
import AgentsSection from "../components/AgentsSection";

export default function AboutPage() {
  return (
    <div className="">
      <AboutHero />
      <OurMission />
      <AgentsSection/>
      <ProfessionalGuidance />
      <Services />
      {/* <OurServices /> */}
      <CallToAction />

      {/* <ContactCTA /> */}
    </div>
  );
}
