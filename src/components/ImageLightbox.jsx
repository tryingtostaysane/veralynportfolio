import { useEffect, useState } from 'react'
import './ImageLightbox.css'

function ZoomIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 6V11M6 8.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Dense infographics (e.g. BioScent's ecosystem diagram) shrink to fit
// the page's normal responsive width, which makes their labels
// illegible on narrow screens - this wraps such an image with a tap-to-
// zoom affordance that opens it full-screen at its native pixel size
// instead, so the overlay can be scrolled/pinch-zoomed to actually read
// it without changing how the image behaves in the page's own layout.
export default function ImageLightbox({ src, alt, className = '' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <button type="button" className="image-lightbox-trigger" onClick={() => setOpen(true)} aria-label={`Expand image: ${alt}`}>
        <img className={className} src={src} alt={alt} />
        <span className="image-lightbox-zoom-hint" aria-hidden="true">
          <ZoomIcon />
        </span>
      </button>
      {open && (
        <div className="image-lightbox-overlay" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          <button type="button" className="image-lightbox-close" onClick={() => setOpen(false)} aria-label="Close expanded image">
            <CloseIcon />
          </button>
          <img className="image-lightbox-image" src={src} alt={alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  )
}
