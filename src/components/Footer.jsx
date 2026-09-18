import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

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
        fill="currentColor"
      />
      <path
        d="M13.4994 12.7485C11.3051 12.7485 0.0168532 6.74102 0.0179768 6.74102L0 20.2236C0 21.464 1.00782 22.4707 2.24934 22.4707H24.7495C25.9933 22.4707 27 21.464 27 20.2236L26.982 6.74102C26.982 6.74102 15.905 12.7485 13.4994 12.7485Z"
        fill="currentColor"
      />
    </svg>
  )
}

// "All projects" only exists as an in-page anchor on the homepage.
// "About me" is its own page (see AboutMe.jsx) - see the matching note
// in Sidebar.jsx.
export default function Footer() {
  const { pathname } = useLocation()
  const homePrefix = pathname === '/' ? '' : '/'
  const isCookPilot = pathname === '/work/cookpilot'
  const isBioScent = pathname === '/work/bioscent'
  const isVisualEyes = pathname === '/work/visualeyes'

  return (
    <footer
      className={`site-footer${isCookPilot ? ' site-footer-cookpilot' : ''}${isBioScent ? ' site-footer-bioscent' : ''}${isVisualEyes ? ' site-footer-visualeyes' : ''}`}
    >
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
          <a href={`${homePrefix}#work`}>All projects</a>
          <Link to="/about">About me</Link>
          <span className="nav-link-pending">Resume</span>
        </nav>
      </div>
      <hr className="site-footer-divider" />
      <p className="site-footer-copyright">&copy; 2026 Veralyn &bull; Privacy</p>
    </footer>
  )
}
