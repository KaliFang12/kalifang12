import { motion } from "framer-motion";
import { useState } from "react";
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

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

function parseProjectDate(date?: string) {
  if (!date) return 0;

  const normalized = date.trim().toLowerCase();
  if (normalized === "present" || normalized === "ongoing" || normalized === "in progress") {
    return Infinity;
  }

  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) {
    return parsed;
  }

  const split = date.split(" ").filter(Boolean);
  if (split.length >= 2) {
    const month = split[0];
    const year = split[1];
    const guess = Date.parse(`${month} 1, ${year}`);
    if (!Number.isNaN(guess)) {
      return guess;
    }
  }

  return 0;
}

function sortProjectsByDateDesc(projectArray: Array<any>) {
  return [...projectArray].sort((a, b) => {
    const aEnd = parseProjectDate(a.endDate);
    const bEnd = parseProjectDate(b.endDate);
    if (aEnd !== bEnd) {
      return bEnd - aEnd;
    }

    const aStart = parseProjectDate(a.startDate);
    const bStart = parseProjectDate(b.startDate);
    return bStart - aStart;
  });
}

function getProjectStatus(project: { startDate?: string; endDate?: string }) {
  const end = project.endDate?.trim().toLowerCase();
  if (!end || end === "present" || end === "ongoing" || end === "in progress") {
    return "in-progress";
  }

  const parsedEnd = parseProjectDate(project.endDate);
  if (parsedEnd === Infinity) {
    return "in-progress";
  }

  return parsedEnd > Date.now() ? "in-progress" : "completed";
}

function formatProjectDateRange(project: { startDate?: string; endDate?: string }) {
  if (!project.startDate && !project.endDate) {
    return "";
  }
  if (!project.endDate || project.endDate.toLowerCase() === "present") {
    return `${project.startDate ?? ""} - Present`;
  }

  return `${project.startDate ?? ""} - ${project.endDate}`;
}

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
          to="/projects"
          className="nav__link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Projects
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
        <a href="mailto:kalifang12@gmail.com" className="contact-bar__email">
          <svg className="contact-bar__icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          kalifang12@gmail.com
        </a>
      </div>
    </footer>
  );
}

function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  const featuredProjects = sortProjectsByDateDesc(projects.filter((project) => project.featured));

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
              src={asset("Myself.jpg")}
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
          className="skills"
          id="skills"
          aria-labelledby="skills-title"
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
            <h2 id="skills-title">Technical Skills</h2>
            <p>Key concepts that I have developed from various projects I have worked on.</p>
          </motion.div>

          <motion.div
            className="skills-table"
            variants={fadeIn(prefersReducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            <table>
              <tbody>
                <tr>
                  <th>Programming Languages</th>
                  <td>Python, C/C++, Java, JavaScript, MATLAB, HTML/CSS</td>
                </tr>
                <tr>
                  <th>Softwares</th>
                  <td>Linux, MATLAB, Simulink, SolidWorks, ROS2, Arduino IDE</td>
                </tr>
                <tr>
                  <th>Frameworks & Tools</th>
                  <td>Git, GitHub, PlatformIO, React, Flask</td>
                </tr>
                <tr>
                  <th>Control Algorithms</th>
                  <td>Bang-Bang Control, PID Control, Motor Control, Robotics Navigation</td>
                </tr>
                <tr>
                  <th>Microcontrollers</th>
                  <td>Arduino Uno, ESP32, Polulu Romi32u4, Raspberry Pi</td>
                </tr>
                <tr>
                  <th>Communication / Interfaces</th>
                  <td>I2C, SPI, UART / Serial Communication, WiFi Communication</td>
                </tr>
                <tr>
                  <th>Sensors & Hardware Integration</th>
                  <td>Gyroscopes, Accelerometers, AprilTag Vision System, Sensor Integration, IMU Data Processing</td>
                </tr>
                <tr>
                  <th>Robotics / Controls</th>
                  <td>Forward Kinematics, Denavit–Hartenberg (DH) Parameters, Trajectory Planning, State Estimation, Robot Arm Kinematics, Closed Loop Control</td>
                </tr>
                <tr>
                  <th>Simulation & Modeling</th>
                  <td>Robot Simulation, Dynamic Modeling, MATLAB Robotics Toolbox</td>
                </tr>
                <tr>
                  <th>Fabrication / Prototyping</th>
                  <td>3D Printing, Mechanical Assembly, Rapid Prototyping</td>
                </tr>
                <tr>
                  <th>Electronics</th>
                  <td>H-Bridge Motor Drivers, Strain Gauges, Wheatstone Bridge Circuits, Basic Circuit Design</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </motion.section>

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
            <h2 id="projects-title">Featured Projects</h2>
            <p>These are my most recent and challenging projects I am working on.</p>
          </motion.div>

          <motion.div
            className="project-grid"
            variants={staggerContainerFast(prefersReducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            {featuredProjects.map((project) => (
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
                  src={asset(project.thumbnail)}
                  alt={`${project.title} preview image`}
                  loading="lazy"
                />
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__meta">{formatProjectDateRange(project)}</p>
                  <p className="project-card__text">{project.shortDescription}</p>
                </div>
              </MotionLink>
            ))}
          </motion.div>
          <div className="projects-cta" style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link className="project-cta-button" to="/projects">
              View All Projects →
            </Link>
          </div>
        </motion.section>
      </main>
      <ContactBar />
    </>
  );
}

function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion();
  const [projectFilter, setProjectFilter] = useState<"all" | "featured" | "in-progress" | "completed">("all");

  const sortedProjects = sortProjectsByDateDesc(projects);

  const filteredProjects = sortedProjects.filter((project) => {
    if (projectFilter === "all") return true;
    if (projectFilter === "featured") return Boolean(project.featured);
    const status = getProjectStatus(project);
    return status === projectFilter;
  });

  return (
    <>
      <Navigation />
      <main>
        <motion.section
          className="projects"
          id="all-projects"
          aria-labelledby="all-projects-title"
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
            <h2 id="all-projects-title">All Projects</h2>
            <p>Browse all projects with interactive sorting and status filtering!</p>
            <div className="project-filter-controls">
              <label htmlFor="project-filter">Filter:</label>
              <select
                id="project-filter"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="featured">Featured</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </motion.div>

          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--muted)' }}>
              No matching projects found for this filter.
            </div>
          ) : (
            <motion.div
              className="project-grid"
              variants={staggerContainerFast(prefersReducedMotion)}
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
            >
              {filteredProjects.map((project) => (
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
                  src={asset(project.thumbnail)}
                  alt={`${project.title} preview image`}
                  loading="lazy"
                />
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__meta">{formatProjectDateRange(project)}</p>
                  <p className="project-card__text">{project.shortDescription}</p>
                </div>
              </MotionLink>
            ))}
          </motion.div>
          )}
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
                <img src={asset("billiards.jpg")} alt="Billiards" className="location-photo" />
                <h3>Billiards</h3>
                <p></p>
              </div>
              <div className="image-location-item">
                <img src={asset("rock-climbing.jpg")} alt="Rock Climbing" className="location-photo" />
                <h3>Rock Climbing</h3>
                <p></p>
              </div>
              <div className="image-location-item">
                <img src={asset("cooking-preview.jpg")} alt="Cooking" className="location-photo" />
                <h3>Cooking</h3>
                <p></p>
              </div>
              <div className="image-location-item">
                <img src={asset("snowboarding.jpg")} alt="Snowboarding" className="location-photo" />
                <h3>Snowboarding</h3>
                <p></p>
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
              <embed src={asset("kali-fang-resume.pdf")} type="application/pdf" className="resume-image" />
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
        <p className="project-detail__dates">{formatProjectDateRange(project)}</p>

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
          <img className="project-detail__image" src={asset(project.image)} alt={`${project.title} detailed preview`} />
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
                <img src={asset("MQP-test1.jpg")} alt="MQP Test 1" className="additional-image" />
                <img src={asset("MQP-self-test.jpg")} alt="MQP Self Test" className="additional-image" />
              </div>
            ) : project.slug === "4dof-robotic-arm" ? (
              <div className="additional-images-grid">
                <img src={asset("kinematics.jpg")} alt="Kinematics" className="additional-image" />
                <img src={asset("matlab-filter.jpg")} alt="MATLAB Filter" className="additional-image" />
                <img src={asset("funny-graph.jpg")} alt="Funny Graph" className="additional-image" />
                <img src={asset("robot-workspace.jpg")} alt="Robot Workspace" className="additional-image" />
              </div>
            ) : project.slug === "autonomous-maze-navigation-robot" ? (
              <div className="additional-images-grid">
                <img src={asset("romi.jpg")} alt="Pololu Romi" className="additional-image" />
                <img src={asset("esp32.jpg")} alt="ESP32" className="additional-image" />
              </div>
            ) : project.slug === "robotic-linkage-system" ? (
              <div className="additional-images-grid">
                <img src={asset("RBE2001.jpg")} alt="RBE2001 Linkage System" className="additional-image" />
                <img src={asset("CAD.jpg")} alt="CAD Model" className="additional-image" />
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
    <BrowserRouter basename="/kalifang12/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/about" element={<OtherPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
