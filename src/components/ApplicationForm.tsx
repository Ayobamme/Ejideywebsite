import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

interface ApplicationFormProps {
  setActiveSection: (section: string) => void;
}

interface FormState {
  studentName: string;
  gradeLevel: string;
  dateOfBirth: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  address: string;
  previousSchool: string;
  additionalInfo: string;
}

const initialFormState: FormState = {
  studentName: '',
  gradeLevel: '',
  dateOfBirth: '',
  guardianName: '',
  guardianEmail: '',
  guardianPhone: '',
  address: '',
  previousSchool: '',
  additionalInfo: ''
};

export default function ApplicationForm({ setActiveSection }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Your application has been submitted. Our admissions team will contact you shortly.');
    setFormData(initialFormState);
    setActiveSection('home');
  };

  return (
    <div className="pt-20 bg-white">
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => setActiveSection('admissions')}
              className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Admissions
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Application Form</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div>
                <label htmlFor="studentName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Student Full Name *
                </label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="gradeLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                    Grade Level Applying For *
                  </label>
                  <select
                    id="gradeLevel"
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select grade level</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="previousSchool" className="block text-sm font-semibold text-gray-700 mb-2">
                    Previous School
                  </label>
                  <input
                    id="previousSchool"
                    name="previousSchool"
                    type="text"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="School name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="guardianName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent/Guardian Full Name *
                  </label>
                  <input
                    id="guardianName"
                    name="guardianName"
                    type="text"
                    value={formData.guardianName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="guardianEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent/Guardian Email *
                  </label>
                  <input
                    id="guardianEmail"
                    name="guardianEmail"
                    type="email"
                    value={formData.guardianEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="guardianPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent/Guardian Phone *
                  </label>
                  <input
                    id="guardianPhone"
                    name="guardianPhone"
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+234 000 000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Home Address *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="123 Example Street, Lagos"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="Medical considerations, interests, or other notes"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Submit Application
                <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
