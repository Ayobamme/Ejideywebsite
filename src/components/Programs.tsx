import { BookOpen, Beaker, Music, Trophy, Globe, Calculator, Palette, Microscope } from 'lucide-react';

export default function Programs() {
  return (
    <div className="pt-20 bg-white">
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Academic Programs</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive curriculum designed to inspire learning and foster excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: 'Primary School',
                subtitle: 'Grades K-5',
                description: 'Building strong foundations in literacy, numeracy, and social skills through engaging, age-appropriate activities.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Middle School',
                subtitle: 'Grades 6-8',
                description: 'Developing critical thinking and independence while exploring diverse subjects and discovering personal interests.',
                color: 'from-emerald-500 to-emerald-600'
              },
              {
                title: 'High School',
                subtitle: 'Grades 9-12',
                description: 'Advanced coursework and specialized programs preparing students for university and future careers.',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((program, index) => (
              <div key={index} className={`bg-gradient-to-br ${program.color} p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow`}>
                <h3 className="text-3xl font-bold mb-2">{program.title}</h3>
                <p className="text-lg opacity-90 mb-4 font-semibold">{program.subtitle}</p>
                <p className="text-white/90 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Subjects</h2>
            <p className="text-xl text-gray-600">Comprehensive academic foundation for every student</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BookOpen className="w-10 h-10" />, title: 'Language Arts', color: 'bg-blue-100 text-blue-600' },
              { icon: <Calculator className="w-10 h-10" />, title: 'Mathematics', color: 'bg-emerald-100 text-emerald-600' },
              { icon: <Beaker className="w-10 h-10" />, title: 'Sciences', color: 'bg-purple-100 text-purple-600' },
              { icon: <Globe className="w-10 h-10" />, title: 'Social Studies', color: 'bg-orange-100 text-orange-600' },
              { icon: <Music className="w-10 h-10" />, title: 'Fine Arts', color: 'bg-pink-100 text-pink-600' },
              { icon: <Trophy className="w-10 h-10" />, title: 'Physical Education', color: 'bg-yellow-100 text-yellow-600' },
              { icon: <Microscope className="w-10 h-10" />, title: 'Computer Science', color: 'bg-cyan-100 text-cyan-600' },
              { icon: <Palette className="w-10 h-10" />, title: 'Creative Arts', color: 'bg-rose-100 text-rose-600' }
            ].map((subject, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`${subject.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                  {subject.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{subject.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Programs</h2>
            <p className="text-xl text-gray-600">Advanced opportunities for exceptional students</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Advanced Placement (AP) Program',
                description: 'College-level courses in various subjects allowing students to earn university credits while in high school.',
                features: ['15+ AP courses available', 'Experienced AP instructors', 'High success rates in AP exams']
              },
              {
                title: 'STEM Excellence Program',
                description: 'Specialized track focusing on Science, Technology, Engineering, and Mathematics with hands-on projects.',
                features: ['Robotics and coding labs', 'Science fair participation', 'Industry partnerships']
              },
              {
                title: 'Arts & Culture Program',
                description: 'Comprehensive arts education including visual arts, music, drama, and dance for creative expression.',
                features: ['Professional instructors', 'Regular performances', 'Art exhibitions']
              },
              {
                title: 'Language Immersion',
                description: 'Multilingual education with proficiency tracks in Spanish, French, and Mandarin Chinese.',
                features: ['Native speakers', 'Cultural exchange programs', 'Language certifications']
              }
            ].map((program, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Extracurricular Activities</h2>
            <p className="text-xl text-gray-600">Beyond the classroom - developing well-rounded individuals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Sports & Athletics',
                activities: ['Basketball', 'Soccer', 'Track & Field', 'Swimming', 'Volleyball', 'Tennis']
              },
              {
                category: 'Clubs & Organizations',
                activities: ['Student Government', 'Debate Team', 'Science Club', 'Drama Society', 'Environmental Club', 'Chess Club']
              },
              {
                category: 'Arts & Performance',
                activities: ['School Band', 'Choir', 'Theater Productions', 'Art Club', 'Dance Team', 'Photography Club']
              }
            ].map((group, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{group.category}</h3>
                <ul className="space-y-3">
                  {group.activities.map((activity, aIndex) => (
                    <li key={aIndex} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
