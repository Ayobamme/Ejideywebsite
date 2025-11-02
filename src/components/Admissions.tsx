import { Calendar, FileText, Users, CheckCircle, Phone, Mail } from 'lucide-react';

interface AdmissionsProps {
  onStartApplication: () => void;
}

export default function Admissions({ onStartApplication }: AdmissionsProps) {
  return (
    <div className="pt-20 bg-white">
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Admissions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the Ejidey School community and give your child the gift of exceptional education
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Process</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our admission process is designed to be straightforward and supportive. We look forward to learning about your family and sharing how Ejidey School can support your child's educational journey.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Submit Application',
                  description: 'Complete and submit the online application form with required documents',
                  icon: <FileText className="w-8 h-8" />
                },
                {
                  step: '2',
                  title: 'Schedule Visit',
                  description: 'Tour our campus and meet with our admissions team',
                  icon: <Calendar className="w-8 h-8" />
                },
                {
                  step: '3',
                  title: 'Student Assessment',
                  description: 'Age-appropriate evaluation and interview with student',
                  icon: <Users className="w-8 h-8" />
                },
                {
                  step: '4',
                  title: 'Enrollment',
                  description: 'Receive admission decision and complete enrollment',
                  icon: <CheckCircle className="w-8 h-8" />
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <div className="text-4xl font-bold mb-2">{item.step}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-emerald-50 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents</h2>
              <div className="space-y-4">
                {[
                  'Completed application form',
                  'Birth certificate (certified copy)',
                  'Previous school records and transcripts',
                  'Immunization records',
                  'Two recent passport-sized photographs',
                  'Parent/Guardian identification',
                  'Proof of residence',
                  'Letters of recommendation (for grades 6+)'
                ].map((doc, index) => (
                  <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Information</h2>
              <div className="space-y-6">
                {[
                  { event: 'Application Period Opens', color: 'bg-blue-100 text-blue-700' },
                  { event: 'Application Deadline (Early Decision)', color: 'bg-emerald-100 text-emerald-700' },
                  { event: 'Final Application Deadline', color: 'bg-orange-100 text-orange-700' },
                  { event: 'Admission Decisions Released', color: 'bg-purple-100 text-purple-700' },
                  { event: 'Enrollment Confirmation Deadline', color: 'bg-rose-100 text-rose-700' },
                  { event: 'Academic Year Begins', color: 'bg-emerald-100 text-emerald-700' }
                ].map((item, index) => (
                  <div key={index} className="bg-white border-l-4 border-emerald-600 p-4 rounded-r-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-900">{item.event}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Policy</h2>
            <p className="text-xl text-gray-600">Requirements and criteria for joining our community</p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Entry into JS1 (Junior Secondary 1)</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">The candidate must be 10 years old by the month of the admission exercise</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">The candidate must have completed grade 11 or Primary 6 or Primary 5 at their previous school</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">A testimonial from the previous school will be required</p>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h4 className="font-bold text-gray-900 mb-3">JS1 Applicants will be tested in:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Mathematics / Quantitative Aptitudes
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    English / Verbal Aptitudes
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    General Paper
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Transfer Students into JS2, JS3 & SS1</h3>
                <div className="mb-4">
                  <div className="flex items-start mb-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">A testimonial from the previous school will be required</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-3">Will be tested in:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      English
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Mathematics
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Basic Science
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Transfer Students into SS2</h3>
                <div className="mb-4">
                  <div className="flex items-start mb-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">A testimonial from the previous school will be required</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                    <h4 className="font-bold text-gray-900 mb-3">Art & Commercial Classes:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                        English
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                        Mathematics
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                        Government / Economics
                      </li>
                    </ul>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-6 border border-rose-100">
                    <h4 className="font-bold text-gray-900 mb-3">Sciences:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-rose-600 rounded-full mr-3"></span>
                        English
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-rose-600 rounded-full mr-3"></span>
                        Mathematics
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-rose-600 rounded-full mr-3"></span>
                        Chemistry
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-10 text-white">
              <h3 className="text-3xl font-bold mb-6">What We Look For</h3>
              <p className="text-lg text-emerald-50 mb-6">
                The school aims to provide a broad and balanced range of quality learning opportunities within a day/boarding school environment, in a natural and peaceful setting, which is conducive to learning.
              </p>
              <p className="text-lg text-emerald-50 mb-6">
                We look for evidence of a young person's willingness to succeed at Ejidey Schools. We look at the whole child, paying particular attention to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'A passion for learning',
                  'Intellect, evidenced by a history of academic success',
                  'Ability to adjust',
                  'Respect for others',
                  'Self-discipline',
                  'Sporting ability',
                  'Ability in creative arts',
                  'Leadership skills'
                ].map((quality, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-emerald-50">{quality}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Apply?</h2>
            <p className="text-xl text-gray-600">
              Take the first step toward an exceptional educational experience
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-2xl shadow-xl border border-gray-200">
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-emerald-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Call us</p>
                  <p className="text-lg font-semibold text-gray-900">+234 805 984 2973</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-emerald-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Email us</p>
                  <p className="text-lg font-semibold text-gray-900">info@ejideyschool.ng</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={onStartApplication}
                className="w-full bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Your Application Online
              </button>
              <p className="text-center text-gray-600 mt-4 text-sm">
                Application takes approximately 15-20 minutes to complete
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
