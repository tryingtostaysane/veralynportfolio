import { useEffect, useState } from 'react'
import bioscentImg from '../assets/work-cards/bioscent.jpg'
import cookpilotImg from '../assets/work-cards/cookpilot.jpg'
import visualeyesImg from '../assets/work-cards/visualeyes.jpg'
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
    <svg className="cook-instruction-clock" viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4.75V8L10.2 9.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WorkCard({ id, image, title, description, role, team, reveal, cookingInstructions }) {
  return (
    <article className="work-card" data-project={id}>
      <div className="work-card-media">
        <div className="work-card-image-wrap">
          <img className="work-card-image" src={image} alt="" />
          {cookingInstructions && <CookingInstructions instructions={cookingInstructions} />}
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
    <div className="home">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="intro">
            <h1 className="name">
              Veralyn
              <br />
              Chong
            </h1>
            <p className="bio">
              Designer at heart, studying CS @ UTS.
              <br />
              <br />
              I love building thoughtful products that feel good to use and solve something real.
            </p>
          </div>
          <hr className="sidebar-divider" />
          <nav className="nav-links">
            <a href="#work">Works &rarr;</a>
            <a href="#about">About Me &rarr;</a>
          </nav>
        </div>
        <div className="contact">
          <p>Let&rsquo;s chat !</p>
          <p>LinkedIn: @veralynliyi</p>
          <p>E: veralynliyi@gmail.com</p>
        </div>
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
  )
}
