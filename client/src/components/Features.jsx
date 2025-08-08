import {
  Zap,
  Target,
  Download,
  Palette,
  TrendingUp,
  Clock,
  Sparkles,
  Globe
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Creative Generator",
      description: "Advanced AI creates stunning visuals and compelling copy tailored to your brand and audience.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Headline Optimizer",
      description: "Generate multiple high-converting headlines tested across millions of successful ad campaigns.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Ad Formats",
      description: "Download ads in all required formats for Meta, Google, TikTok, LinkedIn, and more platforms.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Brand Consistency",
      description: "Maintain your brand colors, fonts, and style across all generated creatives automatically.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Insights",
      description: "Get predictions on ad performance before you launch, powered by machine learning algorithms.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate professional ad creatives in under 60 seconds. No more waiting weeks for designers.",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  return (
    <section id="features" className="py-16 md:py-20 bg-gray-800 w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Modern Marketers</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
              Everything you need to create, optimize, and scale your advertising campaigns with AI-powered precision.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 relative"
              >
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 font-heading">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 md:mt-20 bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-gray-700">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                Trusted by Growing Businesses
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                See why thousands of marketers choose Growly for their ad creation needs
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <div className="text-center p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-400 mb-1 md:mb-2">
                  1000+
                </div>
                <div className="text-gray-300 text-xs md:text-sm lg:text-base">
                  Active Users
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-400 mb-1 md:mb-2">
                  50K+
                </div>
                <div className="text-gray-300 text-xs md:text-sm lg:text-base">
                  Ads Created
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-400 mb-1 md:mb-2">
                  300%
                </div>
                <div className="text-gray-300 text-xs md:text-sm lg:text-base">
                  Avg CTR Increase
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-400 mb-1 md:mb-2">
                  24/7
                </div>
                <div className="text-gray-300 text-xs md:text-sm lg:text-base">
                  AI Availability
                </div>
              </div>
            </div>
          </div>

          {/* Integration Section */}
          <div className="mt-16 text-center mb-8">
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-8 flex items-center justify-center gap-2">
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
              Works with your favorite platforms
            </h3>
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 opacity-60 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <span className="whitespace-nowrap">Meta Ads</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="whitespace-nowrap">Google Ads</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-black rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <span className="whitespace-nowrap">TikTok Ads</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-700 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">in</span>
                </div>
                <span className="whitespace-nowrap">LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
