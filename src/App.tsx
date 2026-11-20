import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, HashRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Preloader, RouteTransition, WhatsAppButton } from './components/layout/Extras'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Sampling = lazy(() => import('./pages/Sampling'))
const Laboratory = lazy(() => import('./pages/Laboratory'))
const WalkIn = lazy(() => import('./pages/WalkIn'))
const Industries = lazy(() => import('./pages/Industries'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Tests = lazy(() => import('./pages/Tests'))
const Track = lazy(() => import('./pages/Track'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Default: clean URLs (needs SPA rewrites, see vercel.json).
// VITE_ROUTER=hash for static hosts without rewrites; VITE_ROUTER=memory for sandboxed previews.
const Router = ({ children }: { children: ReactNode }) => {
  const mode = import.meta.env.VITE_ROUTER
  if (mode === 'hash') return <HashRouter>{children}</HashRouter>
  if (mode === 'memory') return <MemoryRouter>{children}</MemoryRouter>
  return <BrowserRouter>{children}</BrowserRouter>
}

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Preloader />
        <RouteTransition />
        <Header />
        <main id="main">
          <Suspense fallback={<div className="min-h-screen bg-navy-700" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/sampling" element={<Sampling />} />
              <Route path="/laboratory" element={<Laboratory />} />
              <Route path="/walk-in" element={<WalkIn />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/tests" element={<Tests />} />
              <Route path="/track" element={<Track />} />
              <Route path="/privacy" element={<Legal kind="privacy" />} />
              <Route path="/terms" element={<Legal kind="terms" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </Router>
    </MotionConfig>
  )
}
