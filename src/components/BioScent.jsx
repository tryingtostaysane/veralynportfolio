import { useState, useRef, Fragment } from 'react'
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import ProjectThumbnail from './ProjectThumbnail.jsx'
import SectionVideo from './SectionVideo.jsx'
import { bioscentHeroImg, BIOSCENT_HERO_ASPECT_RATIO, BIOSCENT_HERO_DETECTION_POINT } from '../data/projectThumbnails.js'
import researchBg from '../assets/case-studies/bioscent/research-bg.jpg'
import researchScreenshot1 from '../assets/case-studies/bioscent/research-screenshot-1.png'
import researchScreenshot2 from '../assets/case-studies/bioscent/research-screenshot-2.png'
import insight2Photo from '../assets/case-studies/bioscent/insight2-photo.png'
import inspirationDogDetection from '../assets/case-studies/bioscent/inspiration/dog-detection.png'
import journeyBeforeNotice from '../assets/case-studies/bioscent/journey/before-1-notice.png'
import journeyBeforeSearch from '../assets/case-studies/bioscent/journey/before-2-search.png'
import journeyBeforeOverload from '../assets/case-studies/bioscent/journey/before-3-overload.png'
import journeyBeforeCalendar from '../assets/case-studies/bioscent/journey/before-4-calendar.png'
import journeyBeforeDoctor from '../assets/case-studies/bioscent/journey/before-5-doctor.png'
import journeyAfterMonitoring from '../assets/case-studies/bioscent/journey/after-1-monitoring.png'
import journeyAfterBaseline from '../assets/case-studies/bioscent/journey/after-2-baseline.png'
import journeyAfterDetect from '../assets/case-studies/bioscent/journey/after-3-detect.png'
import journeyAfterInsight from '../assets/case-studies/bioscent/journey/after-4-insight.png'
import journeyAfterNextstep from '../assets/case-studies/bioscent/journey/after-5-nextstep.png'
import ecosystemDiagram from '../assets/case-studies/bioscent/ecosystem/ecosystem-diagram.png'
import solutionOnboardingVideo from '../assets/case-studies/bioscent/solution/onboarding.mp4'
import solutionHealthIndexVideo from '../assets/case-studies/bioscent/solution/health-index.mp4'
import solutionScienceVideo from '../assets/case-studies/bioscent/solution/science.mp4'
import solutionBaselineVideo from '../assets/case-studies/bioscent/solution/baseline.mp4'
import reflectionCollageWide from '../assets/case-studies/bioscent/reflection/collage-wide.jpg'
import reflectionCollagePortrait1 from '../assets/case-studies/bioscent/reflection/collage-portrait-1.jpg'
import reflectionCollagePortrait2 from '../assets/case-studies/bioscent/reflection/collage-portrait-2.jpg'
import reflectionCollagePortrait3 from '../assets/case-studies/bioscent/reflection/collage-portrait-3.jpg'
import './BioScent.css'

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 16.8 16.8" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.22426 12.4243C7.98995 12.6586 7.61005 12.6586 7.37574 12.4243L3.77574 8.82426C3.54142 8.58995 3.54142 8.21005 3.77574 7.97574L7.37574 4.37574C7.61005 4.14142 7.98995 4.14142 8.22427 4.37574C8.45858 4.61005 8.45858 4.98995 8.22427 5.22426L5.64853 7.8H12.6C12.9314 7.8 13.2 8.06863 13.2 8.4C13.2 8.73137 12.9314 9 12.6 9L5.64853 9L8.22426 11.5757C8.45858 11.8101 8.45858 12.19 8.22426 12.4243Z"
        fill="white"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16.8 16.8" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.57574 4.37574C8.81005 4.14142 9.18995 4.14142 9.42426 4.37574L13.0243 7.97574C13.2586 8.21005 13.2586 8.58995 13.0243 8.82426L9.42426 12.4243C9.18995 12.6586 8.81005 12.6586 8.57574 12.4243C8.34142 12.19 8.34142 11.8101 8.57574 11.5757L11.1515 9L4.2 9C3.86863 9 3.6 8.73137 3.6 8.4C3.6 8.06863 3.86863 7.8 4.2 7.8H11.1515L8.57574 5.22426C8.34142 4.98995 8.34142 4.61005 8.57574 4.37574Z"
        fill="white"
      />
    </svg>
  )
}

// User Journey connector arrow (Figma node 555:1869 "Arrow 1" etc):
// a plain horizontal arrow linking each step card to the next.
function JourneyConnectorArrow() {
  return (
    <svg className="user-journey-connector" viewBox="0 0 27.195 10.825" fill="none" aria-hidden="true">
      <path d="M26.9797 5.93223C27.2668 5.6452 27.2668 5.17982 26.9797 4.89279L22.3022 0.215277C22.0152 -0.0717587 21.5498 -0.0717587 21.2628 0.215277C20.9757 0.502312 20.9757 0.967689 21.2628 1.25472L25.4206 5.41251L21.2628 9.5703C20.9757 9.85733 20.9757 10.3227 21.2628 10.6097C21.5498 10.8968 22.0152 10.8968 22.3022 10.6097L26.9797 5.93223ZM0 5.41251V6.14751H26.46V5.41251V4.67751H0V5.41251Z" fill="currentColor" />
    </svg>
  )
}

// Research Insights carousel (Figma nodes 545:3341 "Insight 2" onward
// share the exact layout of Insight 1, node 432:22597) - card + facts
// content per slide, swapped by the nav buttons below.
const RESEARCH_INSIGHTS = [
  {
    title: 'Insight 1',
    description: (
      <>
        <p>Cancer can alter the pattern of Volatile Organic Compounds (VOCs) produced by the body.</p>
        <p>These VOC signatures can be analysed in biological samples as potential biomarkers for detecting cancer.</p>
      </>
    ),
    card: (
      <>
        <div className="case-study-research-card-bg" style={{ backgroundImage: `url(${researchBg})` }} />
        <div className="case-study-research-card-collage">
          <img
            className="case-study-research-screenshot case-study-research-screenshot-1"
            src={researchScreenshot1}
            alt="Screenshot of a research article on volatile organic compounds in exhaled breath for cancer diagnosis"
          />
          <img
            className="case-study-research-screenshot case-study-research-screenshot-2"
            src={researchScreenshot2}
            alt="Screenshot of a research article on new volatile organic compounds discovered from exhaled breath in tuberculosis patients"
          />
        </div>
      </>
    ),
  },
  {
    title: 'Insight 2',
    description: (
      <>
        <p>Breath based VOC detection already exists, but most current approaches still rely on specialised equipment, or lab analysis.</p>
        <div className="case-study-research-tech-list">
          <p>Existing technologies include:</p>
          <p>&rarr; GC-MS : highly accurate lab analysis of individual VOCs</p>
          <p>&rarr; Breath Biopsy : collects and analyses VOCs from exhaled breath</p>
          <p>&rarr; Nanosensor arrays : detect patterns of cancer-related VOCs</p>
          <p>&rarr; Electronic noses (e-nose) : use sensor arrays to recognise VOC patterns</p>
        </div>
      </>
    ),
    card: (
      <>
        <div className="case-study-research-card-bg" style={{ backgroundImage: `url(${researchBg})` }} />
        <div className="case-study-research-card-collage">
          <img
            className="case-study-research-screenshot-main"
            src={insight2Photo}
            alt="An elderly patient undergoing a breath-based volatile organic compound test while a clinician looks on"
          />
        </div>
      </>
    ),
  },
]

// User Journey (Figma node 555:2150): two static 5-step rows, "Before
// BioScent" and "After BioScent", each card linked to the next with a
// connector arrow - no carousel/scrolling now that each row is a fixed
// 5 steps. Before cards are all bioscent-beige, After cards are all
// bioscent-green-light (no alternating fill).
const USER_JOURNEY_TRACKS = [
  {
    id: 'before',
    heading: 'Before BioScent',
    variant: 'beige',
    cards: [
      { icon: journeyBeforeNotice, title: 'Notice body changes', description: 'Felt that something is different but isn’t sure if it means anything.' },
      { icon: journeyBeforeSearch, title: 'Search for answer', description: 'Google/ ChatGPT symptoms to understand what it could be.' },
      { icon: journeyBeforeOverload, title: 'Information overload', description: 'Finds conflicting advice and generic information online. Feels even more confused.' },
      { icon: journeyBeforeCalendar, title: 'Tries to self monitor', description: 'Manually tracks symptoms, mood or physical changes but it’s inconsistent and hard to keep up.' },
      { icon: journeyBeforeDoctor, title: 'Should I see a doctor?', description: 'Still unsure if the symptoms is serious enough to see a doctor. Feels anxious and reluctant to overeact.' },
    ],
  },
  {
    id: 'after',
    heading: 'After BioScent',
    variant: 'green',
    cards: [
      { icon: journeyAfterMonitoring, title: 'Passive monitoring', description: 'BioScent continuously collects breath and skin VOC data in the background.' },
      { icon: journeyAfterBaseline, title: 'Learns your baseline', description: 'BioScent understands what’s normal for YOU based on your unique biomarkers.' },
      { icon: journeyAfterDetect, title: 'Detect meaningful changes', description: 'AI identifies patterns and flags significant deviations early.' },
      { icon: journeyAfterInsight, title: 'Receives a clear insight', description: 'Gets easy to understand explanations of what’s changed and what it could mean.' },
      { icon: journeyAfterNextstep, title: 'Knows what to do next', description: 'Receives a personalised recommendation - monitor, take action or speak to a healthcare professional.' },
    ],
  },
]

function UserJourneyCard({ index, icon, title, description, variant }) {
  return (
    <div className={`user-journey-card user-journey-card-${variant}`}>
      <div className="user-journey-card-text">
        <p className="user-journey-card-number">{index}</p>
        <p className="user-journey-card-title">{title}</p>
        <p className="user-journey-card-description">{description}</p>
      </div>
      <div className="user-journey-card-icon-slot">
        <img className="user-journey-card-icon" src={icon} alt="" />
      </div>
    </div>
  )
}

function UserJourneyTrack({ heading, variant, cards }) {
  return (
    <div className="user-journey-track">
      <h3 className="user-journey-track-heading">{heading}</h3>
      <div className="user-journey-track-row">
        {cards.map((card, i) => (
          <Fragment key={i}>
            <UserJourneyCard index={i + 1} variant={variant} {...card} />
            {i < cards.length - 1 && <JourneyConnectorArrow />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

// Limitation (Figma node 571:1275): 3 equal fixed-width (268px) cards,
// left-aligned title + description, all titles now plain strings that
// wrap naturally at the card width (no more forced 2-line break on the
// first card).
const LIMITATIONS = [
  {
    title: 'Accuracy and false positives',
    description: 'Comprehensive clinical validation is needed before being used.',
  },
  {
    title: 'Health anxiety risks',
    description: 'Alerts must be carefully designed to inform users without creating panic.',
  },
  {
    title: 'Protecting data privacy',
    description: 'Breath and body signal data would require strong consent, transparency and user control.',
  },
]

// Solution (Figma node 524:2936): 4 feature cards on the left, clicking
// one swaps the muted looping demo video shown in the phone mockup on
// the right. Figma's own placeholder is a flat grey rectangle with no
// device chrome and no "selected" card state - both are this file's own
// additions (a drawn phone bezel, and an accent-filled active card).
const SOLUTION_FEATURES = [
  {
    title: 'Simple onboarding Process',
    description: 'Guiding users through their first baseline capture without overwhelming them with technical detail.',
    video: solutionOnboardingVideo,
  },
  {
    title: 'Direct health index recognition',
    description: 'Clear health index states allows quick understanding whether their body require further attention.',
    video: solutionHealthIndexVideo,
  },
  {
    title: 'Plain language Science',
    description: 'Explains the Science behind each signal in simple term.',
    video: solutionScienceVideo,
  },
  {
    title: 'Personalised baseline',
    description: 'Measures 7 days health changes against the user’s personal baseline to highlight meaningful shifts.',
    video: solutionBaselineVideo,
  },
]

function SolutionSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = SOLUTION_FEATURES[activeIndex]

  return (
    <div className="solution-body">
      <div className="solution-feature-list">
        {SOLUTION_FEATURES.map((feature, i) => (
          <button
            key={feature.title}
            type="button"
            className={`solution-feature${i === activeIndex ? ' solution-feature-active' : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-pressed={i === activeIndex}
          >
            <p className="solution-feature-title">{feature.title}</p>
            <p className="solution-feature-description">{feature.description}</p>
          </button>
        ))}
      </div>
      <div className="solution-mockup">
        <div className="solution-phone">
          <div className="solution-phone-notch" aria-hidden="true" />
          <SectionVideo key={active.video} src={active.video} frameClassName="solution-phone-screen" videoClassName="solution-phone-video" />
        </div>
      </div>
    </div>
  )
}

// Reflection (Figma node 432:22746): tag+heading intro, then a row of
// 3 text columns (What I learned / Challenges / Next steps), then a
// photo collage - one wide image followed by a row of 3 equal
// portrait images.
const REFLECTIONS = [
  {
    title: 'What I learned',
    description: 'Health insights need to be designed with emotional safety, not just accuracy.',
  },
  {
    title: 'Challenges',
    description: 'Translating complex VOC Science into plain language without making medical claims.',
  },
  {
    title: 'Next steps',
    description: 'Test the prototype with users and healthcare professionals to validate trust and alert sensitivity.',
  },
]

const REFLECTION_COLLAGE_PORTRAITS = [
  { src: reflectionCollagePortrait1, caption: 'Pitching for the first time :)' },
  { src: reflectionCollagePortrait2, caption: 'Me, oliver and muffin' },
  { src: reflectionCollagePortrait3, caption: 'Bioscent got onto the international stage in china!' },
]

// Cursor-following caption pop-up for the Reflection collage photos - not
// in Figma, this file's own addition. Position tracks the mouse within the
// photo itself rather than a fixed spot, so it works the same regardless of
// where in the frame the joke/detail actually sits.
//
// Position is written straight to the DOM (via a ref) instead of through
// React state - routing every mousemove through setState+re-render adds a
// frame of latency that reads as the label trailing behind the cursor.
// posRef carries the latest coordinates across renders so the label can be
// placed correctly the instant it mounts (mouseenter fires before the span
// exists yet), without needing a layout effect.
function CollageCaptionPhoto({ src, alt, caption, className }) {
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
    <div
      className={`case-study-reflection-collage-item ${className}`}
      onMouseEnter={(e) => {
        updatePos(e)
        setHovering(true)
      }}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={updatePos}
    >
      <img className="case-study-reflection-collage-photo" src={src} alt={alt} />
      <span
        ref={(node) => {
          captionRef.current = node
          if (node) {
            node.style.left = `${posRef.current.x}px`
            node.style.top = `${posRef.current.y}px`
          }
        }}
        className={`case-study-reflection-collage-caption${hovering ? ' is-visible' : ''}`}
      >
        {caption}
      </span>
    </div>
  )
}

export default function BioScent() {
  const [activeInsight, setActiveInsight] = useState(0)
  const [insightDirection, setInsightDirection] = useState(1)
  const insight = RESEARCH_INSIGHTS[activeInsight]
  const goToPrevInsight = () => {
    setInsightDirection(-1)
    setActiveInsight((i) => (i - 1 + RESEARCH_INSIGHTS.length) % RESEARCH_INSIGHTS.length)
  }
  const goToNextInsight = () => {
    setInsightDirection(1)
    setActiveInsight((i) => (i + 1) % RESEARCH_INSIGHTS.length)
  }
  const goToInsight = (i) => {
    setInsightDirection(i > activeInsight ? 1 : -1)
    setActiveInsight(i)
  }

  return (
    <>
      <div className="case-study">
        <Sidebar />
        <main className="case-study-main">
          <section className="case-study-section case-study-hero" aria-labelledby="bioscent-title">
            <div className="case-study-hero-banner">
              <ProjectThumbnail
                image={bioscentHeroImg}
                aspectRatio={BIOSCENT_HERO_ASPECT_RATIO}
                detectionPoint={BIOSCENT_HERO_DETECTION_POINT}
                alt="A person preparing tea in a kitchen beside a shelf holding a BioScent air-sensing device among house plants"
              />
            </div>
            <div className="case-study-hero-info">
              <div className="case-study-hero-intro">
                <h1 id="bioscent-title" className="case-study-title">
                  BioScent
                </h1>
                <p className="case-study-subtitle">Making invisible health signals visible through AI powered VOC sensing</p>
              </div>
              <div className="case-study-meta">
                <div className="case-study-meta-column">
                  <div className="case-study-meta-block">
                    <p>Team :</p>
                    <p>My Role : Product Designer</p>
                    <p>My team : 1 x Business strategist</p>
                  </div>
                  <div className="case-study-meta-block case-study-meta-block-skills">
                    <p>Skills :</p>
                    <p>Product Thinking, UX Research, Vibe Coding</p>
                  </div>
                </div>
                <div className="case-study-meta-column">
                  <div className="case-study-meta-block">
                    <p>Awards 🏆 :</p>
                    <p>RedBull Basement AU &rsquo;26 | National Finalist</p>
                    <p>Tencent Future Close Up &rsquo;26 | 3rd Place</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-assumptions" aria-labelledby="initial-assumptions-title" id="initial-assumptions">
            <div className="case-study-assumptions-inner">
              <div className="case-study-section-intro">
                <span className="case-study-tag">INITIAL ASSUMPTIONS</span>
                <h2 id="initial-assumptions-title" className="case-study-section-heading">
                  Where we started ?
                </h2>
                <p className="case-study-section-description">
                  We turned each of these assumptions into a research question, which led us into the Science aspect.
                </p>
              </div>
              <ol className="case-study-assumptions-list">
                <li className="case-study-assumptions-item">People don&rsquo;t act on slight symptoms if it doesn&rsquo;t affect their lives significantly.</li>
                <li className="case-study-assumptions-item case-study-assumptions-item-translucent">Certain illnesses doesn&rsquo;t display visible early stage signs at all.</li>
                <li className="case-study-assumptions-item">They might be too busy hence doesn&rsquo;t feel the need for minor health check.</li>
              </ol>
            </div>
          </section>
          <section className="case-study-section case-study-problem" aria-labelledby="problem-title" id="problem">
            <div className="case-study-section-intro">
              <span className="case-study-tag">PROBLEM</span>
              <h2 id="problem-title" className="case-study-section-heading">
                Globally, about 1 in 5 people are expected to develop cancer in their lifetime
              </h2>
              <p className="case-study-section-description">
                Yet, people are <strong><em>unlikely to detect their symtomps of cancer before it&rsquo;s too late.</em></strong>
              </p>
            </div>
          </section>
          {/* Figma node 524:2936 (BioScent frame, added between the
              "Problem" and "Research" sections in the latest edit): two
              rounded tiles cropped from one composite source image
              (src/assets/case-studies/bioscent/inspiration/dog-detection.png)
              rather than two separate files - Figma's own export uses the
              same fill for both at different offsets/scale, reproduced here
              with the matching literal crop percentages. */}
          <section className="case-study-section case-study-inspiration" aria-labelledby="inspiration-title" id="inspiration">
            <div className="case-study-section-intro">
              <span className="case-study-tag">INSPIRATION</span>
              <h2 id="inspiration-title" className="case-study-section-heading">
                Inspired by dog&rsquo;s incredible sense of smell.
              </h2>
            </div>
            <div className="case-study-inspiration-images">
              <div className="case-study-inspiration-image">
                <img className="case-study-inspiration-image-dog" src={inspirationDogDetection} alt="A Labrador wearing a Medical Detection Dogs vest" />
              </div>
              <div className="case-study-inspiration-image">
                <img className="case-study-inspiration-image-article" src={inspirationDogDetection} alt="Article screenshot: &ldquo;Can dogs smell cancer?&rdquo;" />
              </div>
            </div>
            <div className="case-study-inspiration-description">
              <p className="case-study-section-description">
                We came across articles talking about how dogs can smell cancer. Research into canine scent detection apparently revealed that dogs are capable of identifying cancers through VOCs emitted by the human&rsquo;s body.
              </p>
              <p className="case-study-section-description">
                We thought &ldquo;If dogs can sense invisible biological changes, could we transfer that ability into technology?&rdquo; That thought led us into our research for VOCs and air based health detecting system.
              </p>
            </div>
          </section>
          <section className="case-study-section case-study-research" aria-labelledby="research-title" id="research">
            <div className="case-study-research-intro">
              <span className="case-study-tag">BIOMEDICAL / TECH RESEARCH</span>
              <h2 id="research-title" className="case-study-section-heading">
                Research Insights
              </h2>
            </div>
            <div className="case-study-research-body">
              <div className="case-study-research-content" key={activeInsight} data-direction={insightDirection}>
                <div className="case-study-research-card">{insight.card}</div>
                <div className="case-study-research-facts">
                  <p className="case-study-research-fact-title">{insight.title}</p>
                  <div className="case-study-research-fact-description">{insight.description}</div>
                  <div className="case-study-research-nav">
                    <button type="button" className="case-study-research-nav-button" onClick={goToPrevInsight} aria-label="Previous insight">
                      <ArrowLeftIcon />
                    </button>
                    <button type="button" className="case-study-research-nav-button" onClick={goToNextInsight} aria-label="Next insight">
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </div>
              <div className="case-study-research-dots" role="tablist" aria-label="Research insight slides">
                {RESEARCH_INSIGHTS.map((researchInsight, i) => (
                  <button
                    key={researchInsight.title}
                    type="button"
                    role="tab"
                    className={`case-study-research-dot${i === activeInsight ? ' case-study-research-dot-active' : ''}`}
                    onClick={() => goToInsight(i)}
                    aria-selected={i === activeInsight}
                    aria-label={`Show ${researchInsight.title}`}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-how-might-we" aria-labelledby="how-might-we-title" id="how-might-we">
            <span className="case-study-tag">HOW MIGHT WE</span>
            <div className="case-study-hmw-card">
              <h2 id="how-might-we-title" className="case-study-hmw-question">
                How might we help individuals recognise subtle biological changes earlier, while communicating uncertainty in a calm and trustworthy way?
              </h2>
            </div>
          </section>
          <section className="case-study-section case-study-ecosystem" aria-labelledby="ecosystem-title" id="ecosystem">
            <div className="case-study-ecosystem-inner">
              <div className="case-study-ecosystem-intro">
                <span className="case-study-tag">ECOSYSTEM</span>
                <h2 id="ecosystem-title" className="case-study-ecosystem-heading">
                  Personal Intelligence
                </h2>
              </div>
              <img className="case-study-ecosystem-diagram" src={ecosystemDiagram} alt="Diagram of the BioScent ecosystem: data sources and wearables feed the central BioScent hub, which shares insights and alerts with the health ecosystem, all under oversight & governance and powered by system intelligence in a continuous learning loop" />
            </div>
          </section>
          <section className="case-study-section case-study-journey" aria-label="User Journey" id="user-journey">
            <span className="case-study-tag">USER JOURNEY</span>
            <div className="case-study-journey-tracks">
              {USER_JOURNEY_TRACKS.map((track) => (
                <UserJourneyTrack key={track.id} {...track} />
              ))}
            </div>
          </section>
          <section className="case-study-section case-study-solution" aria-labelledby="solution-title" id="solution">
            <div className="case-study-section-intro">
              <span className="case-study-tag">SOLUTION</span>
              <h2 id="solution-title" className="case-study-section-heading">
                Designed to inform, not alarm
              </h2>
            </div>
            <SolutionSection />
          </section>
          <section className="case-study-section case-study-limitation" aria-labelledby="limitation-title" id="limitation">
            <div className="case-study-section-intro">
              <span className="case-study-tag">LIMITATION</span>
              <h2 id="limitation-title" className="case-study-section-heading">
                Other constraints that need to be taken into consideration
              </h2>
            </div>
            <ul className="case-study-limitation-list">
              {LIMITATIONS.map((item, i) => (
                <li key={i} className="case-study-limitation-item">
                  <p className="case-study-limitation-item-title">{item.title}</p>
                  <p className="case-study-limitation-item-description">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="case-study-section case-study-reflection" aria-labelledby="reflection-title" id="reflection">
            <div className="case-study-section-intro">
              <span className="case-study-tag">REFLECTION</span>
              <h2 id="reflection-title" className="case-study-section-heading">
                Designing for health = designing for trust
              </h2>
            </div>
            <ul className="case-study-reflection-columns">
              {REFLECTIONS.map((item, i) => (
                <li key={i} className="case-study-reflection-column">
                  <p className="case-study-reflection-column-title">{item.title}</p>
                  <p className="case-study-reflection-column-description">{item.description}</p>
                </li>
              ))}
            </ul>
            <div className="case-study-reflection-collage">
              <CollageCaptionPhoto
                src={reflectionCollageWide}
                alt="The BioScent team celebrating their RedBull Basement Australia national final win on stage"
                caption="Redbull basement '26 national finals pitch @ macquarie"
                className="case-study-reflection-collage-wide"
              />
              <div className="case-study-reflection-collage-row">
                {REFLECTION_COLLAGE_PORTRAITS.map((item, i) => (
                  <CollageCaptionPhoto
                    key={i}
                    src={item.src}
                    alt=""
                    caption={item.caption}
                    className="case-study-reflection-collage-portrait"
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-thank-you" aria-labelledby="thank-you-title">
            <p className="case-study-thank-you-eyebrow">If you got this far,</p>
            <div className="case-study-thank-you-card">
              <h2 id="thank-you-title" className="case-study-thank-you-title">
                Thank You!
              </h2>
              <p className="case-study-thank-you-description">
                I hope you enjoyed reading through the project and seeing what I created!
                <br />
                Feel free to drop me any feedback on LinkedIn. :)
              </p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}
