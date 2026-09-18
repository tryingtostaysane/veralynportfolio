import { useEffect, useState } from 'react'
import './ProjectThumbnail.css'

const INSTRUCTION_HOLD_MS = 4800
const INSTRUCTION_FADE_MS = 700

function ClockIcon() {
  return (
    <svg className="cook-instruction-clock" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4.75V8L10.2 9.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CookingInstructions({ instructions }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const holdTimer = setTimeout(() => setVisible(false), INSTRUCTION_HOLD_MS)
    return () => clearTimeout(holdTimer)
  }, [index])

  useEffect(() => {
    if (visible) return
    const fadeTimer = setTimeout(() => {
      setIndex((current) => (current + 1) % instructions.length)
      setVisible(true)
    }, INSTRUCTION_FADE_MS)
    return () => clearTimeout(fadeTimer)
  }, [visible, instructions.length])

  const step = instructions[index]

  return (
    <div className="cook-instructions">
      <div className={`cook-instruction-card${visible ? ' is-visible' : ''}`}>
        <div className="cook-instruction-label">
          {step.icon && <span>{step.icon}</span>}
          <span>{step.label}</span>
        </div>
        <p className="cook-instruction-text">
          {step.text.map((part, i) =>
            typeof part === 'string' ? (
              part
            ) : (
              <span className="cook-instruction-highlight" key={i}>
                {part.highlight}
              </span>
            )
          )}
        </p>
        {step.meta && (
          <div className="cook-instruction-meta">
            <ClockIcon />
            <span>{step.meta}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function SkyFrames({ frames }) {
  return (
    <div className="sky-frames">
      {frames.map((frame) => (
        <img
          key={frame.src}
          className="sky-frame"
          src={frame.src}
          alt=""
          style={{ left: `${frame.left}%`, top: `${frame.top}%`, width: `${frame.width}%` }}
        />
      ))}
    </div>
  )
}

export function DeviceDetector({ point }) {
  return (
    <div className="bioscent-detect" style={{ left: `${point.left}%`, top: `${point.top}%` }}>
      <span className="bioscent-detect-ring" />
      <span className="bioscent-detect-ring" />
      <span className="bioscent-detect-core" />
    </div>
  )
}

// Shared animated thumbnail: the same photo + overlay animation used
// on the HOME work-card also drives each case-study's hero banner.
// The two contexts render the photo at different aspect ratios (the
// home card crops to a fixed 462:245 box across all three projects for
// grid consistency; the hero shows each photo at its own natural
// ratio since it isn't constrained to a grid), so callers pass
// `aspectRatio` and overlay coordinates already calibrated for that
// context - see src/data/projectThumbnails.js for the two coordinate
// sets and why they differ.
export default function ProjectThumbnail({ image, alt = '', aspectRatio, cookingInstructions, skyFrames, detectionPoint, className = '' }) {
  return (
    <div className={`thumbnail-media${className ? ` ${className}` : ''}`} style={aspectRatio ? { '--thumbnail-aspect': aspectRatio } : undefined}>
      <img className="thumbnail-image" src={image} alt={alt} />
      {cookingInstructions && <CookingInstructions instructions={cookingInstructions} />}
      {skyFrames && <SkyFrames frames={skyFrames} />}
      {detectionPoint && <DeviceDetector point={detectionPoint} />}
    </div>
  )
}
