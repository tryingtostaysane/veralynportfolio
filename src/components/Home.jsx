import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import ProjectThumbnail from './ProjectThumbnail.jsx'
import { bioscentImg, cookpilotImg, visualeyesImg, COOKPILOT_COOKING_INSTRUCTIONS, BIOSCENT_CARD_DETECTION_POINT, VISUALEYES_CARD_SKY_FRAMES } from '../data/projectThumbnails.js'
import './Home.css'

const works = [
  {
    id: 'bioscent',
    href: '/work/bioscent',
    image: bioscentImg,
    title: 'BioScent',
    description: 'Making invisible health signals visible through AI-powered VOC sensing.',
    role: 'My Role: Product Designer',
    team: 'My Team : 1 x Business Strategist',
    reveal: {
      label: 'Awards \u{1F3C6}:',
      lines: [
        'RedBull Basement AU ’26 | Top 10 National Finalist',
        'Tencent Future CloseUp ’26 | 3rd Place',
      ],
    },
    detectionPoint: BIOSCENT_CARD_DETECTION_POINT,
  },
  {
    id: 'cookpilot',
    href: '/work/cookpilot',
    image: cookpilotImg,
    title: 'CookPilot',
    description: 'An intelligent hands-free cooking assistant with Meta AI Glasses.',
    role: 'My Role: Product Designer, UX Design',
    team: 'My Team : 1 x Meta Dev, 1 x iOS Dev',
    reveal: {
      label: 'Awards \u{1F3C6}:',
      lines: ['ICON UNSW x Lyra ’26 | 1st Place'],
    },
    cookingInstructions: COOKPILOT_COOKING_INSTRUCTIONS,
  },
  {
    id: 'visualeyes',
    href: '/work/visualeyes',
    image: visualeyesImg,
    title: 'VisualEyes',
    description: 'An immersive environment that helps student see a possible version of their future self.',
    role: 'My Role: Spatial UX, Product Designer',
    team: 'My Team : 2 x Devs, 2 x UI Designers',
    reveal: {
      label: 'Program:',
      lines: ['Apple Foundation Program @ UTS ’26'],
    },
    skyFrames: VISUALEYES_CARD_SKY_FRAMES,
  },
  // "Next Case Study" (Figma node 661:1164, added in the bottom-right
  // grid slot alongside the 3 real projects) - a playful CTA card, not a
  // real case study: the "photo" is a plain white placeholder with a "?"
  // (Figma's own asset there is just that question mark on white, not a
  // meaningful photo - reproduced as a real glyph instead of importing a
  // throwaway image). Links out to email since the card's own copy
  // ("Hit me up!") is an invitation to get in touch, matching the
  // sidebar's "Let's chat!" destination.
  {
    id: 'next-case-study',
    href: 'mailto:veralynliyi@gmail.com',
    title: 'Next Case Study',
    description: 'I’m looking for the next problem to solve. Want to yap on an idea or keen to build something together? Hit me up!',
    role: 'My Role: ?',
    team: 'My Team : YOU !',
    placeholder: true,
    caption: 'Let’s yap',
  },
]

function WorkCard({
  id,
  href,
  image,
  title,
  description,
  role,
  team,
  reveal,
  cookingInstructions,
  skyFrames,
  detectionPoint,
  placeholder,
  caption = 'View project',
  activeCardId,
  setActiveCardId,
}) {
  // Projects without a built case study page stay plain, unclickable
  // article cards; internal case-study links are real react-router
  // links; the "Next Case Study" card's href is a mailto: (external),
  // so it gets a plain <a> instead - react-router's <Link to> resolves
  // its target as an internal route path and would mangle a mailto URI.
  // `viewTransition` wraps internal navigation in the browser's View
  // Transitions API for a subtle page-level ease between Home and the
  // case-study page (see the ::view-transition-old(root)/-new(root) rule
  // in index.css) - no named shared elements, just the two pages easing
  // into each other. Unsupported browsers (Firefox, as of this writing)
  // just navigate normally, no fallback code needed.
  const isExternal = href?.includes(':')
  const Wrapper = href ? (isExternal ? 'a' : Link) : 'article'
  const isActive = activeCardId === id

  // Touch devices have no real hover, so the CSS `:hover` reveal (see
  // .work-card:hover .work-card-reveal in Home.css) can't drive it there.
  // Give touch its own explicit two-tap gesture instead: activeCardId is
  // owned by Home (not local state) so only one card is ever open - a tap
  // on a card that isn't the current activeCardId reveals it (and, as a
  // side effect of them no longer matching, collapses whichever card was
  // open before) and swallows the navigation; a tap on the already-open
  // card goes through untouched. Desktop/mouse is unaffected - `matchMedia`
  // there reports real hover so this bails out and the existing
  // hover+click behavior fires as before.
  const handleClick = (e) => {
    if (!reveal) return
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (!isActive) {
      e.preventDefault()
      setActiveCardId(id)
    }
  }

  const wrapperProps = href
    ? {
        [isExternal ? 'href' : 'to']: href,
        ...(isExternal ? {} : { viewTransition: true }),
        className: `work-card${isActive ? ' is-revealed' : ''}`,
        'data-project': id,
        onClick: handleClick,
      }
    : { className: 'work-card', 'data-project': id }

  // "* View project *" cursor-following caption - used to be drawn by the
  // now-removed CustomCursor (it morphed into a pill with this label over
  // any .work-card). Restored here as its own hover element, following the
  // same "position via ref, visibility via state" pattern as the collage
  // captions in BioScent/CookPilot/VisualEyes/AboutMe, so it doesn't need
  // the global custom cursor to exist.
  const [hovering, setHovering] = useState(false)
  const captionRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })

  const updatePos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    if (captionRef.current) {
      captionRef.current.style.left = `${posRef.current.x}px`
      captionRef.current.style.top = `${posRef.current.y}px`
    }
  }

  return (
    <Wrapper
      {...wrapperProps}
      onMouseEnter={(e) => {
        updatePos(e)
        setHovering(true)
      }}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={updatePos}
    >
      <div className="work-card-media">
        {placeholder ? (
          <div className="thumbnail-image work-card-placeholder" aria-hidden="true">
            <span className="work-card-placeholder-glyph">?</span>
          </div>
        ) : (
          <ProjectThumbnail image={image} cookingInstructions={cookingInstructions} skyFrames={skyFrames} detectionPoint={detectionPoint} />
        )}
        <div className="work-card-heading">
          <h2 className="work-card-title">{title}</h2>
          <p className="work-card-description">{description}</p>
        </div>
      </div>
      <hr className="work-card-divider" />
      <div className="work-card-meta">
        <p>{role}</p>
        <p>{team}</p>
      </div>
      {reveal && (
        <div className="work-card-reveal">
          <div className="work-card-reveal-inner">
            <p>{reveal.label}</p>
            {reveal.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      )}
      <span
        ref={(node) => {
          captionRef.current = node
          if (node) {
            node.style.left = `${posRef.current.x}px`
            node.style.top = `${posRef.current.y}px`
          }
        }}
        className={`work-card-cursor-caption${hovering ? ' is-visible' : ''}`}
        aria-hidden="true"
      >
        {`* ${caption} *`}
      </span>
    </Wrapper>
  )
}

export default function Home() {
  // The single open card on touch, lifted here (not per-card local state)
  // so opening one card can collapse whichever other one was open - see
  // the two-tap gesture in WorkCard and .work-card.is-revealed in
  // Home.css. Only ever set from a coarse-pointer tap (WorkCard's
  // matchMedia guard), so this has no effect on desktop.
  const [activeCardId, setActiveCardId] = useState(null)

  // A tap outside every card collapses whichever one is open. Only
  // attached while a card is actually open, and activeCardId is only ever
  // set via the touch path above, so this never runs on desktop.
  useEffect(() => {
    if (!activeCardId) return
    const onPointerDown = (e) => {
      if (e.target.closest('[data-project]')) return
      setActiveCardId(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [activeCardId])

  return (
    <>
      <div className="home">
        <Sidebar />
        <main className="work-grid" id="work">
          <div className="work-column">
            <WorkCard {...works[0]} activeCardId={activeCardId} setActiveCardId={setActiveCardId} />
            <WorkCard {...works[2]} activeCardId={activeCardId} setActiveCardId={setActiveCardId} />
          </div>
          <div className="work-column">
            <WorkCard {...works[1]} activeCardId={activeCardId} setActiveCardId={setActiveCardId} />
            <WorkCard {...works[3]} activeCardId={activeCardId} setActiveCardId={setActiveCardId} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
