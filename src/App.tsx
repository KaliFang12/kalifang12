import { motion } from "framer-motion";
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { getProjectBySlug, projects } from "./data/projects";
import {
  EASING,
  fadeIn,
  fadeUp,
  inViewOnce,
  slowReveal,
  staggerContainerFast,
  useReducedMotion,
} from "./lib/motion";

const MotionLink = motion(Link);

function Navigation() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <MotionLink
          to="/"
          className="nav__link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </MotionLink>
        <MotionLink
          to="/resume"
          className="nav__link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Resume
        </MotionLink>
        <MotionLink
          to="/about"
          className="nav__link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          About Me
        </MotionLink>
      </div>
    </nav>
  );
}

function ContactBar() {
  return (
    <footer className="contact-bar">
      <div className="contact-bar__inner">
        <h3 className="contact-bar__title">Contact me</h3>
        <a href="https://www.linkedin.com/in/kali-fang" className="contact-bar__email" target="_blank" rel="noopener noreferrer">
          <svg className="contact-bar__icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          linkedin.com/in/kali-fang
        </a>
        <a href="mailto:kalifang1935@gmail.com" className="contact-bar__email">
          <svg className="contact-bar__icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          kalifang1935@gmail.com
        </a>
      </div>
    </footer>
  );
}

function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Navigation />
      <motion.header
        className="hero"
        initial="hidden"
        animate="visible"
        variants={slowReveal(prefersReducedMotion)}
      >
        <div className="hero__inner">
          <div className="hero__photo-wrapper">
            <img
              className="hero__photo"
              src="/Myself.jpg"
              alt="Kali Fang - Profile Photo"
            />
          </div>
          <div className="hero__content">
            <p className="hero__eyebrow">Portfolio</p>
            <h1 className="hero__title">Kali Fang</h1>
            <p className="hero__about">
              I'm a Senior Mechanical Engineering student graduating in May 2026 at Worcester Polytechnic 
              Institute (WPI) with a minor in Robotics Engineering. I have experience in software development, 
              robotics, and mechanical design. Check out my projects below!
            </p>
          </div>
        </div>
      </motion.header>

      <main>
        <motion.section
          className="projects"
          id="projects"
          aria-labelledby="projects-title"
          variants={fadeIn(prefersReducedMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <motion.div
            className="section-heading"
            variants={fadeUp(prefersReducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            <h2 id="projects-title">Projects</h2>
            <p>I worked with teams throughout these projects to deliver creative projects, demonstrated below. Each project was developed through its full life cycle.</p>
          </motion.div>

          <motion.div
            className="project-grid"
            variants={staggerContainerFast(prefersReducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            {projects.map((project) => (
              <MotionLink
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="project-card"
                variants={fadeUp(prefersReducedMotion)}
                whileHover={{ y: prefersReducedMotion ? 0 : -5 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.99 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, ease: EASING.default }}
                aria-label={`Open dedicated page for ${project.title}`}
              >
                {(project.slug === "slam-robot-navigation" || project.slug === "blood-pressure-monitor") && (
                  <div className="project-card__badge">In Progress</div>
                )}
                <img
                  className="project-card__image"
                  src={project.thumbnail}
                  alt={`${project.title} preview image`}
                  loading="lazy"
                />
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__text">{project.shortDescription}</p>
                </div>
              </MotionLink>
            ))}
          </motion.div>
        </motion.section>
      </main>
      <ContactBar />
    </>
  );
}

function OtherPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Navigation />
      <main className="other-page">
        <motion.div
          className="other-content"
          variants={fadeUp(prefersReducedMotion)}
          initial="hidden"
          animate="visible"
        >
          <Link className="back-link" to="/">
            ← Back to home
          </Link>

          <h1 className="about-title">About Me</h1>

          {/* Image Locations Section */}
          <section className="content-section">
            <h2>Hobbies</h2>
            <div className="image-locations-grid">
              <div className="image-location-item">
                <img src="/billiards.jpg" alt="Billiards" className="location-photo" />
                <h3>Billiards</h3>
                <p>Fun with friends</p>
              </div>
              <div className="image-location-item">
                <img src="/rock-climbing.jpg" alt="Rock Climbing" className="location-photo" />
                <h3>Rock Climbing</h3>
                <p>Exploring the outdoors</p>
              </div>
              <div className="image-location-item">
                <img src="/snowboarding.jpg" alt="Snowboarding" className="location-photo" />
                <h3>Snowboarding</h3>
                <p>Winter adventures</p>
              </div>
            </div>
          </section>

        </motion.div>
      </main>
      <ContactBar />
    </>
  );
}

function ResumePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Navigation />
      <main className="other-page">
        <motion.div
          className="other-content"
          variants={fadeUp(prefersReducedMotion)}
          initial="hidden"
          animate="visible"
        >
          <Link className="back-link" to="/">
            ← Back to home
          </Link>

          <h1 className="about-title">Resume</h1>

          {/* Resume Section */}
          <section className="content-section">
            <div className="resume-container">
              <embed src="/kali-fang-resume.pdf" type="application/pdf" className="resume-image" />
            </div>
          </section>
        </motion.div>
      </main>
      <ContactBar />
    </>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const prefersReducedMotion = useReducedMotion();

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="project-page">
      <motion.div
        className="project-detail"
        variants={fadeUp(prefersReducedMotion)}
        initial="hidden"
        animate="visible"
      >
        <Link className="project-detail__back" to="/">
          ← Back to home
        </Link>
        <p className="hero__eyebrow">Project</p>
        <h1 className="project-detail__title">{project.title}</h1>

        {/* Topics Section (directly under title) */}
        <section className="project-topics">
          <h2>Concepts</h2>
          <div className="topics-container">
            {project.topics.map((topic) => (
              <span key={topic} className="topic-bubble">
                {topic}
              </span>
            ))}
          </div>
        </section>

        <div className="project-detail__media-wrap">
          <img className="project-detail__image" src={project.image} alt={`${project.title} detailed preview`} />
        </div>

        {/* Render each paragraph separately for the details text */}
        <div className="project-detail__description-wrap">
          {project.details.split("\n\n").map((paragraph, index) => (
            <p key={index} className="project-detail__description">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* Additional Image Section */}
        <section className="project-section">
          <h2>Additional Images</h2>
          <div className="project-detail__media-wrap">
            {project.slug === "blood-pressure-monitor" ? (
              <div className="additional-images-grid">
                <img src="/MQP-test1.jpg" alt="MQP Test 1" className="additional-image" />
                <img src="/MQP-self-test.jpg" alt="MQP Self Test" className="additional-image" />
              </div>
            ) : project.slug === "autonomous-maze-navigation-robot" ? (
              <div className="additional-images-grid">
                <img src="/RBE2002.jpg" alt="RBE2002 Robot" className="additional-image" />
              </div>
            ) : project.slug === "robotic-linkage-system" ? (
              <div className="additional-images-grid">
                <img src="/RBE2001.jpg" alt="RBE2001 Linkage System" className="additional-image" />
              </div>
            ) : (
              <div className="placeholder-image">
                <p>Additional project images will be imported here</p>
              </div>
            )}
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="project-section">
          <h2>Demo Video</h2>
          <div className="project-detail__media-wrap">
            {project.slug === "autonomous-maze-navigation-robot" ? (
              <div className="video-container">
                <iframe
                  className="project-detail__video"
                  src="https://www.youtube.com/embed/pE_0GdaZ4dg"
                  title="RBE2002 Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : project.slug === "4dof-robotic-arm" ? (
              <div className="video-container">
                <iframe
                  className="project-detail__video"
                  src="https://www.youtube.com/embed/2nHPzWCtcVw"
                  title="RBE3001 Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : project.slug === "robotic-linkage-system" ? (
              <div className="video-container">
                <iframe
                  className="project-detail__video"
                  src="https://www.youtube.com/embed/LxkrFmDtD2k"
                  title="RBE2001 Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ): (
              <div className="placeholder-video">
                <p>Project demo video will be embedded here</p>
              </div>
            )}
          </div>
          <div className="video-links">
            {project.links.map((link) => (
              <a key={`${project.title}-${link.label}`} href={link.url} target="_blank" rel="noreferrer noopener" className="video-link">
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </motion.div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/about" element={<OtherPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
