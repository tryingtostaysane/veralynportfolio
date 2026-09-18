import { useState, useRef } from 'react'
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import ProjectThumbnail from './ProjectThumbnail.jsx'
import SectionVideo from './SectionVideo.jsx'
import { cookpilotImg, COOKPILOT_COOKING_INSTRUCTIONS, COOKPILOT_HERO_ASPECT_RATIO } from '../data/projectThumbnails.js'
import meetTommyVideo from '../assets/case-studies/cookpilot/problem-meet-tommy.mp4'
import existingSolutionBillboard from '../assets/case-studies/cookpilot/existing-solution-billboard.png'
import existingSolutionChat from '../assets/case-studies/cookpilot/existing-solution-chat.png'
import solutionScanFridgePhoto from '../assets/case-studies/cookpilot/solution-scan-fridge-photo.jpg'
import solutionGenerateRecipePhoto from '../assets/case-studies/cookpilot/solution-generate-recipe-photo.jpg'
import solutionOrderIngredientsPhoto from '../assets/case-studies/cookpilot/solution-order-ingredients-photo.jpg'
import solutionDuringCookingStep1 from '../assets/case-studies/cookpilot/solution-during-cooking-step1.mp4'
import solutionDuringCookingStep2 from '../assets/case-studies/cookpilot/solution-during-cooking-step2.mp4'
import solutionDuringCookingStep3 from '../assets/case-studies/cookpilot/solution-during-cooking-step3.mp4'
import solutionDuringCookingStep4 from '../assets/case-studies/cookpilot/solution-during-cooking-step4.mp4'
import solutionDuringCookingStep5 from '../assets/case-studies/cookpilot/solution-during-cooking-step5.mp4'
import techStackDiagram from '../assets/case-studies/cookpilot/tech-stack-diagram.jpg'
import reflectionCollageWide1 from '../assets/case-studies/cookpilot/reflection/collage-wide-1.jpg'
import reflectionCollageWide2 from '../assets/case-studies/cookpilot/reflection/collage-wide-2.jpg'
import reflectionCollagePortrait1 from '../assets/case-studies/cookpilot/reflection/collage-portrait-1.jpg'
import reflectionCollagePortrait2 from '../assets/case-studies/cookpilot/reflection/collage-portrait-2.jpg'
import './CookPilot.css'

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

// Step media (Figma "Step N - pre" frames, e.g. 604:2576/604:2589) - each
// step is now a single flattened reference image with the label/arrow/
// inset/highlight overlay already baked in by design, rather than photo
// + separately positioned overlay markup - simpler and matches exactly
// what Figma exports (previous versions of this file rebuilt the
// overlay as real markup because the flattened export available then
// was low-resolution; the current export isn't).
function Step1Media() {
  return (
    <img
      className="case-study-solution-steps-photo"
      src={solutionScanFridgePhoto}
      alt="A person holding up a phone to scan an open fridge; an 'Ingredients detected!' label points to the CookPilot app's 'Your Ingredients' screen listing 5 detected ingredients: spinach, bread, eggs, spam bacon and garlic aioli"
    />
  )
}

function Step2Media() {
  return (
    <img
      className="case-study-solution-steps-photo"
      src={solutionGenerateRecipePhoto}
      alt="A person holding up a phone showing a Full English Breakfast recipe suggestion; a 'Missing ingredients' label points to the recipe's ingredients checklist, highlighting 2 eggs, spam bacon, spinach and bread as still needed, followed by the recipe steps"
    />
  )
}

function Step3Media() {
  return (
    <img
      className="case-study-solution-steps-photo"
      src={solutionOrderIngredientsPhoto}
      alt="A person carrying a green grocery bag next to a phone showing the Woolworths app with a search for eggs"
    />
  )
}

// "Before cooking" carousel (Figma node 604:2610/604:2611 - confirmed
// against the full page export; Steps 2/3 aren't individually linked
// there so their overlay positions below are carried over from this
// card's previous, slightly-narrower version rather than re-verified)
// - one step visible at a time, paged by the prev/next buttons, with a
// direction-aware slide animation reusing BioScent's research-insight
// keyframes rather than duplicating them.
const BEFORE_COOKING_STEPS = [
  {
    title: 'Step 1: Scan your fridge',
    description: ['Scan your fridge using AI glasses or your phone. CookPilot recognizes ingredients in your fridge instantly.'],
    media: Step1Media,
  },
  {
    title: 'Step 2: Generates recipe',
    description: ['CookPilot generates recipe options.', 'It also flags out missing ingredients if there are any.'],
    media: Step2Media,
  },
  {
    title: 'Step 3: Orders missing ingredients online',
    description: [
      'Purchase missing ingredients with one tap on Woolworths app and they will be sent to your place within 2 hours.',
      'If the recipe you choose has no missing ingredients, you can start cooking immediately.',
    ],
    media: Step3Media,
  },
]

function BeforeCookingSolution({ heading }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const step = BEFORE_COOKING_STEPS[index]
  const StepMedia = step.media

  const goToPrev = () => {
    setDirection(-1)
    setIndex((current) => (current - 1 + BEFORE_COOKING_STEPS.length) % BEFORE_COOKING_STEPS.length)
  }
  const goToNext = () => {
    setDirection(1)
    setIndex((current) => (current + 1) % BEFORE_COOKING_STEPS.length)
  }

  return (
    <div className="case-study-solution-block">
      <div className="case-study-solution-block-intro">
        <span className="case-study-tag case-study-tag-cookpilot">SOLUTION</span>
        <p className="case-study-section-heading">{heading}</p>
      </div>
      <div className="case-study-solution-controls">
        <div className="case-study-solution-nav">
          <button type="button" className="case-study-solution-nav-button" onClick={goToPrev} aria-label="Previous step">
            <ArrowLeftIcon />
          </button>
          <button type="button" className="case-study-solution-nav-button" onClick={goToNext} aria-label="Next step">
            <ArrowRightIcon />
          </button>
        </div>
        <div className="case-study-solution-step" key={index} data-direction={direction}>
          <p className="case-study-section-heading">{step.title}</p>
          <div className="case-study-solution-description">
            {step.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="case-study-solution-media-card">
            <div className="case-study-solution-media-frame">
              <StepMedia />
            </div>
          </div>
        </div>
      </div>
      <div className="case-study-solution-dots" role="tablist" aria-label="Solution steps">
        {BEFORE_COOKING_STEPS.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            className={`case-study-solution-dot${i === index ? ' case-study-solution-dot-active' : ''}`}
            onClick={() => {
              setDirection(i > index ? 1 : -1)
              setIndex(i)
            }}
            aria-selected={i === index}
            aria-label={`Show ${s.title}`}
          />
        ))}
      </div>
    </div>
  )
}

// "Meet Tommy" intro video (Figma node 573:2006 was a video fill) - now a
// thin wrapper over the shared SectionVideo (see SectionVideo.jsx for the
// scroll-triggered autoplay-with-sound/fallback-to-muted behavior and the
// click-to-unmute toggle), keeping this file's own pre-existing class
// names so the frame/toggle positioning is unchanged.
function MeetTommyVideo({ src }) {
  return <SectionVideo src={src} frameClassName="case-study-problem-photo" videoClassName="case-study-problem-photo-image" toggleClassName="case-study-problem-sound-toggle" />
}

// "During cooking" voice-guided video - same shared SectionVideo, just
// worded around "voice" in its toggle's aria-label since this clip
// demonstrates CookPilot reading out steps and calling out pan-side
// changes hands-free, not narration.
function VoiceGuidedVideo({ src, description }) {
  return (
    <SectionVideo
      src={src}
      ariaLabel={description}
      frameClassName="case-study-solution-media-frame"
      videoClassName="case-study-during-cooking-video-image"
      toggleClassName="case-study-during-cooking-voice-toggle"
      toggleLabelOn="Turn voice off"
      toggleLabelOff="Turn voice on"
    />
  )
}

// "During cooking" carousel steps (Figma nodes 604:2517/604:2516/
// 604:2528/604:2542 for Steps 2-5 - Step 1 mirrors their exact layout).
// Each video is its own pre-cut clip (Cooking part1-5.mp4) rather than
// one continuous recording, matching the in-video "Step N of 5" UI they
// each show.
const DURING_COOKING_STEPS = [
  {
    title: 'Step 1: Step-by-step instructions',
    description: 'CookPilot reads out each recipe step aloud and tracks progress on screen, so nothing needs to be memorised.',
    video: solutionDuringCookingStep1,
    videoDescription:
      "A split-screen recording of a person cooking breakfast while wearing AI glasses, with a phone screen alongside showing CookPilot's voice-guided step-by-step recipe overlay reading out cooking progress",
  },
  {
    title: 'Step 2: Voice commands',
    description: 'Simple voice commands like "Next step" let users move through the recipe hands-free.',
    video: solutionDuringCookingStep2,
    videoDescription:
      'A split-screen recording of a person cooking while a phone screen alongside shows CookPilot automatically advancing to the next recipe step in response to a spoken voice command',
  },
  {
    title: 'Step 3: Real time cooking assistant',
    description: 'CookPilot uses the glasses’ camera to understand what the user is seeing and gives guidance when they need help.',
    video: solutionDuringCookingStep3,
    videoDescription:
      "A split-screen recording of a person cooking while a phone screen alongside shows CookPilot's cooking assistant checking in and confirming they're on the right track",
  },
  {
    title: 'Step 4: Recipe feedback',
    description: 'After cooking, users can share what they liked, or didn’t, helping CookPilot improve future recipe suggestions.',
    video: solutionDuringCookingStep4,
    videoDescription:
      "A split-screen recording of a person cooking while a phone screen alongside shows CookPilot personalising a saved recipe using feedback from the user's previous cooking sessions",
  },
  {
    title: 'Step 5: Dietary preferences',
    description: 'Users can set their dietary needs and food preferences, so recipes can be personalised to suit them.',
    video: solutionDuringCookingStep5,
    videoDescription: "A recording of the CookPilot app's diet profile settings screen, showing toggles for dietary preferences and food allergens",
  },
]

// "How CookPilot works, During cooking" (pairs with BeforeCookingSolution
// below - same carousel shell: tag+heading block, then nav+sliding-step,
// then dots) - 5 steps instead of 3, video media instead of photos.
function DuringCookingSolution({ heading }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const step = DURING_COOKING_STEPS[index]

  const goToPrev = () => {
    setDirection(-1)
    setIndex((current) => (current - 1 + DURING_COOKING_STEPS.length) % DURING_COOKING_STEPS.length)
  }
  const goToNext = () => {
    setDirection(1)
    setIndex((current) => (current + 1) % DURING_COOKING_STEPS.length)
  }

  return (
    <div className="case-study-solution-block">
      <div className="case-study-solution-block-intro">
        <span className="case-study-tag case-study-tag-cookpilot">SOLUTION</span>
        <p className="case-study-section-heading">{heading}</p>
      </div>
      <div className="case-study-solution-controls">
        <div className="case-study-solution-nav">
          <button type="button" className="case-study-solution-nav-button" onClick={goToPrev} aria-label="Previous step">
            <ArrowLeftIcon />
          </button>
          <button type="button" className="case-study-solution-nav-button" onClick={goToNext} aria-label="Next step">
            <ArrowRightIcon />
          </button>
        </div>
        <div className="case-study-solution-step" key={index} data-direction={direction}>
          <p className="case-study-section-heading">{step.title}</p>
          <div className="case-study-solution-description">{step.description}</div>
          <div className="case-study-solution-media-card">
            <VoiceGuidedVideo src={step.video} description={step.videoDescription} />
          </div>
        </div>
      </div>
      <div className="case-study-solution-dots" role="tablist" aria-label="During cooking steps">
        {DURING_COOKING_STEPS.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            className={`case-study-solution-dot${i === index ? ' case-study-solution-dot-active' : ''}`}
            onClick={() => {
              setDirection(i > index ? 1 : -1)
              setIndex(i)
            }}
            aria-selected={i === index}
            aria-label={`Show ${s.title}`}
          />
        ))}
      </div>
    </div>
  )
}

const REFLECTION_PHOTOS = [
  {
    src: reflectionCollageWide1,
    alt: "The CookPilot team posing with their first place certificate on stage at the ICON x Lyra Hackathon final pitch, with a 'Congratulations Cook Pilot' screen behind them",
    caption: 'Icon unsw x lyra - 1st place! (huge credits to my amazing teammates)',
    className: 'case-study-cookpilot-reflection-photo-wide',
  },
  {
    src: reflectionCollageWide2,
    alt: "The CookPilot team presenting their pitch to a seated audience, with a 'Cook Pilot' title slide on screen",
    caption: '8 rehearsals later, we nailed our 7-minute pitch!',
    className: 'case-study-cookpilot-reflection-photo-wide',
  },
]

const REFLECTION_ROW_PHOTOS = [
  {
    src: reflectionCollagePortrait1,
    alt: 'Three team members posing together on a rooftop with a harbour bridge in the background',
    caption: 'Lyra office is prettyyy!',
    className: 'case-study-cookpilot-reflection-photo-portrait',
  },
  {
    src: reflectionCollagePortrait2,
    alt: 'Team members posing together on a rooftop at sunset holding a first place winner certificate, with a city skyline behind them',
    caption: 'Yay!',
    className: 'case-study-cookpilot-reflection-photo-portrait',
  },
]

// Cursor-following caption pop-up for the Reflection collage photos - same
// pattern as BioScent's own CollageCaptionPhoto, kept as a separate local
// copy (own cookpilot-prefixed classes below) rather than a shared import,
// matching this file's existing convention of not reusing BioScent's
// reflection class names (see the comment on .case-study-cookpilot-
// reflection above).
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
      className={`case-study-cookpilot-reflection-photo-item ${className}`}
      onMouseEnter={(e) => {
        updatePos(e)
        setHovering(true)
      }}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={updatePos}
    >
      <img className="case-study-cookpilot-reflection-photo-img" src={src} alt={alt} />
      <span
        ref={(node) => {
          captionRef.current = node
          if (node) {
            node.style.left = `${posRef.current.x}px`
            node.style.top = `${posRef.current.y}px`
          }
        }}
        className={`case-study-cookpilot-reflection-photo-caption${hovering ? ' is-visible' : ''}`}
      >
        {caption}
      </span>
    </div>
  )
}

export default function CookPilot() {
  return (
    <>
      <div className="case-study">
        <Sidebar />
        <main className="case-study-main">
          <section className="case-study-section case-study-hero" aria-labelledby="cookpilot-title">
            <div className="case-study-hero-banner">
              <ProjectThumbnail
                image={cookpilotImg}
                aspectRatio={COOKPILOT_HERO_ASPECT_RATIO}
                cookingInstructions={COOKPILOT_COOKING_INSTRUCTIONS}
                alt="A person wearing Meta AI glasses preparing a meal in a kitchen"
              />
            </div>
            <div className="case-study-hero-info">
              <div className="case-study-hero-intro">
                <h1 id="cookpilot-title" className="case-study-title">
                  CookPilot
                </h1>
                <p className="case-study-subtitle">An intelligent hands-free cooking assistant with Meta AI Glasses.</p>
              </div>
              <div className="case-study-meta case-study-meta-cookpilot">
                <div className="case-study-meta-column">
                  <div className="case-study-meta-block">
                    <p>Team :</p>
                    <p>My Role : Product concept/ UX design</p>
                    <p>My team : 1 x Meta AR dev, 1 iOS dev</p>
                  </div>
                  <div className="case-study-meta-block case-study-meta-block-skills">
                    <p>Skills :</p>
                    <p>Product Thinking, Voice &amp; Multimodal UX Design</p>
                  </div>
                </div>
                <div className="case-study-meta-column">
                  <div className="case-study-meta-block">
                    <p>Award 🏆 :</p>
                    <p>ICON UNSW x Lyra | 1st Place</p>
                  </div>
                  <div className="case-study-meta-block case-study-meta-block-skills">
                    <p>Tools :</p>
                    <p>Figma, Claude Code</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-theme" aria-label="Hackathon Theme" id="hackathon-theme">
            <span className="case-study-tag case-study-tag-cookpilot">HACKATHON THEME</span>
            <div className="case-study-theme-quote">
              <p>Finding ways to save time.</p>
              <p>The more personalised to your life, the better.</p>
              <p>The more measurable the time saved, the better.</p>
            </div>
          </section>
          <section className="case-study-section case-study-problem" aria-labelledby="problem-title" id="problem">
            <div className="case-study-statement-intro">
              <span className="case-study-tag case-study-tag-cookpilot">PROBLEM &amp; PAIN POINT</span>
              <div className="case-study-statement-heading-group">
                <h2 id="problem-title" className="case-study-statement-heading">
                  The hardest part of cooking is NOT cooking.
                  <br />
                  It is:
                </h2>
                <p className="case-study-statement-description">
                  Decide. Shop. Cook. Wash your hands. Check your phone for recipe. Wash your hands again. Check recipe again.
                </p>
              </div>
            </div>
            <MeetTommyVideo src={meetTommyVideo} />
            <div className="case-study-assumptions-inner">
              <div className="case-study-section-intro">
                <h3 className="case-study-section-heading">Pain Points</h3>
                <p className="case-study-section-description">
                  These are the main pain points we have identified based on our own experience, people around us and our surveys.
                </p>
              </div>
              <ul className="case-study-pain-points-list">
                <li className="case-study-pain-points-item">
                  Busy students/ professionals often don&rsquo;t know what to cook with the ingredients they already have.
                </li>
                <li className="case-study-pain-points-item case-study-pain-points-item-alt">
                  Grocery run is time exhausting. Missing items force time consuming, grocery runs that disrupt the entire meal preparation.
                </li>
                <li className="case-study-pain-points-item">
                  Following recipes on a phone is inconvenient when your hands are dirty or you&rsquo;re multitasking.
                </li>
              </ul>
            </div>
          </section>
          <section className="case-study-section case-study-existing-solution" aria-labelledby="existing-solution-title" id="existing-solution">
            <div className="case-study-statement-intro">
              <span className="case-study-tag case-study-tag-cookpilot">EXISTING SOLUTION</span>
              <div className="case-study-statement-heading-group">
                <h2 id="existing-solution-title" className="case-study-statement-heading">
                  We looked at the existing solution in the market - Meta AI glasses.
                </h2>
                <div className="case-study-statement-description-sm">
                  <p>We noticed AI glasses becoming more mainstream, from celebrity endorsement to more camera enabled glasses entering the market.</p>
                  <p>This made us see AI glasses as a growing interaction trend, especially for hands free activities like cooking.</p>
                </div>
              </div>
            </div>
            <div className="case-study-existing-solution-media">
              <div className="case-study-existing-solution-images">
                <div className="case-study-existing-solution-image">
                  <img src={existingSolutionBillboard} alt="A JCDecaux street billboard advertising Meta AI glasses, featuring Kylie Jenner" />
                </div>
                <div className="case-study-existing-solution-image">
                  <img src={existingSolutionChat} alt="A screenshot of a Meta AI chat assistant walking through a salad recipe step by step" />
                </div>
              </div>
              <ul className="case-study-comparison-list">
                <li className="case-study-comparison-item">Celebrity endorsement - Kylie Jenner</li>
                <li className="case-study-comparison-item case-study-comparison-item-alt">
                  When we tested Meta AI glasses during a cooking flow, we found a key limitation: it is not reliable yet as it can&rsquo;t remember the context of the recipe.
                </li>
              </ul>
            </div>
          </section>
          <section className="case-study-section case-study-solution case-study-before-cooking" aria-label="Solution, Before Cooking" id="before-cooking">
            <BeforeCookingSolution heading="How CookPilot works , Before Cooking" />
          </section>
          <section className="case-study-section case-study-solution case-study-during-cooking" aria-label="Solution, During Cooking" id="during-cooking">
            <DuringCookingSolution heading="How CookPilot works , During Cooking" />
          </section>
          <section className="case-study-section case-study-tech-stack" aria-labelledby="tech-stack-title" id="tech-stack">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-cookpilot">TECH STACK, AI, APIs</span>
              <h2 id="tech-stack-title" className="case-study-section-heading">
                What we used to bring the project to life
              </h2>
            </div>
            <img
              className="case-study-tech-stack-diagram"
              src={techStackDiagram}
              alt="Architecture diagram: Meta Smart Glasses send mic input to AVFoundation and camera stream to Meta Device Access ToolKit. AVFoundation sends audio to OpenAI Whisper for speech-to-text. Meta Device Access ToolKit sends video frames to OpenAI GPT-5 Mini for ingredient detection, recipe generation and cooking assistance. GPT-5 Mini sends recipe data to the Swift and SwiftUI app, which also receives spoken audio from OpenAI TTS (Nova). The app displays the on-screen recipe and spoken guidance to the user."
            />
          </section>
          <section className="case-study-section case-study-future-improvements" aria-labelledby="future-improvements-title" id="future-improvements">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-cookpilot">FUTURE IMPROVEMENTS</span>
              <h2 id="future-improvements-title" className="case-study-section-heading">
                How can we make CookPilot more personalised and accessible?
              </h2>
              <p className="case-study-section-description">
                These are the main pain points we have identified based on our own experience, people around us and our surveys.
              </p>
            </div>
            <ul className="case-study-future-improvements-list">
              <li className="case-study-future-improvements-item">Connect with Woolworths API for one tap grocery ordering.</li>
              <li className="case-study-future-improvements-item case-study-future-improvements-item-alt">
                Expand personalisation capability by expanding its memory for long term cooking habits.
              </li>
              <li className="case-study-future-improvements-item">Widen its accessibility and support any wearable camera or smart glasses, not just Meta AI glasses.</li>
            </ul>
          </section>
          <section className="case-study-section case-study-cookpilot-reflection" aria-label="Reflection" id="reflection">
            <span className="case-study-tag case-study-tag-cookpilot">REFLECTION</span>
            <div className="case-study-cookpilot-reflection-columns">
              <div className="case-study-cookpilot-reflection-column case-study-cookpilot-reflection-column-fixed">
                <p className="case-study-section-heading">
                  Hardware limitation shaped the product
                </p>
                <p className="case-study-cookpilot-reflection-column-description">
                  Designing with smart glasses taught me that the ideal experience is often shaped by what the hardware can support. Biggest takeaway = learning to design around real constraints.
                </p>
              </div>
              <div className="case-study-cookpilot-reflection-column">
                <p className="case-study-section-heading">
                  Designing voice interaction is hard
                </p>
                <p className="case-study-cookpilot-reflection-column-description">
                  I thought voice interaction would simply mean letting users speak commands. Through testing, we realised that timing, interruptions or even small things such as system hearing its own responses can change the user&rsquo;s experience.
                </p>
              </div>
            </div>
            <div className="case-study-cookpilot-reflection-photos">
              {REFLECTION_PHOTOS.map((photo) => (
                <CollageCaptionPhoto key={photo.src} {...photo} />
              ))}
              <div className="case-study-cookpilot-reflection-photo-row">
                {REFLECTION_ROW_PHOTOS.map((photo) => (
                  <CollageCaptionPhoto key={photo.src} {...photo} />
                ))}
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-cookpilot-thank-you" aria-labelledby="thank-you-title">
            <p className="case-study-cookpilot-thank-you-eyebrow">If you got this far,</p>
            <div className="case-study-cookpilot-thank-you-card">
              <h2 id="thank-you-title" className="case-study-cookpilot-thank-you-title">
                Thank You!
              </h2>
              <p className="case-study-cookpilot-thank-you-description">
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
