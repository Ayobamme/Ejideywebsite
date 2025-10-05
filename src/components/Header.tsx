import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Programs' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'application', label: 'Application' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 gap-6">
          <div
            className="flex items-center space-x-3 cursor-pointer flex-shrink-0"
            onClick={() => handleNavClick('home')}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F58e4c97a77b94d38b03f508a44edfff8?format=webp&width=200"
              alt="Ejidey Schools logo"
              className="w-14 h-14 rounded-lg border border-emerald-200 object-contain bg-white p-1"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ejidey Schools</h1>
              <p className="text-xs text-emerald-600">Magodo</p>
            </div>
          </div>

          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-emerald-600'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="https://skoolbod.net/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-sm ml-auto"
          >
            Portal Login
          </a>

          <button
            className="md:hidden text-gray-700 ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
