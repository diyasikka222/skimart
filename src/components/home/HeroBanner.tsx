import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'
import { assetUrls } from '@/data/assets'

interface HeroSlide {
  eyebrow: string
  headline: string
  highlight: string
  copy: string
  ctaLabel: string
  ctaTo: string
  secondaryLabel: string
  secondaryTo: string
  image: string
  imageAlt: string
}

const slides: HeroSlide[] = [
  {
    eyebrow: 'SKIMART · Your local supermarket',
    headline: 'Your everyday essentials,',
    highlight: 'all in one place',
    copy: 'Fresh groceries, trusted brands, and home delivery from your local supermarket.',
    ctaLabel: 'Shop groceries',
    ctaTo: '/categories',
    secondaryLabel: 'Explore all categories',
    secondaryTo: '/categories',
    image: assetUrls.heroGroceryBasket,
    imageAlt: 'A grocery basket filled with fresh vegetables, fruits and everyday essentials',
  },
  {
    eyebrow: 'Fresh produce · Dairy· Staples',
    headline: 'Fresh from our store,',
    highlight: 'delivered to your home',
    copy: 'Fruits, vegetables, milk, staples and snacks — the brands your family already trusts.',
    ctaLabel: 'Shop fresh produce',
    ctaTo: '/category/fruits-vegetables',
    secondaryLabel: 'View all categories',
    secondaryTo: '/categories',
    image: assetUrls.products.vegetables,
    imageAlt: 'A wooden table spread with fresh fruits and vegetables',
  },
]

const AUTOPLAY_MS = 6000

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function HeroBanner() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | null>(null)

  const advance = useCallback(
    (dir: 1 | -1) => setIndex((current) => (current + dir + slides.length) % slides.length),
    [],
  )

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    timer.current = window.setInterval(() => advance(1), AUTOPLAY_MS)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [paused, index, advance])

  return (
    <section
      aria-label="Featured promotions"
      className="mx-auto w-full max-w-container px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-banner bg-brand-green-deep"
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured groceries"
      >
        <div
          className="grid"
          aria-live="polite"
          style={{ gridTemplateColumns: '1fr' }}
        >
          {slides.map((slide, slideIndex) => {
            const isActive = slideIndex === index
            return (
              <div
                key={slide.eyebrow}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 transition-opacity duration-500 ease-standard ${
                  isActive ? 'relative z-10 opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <div className="grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:p-14">
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
                      {slide.eyebrow}
                    </p>
                    <h1 className="mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                      {slide.headline}{' '}
                      <span className="text-brand-orange">{slide.highlight}</span>
                    </h1>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-brand-green-pale">
                      {slide.copy}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <Button to={slide.ctaTo} size="lg" variant="primary">
                        {slide.ctaLabel}
                        <ArrowRight aria-hidden className="h-5 w-5" />
                      </Button>
                      <Link
                        to={slide.secondaryTo}
                        className="inline-flex items-center gap-1.5 rounded-control px-3 py-2 text-sm font-semibold text-brand-green-pale underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                      >
                        {slide.secondaryLabel}
                      </Link>
                    </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <div className="absolute -inset-4 rounded-full bg-brand-green/30 blur-2xl" aria-hidden="true" />
                    <SmartImage
                      src={slide.image}
                      alt={slide.imageAlt}
                      lazy={slideIndex > 0}
                      className="relative aspect-[4/3] w-full rounded-card object-cover ring-4 ring-white/10"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-0.5 sm:bottom-4 sm:right-4">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.eyebrow}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1} of ${slides.length}`}
              aria-current={slideIndex === index}
              className="group inline-flex h-9 min-w-9 items-center justify-center rounded-full px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <span
                aria-hidden="true"
                className={`block h-2 rounded-full transition-all duration-standard ease-standard ${
                  slideIndex === index ? 'w-6 bg-brand-orange' : 'w-2 bg-white/50 group-hover:bg-white/80'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 sm:bottom-4 sm:left-4">
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Previous slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors duration-standard ease-standard hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>
          <span className="text-xs font-semibold text-white/80">
            {index + 1}/{slides.length}
          </span>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="Next slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors duration-standard ease-standard hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}