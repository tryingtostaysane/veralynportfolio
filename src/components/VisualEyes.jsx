import { useState, useRef } from 'react'
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import ProjectThumbnail from './ProjectThumbnail.jsx'
import SectionVideo from './SectionVideo.jsx'
import { visualeyesImg, VISUALEYES_HERO_ASPECT_RATIO, VISUALEYES_HERO_SKY_FRAMES } from '../data/projectThumbnails.js'
import passionMindmap from '../assets/case-studies/visualeyes/passion-mindmap.png'
import passionStickynotes from '../assets/case-studies/visualeyes/passion-stickynotes.png'
import interviewBoard from '../assets/case-studies/visualeyes/interview-board.png'
import interviewPhoto1 from '../assets/case-studies/visualeyes/interview-photo-1.png'
import interviewPhoto2 from '../assets/case-studies/visualeyes/interview-photo-2.png'
import interviewPhoto3 from '../assets/case-studies/visualeyes/interview-photo-3.png'
import personaDrifter from '../assets/case-studies/visualeyes/persona-drifter.png'
import personaExplorer from '../assets/case-studies/visualeyes/persona-explorer.png'
import personaPlanner from '../assets/case-studies/visualeyes/persona-planner.png'
import solutionWall1 from '../assets/case-studies/visualeyes/solution-wall-1.png'
import solutionWall2 from '../assets/case-studies/visualeyes/solution-wall-2.png'
import solutionWall3 from '../assets/case-studies/visualeyes/solution-wall-3.png'
import introScreenSketchV1 from '../assets/case-studies/visualeyes/intro-screen-sketch-v1.png'
import introScreenSketchV2 from '../assets/case-studies/visualeyes/intro-screen-sketch-v2.png'
import safetyDeclarationSketchV1 from '../assets/case-studies/visualeyes/safety-declaration-sketch-v1.png'
import safetyDeclarationSketchV2 from '../assets/case-studies/visualeyes/safety-declaration-sketch-v2.png'
import privacyPreferencesSketchV1 from '../assets/case-studies/visualeyes/privacy-preferences-sketch-v1.png'
import privacyPreferencesSketchV2 from '../assets/case-studies/visualeyes/privacy-preferences-sketch-v2.png'
import introScreenHifi from '../assets/case-studies/visualeyes/intro-screen-hifi.png'
import declarationHifi from '../assets/case-studies/visualeyes/declaration-hifi.png'
import privacyPreferencesHifi from '../assets/case-studies/visualeyes/privacy-preferences-hifi.png'
import quizHifi from '../assets/case-studies/visualeyes/quiz-hifi.png'
import inputTypeMcq from '../assets/case-studies/visualeyes/input-type-mcq.png'
import inputTypeRating from '../assets/case-studies/visualeyes/input-type-rating.png'
import inputTypeOpenEnded from '../assets/case-studies/visualeyes/input-type-open-ended.png'
import navKeyboardInput from '../assets/case-studies/visualeyes/nav-keyboard-input.mp4'
import navKeyboardScreen from '../assets/case-studies/visualeyes/nav-keyboard-screen.mp4'
import navConsoleInput from '../assets/case-studies/visualeyes/nav-console-input.mp4'
import navConsoleScreen from '../assets/case-studies/visualeyes/nav-console-screen.mp4'
import worldAiGenerated from '../assets/case-studies/visualeyes/world-ai-generated.mp4'
import worldPreset from '../assets/case-studies/visualeyes/world-preset.mp4'
import testingPhoto1 from '../assets/case-studies/visualeyes/testing-photo-1.png'
import testingPhoto2 from '../assets/case-studies/visualeyes/testing-photo-2.png'
import reflectionPhoto1 from '../assets/case-studies/visualeyes/reflection-photo-1.jpg'
import reflectionPhoto2 from '../assets/case-studies/visualeyes/reflection-photo-2.jpg'
import reflectionPhoto3 from '../assets/case-studies/visualeyes/reflection-photo-3.jpg'
import reflectionPhoto4 from '../assets/case-studies/visualeyes/reflection-photo-4.jpg'
import reflectionCollageWide from '../assets/case-studies/visualeyes/AFP-5.mp4'
import './VisualEyes.css'

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24.024 24.024" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7607 17.7667C11.4256 18.1018 10.8824 18.1018 10.5473 17.7667L5.3993 12.6187C5.06423 12.2836 5.06423 11.7404 5.3993 11.4053L10.5473 6.2573C10.8824 5.92223 11.4256 5.92223 11.7607 6.2573C12.0958 6.59237 12.0958 7.13563 11.7607 7.4707L8.0774 11.154H18.018C18.4919 11.154 18.876 11.5381 18.876 12.012C18.876 12.4859 18.4919 12.87 18.018 12.87L8.0774 12.87L11.7607 16.5533C12.0958 16.8884 12.0958 17.4316 11.7607 17.7667Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24.024 24.024" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2633 6.2573C12.5984 5.92223 13.1416 5.92223 13.4767 6.2573L18.6247 11.4053C18.9598 11.7404 18.9598 12.2836 18.6247 12.6187L13.4767 17.7667C13.1416 18.1018 12.5984 18.1018 12.2633 17.7667C11.9282 17.4316 11.9282 16.8884 12.2633 16.5533L15.9466 12.87L6.006 12.87C5.53214 12.87 5.148 12.4859 5.148 12.012C5.148 11.5381 5.53214 11.154 6.006 11.154H15.9466L12.2633 7.4707C11.9282 7.13563 11.9282 6.59237 12.2633 6.2573Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Student archetypes carousel (Figma nodes 573:2989 "card 1", 573:3057
// "card 2", 573:3058 "card 3") - designed as 3 separate static frames,
// implemented here as one carousel cycled by the two nav buttons, same
// pattern as BioScent's Research Insights and CookPilot's Before/During
// Cooking carousels.
const PERSONAS = [
  {
    image: personaDrifter,
    title: 'The high achieving drifter',
    description: "He's doing everything he's supposed to do, but he is not sure if that is actually what he wants. He also often felt pressure from family, peers and expectations.",
  },
  {
    image: personaExplorer,
    title: 'The uncertain explorer',
    description: "She often feels overwhelmed by choices and unsure of what fits. She has so many possibilities, but she doesn't know which one is right for her.",
  },
  {
    image: personaPlanner,
    title: 'The practical planner',
    description: "She wants a secure future, but she's fearful of missing out on what matters and losing herself in the process.",
  },
]

function PersonasCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const persona = PERSONAS[index]

  const goToPrev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + PERSONAS.length) % PERSONAS.length)
  }
  const goToNext = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % PERSONAS.length)
  }

  return (
    <div className="case-study-visualeyes-personas-card" key={index} data-direction={direction}>
      <img className="case-study-visualeyes-personas-image" src={persona.image} alt={`Photo representing the persona: ${persona.title}`} />
      <div className="case-study-visualeyes-personas-info">
        <p className="case-study-section-heading">{persona.title}</p>
        <p className="case-study-section-description">{persona.description}</p>
        <div className="case-study-visualeyes-personas-nav">
          <button type="button" className="case-study-visualeyes-personas-nav-button" onClick={goToPrev} aria-label="Previous persona">
            <ArrowLeftIcon />
          </button>
          <button type="button" className="case-study-visualeyes-personas-nav-button" onClick={goToNext} aria-label="Next persona">
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

function withAlpha(hex, alpha) {
  const value = parseInt(hex.slice(1), 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Quiz-to-prompt mapping (Figma node 574:3574 "Quiz input -> World
// generation"): 5 cards, title (H5 serif) + question (body) each, in
// their own stacked half-width column (.case-study-visualeyes-quiz-
// question(s) below). Figma's version of this section is otherwise
// just tag/heading/description over an empty grey
// placeholder rectangle - no prompt copy, no per-category colors and
// no click interaction exist in the file. The prompt paragraph, the
// click-to-highlight behaviour, and the 5 accent colors below are this
// build's own addition on top of that placeholder; the 5 colors are
// the existing cross-project brand tokens (not new hex values) so the
// "colours show the connection" line in the Figma copy has something
// to point at.
const QUIZ_MAPPING = [
  { id: 'context', label: 'User context', question: 'How old are you? Where do you live?', color: '#9d8248' /* --color-main-gold */, prompt: 'a 26-year-old living in Melbourne' },
  { id: 'identity', label: 'Current identity', question: 'How would you describe your current self?', color: '#49788d' /* --color-visualeyes-dark-blue */, prompt: 'a creative who thrives in chaos but craves stability' },
  { id: 'future', label: 'Future aspiration', question: 'How does your ideal future look like?', color: '#73804a' /* --color-bioscent-green */, prompt: 'leading a small design studio, working remotely from different cities' },
  { id: 'conflict', label: 'Main conflict', question: 'What is standing between you and that future', color: '#d28143' /* --color-cookpilot-dark-orange */, prompt: 'the fear of taking the first real step' },
  { id: 'value', label: 'Non-negotiable', question: 'What are you least willing to give up?', color: '#323224' /* --color-bioscent-forest */, prompt: 'your sense of autonomy' },
]

function QuizPromptSegment({ item, isActive }) {
  return (
    <span
      className={`case-study-visualeyes-quiz-segment${isActive ? ' is-active' : ''}`}
      style={{ '--quiz-color': item.color, '--quiz-color-soft': withAlpha(item.color, 0.16) }}
    >
      {item.prompt}
    </span>
  )
}

function QuizInputMapper() {
  const [activeId, setActiveId] = useState(QUIZ_MAPPING[0].id)
  const segment = (id) => <QuizPromptSegment item={QUIZ_MAPPING.find((item) => item.id === id)} isActive={activeId === id} />

  return (
    <div className="case-study-visualeyes-quiz-body">
      <div className="case-study-visualeyes-quiz-prompt">
        <p className="case-study-visualeyes-quiz-prompt-text">
          &ldquo;Imagine you are {segment('context')}. You see yourself as {segment('identity')}. In your ideal future, you are {segment('future')}. The main thing stopping you from getting there is {segment('conflict')}. The one thing you refuse to sacrifice is {segment('value')}.&rdquo;
        </p>
        <p className="case-study-visualeyes-quiz-prompt-note">* This is a simplified example for illustration purposes &mdash; not the actual prompt used in the project.</p>
      </div>
      <div className="case-study-visualeyes-quiz-questions">
        {QUIZ_MAPPING.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`case-study-visualeyes-quiz-question${activeId === item.id ? ' is-active' : ''}`}
            style={{ '--quiz-color': item.color, '--quiz-color-soft': withAlpha(item.color, 0.14) }}
            onClick={() => setActiveId(item.id)}
            aria-pressed={activeId === item.id}
          >
            <p className="case-study-section-heading">{item.label}</p>
            <p className="case-study-section-description">{item.question}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

const INTERVIEW_PHOTOS = [
  {
    src: interviewPhoto1,
    alt: 'The team conducting a group interview with students seated on the grass',
    caption: 'Group user interview',
  },
  {
    src: interviewPhoto2,
    alt: 'A student pointing at a laptop screen during a 1-1 interview',
    caption: '1-1 user interview',
  },
  {
    src: interviewPhoto3,
    alt: 'A student at a desk with two monitors taking part in an interview',
    caption: 'Another 1-1 interview, running late into the night',
  },
]

// Cursor-following caption pop-up for the User Interview photo strip - same
// pattern as BioScent/CookPilot's own CollageCaptionPhoto, kept as a
// separate local copy (own visualeyes-prefixed classes below) rather than a
// shared import, matching this file's existing convention of giving each
// case study its own class names even for identically-shaped patterns.
function CollageCaptionPhoto({ src, alt, caption }) {
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
      className="case-study-visualeyes-interview-photo-item"
      onMouseEnter={(e) => {
        updatePos(e)
        setHovering(true)
      }}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={updatePos}
    >
      <img className="case-study-visualeyes-interview-photo" src={src} alt={alt} />
      <span
        ref={(node) => {
          captionRef.current = node
          if (node) {
            node.style.left = `${posRef.current.x}px`
            node.style.top = `${posRef.current.y}px`
          }
        }}
        className={`case-study-visualeyes-interview-photo-caption${hovering ? ' is-visible' : ''}`}
      >
        {caption}
      </span>
    </div>
  )
}

export default function VisualEyes() {
  return (
    <>
      <div className="case-study">
        <Sidebar />
        <main className="case-study-main">
          <section className="case-study-section case-study-hero" aria-labelledby="visualeyes-title">
            <div className="case-study-hero-banner">
              <ProjectThumbnail
                image={visualeyesImg}
                aspectRatio={VISUALEYES_HERO_ASPECT_RATIO}
                skyFrames={VISUALEYES_HERO_SKY_FRAMES}
                alt="A person standing on a desert terrace looking out at a modern glass-and-timber home, imagining a possible version of their future"
              />
            </div>
            <div className="case-study-hero-info">
              <div className="case-study-hero-intro">
                <h1 id="visualeyes-title" className="case-study-title">
                  Visual Eyes
                </h1>
                <p className="case-study-subtitle">An immersive environment that helps student see the possible version of their future self.</p>
              </div>
              <div className="case-study-meta case-study-meta-visualeyes">
                <div className="case-study-meta-column">
                  <div className="case-study-meta-block">
                    <p>Team :</p>
                    <p>My Role : Spatial UX, Product Designer, Co-dev</p>
                    <p>My team : 2 x devs, 2 x UI designers</p>
                  </div>
                  <div className="case-study-meta-block case-study-meta-block-skills">
                    <p>Skills :</p>
                    <p>Spatial UX, Multimodal Interaction, User Research &amp; Testing</p>
                  </div>
                </div>
                <div className="case-study-meta-column">
                  <div className="case-study-meta-block">
                    <p>Program:</p>
                    <p>Apple Foundation Program @ UTS</p>
                  </div>
                  <div className="case-study-meta-block case-study-meta-block-skills">
                    <p>Tools:</p>
                    <p>Figma, Apple VisionOS, Miro, Xcode, SwiftUI, ClaudeCode</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-passion" aria-labelledby="passion-title" id="big-idea">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-visualeyes">BIG IDEA | COLLABORATIVE MAPPING</span>
              <div className="case-study-visualeyes-heading-group">
                <h2 id="passion-title" className="case-study-visualeyes-heading">
                  Finding what the group is passionate about
                </h2>
                <p className="case-study-section-description">
                  Each of us wrote down a big idea and keywords connected to that idea. We then shortlist topic that interests us the most.
                </p>
              </div>
            </div>
            <div className="case-study-visualeyes-passion-images">
              <img
                className="case-study-visualeyes-passion-image"
                src={passionMindmap}
                alt="Mind map branching from Tech innovation, Health and Fitness through to Education, AI and Daily Life, and Food, with keywords highlighted"
              />
              <img
                className="case-study-visualeyes-passion-image case-study-visualeyes-passion-image-sm"
                src={passionStickynotes}
                alt="Sticky notes reading Multimodal interaction, Social Connection, Spatial computing, Routine, Security, Jobs, and Balance"
              />
            </div>
            <div className="case-study-visualeyes-callout">
              <p>This led us to one keyword that angled us throughout our research - Balance.</p>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-balance" aria-labelledby="balance-title" id="balance">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-visualeyes">DEFINING INITIAL CHALLENGE</span>
              <h2 id="balance-title" className="case-study-section-heading">
                What is Balance?
              </h2>
              <p className="case-study-section-description">
                We started thinking what balance is and what it meant to each of us. All 5 of us ended up having different answers to what balance is.
                <br />
                <br />
                Hence, we decided to keep our challenge broad in the beginning: <strong>to explore how people understand balance, what disrupts it and how an experience could help users reflect on it.</strong>
              </p>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-interview" aria-labelledby="interview-title" id="interview">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-visualeyes">USER INTERVIEW</span>
              <h2 id="interview-title" className="case-study-section-heading">
                Finding what &lsquo;Balance&rsquo; means to students
              </h2>
              <div className="case-study-visualeyes-observations">
                <p>We conducted an initial group interview, and here are some of our observations:</p>
                <ol>
                  <li>Every participant defined &lsquo;balance&rsquo; very differently</li>
                  <li>We should interview students of a different age range, for eg late 20s, as they might offer a broader perspective as to what Balance means</li>
                  <li>Some participants are more reserved in group settings, and we decided to conduct 1-1 interview.</li>
                </ol>
              </div>
            </div>
            <img className="case-study-visualeyes-board-image" src={interviewBoard} alt="A whiteboard covered in colour-coded sticky notes of interview questions and observations, grouped under headings like Definition, Behavioural, Awareness and Solution" />
            <div className="case-study-visualeyes-interview-photos">
              {INTERVIEW_PHOTOS.map((photo) => (
                <CollageCaptionPhoto key={photo.src} {...photo} />
              ))}
            </div>
            <div className="case-study-visualeyes-findings">
              <h3 className="case-study-section-heading">Key Findings</h3>
              <ol className="case-study-visualeyes-findings-list">
                <li className="case-study-visualeyes-findings-item">Balance means very different thing to different people</li>
                <li className="case-study-visualeyes-findings-item case-study-visualeyes-findings-item-alt">Students often chase goals shaped by external expectations</li>
                <li className="case-study-visualeyes-findings-item">Reflection usually happens too late</li>
              </ol>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-personas" aria-labelledby="personas-title" id="personas">
            <div className="case-study-visualeyes-personas-intro">
              <span className="case-study-tag case-study-tag-visualeyes-light">PERSONAS</span>
              <h2 id="personas-title" className="case-study-section-heading">
                Student archetypes
              </h2>
            </div>
            <PersonasCarousel />
          </section>
          <section className="case-study-section case-study-visualeyes-refined-challenge" aria-labelledby="refined-challenge-title" id="refined-challenge">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-visualeyes">REFINED CHALLENGE</span>
              <h2 id="refined-challenge-title" className="case-study-section-heading">
                Refining of our challenge
              </h2>
              <p className="case-study-section-description">
                Our research shows that balance <strong>can&rsquo;t be a fixed outcome for everyone</strong>. Since everyone defined balance differently, our opportunity here is NOT to define balance for them. Instead, the biggest opportunity is to allow them to <strong>visualise their own version of balance.</strong>
              </p>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-hmw" aria-labelledby="hmw-title" id="how-might-we">
            <span className="case-study-tag case-study-tag-visualeyes">HOW MIGHT WE</span>
            <div className="case-study-visualeyes-callout">
              <p id="hmw-title">How might we help individuals explore balance through authentic self-alignment?</p>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-existing-solution" aria-labelledby="existing-solution-title" id="existing-solution">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-visualeyes">IDEA BRAINSTORM</span>
              <div className="case-study-visualeyes-heading-group">
                <h2 id="existing-solution-title" className="case-study-visualeyes-heading">
                  We first diverged, then converged on the strongest direction
                </h2>
                <p className="case-study-section-description">
                  As a group, we brainstormed ~30 ideas, removed the duplicated ones and grouped them according to how creative and aligned they are with respect to our refined challenge statement.
                </p>
              </div>
            </div>
            <div className="case-study-visualeyes-existing-solution-photos">
              <img className="case-study-visualeyes-existing-solution-photo" src={solutionWall1} alt="Two people sticking colour-coded notes onto a wall as part of a brainstorm" />
              <img className="case-study-visualeyes-existing-solution-photo" src={solutionWall2} alt="A wall covered in sticky notes grouped and connected with marker lines" />
              <img className="case-study-visualeyes-existing-solution-photo" src={solutionWall3} alt="A close-up grid of sticky notes with handwritten idea fragments" />
            </div>
            <div className="case-study-visualeyes-criteria-block">
              <p className="case-study-visualeyes-heading">We evaluated each idea based on 3 criterias.</p>
              <ul className="case-study-visualeyes-criteria-list">
                <li className="case-study-visualeyes-criteria-item">How well it supports authentic self-alignment.</li>
                <li className="case-study-visualeyes-criteria-item case-study-visualeyes-criteria-item-translucent">How effectively it used the immersive qualities of Apple Vision Pro.</li>
                <li className="case-study-visualeyes-criteria-item case-study-visualeyes-criteria-item-translucent">If it could create meaningful moment of reflection for students.</li>
              </ul>
              <p className="case-study-section-description">
                We felt that the strongest direction was not another productivity tool or advice app, but an experience that could <strong>make a possible future feel visible</strong>. This led us to the idea of an immersive future world, where users could step inside a version of the life they are working towards and visualise if that&rsquo;s what they truly want.
              </p>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-lowfi" aria-labelledby="lowfi-intro-title" id="lowfi">
            <div className="case-study-visualeyes-lowfi-block">
              <div className="case-study-visualeyes-lowfi-heading-group">
                <span className="case-study-tag case-study-tag-visualeyes">LOW-FIDELITY</span>
                <h2 id="lowfi-intro-title" className="case-study-section-heading">
                  Intro Screen
                </h2>
              </div>
              <div className="case-study-visualeyes-lowfi-body">
                <div className="case-study-visualeyes-lowfi-photos">
                  <img
                    className="case-study-visualeyes-lowfi-photo case-study-visualeyes-lowfi-photo-intro"
                    src={introScreenSketchV1}
                    alt="Hand-drawn wireframe of the intro screen with a Start button and an Explore link"
                  />
                  <img
                    className="case-study-visualeyes-lowfi-photo case-study-visualeyes-lowfi-photo-intro"
                    src={introScreenSketchV2}
                    alt="Hand-drawn wireframe of the intro screen with a single centered Start button that fades in after 3 seconds"
                  />
                </div>
                <div className="case-study-visualeyes-lowfi-versions">
                  <div className="case-study-visualeyes-lowfi-version">
                    <p>V1:</p>
                    <p>A single start button reduced friction, but did not support returning users.</p>
                  </div>
                  <div className="case-study-visualeyes-lowfi-version case-study-visualeyes-lowfi-version-alt">
                    <p>V2:</p>
                    <p>Added a returning option so users could access an existing generated world without repeating onboarding.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="case-study-visualeyes-lowfi-block">
              <h2 id="lowfi-safety-title" className="case-study-section-heading">
                Safety Declaration
              </h2>
              <div className="case-study-visualeyes-lowfi-body">
                <div className="case-study-visualeyes-lowfi-photos">
                  <img
                    className="case-study-visualeyes-lowfi-photo case-study-visualeyes-lowfi-photo-safety"
                    src={safetyDeclarationSketchV1}
                    alt="Hand-drawn wireframe of a safety declaration screen with a checklist beside a world preview"
                  />
                  <img
                    className="case-study-visualeyes-lowfi-photo case-study-visualeyes-lowfi-photo-safety"
                    src={safetyDeclarationSketchV2}
                    alt="Hand-drawn wireframe of a safety declaration pop-up with a checklist and an Agree and Continue button in front of a world preview"
                  />
                </div>
                <div className="case-study-visualeyes-lowfi-versions">
                  <div className="case-study-visualeyes-lowfi-version">
                    <p>V1:</p>
                    <p>We initially placed safety information beside a world preview.</p>
                  </div>
                  <div className="case-study-visualeyes-lowfi-version case-study-visualeyes-lowfi-version-alt">
                    <p>V2:</p>
                    <p>Kept the safety notice as a single pop-up in front of the world preview to make the warning short and clear.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="case-study-visualeyes-lowfi-block">
              <h2 id="lowfi-privacy-title" className="case-study-section-heading">
                Privacy Preferences
              </h2>
              <div className="case-study-visualeyes-lowfi-body">
                <div className="case-study-visualeyes-lowfi-photos">
                  <img
                    className="case-study-visualeyes-lowfi-photo case-study-visualeyes-lowfi-photo-privacy"
                    src={privacyPreferencesSketchV1}
                    alt="Hand-drawn wireframe of a privacy preferences screen using icons and checkboxes to show what data is stored"
                  />
                  <img
                    className="case-study-visualeyes-lowfi-photo case-study-visualeyes-lowfi-photo-privacy"
                    src={privacyPreferencesSketchV2}
                    alt="Hand-drawn wireframe of a privacy preferences screen reusing the safety declaration's checklist layout"
                  />
                </div>
                <div className="case-study-visualeyes-lowfi-versions">
                  <div className="case-study-visualeyes-lowfi-version">
                    <p>V1:</p>
                    <p>Use images to visually display kind of stored data. But we felt that icons added visual noise, direct text might be easier to understand.</p>
                  </div>
                  <div className="case-study-visualeyes-lowfi-version case-study-visualeyes-lowfi-version-alt">
                    <p>V2:</p>
                    <p>Reused the same layout so it looks like part of the same setup flow.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-hifi" aria-labelledby="hifi-intro-title" id="hifi">
            <div className="case-study-visualeyes-hifi-block">
              <div className="case-study-visualeyes-hifi-heading-group">
                <span className="case-study-tag case-study-tag-visualeyes">HIGH-FIDELITY</span>
                <h2 id="hifi-intro-title" className="case-study-section-heading">
                  Intro Screen
                </h2>
              </div>
              <img
                className="case-study-visualeyes-hifi-image"
                src={introScreenHifi}
                alt="High-fidelity Apple Vision Pro intro screen showing a person standing on a desert terrace, floating photo frames, and Generate New / Visit Old World buttons"
              />
            </div>
            <div className="case-study-visualeyes-hifi-block">
              <h2 id="hifi-declaration-title" className="case-study-section-heading">
                Declaration
              </h2>
              <img
                className="case-study-visualeyes-hifi-image"
                src={declarationHifi}
                alt="High-fidelity safety declaration screen listing consent and data, emotional safety, and physical safety agreements with a Layout and continue button"
              />
            </div>
            <div className="case-study-visualeyes-hifi-block">
              <h2 id="hifi-privacy-title" className="case-study-section-heading">
                Privacy Preferences
              </h2>
              <img
                className="case-study-visualeyes-hifi-image"
                src={privacyPreferencesHifi}
                alt="High-fidelity privacy preferences screen with toggles for quiz responses, device motion, and image sources, and a Start button"
              />
            </div>
            <div className="case-study-visualeyes-hifi-block">
              <h2 id="hifi-quiz-title" className="case-study-section-heading">
                Quiz
              </h2>
              <img
                className="case-study-visualeyes-hifi-image"
                src={quizHifi}
                alt="High-fidelity quiz screen asking what your ideal future looks like, with a text input and a Next button"
              />
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-3dworld" aria-labelledby="3dworld-title" id="3d-world">
            <div className="case-study-visualeyes-3dworld-intro">
              <span className="case-study-tag case-study-tag-visualeyes">3D WORLD EXPERIMENTATION</span>
              <div className="case-study-visualeyes-heading-group">
                <h2 id="3dworld-title" className="case-study-visualeyes-experiment-heading">
                  Spatial &amp; Multimodal Experiment
                </h2>
                <p className="case-study-section-description">
                  Although the quiz appears before the world in the final outcome, our process started by <strong>working backwards</strong> to understand what kind of immersive environment would be meaningful.
                </p>
              </div>
              <ul className="case-study-visualeyes-questions-list">
                <li className="case-study-visualeyes-questions-item">What is the best way for users to move and control inside 3D space?</li>
                <li className="case-study-visualeyes-questions-item case-study-visualeyes-questions-item-translucent">What type of world should be generated in order to be meaningful for the users?</li>
                <li className="case-study-visualeyes-questions-item case-study-visualeyes-questions-item-translucent">What input type produces the clearest personalised output?</li>
              </ul>
            </div>
            <div className="case-study-visualeyes-3dworld-group">
              <h3 className="case-study-visualeyes-experiment-heading">Navigating 3D Space (Keyboard vs console)</h3>
              <div className="case-study-visualeyes-3dworld-method">
                <div className="case-study-visualeyes-3dworld-method-header">
                  <h4 className="case-study-section-heading">{'Method 1: Keyboard (← → ↑ ↓ )'}</h4>
                  <div className="case-study-visualeyes-3dworld-media-row">
                    <SectionVideo src={navKeyboardInput} frameClassName="case-study-visualeyes-3dworld-media" ariaLabel="Demo clip of navigating the 3D world with keyboard arrow keys" />
                    <SectionVideo src={navKeyboardScreen} frameClassName="case-study-visualeyes-3dworld-media" ariaLabel="Demo clip of the resulting keyboard-controlled movement in the 3D world" />
                  </div>
                </div>
                <div className="case-study-visualeyes-callout">
                  <p>It felt clunky and unintuitive to navigate a 3D space this way.</p>
                </div>
              </div>
              <div className="case-study-visualeyes-3dworld-method">
                <div className="case-study-visualeyes-3dworld-method-header">
                  <h4 className="case-study-section-heading">Method 2: Console</h4>
                  <div className="case-study-visualeyes-3dworld-media-row">
                    <SectionVideo src={navConsoleInput} frameClassName="case-study-visualeyes-3dworld-media" ariaLabel="Demo clip of navigating the 3D world with a console controller" />
                    <SectionVideo src={navConsoleScreen} frameClassName="case-study-visualeyes-3dworld-media" ariaLabel="Demo clip of the resulting console-controlled movement in the 3D world" />
                  </div>
                </div>
                <div className="case-study-visualeyes-callout">
                  <p>Movement felt noticeably smoother and more natural with a console controller.</p>
                </div>
              </div>
            </div>
            <div className="case-study-visualeyes-3dworld-group">
              <h3 className="case-study-visualeyes-experiment-heading">World generation (AI vs preset 3D world)</h3>
              <div className="case-study-visualeyes-3dworld-method">
                <div className="case-study-visualeyes-3dworld-method-header">
                  <h4 className="case-study-section-heading">Method 1: AI generated world</h4>
                  <SectionVideo src={worldAiGenerated} frameClassName="case-study-visualeyes-3dworld-media-single" ariaLabel="Demo clip of the AI-generated 3D world, showing warped and inconsistent geometry" />
                </div>
                <div className="case-study-visualeyes-callout">
                  <p>Personalised but not consistent</p>
                </div>
              </div>
              <div className="case-study-visualeyes-3dworld-method">
                <div className="case-study-visualeyes-3dworld-method-header">
                  <h4 className="case-study-section-heading">Method 2: Preset 3D world</h4>
                  <SectionVideo src={worldPreset} frameClassName="case-study-visualeyes-3dworld-media-single" ariaLabel="Demo clip of the preset 3D gallery world, showing clean and consistent geometry" />
                </div>
                <div className="case-study-visualeyes-callout">
                  <p>Clearer and more controlled</p>
                </div>
              </div>
            </div>
            <h3 className="case-study-visualeyes-experiment-heading">Input type (MCQ vs rating style vs open ended)</h3>
            <div className="case-study-visualeyes-input-types">
              <div className="case-study-visualeyes-input-type">
                <img className="case-study-visualeyes-input-type-image" src={inputTypeMcq} alt="Screenshot of a multiple-choice quiz question with several answer options" />
                <p className="case-study-visualeyes-input-type-text">Generic, predictable outputs.</p>
              </div>
              <div className="case-study-visualeyes-input-type">
                <img className="case-study-visualeyes-input-type-image" src={inputTypeRating} alt="Screenshot of a quiz question with a numbered rating scale" />
                <p className="case-study-visualeyes-input-type-text">Hard to interpret. Without context, 3 or 4 seemed similar</p>
              </div>
              <div className="case-study-visualeyes-input-type">
                <img className="case-study-visualeyes-input-type-image" src={inputTypeOpenEnded} alt="Screenshot of a quiz question with an open-ended text input" />
                <p className="case-study-visualeyes-input-type-text">Stronger, more personalised narrative</p>
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-quiz-input" aria-labelledby="quiz-input-title" id="quiz-input">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-visualeyes">QUIZ INPUT</span>
              <h2 id="quiz-input-title" className="case-study-section-heading">
                Quiz input &rarr; World generation
                <br />
                (Using hero journey concept)
              </h2>
              <p className="case-study-section-description">
                Instead of asking AI to generate the world broadly, we added structure and constraint to the prompt. Each quiz response maps to a specific placeholder in the prompt template, with colours showing how the inputs connect.
              </p>
            </div>
            <QuizInputMapper />
          </section>
          <section className="case-study-section case-study-visualeyes-user-testing" aria-labelledby="user-testing-title" id="user-testing">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-visualeyes">USER TESTING</span>
              <h2 id="user-testing-title" className="case-study-section-heading">
                User Feedbacks
              </h2>
            </div>
            <div className="case-study-visualeyes-testing-quotes">
              <div className="case-study-visualeyes-testing-quote">
                <p>&ldquo; Buttons are too small, I need to click a lot of times.&rdquo;</p>
                <p>&ldquo;Why am I floating in the air instead of standing on the ground?&rdquo;</p>
              </div>
              <div className="case-study-visualeyes-testing-quote case-study-visualeyes-testing-quote-spaced">
                <p>&ldquo;Buttons are hard to click.&rdquo;</p>
                <p>&ldquo;The reflection feels like a task for me to do. I don&rsquo;t want to do anything at the end of the experience.&rdquo;</p>
              </div>
            </div>
            <div className="case-study-visualeyes-testing-photos">
              <img
                className="case-study-visualeyes-testing-photo"
                src={testingPhoto1}
                alt="A participant wearing a VR headset and holding a controller while seated at a table during a usability test, with sticky notes visible on a whiteboard behind"
              />
              <img
                className="case-study-visualeyes-testing-photo"
                src={testingPhoto2}
                alt="A participant wearing a VR headset and reaching out with her hand during a usability test"
              />
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-reflection" aria-labelledby="reflection-title" id="reflection">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-visualeyes">REFLECTION</span>
              <h2 id="reflection-title" className="case-study-section-heading">
                Designing for 3D space = designing beyond UIUX
              </h2>
            </div>
            <div className="case-study-visualeyes-reflection-learnings">
              <div className="case-study-visualeyes-reflection-learning">
                <p className="case-study-section-heading">Learning 1</p>
                <p className="case-study-section-description">Designing for 3D required us to consider the movement, interaction, spatial clarity and user comfort.</p>
              </div>
              <div className="case-study-visualeyes-reflection-learning">
                <p className="case-study-section-heading">Learning 2</p>
                <p className="case-study-section-description">Safety and security became one of the key design considerations throughout the project.</p>
              </div>
              <div className="case-study-visualeyes-reflection-learning">
                <p className="case-study-section-heading">Learning 3</p>
                <p className="case-study-section-description">Environment, pacing and interaction model are all product decisions, not just aesthetic ones.</p>
              </div>
            </div>
            <div className="case-study-visualeyes-reflection-photos">
              <div className="case-study-visualeyes-reflection-photo-row">
                <img className="case-study-visualeyes-reflection-photo" src={reflectionPhoto1} alt="The VisualEyes team posing together at the Apple Foundation Program showcase, holding blue folders" />
                <img className="case-study-visualeyes-reflection-photo" src={reflectionPhoto2} alt="Team members gathered around a desk reviewing designs together on laptops" />
              </div>
              <div className="case-study-visualeyes-reflection-photo-row">
                <img className="case-study-visualeyes-reflection-photo" src={reflectionPhoto3} alt="The team gathered around a whiteboard covered in sticky notes, discussing feedback with a mentor" />
                <img className="case-study-visualeyes-reflection-photo" src={reflectionPhoto4} alt="Team members posing together in front of screens displaying the VisualEyes logo" />
              </div>
              <SectionVideo
                src={reflectionCollageWide}
                frameClassName="case-study-visualeyes-reflection-photo-wide"
                ariaLabel="A team member testing the VisualEyes prototype in a VR headset at a desk, gesturing with her hands while others look on"
              />
            </div>
          </section>
          <section className="case-study-section case-study-visualeyes-thank-you" aria-labelledby="thank-you-title">
            <p className="case-study-visualeyes-thank-you-eyebrow">If you got this far,</p>
            <div className="case-study-visualeyes-thank-you-card">
              <h2 id="thank-you-title" className="case-study-visualeyes-thank-you-title">
                Thank You!
              </h2>
              <p className="case-study-visualeyes-thank-you-description">
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
