import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Admissions from './components/Admissions';
import Gallery from './components/Gallery';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        {activeSection === 'home' && <Hero setActiveSection={setActiveSection} />}
        {activeSection === 'about' && <About />}
        {activeSection === 'programs' && <Programs />}
        {activeSection === 'admissions' && <Admissions />}
        {activeSection === 'gallery' && <Gallery />}
        {activeSection === 'news' && <News />}
        {activeSection === 'contact' && <Contact />}
      </main>

      <Footer setActiveSection={setActiveSection} />
      <WhatsAppWidget />
    </div>
  );
}

export default App;
