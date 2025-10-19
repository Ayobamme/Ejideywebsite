import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import heroImage1 from '../assets/hero1.jpeg';
import heroImage2 from '../assets/hero2.jpeg';
import heroImage3 from '../assets/hero3.jpeg';

const heroImages = [
  {
    src: heroImage1,
    alt: 'Ejidey Schools Magodo campus'
  },
  {
    src: heroImage2,
    alt: 'Students learning at Ejidey Schools'
  },
  {
    src: heroImage3,
    alt: 'Ejidey Schools facilities'
  }
];

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="pt-20">
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1500ms] ease-out ${
                currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center">
            <div className="space-y-8 max-w-3xl text-white">
              <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur">
                Award-Winning Institution
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Empowering Tomorrow's
                <span className="text-emerald-300"> Leaders</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                At Ejidey Schools Magodo, we nurture curious minds and build confident leaders through innovative education, dedicated faculty, and a supportive community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveSection('admissions')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveSection('about')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border-2 border-white/60 hover:bg-white/20 transition-colors backdrop-blur"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-4 bg-white/15 rounded-2xl p-4 backdrop-blur">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                  <Award className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold">20+ Years</p>
                  <p className="text-white/80 text-sm">of Academic Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSelectSlide(index)}
              aria-label={`View slide ${index + 1}`}
              className={`h-3 rounded-full transition-all ${
                currentSlide === index ? 'w-10 bg-white' : 'w-3 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 rounded-xl text-white shadow-lg">
              <BookOpen className="w-12 h-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">200+</h3>
              <p className="text-emerald-100">Students Enrolled</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl text-white shadow-lg">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">30+</h3>
              <p className="text-blue-100">Dedicated Teachers</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-xl text-white shadow-lg">
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">98%</h3>
              <p className="text-orange-100">University Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Ejidey Schools?</h2>
            <p className="text-xl text-gray-600">Discover what makes us the premier choice for education</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Academic Excellence',
                description: 'Rigorous curriculum designed to challenge and inspire every student',
                icon: '📚'
              },
              {
                title: 'Modern Facilities',
                description: 'State-of-the-art classrooms, labs, and sports facilities',
                icon: '🏫'
              },
              {
                title: 'Holistic Development',
                description: 'Focus on character building, sports, arts, and leadership',
                icon: '🌟'
              },
              {
                title: 'Safe Environment',
                description: 'Secure campus with dedicated care for student wellbeing',
                icon: '🛡️'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
