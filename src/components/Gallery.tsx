export default function Gallery() {
  const galleryImages = [
    {
      url: '/images/ejidey 1.jpg',
      title: 'Students in Classroom',
      category: 'Academic'
    },
    {
      url: '/images/ejidey 3.jpg',
      title: 'Learning Environment',
      category: 'Academic'
    },
    {
      url: '/images/ejidey 4.jpg',
      title: 'Playful Learning',
      category: 'Facilities'
    },
    {
      url: '/images/ejidey 5.jpg',
      title: 'Computer Lab',
      category: 'Technology'
    },
    {
      url: '/images/ejidey 14.jpg',
      title: 'Project Exhibition',
      category: 'Events'
    },
    {
      url: 'https://images.pexels.com/photos/8923165/pexels-photo-8923165.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Library Study',
      category: 'Academic'
    },
    {
      url: 'https://images.pexels.com/photos/8923194/pexels-photo-8923194.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sports Activities',
      category: 'Sports'
    },
    {
      url: 'https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Group Learning',
      category: 'Academic'
    },
    {
      url: 'https://images.pexels.com/photos/8923123/pexels-photo-8923123.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'School Events',
      category: 'Events'
    },
    {
      url: 'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Fc70c8deca1fa49d7b50db5d60c372525?format=webp&width=800',
      title: 'Creative Learning Nook',
      category: 'Based Crèche'
    },
    {
      url: 'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Ff8de39ce56534cc1b0d91f04ac9906bf?format=webp&width=800',
      title: 'Restful Nap Time Space',
      category: 'Based Crèche'
    },
    {
      url: 'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2Fd7f889c90e3b47d0a94703c08eb620fa?format=webp&width=800',
      title: 'Interactive Learning Corners',
      category: 'Based Crèche'
    },
    {
      url: 'https://cdn.builder.io/api/v1/image/assets%2F62a26c7086fc4ae99a9017c79f08981e%2F28218b43e263468fbf8e40aeb03fe176?format=webp&width=800',
      title: 'Play-Based Activity Zone',
      category: 'Based Crèche'
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
            {['All', 'Academic', 'Arts', 'Sports', 'Facilities', 'Events', 'Technology', 'Based Crèche'].map((category) => (
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
                src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="School building"
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
                src="https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Library"
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
                src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sports facilities"
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
                    Olympic-size swimming pool
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Multi-sport gymnasium
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Outdoor playing fields
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Science lab"
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
          </div>
        </div>
      </section>
    </div>
  );
}
