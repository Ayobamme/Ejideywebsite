import scienceLabImage from '../assets/science-lab.jpeg';
import footballClubImage from '../assets/football-club.jpeg';
import eyfImage1 from '../assets/WhatsApp Image 2025-10-07 at 00.01.23.jpeg';
import eyfImage2 from '../assets/WhatsApp Image 2025-10-07 at 00.01.22.jpeg';
import eyfImage3 from '../assets/WhatsApp Image 2025-10-07 at 00.01.26.jpeg';
import modernClassroomImage from '../assets/WhatsApp Image 2025-10-07 at 00.01.28.jpeg';
import computerLabImage from '../assets/WhatsApp Image 2025-10-12 at 03.58.17.jpeg';
import eyfPlayroomImage from '../assets/WhatsApp Image 2025-11-02 at 20.46.59 copy.jpeg';

export default function Gallery() {
  const galleryImages = [
    {
      url: '/images/WhatsApp Image 2025-11-02 at 21.21.12.jpeg',
      title: 'Students in Classroom',
      category: 'Academic'
    },
    {
      url: '/images/WhatsApp Image 2025-11-02 at 21.43.11.jpeg',
      title: 'Learning Environment',
      category: 'Academic'
    },
    {
      url: '/images/WhatsApp Image 2025-11-02 at 21.23.08.jpeg',
      title: 'Playful Learning',
      category: 'Facilities'
    },
    {
      url: computerLabImage,
      title: 'Computer Lab',
      category: 'Technology'
    },
    {
      url: '/images/WhatsApp Image 2025-11-02 at 21.02.35.jpeg',
      title: 'Project Exhibition',
      category: 'Events'
    },
    {
      url: scienceLabImage,
      title: 'Science Laboratory',
      category: 'STEM'
    },
    {
      url: footballClubImage,
      title: 'Sports Activities',
      category: 'Sports'
    },
    {
      url: eyfPlayroomImage,
      title: 'Early Years Foundation',
      category: 'Facilities'
    },
    {
      url: '/images/WhatsApp Image 2025-11-02 at 21.15.10.jpeg',
      title: 'Nursery Classroom',
      category: 'Academic'
    },
    {
      url: '/images/WhatsApp Image 2025-11-02 at 21.41.52.jpeg',
      title: 'Learning Through Play',
      category: 'Facilities'
    }
  ];

  return (
    <div className="pt-20 bg-white">
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience life at Ejidey Schools through our vibrant campus community
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Academic', 'Sports', 'Facilities', 'Events', 'Technology', 'STEM'].map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  category === 'All'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block bg-emerald-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Virtual Campus Tour</h2>
            <p className="text-xl text-gray-600">Explore our state-of-the-art facilities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src={modernClassroomImage}
                alt="Ejidey classroom interior"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Classrooms</h3>
                <p className="text-gray-600 mb-4">
                  Our spacious, well-lit classrooms are equipped with the latest educational technology including interactive whiteboards, tablets, and collaborative learning spaces.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Smart classroom technology
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Comfortable seating arrangements
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Natural lighting and ventilation
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/ejidey 3.jpg"
                alt="Ejidey resource shelves"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Resource-Rich Library</h3>
                <p className="text-gray-600 mb-4">
                  Our comprehensive library houses over 25,000 books, digital resources, and quiet study areas perfect for research and independent learning.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Extensive book collection
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Digital learning resources
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Quiet study zones
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src={footballClubImage}
                alt="Indoor activity space"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Athletic Facilities</h3>
                <p className="text-gray-600 mb-4">
                  Premium sports facilities including indoor gymnasium, outdoor courts, swimming pool, and dedicated areas for various athletic programs.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Multi-sport gymnasium
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Outdoor playing fields
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Sports equipment and facilities
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src={scienceLabImage}
                alt="Science laboratory equipment"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Science Laboratories</h3>
                <p className="text-gray-600 mb-4">
                  State-of-the-art laboratories for physics, chemistry, and biology with modern equipment for hands-on scientific exploration and experiments.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Advanced lab equipment
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Safety-first design
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Dedicated lab assistants
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src={computerLabImage}
                alt="Computer lab with students"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Computer Laboratory</h3>
                <p className="text-gray-600 mb-4">
                  Modern computer lab equipped with up-to-date technology for ICT education, coding classes, and digital learning experiences.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Modern computers and software
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Coding and programming classes
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Expert ICT instructors
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
