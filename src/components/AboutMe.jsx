import { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import aboutCollage1 from '../assets/about/about-collage-1.jpg'
import aboutCollage2 from '../assets/about/about-collage-2.jpg'
import aboutCollage3 from '../assets/about/about-collage-3.jpg'
import proudArticleScreenshot from '../assets/about/proud-article-screenshot.png'
import proudAwardRedbull from '../assets/about/proud-award-redbull.jpg'
import proudAwardTencent from '../assets/about/proud-award-tencent.jpg'
import proudAwardIcon from '../assets/about/proud-award-icon.jpg'
import communitiesPhoto1 from '../assets/about/communities-photo-1.jpg'
import communitiesPhoto2 from '../assets/about/communities-photo-2.jpg'
import communitiesPhoto3 from '../assets/about/communities-photo-3.jpg'
import communitiesPhoto4 from '../assets/about/communities-photo-4.jpg'
import communitiesPhoto5 from '../assets/about/communities-photo-5.jpg'
import './AboutMe.css'

// Playlist (Figma node 640:2166 "PLAYLIST"): the 3 tiles have no
// extractable image/video fill via Figma's API - the screenshot shows
// Spotify's own standard track-embed chrome (art, title, artist,
// Spotify wordmark) rather than a photo, so these are real Spotify
// track embeds, not static images. Loaded once and shared by all 3
// cards - the underlying <script> and window.onSpotifyIframeApiReady
// callback only need to fire once per page load. See
// https://developer.spotify.com/documentation/embeds/references/iframe-api
// Section 1 collage captions (Figma has no text for these - user-supplied,
// left to right matching aboutCollage1/2/3).
const ABOUT_COLLAGE = [
  { src: aboutCollage1, alt: 'Close-up selfie portrait', caption: 'Hiiii :)' },
  { src: aboutCollage2, alt: 'Sitting on the edge of a cliff overlooking the ocean', caption: 'Lincoln rock!' },
  { src: aboutCollage3, alt: 'Mid-pose during an acrobatic dance performance', caption: 'Yesss i dance tooo' },
]

// Awards hover captions (Figma has no text for these - user-supplied,
// grammar lightly cleaned up, left to right matching the awards grid below).
const AWARDS = [
  {
    src: proudAwardRedbull,
    alt: 'On stage presenting BioScent at RedBull Basement 2026',
    caption: (
      <>
        RedBull Basement 2026 - National Finalist
        <br />
        Project: BioScent
      </>
    ),
    hoverCaption: 'Met so many amazing and ambitious students from across australia!',
  },
  {
    src: proudAwardTencent,
    alt: 'Standing on stage holding a placement certificate at Tencent Future Close Up 2026',
    caption: (
      <>
        Tencent Future Close Up 2026 - 3rd Place
        <br />
        Project: BioScent
      </>
    ),
    hoverCaption: "Sadly i couldn't pitch, but so humbled that bioscent made it to the international stage in china!",
  },
  {
    src: proudAwardIcon,
    alt: 'Holding a first place winner certificate for CookPilot at ICON UNSW x Lyra',
    caption: (
      <>
        ICON UNSW x Lyra - 1st Place
        <br />
        Project: CookPilot
      </>
    ),
    hoverCaption: "Icon unsw x lyra '26",
  },
]

// Favourites/communities grid hover captions (Figma has no text for these -
// user-supplied, grammar lightly cleaned up, left to right then top to
// bottom matching the grid below).
const FAVOURITES = [
  { src: communitiesPhoto1, alt: 'Posing with two friends in an office', hoverCaption: 'Capgemini x uts consulting club case competition!' },
  { src: communitiesPhoto2, alt: 'Group photo with the Apple Foundation Program cohort', hoverCaption: 'Apple foundation program @ uts!' },
  { src: communitiesPhoto3, alt: 'Standing with a mentor beside the Red Bull Basement sign', hoverCaption: 'My initial pitch for redbull basement!' },
  { src: communitiesPhoto4, alt: 'Large group photo at a hackathon demo event', hoverCaption: 'Collage event!' },
  // Figma crops this one specially (node 622:1950: image scaled to
  // 178.45% of the tile height, shifted up by 11.71%) instead of a
  // plain center-crop - the default center crop cuts the group off:
  // converted to the equivalent object-position (see HoverCaptionPhoto).
  { src: communitiesPhoto5, alt: 'Sitting around a table laughing with friends', hoverCaption: "Yas, that's my internship boss!", objectPosition: '50% 15%' },
]

// Cursor-following caption pop-up, reused for the section 1 collage
// photos, the awards photos, and the favourites/communities grid below -
// not in Figma, this page's own addition. Same technique as BioScent's
// CollageCaptionPhoto (see the comment there in BioScent.jsx) and this
// page's own PlaylistCard caption below - kept generic here (className
// props) since this page uses it in three places with different
// wrapper/caption styling.
function HoverCaptionPhoto({ src, alt, caption, itemClassName, photoClassName, captionClassName, objectPosition }) {
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
      className={itemClassName}
      onMouseEnter={(e) => {
        updatePos(e)
        setHovering(true)
      }}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={updatePos}
    >
      <img className={photoClassName} src={src} alt={alt} style={objectPosition ? { objectPosition } : undefined} />
      <span
        ref={(node) => {
          captionRef.current = node
          if (node) {
            node.style.left = `${posRef.current.x}px`
            node.style.top = `${posRef.current.y}px`
          }
        }}
        className={`${captionClassName}${hovering ? ' is-visible' : ''}`}
      >
        {caption}
      </span>
    </div>
  )
}

let spotifyIframeApiPromise = null
function loadSpotifyIframeApi() {
  if (!spotifyIframeApiPromise) {
    spotifyIframeApiPromise = new Promise((resolve) => {
      window.onSpotifyIframeApiReady = resolve
      const script = document.createElement('script')
      script.src = 'https://open.spotify.com/embed/iframe-api/v1'
      script.async = true
      document.body.appendChild(script)
    })
  }
  return spotifyIframeApiPromise
}

// One playlist card: hovering plays/pauses the track via Spotify's
// official postMessage-based EmbedController (play()/pause()), and
// shows a small cursor-following "Now playing" caption - same
// mouse-tracking hover-caption technique as BioScent's
// CollageCaptionPhoto (see .case-study-reflection-collage-caption in
// BioScent.css), reused here as its own class since this page has no
// existing caption pattern of its own.
//
// Spotify's embed always shows its own "Save on Spotify" affordance -
// there's no documented createController option or embed view that
// removes it (verified: a pre-set view=coverart src gets discarded on
// creation, and Spotify's live embed page ignores that query param
// entirely - it isn't a real toggle). Genuine play-on-hover requires
// this full embed.
function PlaylistCard({ trackId, title, artist }) {
  const containerRef = useRef(null)
  const controllerRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const captionRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let cancelled = false
    let observer
    loadSpotifyIframeApi().then((IFrameAPI) => {
      if (cancelled || !containerRef.current) return
      // Spotify's SDK doesn't append the iframe *into* the element we
      // give it - it replaces that element outright with its own iframe
      // (the .case-study-about-playlist-embed div is gone from the DOM
      // afterwards). So containerRef.current itself is what disappears;
      // watch its *parent* instead, which is what actually gains the
      // iframe as a child.
      const parent = containerRef.current.parentNode
      IFrameAPI.createController(containerRef.current, { uri: `spotify:track:${trackId}`, width: '100%', height: '100%' }, (controller) => {
        if (cancelled) {
          controller.destroy()
          return
        }
        controllerRef.current = controller
      })
      // The injected iframe comes with loading="lazy" - harmless near the
      // top of the page, but this section can sit further down (e.g.
      // below other sections), so the browser defers fetching it until
      // scrolled near, and the card can look blank/missing until then.
      // Force it eager the moment it lands so the artwork always loads
      // with the rest of the page, regardless of scroll position.
      const forceEager = (iframe) => {
        iframe.loading = 'eager'
        observer?.disconnect()
      }
      const existing = parent?.querySelector('iframe')
      if (existing) {
        forceEager(existing)
      } else if (parent) {
        observer = new MutationObserver(() => {
          const iframe = parent.querySelector('iframe')
          if (iframe) forceEager(iframe)
        })
        observer.observe(parent, { childList: true, subtree: true })
      }
    })
    return () => {
      cancelled = true
      observer?.disconnect()
      controllerRef.current?.destroy()
    }
  }, [trackId])

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
      className="case-study-about-playlist-item"
      onMouseEnter={(e) => {
        updatePos(e)
        setHovering(true)
        controllerRef.current?.play()
      }}
      onMouseLeave={() => {
        setHovering(false)
        controllerRef.current?.pause()
      }}
      onMouseMove={updatePos}
    >
      <div className="case-study-about-playlist-embed" ref={containerRef} />
      <span
        ref={(node) => {
          captionRef.current = node
          if (node) {
            node.style.left = `${posRef.current.x}px`
            node.style.top = `${posRef.current.y}px`
          }
        }}
        className={`case-study-about-playlist-caption${hovering ? ' is-visible' : ''}`}
      >
        {`♪ Now playing: ${title} — ${artist}`}
      </span>
    </div>
  )
}

export default function AboutMe() {
  return (
    <>
      <div className="case-study">
        <Sidebar />
        <main className="case-study-main">
          <section className="case-study-section case-study-about-intro" aria-labelledby="about-title">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-about">HELLO!</span>
              <div className="case-study-about-heading-group">
                <h1 id="about-title" className="case-study-about-heading">
                  A little about me.
                </h1>
                <p className="case-study-section-description">
                  Born in Malaysia, raised in Singapore, and having spent 2025 in Melbourne, I&rsquo;ve always been drawn to unfamiliar paths. I am never afraid of failing, love taking risks, choosing routes people told me not to take, only to discover views others never got to see.
                  <br />
                  <br />
                  With a designer&rsquo;s heart, I&rsquo;ve always been drawn to making things beautiful. Now, I&rsquo;m learning how to make those ideas functional, meaningful and useful for people. Outside of my 9&ndash;5 at uni, my 5&ndash;9 is usually spent meeting people in the industry, learning from them, or thinking about the next problem I want to solve.
                </p>
              </div>
            </div>
            <div className="case-study-about-collage">
              {ABOUT_COLLAGE.map((item, i) => (
                <HoverCaptionPhoto
                  key={i}
                  src={item.src}
                  alt={item.alt}
                  caption={item.caption}
                  itemClassName="case-study-about-collage-item"
                  photoClassName="case-study-about-collage-photo"
                  captionClassName="case-study-about-collage-caption"
                />
              ))}
            </div>
          </section>
          <section className="case-study-section case-study-about-fun-facts" aria-labelledby="fun-fact-title">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-about">FUN FACT ABOUT ME!</span>
              <div className="case-study-about-heading-group">
                <h2 id="fun-fact-title" className="case-study-section-heading">
                  You might find me weird, but that&rsquo;s okay :,)
                </h2>
                <ol className="case-study-about-fun-facts-list">
                  <li>I hate cheese but loveee pizza.</li>
                  <li>I&rsquo;ve gone by Vivian, Vian, Verlyn before finally becoming Veralyn :)</li>
                  <li>I understand 8 languages</li>
                  <li>I&rsquo;m in my 20s, but my knees are 55, my neck is 60 and my back is pushing 80&hellip;</li>
                  <li>Solo travelled 6 countries &lsquo;24/25</li>
                </ol>
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-about-playlist" aria-labelledby="playlist-title">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-about">FAVOURITE SONGS</span>
              <h2 id="playlist-title" className="case-study-section-heading">
                What&rsquo;s been living in my headphones
              </h2>
            </div>
            <div className="case-study-about-playlist-grid">
              <PlaylistCard trackId="73c7iqH4lCVqu4tm66i0tY" title="Risk" artist="Gracie Abrams" />
              <PlaylistCard trackId="6fkq8wK3wZQoZ1pogOVAHa" title="Falling In Love" artist="Cigarettes After Sex" />
              <PlaylistCard trackId="6gkbtMtioHgtyGjrMel6ei" title="drop dead" artist="Olivia Rodrigo" />
            </div>
          </section>
          <section className="case-study-section case-study-about-proud" aria-labelledby="proud-title">
            <div className="case-study-about-proud-group">
              <span className="case-study-tag case-study-tag-about">LITTLE THINGS THAT I AM PROUD OF</span>
              <h2 id="proud-title" className="case-study-section-heading">
                Missing Perspective
              </h2>
              <a
                className="case-study-about-proud-link"
                href="https://missingperspectives.com/posts/veralyn-chong-li-yi-startup-founder-story/"
                target="_blank"
                rel="noreferrer"
              >
                <p className="case-study-section-description">Read the article here &rarr;</p>
                <img className="case-study-about-proud-screenshot" src={proudArticleScreenshot} alt="Screenshot of the Missing Perspectives article about Veralyn" />
              </a>
              <h3 className="case-study-section-heading">Awards</h3>
              <div className="case-study-about-awards-grid">
                {AWARDS.map((award, i) => (
                  <div key={i} className="case-study-about-award-item">
                    <p className="case-study-about-award-caption">{award.caption}</p>
                    <HoverCaptionPhoto
                      src={award.src}
                      alt={award.alt}
                      caption={award.hoverCaption}
                      itemClassName="case-study-about-award-photo"
                      photoClassName="case-study-about-award-image"
                      captionClassName="case-study-about-award-hover-caption"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="case-study-section case-study-about-favourites" aria-labelledby="favourites-title">
            <div className="case-study-section-intro">
              <span className="case-study-tag case-study-tag-about">COMMUNITIES I LOVE</span>
              <h2 id="favourites-title" className="case-study-section-heading">
                &lsquo;26 Favourites!
              </h2>
            </div>
            <div className="case-study-about-favourites-grid">
              {FAVOURITES.map((photo, i) => (
                <HoverCaptionPhoto
                  key={i}
                  src={photo.src}
                  alt={photo.alt}
                  caption={photo.hoverCaption}
                  itemClassName="case-study-about-favourites-item"
                  photoClassName="case-study-about-favourites-image"
                  captionClassName="case-study-about-favourites-caption"
                  objectPosition={photo.objectPosition}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}
