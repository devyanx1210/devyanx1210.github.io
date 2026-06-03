import React from 'react'
import { useRef } from 'react'
import { motion, useInView } from "framer-motion";
import { FaGithub } from 'react-icons/fa';


export default function ProjectCard({ proj, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.25 });
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className={`project-row ${isEven ? "row-img-left" : "row-img-right"}`}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div className="device-mockup">
                <div className="laptop-frame">
                    <div className="laptop-screen">
                        <img src={proj.image_desktop} alt={proj.name} />
                    </div>
                    <div className="laptop-chin" />
                </div>
                <div className="phone-frame">
                    <div className="phone-notch" />
                    <img src={proj.image_phone} alt={proj.name} />
                </div>
            </div>

            <div className="project-row-info">
                <span className="project-row-index">0{index + 1}</span>
                <h2>{proj.name}</h2>
                <p dangerouslySetInnerHTML={{ __html: proj.description }} />                <div className="project-tags">
                    {proj.tags.map((tag, i) => (
                        <span key={i} className="project-tag">{tag}</span>
                    ))}
                </div>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-cta">
                    <FaGithub /> View on GitHub
                </a>
            </div>
        </motion.div>
    );
}
