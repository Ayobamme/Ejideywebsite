import { Calendar, User, ArrowRight } from 'lucide-react';

export default function News() {
  const newsArticles = [
    {
      title: 'Ejidey School Students Win National Science Fair',
      excerpt: 'Our talented students took home first place at the National Science Fair with their innovative project on renewable energy solutions.',
      date: 'March 15, 2024',
      author: 'Dr. Sarah Johnson',
      category: 'Achievement',
      image: 'https://images.pexels.com/photos/8422149/pexels-photo-8422149.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      title: 'New STEM Lab Opening This Fall',
      excerpt: 'We are excited to announce the opening of our brand new STEM laboratory, equipped with cutting-edge technology for hands-on learning.',
      date: 'March 10, 2024',
      author: 'Michael Chen',
      category: 'Facilities',
      image: 'https://images.pexels.com/photos/8422150/pexels-photo-8422150.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Spring Concert Showcases Student Talent',
      excerpt: 'The annual spring concert was a remarkable display of musical excellence featuring performances from our band, choir, and orchestra.',
      date: 'March 5, 2024',
      author: 'Emily Rodriguez',
      category: 'Events',
      image: 'https://images.pexels.com/photos/8923128/pexels-photo-8923128.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Ejidey School Ranked Top 10 in Regional Education',
      excerpt: 'According to the latest educational rankings, Ejidey School has been recognized among the top 10 schools in the region for academic excellence.',
      date: 'February 28, 2024',
      author: 'Dr. Sarah Johnson',
      category: 'Achievement',
      image: 'https://images.pexels.com/photos/8923165/pexels-photo-8923165.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Community Service Day Makes Impact',
      excerpt: 'Students and staff volunteered over 500 hours in community service projects, making a positive difference in our local community.',
      date: 'February 20, 2024',
      author: 'Michael Chen',
      category: 'Community',
      image: 'https://images.pexels.com/photos/8923194/pexels-photo-8923194.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Athletic Teams Excel in Regional Championships',
      excerpt: 'Our basketball, soccer, and track teams all advanced to regional championships, with several students earning individual awards.',
      date: 'February 15, 2024',
      author: 'Emily Rodriguez',
      category: 'Sports',
      image: 'https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <div className="pt-20 bg-white">
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">News & Events</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest happenings at Ejidey School
            </p>
          </div>

          {featuredArticle && (
            <div className="mb-16">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-10 flex flex-col justify-center">
                    <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit">
                      {featuredArticle.category}
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center text-gray-500 mb-6 space-x-6">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{featuredArticle.date}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        <span>{featuredArticle.author}</span>
                      </div>
                    </div>
                    <button className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700">
                      Read Full Story
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {article.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Mark your calendars for these exciting events</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                date: 'APR 15',
                title: 'Spring Open House',
                time: '10:00 AM - 2:00 PM',
                location: 'Main Campus',
                description: 'Visit our campus, meet teachers, and learn about our programs'
              },
              {
                date: 'APR 22',
                title: 'Science & Innovation Fair',
                time: '9:00 AM - 4:00 PM',
                location: 'Gymnasium',
                description: 'Student projects showcasing creativity and scientific thinking'
              },
              {
                date: 'MAY 5',
                title: 'Annual Sports Day',
                time: '8:00 AM - 5:00 PM',
                location: 'Athletic Fields',
                description: 'Inter-house competitions and athletic celebrations'
              },
              {
                date: 'MAY 18',
                title: 'Spring Musical Performance',
                time: '6:00 PM - 8:00 PM',
                location: 'Auditorium',
                description: 'Students present this year\'s musical production'
              },
              {
                date: 'JUN 1',
                title: 'Parent-Teacher Conference',
                time: '1:00 PM - 6:00 PM',
                location: 'Various Classrooms',
                description: 'Discuss student progress and end-of-year achievements'
              },
              {
                date: 'JUN 10',
                title: 'Graduation Ceremony',
                time: '10:00 AM - 12:00 PM',
                location: 'Main Auditorium',
                description: 'Celebrating our graduating seniors\' achievements'
              }
            ].map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex items-start space-x-6">
                  <div className="bg-emerald-600 text-white p-4 rounded-lg text-center min-w-[80px]">
                    <div className="text-2xl font-bold">{event.date.split(' ')[1]}</div>
                    <div className="text-sm">{event.date.split(' ')[0]}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p><strong>Time:</strong> {event.time}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
