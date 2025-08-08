import { ArrowRight, FileText, Sparkles, Download } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FileText className="w-8 h-8" />,
      title: "Input Your Product",
      description: "Simply describe your product, service, or business. Include key details like target audience, unique selling points, and campaign goals.",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: <Sparkles className="w-8 h-8 animate-pulse" />,
      title: "AI Generates Magic",
      description: "Our advanced AI analyzes your input and creates multiple high-converting ad variations with compelling copy, headlines, and creative concepts.",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      icon: <Download className="w-8 h-8" />,
      title: "Download & Launch",
      description: "Get your professional ad creatives in multiple formats ready for Meta, Google, TikTok, and other platforms. Launch immediately!",
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-900 w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
              How Growly
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Works</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
              Transform your ideas into professional ad creatives in just three simple steps.
              No design skills or copywriting experience required.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                {/* Connection Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent z-0">
                    <ArrowRight className="absolute -top-2 -right-2 w-4 h-4 text-gray-500" />
                  </div>
                )}

                {/* Step Card */}
                <div className="relative bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:scale-105 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{step.id}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white mb-6 mt-4 group-hover:rotate-6 transition-transform duration-300`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to create your first ad in 60 seconds?
              </h3>
              <p className="text-gray-300 mb-6">
                Join thousands of businesses already using Growly to scale their advertising
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById('demo')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Start Free Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
