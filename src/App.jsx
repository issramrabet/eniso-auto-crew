import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import EnisoIntro from './components/EnisoIntro.jsx'
import Crew from './components/Crew.jsx'
import Join from './components/Join.jsx'
import Contact from './components/Contact.jsx'
import Reveal from './components/Reveal.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Join />
        <About />
        <EnisoIntro />
        <Crew />
        <Contact />
        <Reveal />
      </main>
      <Footer />
    </>
  )
}