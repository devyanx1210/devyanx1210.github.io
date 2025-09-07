import React, { useState, useEffect, useRef } from "react";
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
import { SiTailwindcss, SiHtml5, SiCss3, SiJavascript } from "react-icons/si";
import FadeInSection from "./FadeInSection";

export default function Homepage() {
  const projectsData = [
    {
      name: "RoboTilapia App",
      image: RoboTilapia,
      description:
        "RoboTilapia is a responsive React and Firebase app that helps farmers monitor water parameters like pH, temperature, ammonia, and dissolved oxygen in real-time, receive alerts, analyze trends, and manage feed and feeding schedules efficiently.",
    },
    {
      name: "Kudo App",
      image: KudoApp,
      description:
        "KDO Fitness is a gym management app that simplifies subscription and attendance tracking. Members can pay online, log attendance, and view their status with real-time alerts. Admins can track payments, attendance, and subscriptions easily. The app is built with React, Node.js, MySQL, and Tailwind CSS.",
    },
    {
      name: "Monitree App",
      image: MonitreeApp,
      description:
        "Monitree is an app for expense enthusiasts to manage their personal expenses effectively. It helps users keep track of their spending in different categories. The app features a user-friendly design for easy navigation. Monitree is built with React for a smooth and responsive experience.",
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
  const email = "yourname@example.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    });
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Automatic infinite scroll
  useEffect(() => {
    let req;
    const scrollContainer = scrollRef.current;
    const speed = 0.5; // px per frame

    const animate = () => {
      if (!isDragging) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += speed;
        }
      }
      req = requestAnimationFrame(animate);
    };
    req = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(req);
  }, [isDragging]);

  // Dragging handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

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
            A CpE student
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            I’m a self-taught frontend developer and a 4th-year Computer
            Engineering student. I turn ideas into responsive, meaningful web
            experiences. I let my work speak for itself, crafted with care,
            curiosity, and purpose.
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

          <div
            className="projects-slider"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Duplicate items for seamless infinite scroll */}
            {[...projectsData, ...projectsData].map((proj, index) => (
              <div key={index} className="project-card">
                <img src={proj.image} alt={proj.name} />
                <h2>{proj.name}</h2>
                <p>{proj.description}</p>
              </div>
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
            onClick={() =>
              window.open("/certificates/javascript.pdf", "_blank")
            }
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
              visible: { transition: { staggerChildren: 0.3 } },
              hidden: {},
            }}
          >
            {[FaReact, SiTailwindcss, SiHtml5, SiCss3, SiJavascript].map(
              (Icon, index) => (
                <motion.div
                  key={index}
                  className="icon-box"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon />
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </FadeInSection>

      <FadeInSection>
        {/* --- CONTACT --- */}
        <div id="contact-me">
          <img className="contactme-img" src={contactme} alt="Contact Me" />
          <div className="overlay-purple-bottom"></div>

          <div className="contacts-container">
            {/* Left Icons */}
            {/* Left Icons */}
            <div className="contact-links left-links">
              <a
                href="#"
                className="tooltip left"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText("csoberano1210@gmail.com");
                  setActiveTooltip("copied"); // show "Email copied!"
                  setTimeout(() => setActiveTooltip(null), 2000); // reset after 2s
                }}
                onMouseEnter={() => {
                  if (activeTooltip !== "copied") {
                    setActiveTooltip("hover"); // show email on hover
                  }
                }}
                onMouseLeave={() => {
                  if (activeTooltip !== "copied") {
                    setActiveTooltip(null);
                  }
                }}
              >
                <FaEnvelope />
                <span className="tooltiptext">
                  {activeTooltip === "copied"
                    ? "Email copied!"
                    : activeTooltip === "hover"
                    ? "csoberano1210@gmail.com"
                    : ""}
                </span>
              </a>

              <a
                href="https://www.facebook.com/noelchristian.soberano.3"
                target="_blank"
                rel="noopener noreferrer"
                className="tooltip left"
              >
                <FaFacebook />
                <span className="tooltiptext">Facebook</span>
              </a>
            </div>

            {/* Right Icons */}
            <div className="contact-links right-links">
              <a
                href="https://github.com/devyanx1210"
                target="_blank"
                rel="noopener noreferrer"
                className="tooltip right"
              >
                <FaGithub />
                <span className="tooltiptext">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/noel-christian-soberano-9b7054383/"
                target="_blank"
                rel="noopener noreferrer"
                className="tooltip right"
              >
                <FaLinkedin />
                <span className="tooltiptext">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </FadeInSection>
    </>
  );
}
