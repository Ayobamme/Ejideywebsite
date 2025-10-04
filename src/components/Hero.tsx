import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  return (
    <div className="pt-20">
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
                Award-Winning Institution
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Tomorrow's
                <span className="text-emerald-600"> Leaders</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
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
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/ejidey 1.jpg"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">20+</p>
                    <p className="text-sm text-gray-600">Years Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 rounded-xl text-white shadow-lg">
              <BookOpen className="w-12 h-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">1,200+</h3>
              <p className="text-emerald-100">Students Enrolled</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl text-white shadow-lg">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">85+</h3>
              <p className="text-blue-100">Expert Faculty Members</p>
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
