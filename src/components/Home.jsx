import { useEffect, useState } from 'react'
import bioscentImg from '../assets/work-cards/bioscent.jpg'
import cookpilotImg from '../assets/work-cards/cookpilot.jpg'
import visualeyesImg from '../assets/work-cards/visualeyes.jpg'
import visualeyesFrameMeeting from '../assets/work-cards/visualeyes-frame-meeting.png'
import visualeyesFramePresentation from '../assets/work-cards/visualeyes-frame-presentation.png'
import visualeyesFrameGallery from '../assets/work-cards/visualeyes-frame-gallery.png'
import visualeyesFrameVideoCall from '../assets/work-cards/visualeyes-frame-video-call.png'
import './Home.css'

const INSTRUCTION_HOLD_MS = 4800
const INSTRUCTION_FADE_MS = 700

const works = [
  {
    id: 'bioscent',
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
    detectionPoint: { left: 77.34, top: 59.39 },
  },
  {
    id: 'cookpilot',
    image: cookpilotImg,
    title: 'CookPilot',
    description: 'An intelligent hands-free cooking assistant with Meta AI Glasses.',
    role: 'My Role: Product Designer, UX Design',
    team: 'My Team : 1 x Meta Dev, 1 x iOS Dev',
    reveal: {
      label: 'Awards \u{1F3C6}:',
      lines: ['ICON UNSW x Lyra ’26 | 1st Place'],
    },
    cookingInstructions: [
      {
        label: 'Step 1 of 5',
        text: ['Toast bread slices in pan or toaster until golden ', { highlight: 'brown.' }],
        meta: '4 min',
      },
      {
        label: 'Step 2 of 5',
        text: ['Fry spam bacon in a pan on medium heat until cooked ', { highlight: 'through.' }],
        meta: '5 min',
      },
      {
        label: 'Cooking assistant',
        icon: '✨',
        text: ['Spam looks pale and starting to cook. Keep frying on ', { highlight: 'medium' }, ' until brown and hot'],
        meta: null,
      },
    ],
  },
  {
    id: 'visualeyes',
    image: visualeyesImg,
    title: 'VisualEyes',
    description: 'An immersive environment that helps student see a possible version of their future self.',
    role: 'My Role: Spatial UX, Product Designer',
    team: 'My Team : 2 x Devs, 2 x UI Designers',
    reveal: {
      label: 'Program:',
      lines: ['Apple Foundation Program @ UTS ’26'],
    },
    skyFrames: [
      { src: visualeyesFrameMeeting, left: 32.44, top: 14.78, width: 12.45 },
      { src: visualeyesFramePresentation, left: 57.48, top: 8.11, width: 7.57 },
      { src: visualeyesFrameGallery, left: 55.51, top: 31.08, width: 10.75 },
      { src: visualeyesFrameVideoCall, left: 36.92, top: 47.8, width: 6.81 },
    ],
  },
]

function CookingInstructions({ instructions }) {
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

function ClockIcon() {
  return (
    <svg className="cook-instruction-clock" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4.75V8L10.2 9.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LocationMarkerIcon() {
  return (
    <svg className="location-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.75781 4.75781C8.10096 2.41467 11.899 2.41467 14.2422 4.75781C16.5853 7.10096 16.5853 10.899 14.2422 13.2422L10 17.4844L5.75781 13.2422C3.41467 10.899 3.41467 7.10096 5.75781 4.75781ZM10 6C8.34315 6 7 7.34315 7 9C7 10.6569 8.34315 12 10 12C11.6569 12 13 10.6569 13 9C13 7.34315 11.6569 6 10 6Z"
        fill="var(--color-main-gold)"
        stroke="var(--color-main-gold)"
        strokeWidth="2"
      />
    </svg>
  )
}

function LinkedInBadgeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4063 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4063 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39063 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39063 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031V40.9031Z"
        fill="white"
      />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="social-icon-glyph" viewBox="0 0 27 23" fill="none" aria-hidden="true">
      <path
        d="M13.4994 9.65904C15.7993 9.65904 26.982 3.37065 26.982 3.37065L27 2.2471C27 1.0067 25.9933 0 24.7495 0H2.24934C1.0067 0 0 1.0067 0 2.2471V3.24818C0 3.24818 11.3051 9.65904 13.4994 9.65904Z"
        fill="var(--color-main-gold)"
      />
      <path
        d="M13.4994 12.7485C11.3051 12.7485 0.0168532 6.74102 0.0179768 6.74102L0 20.2236C0 21.464 1.00782 22.4707 2.24934 22.4707H24.7495C25.9933 22.4707 27 21.464 27 20.2236L26.982 6.74102C26.982 6.74102 15.905 12.7485 13.4994 12.7485Z"
        fill="var(--color-main-gold)"
      />
    </svg>
  )
}

function SkyFrames({ frames }) {
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

function DeviceDetector({ point }) {
  return (
    <div className="bioscent-detect" style={{ left: `${point.left}%`, top: `${point.top}%` }}>
      <span className="bioscent-detect-ring" />
      <span className="bioscent-detect-ring" />
      <span className="bioscent-detect-core" />
    </div>
  )
}

function WorkCard({ id, image, title, description, role, team, reveal, cookingInstructions, skyFrames, detectionPoint }) {
  return (
    <article className="work-card" data-project={id}>
      <div className="work-card-media">
        <div className="work-card-image-wrap">
          <img className="work-card-image" src={image} alt="" />
          {cookingInstructions && <CookingInstructions instructions={cookingInstructions} />}
          {skyFrames && <SkyFrames frames={skyFrames} />}
          {detectionPoint && <DeviceDetector point={detectionPoint} />}
        </div>
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
    </article>
  )
}

export default function Home() {
  return (
    <>
      <div className="home">
        <aside className="sidebar">
          <div className="intro">
            <div className="intro-heading">
              <h1 className="name">Veralyn Chong</h1>
              <p className="location">
                <LocationMarkerIcon />
                <span>Sydney, NSW</span>
              </p>
            </div>
            <div className="role-bio">
              <p className="role">{'Computer Science @ UTS  |   UIUX Intern @ StudioLDN'}</p>
              <p className="bio">
                I&rsquo;m passionate about building thoughtful products that solve actual problems, and I&rsquo;m exploring the world where design, engineering and AI come together.
              </p>
            </div>
          </div>
          <hr className="sidebar-divider" />
          <nav className="nav-links">
            <a href="#work">
              <span className="nav-link-text">Works</span>
            </a>
            <a href="#about">
              <span className="nav-link-text">About me</span>
            </a>
            <a href="mailto:veralynliyi@gmail.com">
              <span className="nav-link-text">Let&rsquo;s chat!</span>
            </a>
            <span className="nav-link-pending">Playground *coming soon*</span>
          </nav>
        </aside>
        <main className="work-grid" id="work">
          <div className="work-column">
            <WorkCard {...works[0]} />
            <WorkCard {...works[2]} />
          </div>
          <div className="work-column">
            <WorkCard {...works[1]} />
          </div>
        </main>
      </div>
      <footer className="site-footer">
        <div className="site-footer-top">
          <div className="site-footer-socials">
            <a
              className="social-icon-plain"
              href="https://www.linkedin.com/in/veralynliyi"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInBadgeIcon />
            </a>
            <a className="social-icon" href="mailto:veralynliyi@gmail.com" aria-label="Email">
              <EmailIcon />
            </a>
          </div>
          <p className="site-footer-name">Veralyn Chong</p>
          <nav className="site-footer-nav">
            <a href="#work">All projects</a>
            <a href="#about">About me</a>
            <span className="nav-link-pending">Resume</span>
          </nav>
        </div>
        <hr className="site-footer-divider" />
        <p className="site-footer-copyright">&copy; 2026 Veralyn &bull; Privacy</p>
      </footer>
    </>
  )
}
