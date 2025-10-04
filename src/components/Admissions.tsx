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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Dates</h2>
              <div className="space-y-6">
                {[
                  { date: 'November 1', event: 'Application Period Opens', color: 'bg-blue-100 text-blue-700' },
                  { date: 'January 15', event: 'Application Deadline (Early Decision)', color: 'bg-emerald-100 text-emerald-700' },
                  { date: 'February 28', event: 'Final Application Deadline', color: 'bg-orange-100 text-orange-700' },
                  { date: 'March 31', event: 'Admission Decisions Released', color: 'bg-purple-100 text-purple-700' },
                  { date: 'April 30', event: 'Enrollment Confirmation Deadline', color: 'bg-rose-100 text-rose-700' },
                  { date: 'August 15', event: 'Academic Year Begins', color: 'bg-emerald-100 text-emerald-700' }
                ].map((item, index) => (
                  <div key={index} className="bg-white border-l-4 border-emerald-600 p-4 rounded-r-lg shadow-md">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${item.color}`}>
                      {item.date}
                    </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tuition & Financial Aid</h2>
            <p className="text-xl text-gray-600">Investing in your child's future</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { grade: 'Primary (K-5)', tuition: '₦1,200,000' },
              { grade: 'Middle (6-8)', tuition: '₦1,450,000' },
              { grade: 'High School (9-12)', tuition: '₦1,650,000' }
            ].map((tuition, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tuition.grade}</h3>
                <p className="text-4xl font-bold text-emerald-600">{tuition.tuition}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-10 rounded-2xl text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Financial Assistance Available</h3>
            <p className="text-lg text-emerald-50 mb-6">
              We believe that exceptional education should be accessible to all qualified students. Ejidey School offers need-based financial aid and merit scholarships to deserving families.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                'Need-based financial aid up to 50% tuition',
                'Academic merit scholarships',
                'Sibling discount (15% for 2nd child, 20% for 3rd+)',
                'Flexible payment plans available',
                'Early payment discount (5%)',
                'Staff and military family discounts'
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="text-emerald-50">
              Contact our admissions office to learn more about financial aid opportunities and to request an application.
            </p>
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
