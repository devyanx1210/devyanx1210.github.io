import React, { useState, useEffect, useRef } from "react";
import profile from "./assets/profile.png";
import contactme from "./assets/contactme.png";
import RoboTilapia from "./assets/RoboTilapia.png";
import KudoApp from "./assets/KudoFitnessGymApp.png";
import MonitreeApp from "./assets/MonitriApp.png";
import {
  FaReact,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";
import { SiTailwindcss, SiHtml5, SiCss3, SiJavascript } from "react-icons/si";

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

  return (
    <>
      {/* --- HOME --- */}
      <div id="homepage">
        <div className="overlay-purple"></div>

        <div className="profile-container">
          <img className="profile" src={profile} alt="Profile" />
        </div>

        <div className="homepage-info">
          <h1>I am Ian</h1>
          <h1>A CpE student</h1>
          <p>
            I’m a self-taught frontend developer and a 4th-year Computer
            Engineering student. I turn ideas into responsive, meaningful web
            experiences. I let my work speak for itself, crafted with care,
            curiosity, and purpose.
          </p>

          <div className="homepage-buttons">
            <button>Hire Me</button>
            <button>Download CV</button>
          </div>
        </div>
      </div>

      {/* --- PROJECTS --- */}
      <div id="projects">
        <div className="projects-header">
          <h1>My Projects</h1>
          <a
            href="https://github.com/yourusername"
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
      {/* --- SKILLS --- */}
      <div id="skills">
        <h1 className="skills-title">My Skills</h1>
        <h2>See more certificates</h2>
        <div className="skills-container">
          <div
            className="icon-box"
            onClick={() =>
              window.open("/certificates/javascript.pdf", "_blank")
            }
          >
            <FaReact />
          </div>
          <div className="icon-box">
            <SiTailwindcss />
          </div>
          <div className="icon-box">
            <SiHtml5 />
          </div>
          <div className="icon-box">
            <SiCss3 />
          </div>
          <div className="icon-box">
            <SiJavascript />
          </div>
        </div>
      </div>

      {/* --- CONTACT --- */}
      {/* --- CONTACT --- */}
      <div id="contact-me">
        <img className="contactme-img" src={contactme} alt="Contact Me" />
        <div className="overlay-purple-bottom"></div>

        <div className="contacts-container">
          {/* Left Icons */}
          <div className="contact-links left-links">
            <a
              href="mailto:yourname@email.com"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText("yourname@email.com");
                alert("Email copied!");
              }}
              className="tooltip"
            >
              <FaEnvelope />
              <span className="tooltiptext">Email</span>
            </a>

            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="tooltip"
            >
              <FaFacebook />
              <span className="tooltiptext">Facebook</span>
            </a>
          </div>

          {/* Right Icons */}
          <div className="contact-links right-links">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="tooltip"
            >
              <FaGithub />
              <span className="tooltiptext">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="tooltip"
            >
              <FaLinkedin />
              <span className="tooltiptext">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
