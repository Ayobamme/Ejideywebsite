import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

export default function Footer({ setActiveSection }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F58e4c97a77b94d38b03f508a44edfff8?format=webp&width=200"
                alt="Ejidey Schools logo"
                className="w-12 h-12 rounded-lg border border-emerald-500 object-contain bg-white p-1"
              />
              <div>
                <h3 className="text-xl font-bold">Ejidey Schools</h3>
                <p className="text-sm text-gray-400">Magodo</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering tomorrow's leaders through innovative education, dedicated faculty, and a supportive community in Lagos, Nigeria.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/p/Ejidey-Schools-Magodo-100066852692782/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@ejideyschoolmagodo" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/ejideyschoolsmagodo/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['home', 'about', 'programs', 'admissions', 'gallery', 'news', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className="text-gray-400 hover:text-emerald-400 transition-colors capitalize"
                  >
                    {section === 'home' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Academic</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Primary School</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Middle School</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">High School</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">AP Programs</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">STEM Excellence</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Arts & Culture</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Sports Programs</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  6, Dipo Awolesi Street<br />
                  Magodo, Lagos State, Nigeria
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-400">+234 805 984 2973</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-400">info@ejideyschools.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Ejidey Schools Magodo. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
