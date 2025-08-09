import { ArrowRight, Sparkles, Zap } from 'lucide-react'

const Hero = () => {
  const scrollToDemo = () => {
    const element = document.getElementById('demo')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 w-full min-h-screen">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center w-full">

          <div className="inline-flex items-center gap-2 bg-primary-900/30 text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles size={16} className="animate-bounce-slow" />
            AI-Powered Ad Generation
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 animate-slide-up">
            Create High-Converting Ads
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              in Seconds
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-300">
              — Powered by AI
            </span>
          </h1>


          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 w-full max-w-6xl mx-auto leading-relaxed animate-slide-up px-4">
            No design or copywriting needed. Just enter your product and let Growly do the rest.
            Generate professional ad creatives for Meta and Google Ads in minutes, not hours.
          </p>


          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
            <button
              onClick={scrollToDemo}
              className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
              Book Free Demo
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-gray-800 border-2 border-gray-600 text-gray-300 hover:border-primary-500 hover:text-primary-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2">
              <Zap size={20} />
              Watch Demo Video
            </button>
          </div>


          <div className="relative animate-fade-in w-full">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 w-full mx-auto border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-4 md:p-6 rounded-xl">
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-lg mx-auto mb-3 md:mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-base">1</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-sm md:text-base">Input Product</h3>
                    <p className="text-xs md:text-sm text-gray-400">Describe your product or service</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-4 md:p-6 rounded-xl">
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-lg mx-auto mb-3 md:mb-4 flex items-center justify-center">
                      <Sparkles className="text-white animate-pulse" size={16} />
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-sm md:text-base">AI Magic</h3>
                    <p className="text-xs md:text-sm text-gray-400">AI generates creatives</p>
                  </div>
                </div>


                <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 p-4 md:p-6 rounded-xl">
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-lg mx-auto mb-3 md:mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-base">✓</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-sm md:text-base">Ready Ads</h3>
                    <p className="text-xs md:text-sm text-gray-400">Download & use instantly</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-pink-400 rounded-full opacity-20 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
