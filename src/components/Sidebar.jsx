import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

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

// Same two icons as the site footer's social row (Footer.jsx) - reused
// here rather than shared into a common file so this component stays a
// self-contained drop-in, matching how LocationMarkerIcon/ArrowUpIcon
// above are also defined locally rather than imported.
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
    <svg viewBox="0 0 27 23" fill="none" aria-hidden="true">
      <path
        d="M13.4994 9.65904C15.7993 9.65904 26.982 3.37065 26.982 3.37065L27 2.2471C27 1.0067 25.9933 0 24.7495 0H2.24934C1.0067 0 0 1.0067 0 2.2471V3.24818C0 3.24818 11.3051 9.65904 13.4994 9.65904Z"
        fill="currentColor"
      />
      <path
        d="M13.4994 12.7485C11.3051 12.7485 0.0168532 6.74102 0.0179768 6.74102L0 20.2236C0 21.464 1.00782 22.4707 2.24934 22.4707H24.7495C25.9933 22.4707 27 21.464 27 20.2236L26.982 6.74102C26.982 6.74102 15.905 12.7485 13.4994 12.7485Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 15.5V4.5M10 4.5L4.5 10M10 4.5L15.5 10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Case study pages (Figma node 435:25180, the sidebar instance override
// on the BioScent frame) swap the bio/nav content for a "back to Works"
// link plus a table of contents jumping to that page's own sections -
// muted items are sections not built yet, matching Figma's static state.
// "Inspiration" (added between Problem and Research in the same edit
// that added the section itself, Figma node 524:2936) has no Figma TOC
// entry to mirror - that sidebar instance is decorative/static chrome
// there (see VISUALEYES_TOC_ITEMS below), not a real nav kept in sync
// with the page's own sections.
const BIOSCENT_TOC_ITEMS = [
  { label: 'Problem', href: '#problem', muted: true },
  { label: 'Initial Assumptions', href: '#initial-assumptions', muted: true },
  { label: 'Inspiration', href: '#inspiration' },
  { label: 'Research', href: '#research' },
  { label: 'How Might We', href: '#how-might-we' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'User Journey', href: '#user-journey' },
  { label: 'Solution', href: '#solution' },
  { label: 'Limitation', href: '#limitation' },
  { label: 'Reflection', href: '#reflection' },
]

// CookPilot's own table of contents (Figma node 589:1936/589:1938,
// the sidebar instance override on the CookPilot frame) - a different
// section list from BioScent's, so it can't share that one array. Both
// "Before cooking" and "During cooking" are one "Solution" section in
// Figma's own TOC, jumping to the first of the two.
const COOKPILOT_TOC_ITEMS = [
  { label: 'Hackathon Theme', href: '#hackathon-theme' },
  { label: 'Problem & Pain Point', href: '#problem' },
  { label: 'Existing Solution', href: '#existing-solution' },
  { label: 'Solution', href: '#before-cooking' },
  { label: 'Tech Stack, AI, APIs', href: '#tech-stack' },
  { label: 'Future Improvements', href: '#future-improvements' },
  { label: 'Reflection', href: '#reflection' },
]

// VisualEyes' own table of contents. Figma's sidebar instance on the
// VisualEyes frame (node 573:2911/573:2912) is literally the same
// static component as BioScent's, reused as-is with BioScent's own
// labels ("Problem", "Ecosystem", "Solution"...) rather than
// customized per case study - it's decorative chrome in that file,
// not a real nav. On the live site those labels don't match any of
// VisualEyes' actual sections, so every item past the first landed
// nowhere. This list points at VisualEyes' own section ids instead.
const VISUALEYES_TOC_ITEMS = [
  { label: 'Big Idea', href: '#big-idea' },
  { label: 'Defining Balance', href: '#balance' },
  { label: 'User Interview', href: '#interview' },
  { label: 'Personas', href: '#personas' },
  { label: 'Refined Challenge', href: '#refined-challenge' },
  { label: 'How Might We', href: '#how-might-we' },
  { label: 'Idea Brainstorm', href: '#existing-solution' },
  { label: 'Low-Fidelity', href: '#lowfi' },
  { label: 'High-Fidelity', href: '#hifi' },
  { label: '3D World Experimentation', href: '#3d-world' },
  { label: 'Quiz Input', href: '#quiz-input' },
  { label: 'User Testing', href: '#user-testing' },
  { label: 'Reflection', href: '#reflection' },
]

// About page's own table of contents (Figma node 653:1112, TOC override at
// I653:1112;432:22547) - user-supplied labels, not the section headings
// themselves. Hrefs point at "A little about me" (653:1131/622:1896),
// "Fun fact about me" (653:1095, new section added alongside this TOC
// update), "Playlist" (640:2166, labelled "Favourite songs" here per the
// latest Figma edit), "Little Things I'm Proud Of" (622:1918) and
// "'26 Favourites" (622:1937) in that order - this is the full page, no
// muted items left.
const ABOUT_TOC_ITEMS = [
  { label: 'Hello', href: '#about-title' },
  { label: 'Fun fact about me', href: '#fun-fact-title' },
  { label: 'Favourite songs', href: '#playlist-title' },
  { label: 'Things I’m proud of', href: '#proud-title' },
  { label: 'Communities', href: '#favourites-title' },
]

const TOC_ITEMS_BY_PATH = {
  '/work/cookpilot': COOKPILOT_TOC_ITEMS,
  '/work/visualeyes': VISUALEYES_TOC_ITEMS,
  '/about': ABOUT_TOC_ITEMS,
}

// Only the case studies themselves get the floating back-to-top - these
// are the long, read-start-to-finish pages it's meant to shortcut.
const CASE_STUDY_PATHS = new Set(['/work/bioscent', '/work/cookpilot', '/work/visualeyes'])

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Appears once the reader has scrolled past the hero, so it's reachable
// from anywhere in a case study rather than only right after the TOC.
// Colored to match that case study's own footer (see the same
// isCookPilot/isBioScent/isVisualEyes split in Footer.jsx) rather than a
// single fixed color, so it reads as that page's accent, not generic
// site chrome.
function FloatingBackToTop() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isCookPilot = pathname === '/work/cookpilot'
  const isBioScent = pathname === '/work/bioscent'
  const isVisualEyes = pathname === '/work/visualeyes'
  const accentClass = isCookPilot
    ? ' floating-back-to-top-cookpilot'
    : isBioScent
      ? ' floating-back-to-top-bioscent'
      : isVisualEyes
        ? ' floating-back-to-top-visualeyes'
        : ''

  return (
    <button
      type="button"
      className={`floating-back-to-top${accentClass}${visible ? ' is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUpIcon />
    </button>
  )
}

// Plain href="#..." anchors jump instantly by default - this scrolls
// smoothly instead (same behavior/feel as scrollToTop above), while
// still updating the URL hash via pushState so the address bar and
// back button behave the same as a real anchor click would. Muted
// items (sections not built yet) have no matching id in the DOM, so
// this just falls through to the browser's harmless default for those
// rather than needing to special-case them.
function handleTocClick(e, href) {
  const target = document.getElementById(href.slice(1))
  if (!target) return
  e.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.pushState(null, '', href)
}

function TableOfContents() {
  const { pathname } = useLocation()
  const items = TOC_ITEMS_BY_PATH[pathname] ?? BIOSCENT_TOC_ITEMS

  return (
    <nav className="toc" aria-label="Table of contents">
      <Link to="/" className="toc-back">
        &larr; Works
      </Link>
      <div className="toc-group">
        <p className="toc-heading">TABLE OF CONTENTS</p>
        <ul className="toc-list">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={`toc-item${item.muted ? ' toc-item-muted' : ''}`} onClick={(e) => handleTocClick(e, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// "Works" only exists as an in-page anchor on the homepage. From any
// other route, prefix with "/" so the link is a real navigation back to
// Home (landing at the top) instead of a dead same-page anchor. "About
// me" is its own page (see AboutMe.jsx) - always a real Link, no anchor.
export default function Sidebar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const homePrefix = isHome ? '' : '/'

  if (!isHome) {
    return (
      <>
        <aside className="sidebar sidebar-toc">
          <div className="sidebar-inner">
            <TableOfContents />
          </div>
        </aside>
        {CASE_STUDY_PATHS.has(pathname) && <FloatingBackToTop />}
      </>
    )
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
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
          <a href={`${homePrefix}#work`}>
            <span className="nav-link-text">Works</span>
          </a>
          <Link to="/about">
            <span className="nav-link-text">About me</span>
          </Link>
          <div className="nav-link-chat">
            <span className="nav-link-text">Let&rsquo;s chat!</span>
            <div className="nav-link-chat-options">
              <a className="nav-link-chat-icon" href="mailto:veralynliyi@gmail.com" aria-label="Email">
                <EmailIcon />
              </a>
              <a
                className="nav-link-chat-icon"
                href="https://www.linkedin.com/in/veralynliyi"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInBadgeIcon />
              </a>
            </div>
          </div>
          <span className="nav-link-pending">Playground *coming soon*</span>
        </nav>
      </div>
    </aside>
  )
}
