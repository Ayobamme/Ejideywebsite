import { BookOpen, Beaker, Music, Trophy, Globe, Calculator, Palette, Microscope } from 'lucide-react';

const eyfImages = [
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Fd9dce6734c0847bf82efd8e31f03fe0d?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F6923c5663f82499aa66a9fe38a159816?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F54d8b78d223943b392ce697d6e922068?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F50e0200d838b4063b4daf97b3ee5505d?format=webp&width=800'
];

const nurseryImages = [
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F0ffd7b12a88a489993fc53394fdf26eb?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F8bb6cec890b347a981064329c77ced3f?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Ffd1165ea0e69465c8db172db8c95af96?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F9e22348f41e74c17ba5e7db3827c188c?format=webp&width=800'
];

const primaryImages = [
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Fe342084ff10d4892aa3fb28776971bd0?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F25aa5d9b69d44937aebc6971a8fea345?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F9067e61d32504b7196b66a51dc9b087f?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Fda142d003da044748c5d5ca892062186?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Fe20fc5c1001944808a53828c1ae234a0?format=webp&width=800',
  'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F87a855bd8e94446a919c43279bddbf1f?format=webp&width=800'
];

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
                  {
                    icon: '✨',
                    text: 'Standing Activities – helping babies strengthen muscles and balance.'
                  },
                  {
                    icon: '✨',
                    text: 'Sitting Activities – improving posture, focus, and coordination.'
                  },
                  {
                    icon: '✨',
                    text: 'Walking Activities – encouraging mobility and confidence.'
                  },
                  {
                    icon: '✨',
                    text: 'Potty Training – fostering hygiene and independence.'
                  },
                  {
                    icon: '✨',
                    text: 'Qur’an Listening – developing spiritual connection from an early age.'
                  },
                  {
                    icon: '✨',
                    text: 'Colour Identification & Creative Play – boosting recognition skills and creativity.'
                  },
                  {
                    icon: '✨',
                    text: 'And Lots More! – every activity tailored to support all-round growth.'
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.text}</span>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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

          <div className="space-y-16">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-10 rounded-3xl shadow-xl">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold mb-4">
                Early Years Foundation (EYF)
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Montessori-Inspired Early Learning</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our EYF program is child-centered, practical, and fun. Montessori principles guide each experience, allowing children to explore independently while guided by attentive facilitators.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Phonics, Numeracy, and Sensory Play – building strong literacy and numeracy foundations.',
                  'Self-Discipline, Independence, and Love for Learning – cultivating responsible and curious learners.',
                  'Practical Life Activities – encouraging confidence, responsibility, and problem-solving.',
                  'Creativity and Imagination – through drawing, role play, and storytelling.',
                  'Fine and Gross Motor Skills – hands-on activities that strengthen coordination and balance.',
                  'Social Skills and Emotional Growth – teaching sharing, turn-taking, and kindness.',
                  'Early Exposure to STEM Concepts – through fun, age-appropriate experiments and explorations.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
                    <span className="text-emerald-600 text-xl mr-3">✅</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-emerald-700 font-semibold">
                This foundation ensures a smooth transition into Nursery and Primary education.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {eyfImages.map((url, index) => (
                  <div key={index} className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src={url}
                      alt="Early Years Foundation"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-pink-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏫</span>
                <h3 className="text-3xl font-bold text-gray-900">Nursery Section</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The Nursery years blend structured academics with play, exploration, and creativity to ensure balanced development and joyful learning.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Early Reading, Phonics, Handwriting, and Number Sense – preparing them for literacy and numeracy mastery.',
                  'Storytelling, Songs, and Rhymes – boosting vocabulary, comprehension, and self-expression.',
                  'Social and Moral Lessons – nurturing empathy, respect, and teamwork.',
                  'Art, Music, and Drama – developing creativity, confidence, and self-expression.',
                  'Practical Thinking and Problem-Solving – through puzzles, blocks, and interactive play.',
                  'Nature and Environmental Awareness – fostering love for nature and healthy living.',
                  'Introduction to ICT – simple, age-appropriate digital learning for the 21st century.',
                  'Physical Activities and Games – ensuring healthy growth, stamina, and agility.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start bg-gradient-to-br from-pink-50 to-white rounded-2xl p-4 shadow-sm border border-pink-100">
                    <span className="text-pink-500 text-xl mr-3">✨</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-pink-600 font-semibold">
                By the end of Nursery, children become confident readers, thinkers, and independent learners ready for Primary education.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {nurseryImages.map((url, index) => (
                  <div key={index} className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src={url}
                      alt="Nursery learning space"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-10 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📘</span>
                <h3 className="text-3xl font-bold text-gray-900">Primary School</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our Primary program blends academic rigor, creativity, and moral training, giving learners a solid foundation for higher learning and responsible living.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Core Subjects – English, Mathematics, Science, Social Studies, Arabic, and Qur’an.',
                  'ICT and Coding (from age 7) – graphics design, animations, web/app building, and technology problem-solving.',
                  'Daily Drills – spelling, comprehension, handwriting, dictation, and mental maths to sharpen academic skills.',
                  'Creative Studies – Art, Music, Drama, and Home Economics to encourage innovation and self-expression.',
                  'Clubs and Societies – Debate, Press Club, Arts & Crafts, STEM Club, and Qur’an Recitation groups.',
                  'Sports and Games – football, basketball, chess, and indoor games to build fitness and teamwork.',
                  'Moral and Social Education – instilling values of respect, honesty, and leadership.',
                  'Entrepreneurship and Practical Life Skills – introducing basic financial literacy, project making, and handiwork.',
                  'Public Speaking and Reading Culture – weekly presentations, storytelling, and reading programs to build confidence.',
                  'Field Trips and Excursions – real-world exposure that connects classroom learning to everyday life.',
                  'Health & Hygiene Education – promoting wellness, safety, and self-care habits.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start bg-white rounded-2xl border border-blue-100 p-4 shadow-sm">
                    <span className="text-blue-500 text-xl mr-3">✅</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-blue-600 font-semibold">
                Graduates emerge with strong literacy, numeracy, critical thinking, and creative skills, ready to excel in higher education.
              </p>
            </div>
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
