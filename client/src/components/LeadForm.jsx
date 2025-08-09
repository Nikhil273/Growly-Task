import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://growly-task.onrender.com';
      const response = await axios.post(`${apiUrl}/api/leads`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success) {
        toast.success('Demo request submitted successfully!')
        setIsSubmitted(true)

        setFormData({
          name: '',
          email: '',
          phone: '',
          businessType: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)

      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else if (error.response?.data?.details) {
        const errorMessages = error.response.data.details.map(detail => detail.msg).join(', ')
        toast.error(`Validation Error: ${errorMessages}`)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="demo" className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              We've received your demo request. Our team will contact you within 24 hours to schedule your personalized Growly demo.
            </p>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 max-w-md mx-auto">
              <h3 className="font-semibold text-white mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>✓ We'll review your business needs</li>
                <li>✓ Schedule a convenient demo time</li>
                <li>✓ Show you how Growly can transform your ads</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Ad Creation?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Book a free demo and see how Growly can generate high-converting ads for your business in minutes.
            </p>
          </div>

          <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    max={10}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-2">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200"
                    required
                  >
                    <option value="">Select your business type</option>
                    <option value="Startup">Startup</option>
                    <option value="Small Business">Small Business</option>
                    <option value="Agency">Agency</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>


              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Tell us about your business (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition-all duration-200 resize-none"
                  placeholder="What challenges are you facing with your current ad creation process?"
                />
              </div>


              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Book Free Demo
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-400 mt-4">
                  No spam, ever. We'll only use your information to schedule your demo.
                </p>
              </div>
            </form>
          </div>


          <div className="mt-12 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Free 30-minute demo
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Personalized to your business
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadForm
