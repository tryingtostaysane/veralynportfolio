import { useEffect, useRef, useState } from 'react'
import './SectionVideo.css'

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10.5 4L6.5 7.5H3.5V12.5H6.5L10.5 16V4Z" fill="currentColor" />
      <path d="M14 7.5L17.5 12.5M17.5 7.5L14 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SoundOnIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10.5 4L6.5 7.5H3.5V12.5H6.5L10.5 16V4Z" fill="currentColor" />
      <path
        d="M13.5 6.5C14.5 7.5 15 8.7 15 10C15 11.3 14.5 12.5 13.5 13.5M15.8 4.2C17.3 5.7 18 7.8 18 10C18 12.2 17.3 14.3 15.8 15.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Every video on the site (CookPilot's intro/step clips, BioScent's
// phone-mockup demo, VisualEyes' 3D-world/interview clips) shares this
// component instead of a plain <video autoPlay>. Two things it fixes
// over that:
//
// 1. Every case-study page is one long scroll with every section already
//    sitting in the DOM from first paint, so a plain `autoPlay` attribute
//    fires the instant the page mounts, not "when the user reaches that
//    section". This uses an IntersectionObserver instead - play() only
//    fires once the video's own frame is actually in view, and pause()
//    once it scrolls back out.
//
// 2. Sound defaults to ON per spec, with a click-to-toggle button - but
//    browsers block ANY autoplay-with-sound that isn't the direct result
//    of a user gesture (a click), and a scroll-triggered play() call does
//    not count as one. So on each entry we optimistically try to play
//    unmuted; if the browser's autoplay policy rejects that (it silently
//    rejects the play() promise instead of throwing), we fall back to a
//    muted autoplay so the clip still plays, and the toggle button (a
//    real click) lets the user turn sound on from there - that click DOES
//    count as a gesture, so the unmute always succeeds. Once the person
//    has explicitly picked a sound state via the toggle, we stop
//    re-guessing and just respect it (including across the clip
//    re-entering view again).
export default function SectionVideo({
  src,
  frameClassName,
  videoClassName = 'section-video',
  toggleClassName = 'section-video-sound-toggle',
  toggleLabelOn = 'Turn sound off',
  toggleLabelOff = 'Turn sound on',
  ariaLabel,
  loop = true,
  threshold = 0.5,
}) {
  const videoRef = useRef(null)
  const [soundOn, setSoundOn] = useState(true)
  const soundOnRef = useRef(true)
  const userChoseRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const attemptPlay = () => {
      video.muted = !soundOnRef.current
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          if (userChoseRef.current || video.muted) return
          // Autoplay-with-sound was blocked - fall back to muted so the
          // clip plays regardless, and reflect that in the toggle.
          video.muted = true
          soundOnRef.current = false
          setSoundOn(false)
          video.play().catch(() => {})
        })
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            attemptPlay()
          } else {
            video.pause()
          }
        }
      },
      { threshold },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [threshold])

  const toggleSound = () => {
    userChoseRef.current = true
    setSoundOn((current) => {
      const next = !current
      soundOnRef.current = next
      const video = videoRef.current
      if (video) {
        video.muted = !next
        // The click itself is the user gesture, so play() is safe to
        // call again here even if we'd been downgraded to muted earlier.
        if (next) video.play().catch(() => {})
      }
      return next
    })
  }

  return (
    <div className={frameClassName}>
      <video ref={videoRef} className={videoClassName} src={src} loop={loop} muted={!soundOn} playsInline aria-label={ariaLabel} />
      <button
        type="button"
        className={toggleClassName}
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? toggleLabelOn : toggleLabelOff}
      >
        {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
      </button>
    </div>
  )
}
