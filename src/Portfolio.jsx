import React, { useState } from "react";
import profile from "./assets/profile.png";
import contactme from "./assets/contactme.png";
import RoboTilapia from "./assets/RoboTilapia.png";
import KudoApp from "./assets/KudoFitnessGymApp.png";
import MonitreeApp from "./assets/MonitriApp.png";
import { motion } from "framer-motion"; // ✨ Import framer motion

import {
  FaReact,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaGithub,
  FaFolder,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNodedotjs,
  SiFirebase,
  SiMysql,
} from "react-icons/si";
import FadeInSection from "./FadeInSection";

export default function Portfolio() {
  const projectsData = [
    {
      name: "RoboTilapia App",
      image: RoboTilapia,
      description:
        "A responsive aquaculture monitoring app that helps farmers track water parameters like pH, temperature, ammonia, and dissolved oxygen in real-time, receive alerts, analyze trends, and manage feed schedules efficiently.",
      tags: ["React", "Firebase", "IoT"],
      github: "https://github.com/devyanx1210",
    },
    {
      name: "Kudo Fitness App",
      image: KudoApp,
      description:
        "A gym management system that simplifies subscription and attendance tracking. Members can pay online, log attendance, and view their status with real-time alerts. Admins get a full dashboard for payments and subscriptions.",
      tags: ["React", "Node.js", "MySQL", "Tailwind CSS"],
      github: "https://github.com/devyanx1210",
    },
    {
      name: "Monitree App",
      image: MonitreeApp,
      description:
        "A personal expense tracker that helps users manage spending across categories with a clean, intuitive interface. Built for speed and simplicity so budgeting feels effortless.",
      tags: ["React", "CSS"],
      github: "https://github.com/devyanx1210",
    },
  ];

  // Download Resume
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // must be in public/ folder
    link.download = "Noel_Christian_Soberano_Resume.pdf"; // file name when downloaded
    link.click();
  };

  // Copy Email
  const [copied, setCopied] = useState(false);
  const email = "csoberano1210@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    });
  };


  // Optional state if you want click toggle
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleClick = (e, tooltip) => {
    setActiveTooltip(activeTooltip === tooltip ? null : tooltip);
  };

  // Animation
  const Typewriter = ({ text = "", speed = 120 }) => {
    const [displayed, setDisplayed] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
      setDisplayed(""); // reset when text changes
      let i = 0;

      const typing = setInterval(() => {
        if (i < text.length) {
          setDisplayed((prev) => prev + text[i]);
          i++;
        } else {
          clearInterval(typing);
        }
      }, speed);

      const cursorBlink = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => {
        clearInterval(typing);
        clearInterval(cursorBlink);
      };
    }, [text, speed]);

    return (
      <h1>
        {displayed}
        <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
      </h1>
    );
  };

  return (
    <>
      {/* --- HOME --- */}
      <div id="homepage">
        <motion.div
          className="overlay-purple"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.6 }} // fade in last
        />
        {/* Profile Image */}
        <motion.div
          className="profile-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }} // comes in last
        >
          <img className="profile" src={profile} alt="Profile" />
        </motion.div>

        {/* Info */}
        <div className="homepage-info">
          {/* Typewriter first */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            I am Ian
          </motion.h1>

          {/* Fade in after typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Full-Stack Developer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            I’m Noel Christian L. Soberano, a self-taught web developer and
            a 4th-year Computer Engineering student. I transform ideas into
            responsive and engaging web experiences, crafting projects with
            care, curiosity, and purpose. I let my work speak for itself while
            continuously learning and pushing the boundaries of what web
            development can achieve.
          </motion.p>

          <motion.div
            className="homepage-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
          >
            <button onClick={handleDownload}>Download CV</button>
          </motion.div>
        </div>
      </div>

      <FadeInSection>
        {/* --- PROJECTS --- */}
        <div id="projects">
          <div className="projects-header">
            <h1>My Projects</h1>
            <a
              href="https://github.com/devyanx1210"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> More on GitHub
            </a>
          </div>

          <div className="projects-list">
            {projectsData.map((proj, index) => (
              <motion.div
                key={index}
                className={`project-row ${index % 2 === 1 ? "reverse" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="project-row-image">
                  <img src={proj.image} alt={proj.name} />
                </div>
                <div className="project-row-info">
                  <h2>{proj.name}</h2>
                  <p>{proj.description}</p>
                  <div className="project-tags">
                    {proj.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link"
                  >
                    <FaGithub style={{ marginRight: "0.4rem" }} />
                    View Code
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        {/* --- SKILLS --- */}
        <div id="skills">
          <h1 className="skills-title">Technical Skills</h1>

          {/* See More Certificates */}
          <motion.h2
            className="see-more-certificates"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            onClick={() => window.open("/certifications.pdf", "_blank")}
            style={{
              cursor: "pointer",
              color: "#9747ff",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <FaFolder /> See more certificates
          </motion.h2>

          {/* Skill Icons */}
          <motion.div
            className="skills-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {},
            }}
          >
            {[
              { Icon: FaReact, label: "React" },
              { Icon: SiJavascript, label: "JavaScript" },
              { Icon: SiNodedotjs, label: "Node.js" },
              { Icon: SiMysql, label: "MySQL" },
              { Icon: SiFirebase, label: "Firebase" },
              { Icon: SiTailwindcss, label: "Tailwind CSS" },
              { Icon: SiHtml5, label: "HTML5" },
              { Icon: SiCss3, label: "CSS3" },
            ].map(({ Icon, label }, index) => (
              <motion.div
                key={index}
                className="skill-item"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="icon-box">
                  <Icon />
                </div>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeInSection>

      <FadeInSection>
        {/* --- CONTACT --- */}
        <div id="contact-me">
          <img className="contactme-img" src={contactme} alt="Contact Me" />
          <div className="overlay-purple-bottom"></div>

          {/* Arc of icons — each orbits out from the center pivot */}
          <div className="arc-contacts">
            {/* Email — far left */}
            <div className="arc-icon" style={{ "--angle": "-75deg" }}>
              <div className="arc-float" style={{ "--delay": "0s" }}>
                <a
                  href="#"
                  className="arc-link tooltip"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("csoberano1210@gmail.com");
                    setActiveTooltip("copied");
                    setTimeout(() => setActiveTooltip(null), 2000);
                  }}
                  onMouseEnter={() => activeTooltip !== "copied" && setActiveTooltip("hover")}
                  onMouseLeave={() => activeTooltip !== "copied" && setActiveTooltip(null)}
                >
                  <FaEnvelope />
                  <span className="tooltiptext">
                    {activeTooltip === "copied"
                      ? "Email copied!"
                      : activeTooltip === "hover"
                      ? "csoberano1210@gmail.com"
                      : "Email"}
                  </span>
                </a>
              </div>
            </div>

            {/* Facebook — left-center */}
            <div className="arc-icon" style={{ "--angle": "-25deg" }}>
              <div className="arc-float" style={{ "--delay": "0.6s" }}>
                <a
                  href="https://www.facebook.com/noelchristian.soberano.3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arc-link tooltip"
                >
                  <FaFacebook />
                  <span className="tooltiptext">Facebook</span>
                </a>
              </div>
            </div>

            {/* GitHub — right-center */}
            <div className="arc-icon" style={{ "--angle": "25deg" }}>
              <div className="arc-float" style={{ "--delay": "1.2s" }}>
                <a
                  href="https://github.com/devyanx1210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arc-link tooltip"
                >
                  <FaGithub />
                  <span className="tooltiptext">GitHub</span>
                </a>
              </div>
            </div>

            {/* LinkedIn — far right */}
            <div className="arc-icon" style={{ "--angle": "75deg" }}>
              <div className="arc-float" style={{ "--delay": "1.8s" }}>
                <a
                  href="https://www.linkedin.com/in/noel-christian-soberano-9b7054383/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arc-link tooltip"
                >
                  <FaLinkedin />
                  <span className="tooltiptext">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </>
  );
}
