import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Hero from './components/Hero';
import CommunitiesSection from './components/CommunitiesSection';
import DevelopersSection from './components/DevelopersSection';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CommunitiesSection/>
      <Projects />
      <Services />
      <DevelopersSection/>
      <Contact />
    </>
  );
}
