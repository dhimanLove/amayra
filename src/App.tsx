import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { PlatformSection } from './components/PlatformSection';
import { AboutSection } from './components/AboutSection';
import { TechStack } from './components/TechStack';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-canvas-white">
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <PlatformSection />
        <AboutSection />
        <TechStack />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
