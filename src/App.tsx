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
          to="/other"
          className="nav__link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Other
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
            <p>Six projects with concise overviews and deeper case-study details.</p>
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
          
          {/* Topic Section */}
          <section className="content-section">
            <h2>Topic Section</h2>
            {/* 
              TOPIC SECTION TEMPLATE:
              This section should introduce the main topic or theme of your content.
              Include:
              - A compelling hook or introduction
              - Background context
              - Main thesis or objective
              - What readers can expect to learn
            */}
            <div className="placeholder-content">
              <p><em>[Topic content goes here - introduce your main subject]</em></p>
            </div>
          </section>

          {/* Body Section */}
          <section className="content-section">
            <h2>Body Section</h2>
            {/* 
              BODY SECTION TEMPLATE:
              This is the main content area where you develop your ideas.
              Structure your body with:
              - Multiple subsections for different aspects
              - Supporting evidence, examples, or data
              - Analysis and explanations
              - Visual elements (images, diagrams, etc.)
              - Clear transitions between ideas
            */}
            <div className="placeholder-content">
              <p><em>[Body content goes here - develop your main ideas and arguments]</em></p>
              
              <h3>Subsection 1</h3>
              <p><em>[First major point or aspect]</em></p>
              
              <h3>Subsection 2</h3>
              <p><em>[Second major point or aspect]</em></p>
              
              <h3>Subsection 3</h3>
              <p><em>[Third major point or aspect]</em></p>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="content-section">
            <h2>Conclusion Section</h2>
            {/* 
              CONCLUSION SECTION TEMPLATE:
              Wrap up your content and leave a lasting impression.
              Include:
              - Summary of key points
              - Restatement of main thesis/objective
              - Final thoughts or implications
              - Call to action or next steps
              - Memorable closing statement
            */}
            <div className="placeholder-content">
              <p><em>[Conclusion content goes here - summarize and wrap up your content]</em></p>
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
        <p className="project-detail__description">{project.details}</p>
        
        <div className="project-detail__media-wrap">
          <img className="project-detail__image" src={project.image} alt={`${project.title} detailed preview`} />
        </div>

        {/* Additional Image Section */}
        <section className="project-section">
          <h2>Additional Images</h2>
          <div className="project-detail__media-wrap">
            <div className="placeholder-image">
              <p>Additional project image will be imported here</p>
              {/* TODO: Replace with actual image import */}
              {/* <img src="/path-to-additional-image.jpg" alt="Additional project image" /> */}
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="project-section">
          <h2>Demo Video</h2>
          <div className="project-detail__media-wrap">
            <div className="placeholder-video">
              <p>Project demo video will be embedded here</p>
              {/* TODO: Replace with actual video embed */}
              {/* <video controls>
                <source src="/path-to-demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
            </div>
          </div>
        </section>

        <div className="modal__links">
          {project.links.map((link) => (
            <a key={`${project.title}-${link.label}`} href={link.url} target="_blank" rel="noreferrer noopener">
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/other" element={<OtherPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
