"use client";

import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Hero from './components/Hero';
import CommunitiesSection from './components/CommunitiesSection';
import DevelopersSection from './components/DevelopersSection';
import DubaiMap from './components/DubaiInteractiveMap';
import Amenities from './components/Amenities';
import CallToAction from './components/CallToAction';
import DiscoverProperty from './components/DiscoverProperty';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <CommunitiesSection />
      <Services />
      {/* <Amenities/> */}
      <DevelopersSection />
      <DiscoverProperty/>
      <DubaiMap/>
      {/* <Contact /> */}
    </>
  );
}

