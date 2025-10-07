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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                title: 'Based Crèche',
                subtitle: 'Ages 3 months - 3 years',
                description: 'Nurturing early learners with structured play, sensory exploration, and caring supervision in a homely environment.',
                color: 'from-rose-500 to-pink-500'
              },
              {
                title: 'Early Years Foundation (EYF)',
                subtitle: 'Montessori Approach',
                description: 'Child-led discovery that builds independence, creativity, and confidence through hands-on Montessori learning experiences.',
                color: 'from-emerald-500 to-emerald-600'
              },
              {
                title: 'Primary School',
                subtitle: 'Grades K-5',
                description: 'Building strong foundations in literacy, numeracy, and social skills through engaging, age-appropriate activities.',
                color: 'from-blue-500 to-blue-600'
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
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold mb-4">
                Based Crèche Experience
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Play, Learn, and Grow Together</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We provide a safe, stimulating, and loving environment where every child learns through play and structured activities. Our dedicated caregivers focus on early development milestones while embracing each child’s individuality.
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                  '✨ Standing Activities – helping babies strengthen muscles and balance.',
                  '✨ Sitting Activities – improving posture, focus, and coordination.',
                  '✨ Walking Activities – encouraging mobility and confidence.',
                  '✨ Potty Training – fostering hygiene and independence.',
                  '✨ Qur’an Listening – developing spiritual connection from an early age.',
                  '✨ Colour Identification & Creative Play – boosting recognition skills and creativity.',
                  '✨ And Lots More! – every activity tailored to support all-round growth.'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">{item.slice(0, 1)}</span>
                    <span>{item.slice(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Fc70c8deca1fa49d7b50db5d60c372525?format=webp&width=800',
                'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Ff8de39ce56534cc1b0d91f04ac9906bf?format=webp&width=800',
                'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Fd7f889c90e3b47d0a94703c08eb620fa?format=webp&width=800',
                'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F28218b43e263468fbf8e40aeb03fe176?format=webp&width=800'
              ].map((url, index) => (
                <div key={index} className="relative overflow-hidden rounded-2xl shadow-lg group">
                  <img src={url} alt="Based Crèche" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>

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
