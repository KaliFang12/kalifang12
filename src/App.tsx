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

function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <motion.header
        className="hero"
        initial="hidden"
        animate="visible"
        variants={slowReveal(prefersReducedMotion)}
      >
        <div className="hero__inner">
          <p className="hero__eyebrow">Portfolio</p>
          <h1 className="hero__title">Kali Fang</h1>
          <p className="hero__about">
            I design and build thoughtful digital experiences with a strong focus on
            clarity, performance, and detail. My work balances visual polish with
            practical user-centered problem solving.
          </p>
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
            <h2 id="projects-title">Selected Projects</h2>
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
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
