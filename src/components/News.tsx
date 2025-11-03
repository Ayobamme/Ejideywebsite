import { useState } from 'react';
import { Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import footballClubImage from '../assets/football-club.jpeg';
import ictCodingImage from '../assets/ict-coding.jpeg';
import homeMakersImage from '../assets/home-makers.jpeg';
import teachersTrainingImage from '../assets/WhatsApp Image 2025-10-07 at 00.01.22 copy.jpeg';

export default function News() {
  const [expandedNews, setExpandedNews] = useState<number | null>(null);

  const newsArticles = [
    {
      title: "News Flash: Teachers' Training Spotlight",
      excerpt:
        "We had our Teachers' Training today where we focused on the nitty-gritties of effective teaching. At Ejidey Schools, we strongly believe in teaching the teachers and training the trainers because our team is our greatest strength. Happy Teachers' Day to us all!",
      fullContent: "We had our Teachers' Training today where we focused on the nitty-gritties of effective teaching. At Ejidey Schools, we strongly believe in teaching the teachers and training the trainers because our team is our greatest strength. Our professional development program ensures that our educators stay at the forefront of modern teaching methodologies, incorporating the latest educational research and best practices. Through continuous training and development, we maintain our commitment to excellence in education. Happy Teachers' Day to us all!",
      date: 'October 7, 2025',
      category: 'Professional Development',
      image: teachersTrainingImage,
      featured: true
    },
    {
      title: 'EJIDEY Football Club',
      excerpt: 'At EJIDEY Schools, our Football Club builds teamwork, discipline, and confidence both on and off the field. Learners are trained to play with skill, strategy, and sportsmanship.',
      fullContent: 'At EJIDEY Schools, our Football Club builds teamwork, discipline, and confidence both on and off the field. Learners are trained to play with skill, strategy, and sportsmanship. Through regular practice and inter-house matches, we nurture future champions who understand that winning begins with hard work, respect, and unity. Our experienced coaches work with students of all skill levels, from beginners to advanced players, fostering a love for the beautiful game while developing essential life skills that extend far beyond the football pitch.',
      date: 'October 12, 2025',
      category: 'Sports',
      image: footballClubImage
    },
    {
      title: 'EJIDEY ICT and Coding',
      excerpt: 'At EJIDEY Schools, we prepare our learners for the digital world through hands-on ICT and Coding classes. From an early age, pupils explore technology creatively.',
      fullContent: 'At EJIDEY Schools, we prepare our learners for the digital world through hands-on ICT and Coding classes. From an early age, pupils explore technology creatively — learning how to type, design, code, and solve problems using computers. Our program covers essential skills such as graphics design, animation, app building, and robotics. Students engage with cutting-edge technology and software, developing computational thinking skills that are essential for success in the modern world. Through project-based learning, they create real-world solutions while building confidence in their digital literacy.',
      date: 'October 11, 2025',
      category: 'Technology',
      image: ictCodingImage
    },
    {
      title: 'EJIDEY Home-Makers Club',
      excerpt: 'At EJIDEY Schools, we believe that education goes beyond the classroom. Our Home Makers Session equips learners with essential life skills that build independence, creativity, and responsibility.',
      fullContent: 'At EJIDEY Schools, we believe that education goes beyond the classroom. Our Home Makers Session equips learners with essential life skills that build independence, creativity, and responsibility. During these sessions, pupils engage in practical activities such as cooking, cleaning, sewing, decorating, and basic home management. These hands-on experiences help students develop practical wisdom and self-sufficiency, preparing them to become well-rounded individuals capable of managing their own homes and contributing meaningfully to their families and communities.',
      date: 'October 10, 2025',
      category: 'Life Skills',
      image: homeMakersImage
    }
  ];

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  const toggleExpand = (index: number) => {
    setExpandedNews(expandedNews === index ? null : index);
  };

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
                      {expandedNews === -1 ? featuredArticle.fullContent : featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center text-gray-500 mb-6">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <button
                      onClick={() => toggleExpand(-1)}
                      className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700"
                    >
                      {expandedNews === -1 ? 'Show Less' : 'Read Full Story'}
                      {expandedNews === -1 ? <ChevronUp className="ml-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {expandedNews === index ? article.fullContent : article.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center"
                  >
                    {expandedNews === index ? 'Show Less' : 'Read More'}
                    {expandedNews === index ? <ChevronUp className="ml-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
