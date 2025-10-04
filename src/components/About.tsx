import { Target, Eye, Heart, Trophy } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20 bg-white">
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">About Ejidey Schools Magodo</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building a legacy of excellence, transforming lives through quality education in Lagos, Nigeria
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="/images/ejidey 3.jpg"
                alt="School building"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ejidey Schools Magodo began with a simple yet powerful vision: to provide world-class education that nurtures not just academic excellence but also character, creativity, and leadership in the heart of Lagos.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With campuses in Magodo and Shangisha, we have grown into a comprehensive educational center serving students from diverse backgrounds. Our commitment to innovation in education and student-centered learning has earned us recognition as one of the leading schools in Lagos State.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, Ejidey Schools stands as a testament to what dedicated educators, supportive parents, and motivated students can achieve together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-10 rounded-2xl text-white shadow-xl">
              <Target className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-emerald-50 leading-relaxed">
                To provide a nurturing and challenging learning environment that empowers students to reach their full potential academically, socially, and emotionally. We are committed to developing critical thinkers, responsible citizens, and lifelong learners who will contribute positively to society.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-10 rounded-2xl text-white shadow-xl">
              <Eye className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-blue-50 leading-relaxed">
                To be recognized as a center of educational excellence that inspires innovation, creativity, and leadership. We envision a community where every student discovers their unique talents and develops the confidence to pursue their dreams while making a positive impact on the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12 text-rose-600" />,
                title: 'Integrity',
                description: 'We uphold the highest standards of honesty, ethics, and moral character in all our actions.'
              },
              {
                icon: <Trophy className="w-12 h-12 text-yellow-600" />,
                title: 'Excellence',
                description: 'We strive for the highest quality in teaching, learning, and all school activities.'
              },
              {
                icon: <Target className="w-12 h-12 text-emerald-600" />,
                title: 'Innovation',
                description: 'We embrace new ideas and creative approaches to enhance the learning experience.'
              },
              {
                icon: <Eye className="w-12 h-12 text-blue-600" />,
                title: 'Respect',
                description: 'We value diversity and treat everyone with dignity, kindness, and understanding.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to student success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Principal',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                name: 'Mr. Michael Chen',
                role: 'Vice Principal',
                image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                name: 'Ms. Emily Rodriguez',
                role: 'Academic Director',
                image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
              }
            ].map((leader, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-emerald-600 font-semibold">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
