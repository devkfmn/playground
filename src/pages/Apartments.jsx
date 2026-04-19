import { useState } from 'react'

const apartments = [
  {
    title: 'Harbor Loft',
    description:
      'Bright corner unit with floor-to-ceiling windows, a compact kitchen, and a small workspace nook. Ideal for two guests who want walkable cafés and evening waterfront strolls.',
    images: [
      'https://picsum.photos/seed/harbor-loft-1/720/448',
      'https://picsum.photos/seed/harbor-loft-2/720/448',
      'https://picsum.photos/seed/harbor-loft-3/720/448',
      'https://picsum.photos/seed/harbor-loft-4/720/448',
      'https://picsum.photos/seed/harbor-loft-5/720/448',
    ],
  },
  {
    title: 'Garden Studio',
    description:
      'Quiet ground-floor studio opening onto a shared courtyard. Includes laundry in the building, reliable Wi‑Fi, and simple self check-in for flexible arrival times.',
    images: [
      'https://picsum.photos/seed/garden-studio-1/720/448',
      'https://picsum.photos/seed/garden-studio-2/720/448',
      'https://picsum.photos/seed/garden-studio-3/720/448',
      'https://picsum.photos/seed/garden-studio-4/720/448',
      'https://picsum.photos/seed/garden-studio-5/720/448',
    ],
  },
  {
    title: 'Skyline One-Bedroom',
    description:
      'Elevated views, a separate bedroom, and a dining table for four. Great for longer stays: full-size fridge, dishwasher, and blackout shades in the bedroom.',
    images: [
      'https://picsum.photos/seed/skyline-bed-1/720/448',
      'https://picsum.photos/seed/skyline-bed-2/720/448',
      'https://picsum.photos/seed/skyline-bed-3/720/448',
      'https://picsum.photos/seed/skyline-bed-4/720/448',
      'https://picsum.photos/seed/skyline-bed-5/720/448',
    ],
  },
]

function ImageSlider({ title, images }) {
  const [index, setIndex] = useState(0)
  const count = images.length
  const goPrev = () => setIndex((i) => (i - 1 + count) % count)
  const goNext = () => setIndex((i) => (i + 1) % count)

  return (
    <div className="apartment-slider">
      <div className="apartment-slider-frame">
        <img
          className="apartment-slider-image"
          src={images[index]}
          alt={`${title} — photo ${index + 1} of ${count}`}
          width={720}
          height={448}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
      <div className="apartment-slider-toolbar">
        <button
          type="button"
          className="apartment-slider-btn apartment-slider-btn--icon"
          onClick={goPrev}
          aria-label="Previous photo"
        >
          {'<'}
        </button>
        <div className="apartment-slider-dots" role="tablist" aria-label="Photos">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show photo ${i + 1}`}
              className={
                'apartment-slider-dot' + (i === index ? ' apartment-slider-dot--active' : '')
              }
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="apartment-slider-btn apartment-slider-btn--icon"
          onClick={goNext}
          aria-label="Next photo"
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default function Apartments() {
  return (
    <div className="page apartments-page">
      <h1>Example stays</h1>
      <p className="page-lead">
        Three sample listings with short descriptions and photo carousels—similar to what a guest
        would see when browsing apartments.
      </p>
      <div className="apartments-grid">
        {apartments.map((apt) => (
          <article key={apt.title} className="apartment-card">
            <ImageSlider title={apt.title} images={apt.images} />
            <div className="apartment-card-body">
              <h2 className="apartment-card-title">{apt.title}</h2>
              <p className="apartment-card-desc">{apt.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
