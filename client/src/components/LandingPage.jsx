import Header from './Header'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
import Features from './Features'
import LeadForm from './LeadForm'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <LeadForm />
      <Footer />
    </div>
  )
}

export default LandingPage
