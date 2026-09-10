import bioscentImg from '../assets/work-cards/bioscent.jpg'
import cookpilotImg from '../assets/work-cards/cookpilot.jpg'
import visualeyesImg from '../assets/work-cards/visualeyes.jpg'
import './Home.css'

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

function WorkCard({ id, image, title, description, role, team, reveal }) {
  return (
    <article className="work-card" data-project={id}>
      <div className="work-card-media">
        <img className="work-card-image" src={image} alt="" />
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
