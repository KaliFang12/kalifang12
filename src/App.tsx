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
        <div className="hero__banner">
          <video className="hero__banner-img" src={asset("rbe3001_vid.mov")} autoPlay muted loop playsInline />
          <div className="hero__banner-overlay" />
          <h1 className="hero__banner-title">Kali Fang</h1>
        </div>
      </motion.header>

      <main>
        <motion.section
          className="intro"
          variants={fadeIn(prefersReducedMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <div className="intro__inner">
            <img src={asset("Myself.jpg")} alt="Kali Fang" className="intro__photo" />
            <p className="intro__blurb">
              I'm currently a senior at Worcester Polytechnic Institute studying Mechanical Engineering
              with a minor in Robotics Engineering. I'm passionate about robotic systems and integrating
              hardware/software together with experience in embedded and controls systems. I'm currently
              looking for full-time positions in fields for firmware development, embedded systems, and robotics engineering!
            </p>
          </div>
        </motion.section>

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
                  <td>Git, GitHub, PlatformIO, React, Flask, MQTT</td>
                </tr>
                <tr>
                  <th>Control Algorithms</th>
                  <td>Bang-Bang Control, PID Control, Hysteresis Control, Motor Control, Closed Loop Control</td>
                </tr>
                <tr>
                  <th>Microcontrollers</th>
                  <td>Arduino Uno, ESP32, Pololu Romi 32U4, Raspberry Pi</td>
                </tr>
                <tr>
                  <th>Communication / Interfaces</th>
                  <td>I2C, SPI, UART / Serial Communication, WiFi (IoT), MQTT</td>
                </tr>
                <tr>
                  <th>Sensors & Hardware Integration</th>
                  <td>IMU (Gyroscopes, Accelerometers), AprilTag Vision, Sensor Fusion, Odometry, Pressure Sensors, PPG Sensors</td>
                </tr>
                <tr>
                  <th>Robotics / Controls</th>
                  <td>SLAM, Forward/Inverse Kinematics, Denavit–Hartenberg (DH) Parameters, Trajectory Planning, Path Planning, State Estimation, Odometry, State Machine Design</td>
                </tr>
                <tr>
                  <th>Computer Vision</th>
                  <td>MATLAB Image Processing, AprilTag Detection, Color Detection, Fisheye Lens Correction, Camera Calibration</td>
                </tr>
                <tr>
                  <th>Simulation & Modeling</th>
                  <td>Robot Simulation, Dynamic Modeling, MATLAB Robotics Toolbox, FEA (SolidWorks)</td>
                </tr>
                <tr>
                  <th>Fabrication / Prototyping</th>
                  <td>3D Printing, Mechanical Assembly, Rapid Prototyping, PCB Design, Soldering</td>
                </tr>
                <tr>
                  <th>Electronics</th>
                  <td>Custom PCB Design, H-Bridge Motor Drivers, IIR Signal Filtering, Strain Gauges, Wheatstone Bridge Circuits</td>
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

  const filteredProjects = sortProjectsByDateDesc(projects);

  return (
    <>
      <Navigation />
      <motion.header
        className="hero"
        initial="hidden"
        animate="visible"
        variants={slowReveal(prefersReducedMotion)}
      >
        <div className="hero__banner">
          <img className="hero__banner-img" src={asset("project-hero.png")} alt="Projects hero" />
          <div className="hero__banner-overlay" />
          <h1 className="hero__banner-title">Projects</h1>
        </div>
      </motion.header>
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
            <p>Browse all of my projects!</p>
          </motion.div>

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
      <motion.header
        className="hero"
        initial="hidden"
        animate="visible"
        variants={slowReveal(prefersReducedMotion)}
      >
        <div className="hero__banner">
          <img className="hero__banner-img" src={asset("about-me-hero.png")} alt="About me hero" />
          <div className="hero__banner-overlay" />
          <h1 className="hero__banner-title">About Me</h1>
        </div>
      </motion.header>
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

          <section className="content-section">
            <h2>To Do List:</h2>
            <ul className="about-todo-list">
              <li>[Include personal project details]</li>
            </ul>
          </section>

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
        <Link className="project-detail__back" to="/projects">
          ← Back to projects
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

        {/* Project Details Section */}
        <section className="project-section">
          <h2>Project Details</h2>
          <div className="project-detail__description">
            {(() => {
              const lines = project.details.split('\n');
              const elements = [];
              let i = 0;

              while (i < lines.length) {
                const line = lines[i];

                if (line.startsWith('## ')) {
                  const heading = line.substring(3);

                  if (heading === 'Forward/Inverse Kinematics' && project.slug === '4dof-robotic-arm') {
                    elements.push(
                      <div key={`section-${i}`} className="project-detail__section-with-image">
                        <img src={asset('kinematics.jpg')} alt="Kinematics" className="project-detail__inline-image" />
                        <div className="project-detail__text-content">
                          <h3>{heading}</h3>
                          {(() => {
                            const contentLines = [];
                            i++; // Skip the heading line
                            while (i < lines.length && !lines[i].startsWith('## ')) {
                              const contentLine = lines[i];
                              if (contentLine.trim()) {
                                contentLines.push(<p key={`p-${i}`}>{contentLine}</p>);
                              } else {
                                contentLines.push(<br key={`br-${i}`} />);
                              }
                              i++;
                            }
                            i--; // Step back so the next iteration processes the heading
                            return contentLines;
                          })()}
                        </div>
                      </div>
                    );
                  } else if (heading === 'Trajectory Planning' && project.slug === '4dof-robotic-arm') {
                    elements.push(
                      <div key={`section-${i}`} className="project-detail__section-with-image">
                        <img src={asset('robot-workspace.jpg')} alt="Robot Workspace" className="project-detail__inline-image" />
                        <div className="project-detail__text-content">
                          <h3>{heading}</h3>
                          {(() => {
                            const contentLines = [];
                            i++; // Skip the heading line
                            while (i < lines.length && !lines[i].startsWith('## ')) {
                              const contentLine = lines[i];
                              if (contentLine.trim()) {
                                contentLines.push(<p key={`p-${i}`}>{contentLine}</p>);
                              } else {
                                contentLines.push(<br key={`br-${i}`} />);
                              }
                              i++;
                            }
                            i--; // Step back so the next iteration processes the heading
                            return contentLines;
                          })()}
                        </div>
                      </div>
                    );
                  } else if (heading === 'Microcontroller' && project.slug === 'autonomous-maze-navigation-robot') {
                    elements.push(
                      <div key={`section-${i}`} className="project-detail__section-with-image">
                        <img src={asset('romi.jpg')} alt="Romi" className="project-detail__inline-image" />
                        <div className="project-detail__text-content">
                          <h3>{heading}</h3>
                          {(() => {
                            const contentLines = [];
                            i++;
                            while (i < lines.length && !lines[i].startsWith('## ')) {
                              const contentLine = lines[i];
                              if (contentLine.trim()) {
                                contentLines.push(<p key={`p-${i}`}>{contentLine}</p>);
                              } else {
                                contentLines.push(<br key={`br-${i}`} />);
                              }
                              i++;
                            }
                            i--;
                            return contentLines;
                          })()}
                        </div>
                      </div>
                    );
                  } else if (heading === 'WiFi Communication (IoT)' && project.slug === 'autonomous-maze-navigation-robot') {
                    elements.push(
                      <div key={`section-${i}`} className="project-detail__section-with-image">
                        <img src={asset('esp32.jpg')} alt="ESP32" className="project-detail__inline-image" />
                        <div className="project-detail__text-content">
                          <h3>{heading}</h3>
                          {(() => {
                            const contentLines = [];
                            i++; // Skip the heading line
                            while (i < lines.length && !lines[i].startsWith('## ')) {
                              const contentLine = lines[i];
                              if (contentLine.trim()) {
                                contentLines.push(<p key={`p-${i}`}>{contentLine}</p>);
                              } else {
                                contentLines.push(<br key={`br-${i}`} />);
                              }
                              i++;
                            }
                            i--; // Step back so the next iteration processes the heading
                            return contentLines;
                          })()}
                        </div>
                      </div>
                    );
                  } else if (heading === 'Camera Vision' && project.slug === '4dof-robotic-arm') {
                    elements.push(
                      <div key={`section-${i}`} className="project-detail__section-with-image">
                        <img src={asset('matlab-filter.jpg')} alt="MATLAB Filter" className="project-detail__inline-image" />
                        <div className="project-detail__text-content">
                          <h3>{heading}</h3>
                          {(() => {
                            const contentLines = [];
                            i++; // Skip the heading line
                            while (i < lines.length && !lines[i].startsWith('## ')) {
                              const contentLine = lines[i];
                              if (contentLine.trim()) {
                                contentLines.push(<p key={`p-${i}`}>{contentLine}</p>);
                              } else {
                                contentLines.push(<br key={`br-${i}`} />);
                              }
                              i++;
                            }
                            i--; // Step back so the next iteration processes the heading
                            return contentLines;
                          })()}
                        </div>
                      </div>
                    );
                  } else if (heading === 'Electronic Design' && project.slug === 'blood-pressure-monitor') {
                    elements.push(
                      <div key={`section-${i}`}>
                        <h3>{heading}</h3>
                        <img src={asset('bp-block-diagram.png')} alt="Block Diagram" className="bp-block-diagram" />
                        {(() => {
                          const contentElements: React.ReactNode[] = [];
                          i++;
                          while (i < lines.length && !lines[i].startsWith('## ')) {
                            if (lines[i].startsWith('|')) {
                              const tableRows: string[][] = [];
                              while (i < lines.length && lines[i].startsWith('|')) {
                                const raw = lines[i];
                                if (!raw.match(/^\|[\s\-|:]+\|$/)) {
                                  tableRows.push(raw.split('|').slice(1, -1).map(c => c.trim()));
                                }
                                i++;
                              }
                              i--;
                              const [headerRow, ...bodyRows] = tableRows;
                              contentElements.push(
                                <table key={`table-${i}`} className="project-detail__table">
                                  <thead><tr>{headerRow.map((cell, j) => <th key={j}>{cell}</th>)}</tr></thead>
                                  <tbody>{bodyRows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>)}</tbody>
                                </table>
                              );
                            } else if (lines[i].trim()) {
                              contentElements.push(<p key={`p-${i}`}>{lines[i]}</p>);
                            } else {
                              contentElements.push(<br key={`br-${i}`} />);
                            }
                            i++;
                          }
                          i--;
                          return contentElements;
                        })()}
                      </div>
                    );
                  } else if (heading === 'Data Collection' && project.slug === 'blood-pressure-monitor') {
                    elements.push(
                      <div key={`section-${i}`}>
                        <h3>{heading}</h3>
                        {(() => {
                          const contentElements: React.ReactNode[] = [];
                          i++;
                          while (i < lines.length && !lines[i].startsWith('## ')) {
                            if (lines[i].trim()) {
                              contentElements.push(<p key={`p-${i}`}>{lines[i]}</p>);
                            } else {
                              contentElements.push(<br key={`br-${i}`} />);
                            }
                            i++;
                          }
                          i--;
                          return contentElements;
                        })()}
                        <div className="bp-graphs">
                          <img src={asset('normal-bp.png')} alt="Normal blood pressure reading" className="bp-graph-img" />
                          <img src={asset('controlled-bp.png')} alt="Controlled blood pressure reading" className="bp-graph-img" />
                        </div>
                      </div>
                    );
                  } else if (heading === 'Mapping' && project.slug === 'slam-robot-navigation') {
                    elements.push(
                      <div key={`section-${i}`}>
                        <h3>{heading}</h3>
                        <div className="project-detail__section-with-image" style={{ marginTop: '1rem' }}>
                          <div className="mapping-images">
                            <img src={asset('frontier-exploration.png')} alt="Frontier exploration map" className="mapping-img" />
                            <img src={asset('large-map-exploration.png')} alt="Large map exploration" className="mapping-img" />
                          </div>
                          <div className="project-detail__text-content">
                            {(() => {
                              const contentElements: React.ReactNode[] = [];
                              i++;
                              while (i < lines.length && !lines[i].startsWith('## ')) {
                                if (lines[i].trim()) {
                                  contentElements.push(<p key={`p-${i}`}>{lines[i]}</p>);
                                } else {
                                  contentElements.push(<br key={`br-${i}`} />);
                                }
                                i++;
                              }
                              i--;
                              return contentElements;
                            })()}
                          </div>
                        </div>
                      </div>
                    );
                  } else if (heading === 'Navigation' && project.slug === 'slam-robot-navigation') {
                    const navImages: Record<string, { src: string; alt: string }> = {
                      'Environment Mapping & Visualization': { src: '2DOccupancyGrid.png', alt: 'Occupancy grid' },
                      'Obstacle Inflation & Collision Prevention': { src: 'Grid-with-padding.png', alt: 'Grid with padding' },
                      'Path Planning & Autonomous Navigation': { src: 'Grid-with-visibility.png', alt: 'Grid with visibility' },
                    };
                    const navContent: React.ReactNode[] = [];
                    let subTitle = '';
                    let subLines: string[] = [];
                    const flushSub = (key: string) => {
                      if (!subTitle) return;
                      const img = navImages[subTitle];
                      navContent.push(
                        <div key={key} className="project-detail__section-with-image">
                          {img && <img src={asset(img.src)} alt={img.alt} className="project-detail__inline-image project-detail__inline-image--nav" />}
                          <div className="project-detail__text-content">
                            <h4 className="nav-subsection-title">{subTitle}</h4>
                            {subLines.filter(l => l.trim()).map((l, idx) => <p key={idx}>{l}</p>)}
                          </div>
                        </div>
                      );
                    };
                    i++;
                    while (i < lines.length && !lines[i].startsWith('## ')) {
                      if (lines[i].startsWith('### ')) {
                        flushSub(`sub-${i}`);
                        subTitle = lines[i].substring(4);
                        subLines = [];
                      } else {
                        subLines.push(lines[i]);
                      }
                      i++;
                    }
                    flushSub(`sub-end`);
                    i--;
                    elements.push(
                      <div key={`section-${i}`}>
                        <h3>{heading}</h3>
                        {navContent}
                      </div>
                    );
                  } else {
                    elements.push(<h3 key={i}>{heading}</h3>);
                  }
                } else if (line.startsWith('|')) {
                  const tableRows: string[][] = [];
                  while (i < lines.length && lines[i].startsWith('|')) {
                    const raw = lines[i];
                    if (!raw.match(/^\|[\s\-|:]+\|$/)) {
                      tableRows.push(raw.split('|').slice(1, -1).map(c => c.trim()));
                    }
                    i++;
                  }
                  i--;
                  const [headerRow, ...bodyRows] = tableRows;
                  elements.push(
                    <table key={`table-${i}`} className="project-detail__table">
                      <thead>
                        <tr>{headerRow.map((cell, j) => <th key={j}>{cell}</th>)}</tr>
                      </thead>
                      <tbody>
                        {bodyRows.map((row, j) => (
                          <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  );
                } else if (line.trim()) {
                  elements.push(<p key={i}>{line}</p>);
                } else {
                  elements.push(<br key={i} />);
                }

                i++;
              }

              return elements;
            })()}
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

        {/* Additional Images Section */}
        {project.images && project.images.length > 1 && (
          <section className="project-section">
            <h2>Additional Images</h2>
            <div className="additional-images-grid">
              {project.images.slice(1).map((img, index) => (
                <img key={index} src={asset(img)} alt={`${project.title} image ${index + 2}`} className={`additional-image ${img === 'funny-graph.jpg' ? 'additional-image--small' : ''}`} />
              ))}
            </div>
          </section>
        )}

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
