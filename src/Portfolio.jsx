import React, { useState, useEffect, useRef } from "react";
import profile from "./assets/profile.png";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./components/ProjectCards";

import {
  FaReact, FaLinkedin, FaFacebook, FaEnvelope, FaGithub, FaFolder, FaWindows,
} from "react-icons/fa";

import {
  SiTailwindcss, SiHtml5, SiCss3, SiJavascript,
  SiNodedotjs, SiFirebase, SiMysql, SiTypescript, SiPython, SiLinux,
  SiMongodb,
} from "react-icons/si";

import FadeInSection from "./FadeInSection";
import projects from "./data/projects";
import NetworkBackground from "./components/NetworkBackground";

const ROLES = [
  "Software Engineer",
  "Full-Stack Development",
  "Cloud Computing",
  "Application Security",
  "Artificial Intelligence"
];
function CyclingRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }, deleting ? 45 : 75);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <span className="cycling-role">
      {text}<span className="role-cursor">|</span>
    </span>
  );
}

const TECH_SYMBOLS = [
  { s: "</>", l: "7%", t: "12%", sz: "1.5rem", dur: "9s", del: "0s" },
  { s: "{}", l: "20%", t: "65%", sz: "1.2rem", dur: "11s", del: "-2s" },
  { s: "=>", l: "14%", t: "38%", sz: "1.7rem", dur: "8s", del: "-4s" },
  { s: "const", l: "72%", t: "18%", sz: "1rem", dur: "13s", del: "-1s" },
  { s: "()", l: "88%", t: "55%", sz: "1.4rem", dur: "10s", del: "-3s" },
  { s: "&&", l: "63%", t: "72%", sz: "1.3rem", dur: "12s", del: "-5s" },
  { s: "[]", l: "40%", t: "8%", sz: "1.6rem", dur: "7s", del: "-2s" },
  { s: "npm", l: "54%", t: "82%", sz: "1.1rem", dur: "14s", del: "-6s" },
  { s: "//", l: "28%", t: "78%", sz: "1.2rem", dur: "9s", del: "-1s" },
  { s: "async", l: "80%", t: "42%", sz: "1rem", dur: "11s", del: "-4s" },
  { s: "git", l: "5%", t: "82%", sz: "1.3rem", dur: "10s", del: "-3s" },
  { s: "||", l: "47%", t: "48%", sz: "1.5rem", dur: "8s", del: "-7s" },
  { s: "#", l: "92%", t: "22%", sz: "1.8rem", dur: "12s", del: "-2s" },
  { s: "fn()", l: "34%", t: "28%", sz: "1.1rem", dur: "10s", del: "-5s" },
  { s: "**", l: "70%", t: "88%", sz: "1.4rem", dur: "9s", del: "-1s" },
  { s: ";", l: "17%", t: "52%", sz: "2rem", dur: "13s", del: "-4s" },
  { s: "let", l: "58%", t: "32%", sz: "1.1rem", dur: "11s", del: "-3s" },
  { s: "===", l: "82%", t: "75%", sz: "1.2rem", dur: "10s", del: "-6s" },
];


export default function Portfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const el = document.body;
    const onScroll = () => {
      const prog = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(prog);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Ian_Soberano_Resume.pdf";
    link.click();
  };

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [nameShine, setNameShine] = useState(130);
  const handleNameMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setNameShine(130 - x * 200);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* HERO */}
      <div id="homepage">
        <NetworkBackground opacity={0.9} />
        <motion.div
          className="overlay-purple"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.6 }}
        />
        <div className="profile-ring" />

        <motion.div
          className="profile-container"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <img className="profile" src={profile} alt="Noel Christian L. Soberano" />
        </motion.div>

        <div className="homepage-info">
          <motion.h1
            className="hero-name"
            style={{ backgroundPosition: `${nameShine}% center` }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            onMouseLeave={() => setNameShine(130)}
            onMouseMove={handleNameMouseMove}
          >
            Ian Soberano
          </motion.h1>

          <motion.h2
            className="hero-role"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <CyclingRole />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            I'm <strong>Noel Christian L. Soberano</strong>, a{" "}
            <em>Software Engineer</em> specializing in full-stack development,{" "}
            <em>Cloud</em> technologies, and <em>App Security</em>, driven by a passion
            for building scalable solutions that create meaningful impact. I have a
            growing interest in <em>Artificial Intelligence</em> development and crafting
            intuitive user experiences that solve real-world problems.
          </motion.p>

          <motion.div
            className="homepage-buttons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <button
              className="btn-primary"
              onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
            </button>
            <button className="btn-secondary" onClick={handleDownload}>
              Download CV
            </button>
          </motion.div>
        </div>
      </div>

      {/* PROJECTS */}
      <div id="projects">
        <NetworkBackground opacity={0.55} />
        <div className="projects-label">
          <h1>Projects</h1>
          <a href="https://github.com/devyanx1210" target="_blank" rel="noopener noreferrer">
            <FaGithub /> View All on GitHub
          </a>
        </div>

        {projects.map((proj, index) => (
          <ProjectCard key={index} proj={proj} index={index} />
        ))}
      </div>

      {/* SKILLS */}
      <FadeInSection>
        <div id="skills">
          <NetworkBackground opacity={0.6} />
          <h1 className="skills-title">Technical Skills</h1>
          <motion.h2
            className="see-more-certificates"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            onClick={() => window.open("/certifications.pdf", "_blank")}
            style={{ cursor: "pointer", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
          >
            <FaFolder /> See more certificates
          </motion.h2>

          <motion.div
            className="skills-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {[
              { Icon: SiHtml5, label: "HTML5", note: "Semantic markup" },
              { Icon: SiCss3, label: "CSS3", note: "Animations & layout" },
              { Icon: SiJavascript, label: "JavaScript", note: "ES6+ daily driver" },
              { Icon: SiTypescript, label: "TypeScript", note: "Type-safe JS" },
              { Icon: FaReact, label: "React", note: "Primary UI framework" },
              { Icon: SiTailwindcss, label: "Tailwind CSS", note: "Utility-first CSS" },
              { Icon: SiNodedotjs, label: "Node.js", note: "Backend APIs" },
              { Icon: SiMysql, label: "MySQL", note: "Relational DBs" },
              { Icon: SiMongodb, label: "MongoDB", note: "NoSQL database" },
              { Icon: SiPython, label: "Python", note: "Scripting & ML" },
              { Icon: SiLinux, label: "Linux", note: "Dev environment" },
              { Icon: SiFirebase, label: "Firebase", note: "Realtime & auth" },
            ].map(({ Icon, label, note }, index) => (
              <motion.div
                key={index}
                className="skill-item"
                variants={{
                  hidden: { opacity: 0, scale: 0.4, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className="icon-box">
                  <Icon />
                  <div className="skill-tooltip">{note}</div>
                </div>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeInSection>

      {/* CONTACT */}
      <FadeInSection>
        <div id="contact-me">
          <div className="overlay-purple-bottom" />

          <div className="tech-bg">
            {TECH_SYMBOLS.map(({ s, l, t, sz, dur, del }, i) => (
              <span
                key={i}
                className="tech-symbol"
                style={{ left: l, top: t, fontSize: sz, "--dur": dur, "--del": del }}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="contact-inner">
            <motion.p
              className="contact-sub"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Available for full-stack engineering roles, security projects, and team collaborations.
            </motion.p>

            <motion.h2
              className="contact-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Let's Build Something Great
            </motion.h2>

            <motion.div
              className="contact-icons-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#"
                className="contact-icon-link tooltip"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText("csoberano1210@gmail.com");
                  setActiveTooltip("copied");
                  setTimeout(() => setActiveTooltip(null), 2000);
                }}
                onMouseEnter={() => { activeTooltip !== "copied" && setActiveTooltip("hover"); }}
                onMouseLeave={() => { activeTooltip !== "copied" && setActiveTooltip(null); }}
              >
                <FaEnvelope />
                <span className="tooltiptext">
                  {activeTooltip === "copied" ? "Copied!" : "csoberano1210@gmail.com"}
                </span>
              </a>

              <a
                href="https://github.com/devyanx1210"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon-link tooltip"
              >
                <FaGithub />
                <span className="tooltiptext">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/noel-christian-soberano-9b7054383/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon-link tooltip"
              >
                <FaLinkedin />
                <span className="tooltiptext">LinkedIn</span>
              </a>

              <a
                href="https://www.facebook.com/noelchristian.soberano.3"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon-link tooltip"
              >
                <FaFacebook />
                <span className="tooltiptext">Facebook</span>
              </a>
            </motion.div>
          </div>
        </div>
      </FadeInSection>
    </>
  );
}
