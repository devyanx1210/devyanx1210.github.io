import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectCard({ proj, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.25 });
    const isEven = index % 2 === 0;

    const [desktopIdx, setDesktopIdx] = useState(0);
    const [phoneIdx, setPhoneIdx] = useState(0);

    const desktopImages = proj.images_desktop || [proj.image_desktop];
    const phoneImages = proj.images_phone || [proj.image_phone];

    useEffect(() => {
        if (desktopImages.length <= 1) return;
        const interval = setInterval(() => {
            setDesktopIdx(i => (i + 1) % desktopImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [desktopImages.length]);

    useEffect(() => {
        if (phoneImages.length <= 1) return;
        const interval = setInterval(() => {
            setPhoneIdx(i => (i + 1) % phoneImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [phoneImages.length]);

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
                    <div className="laptop-screen" style={{ position: "relative", overflow: "hidden", height: "clamp(220px, 22vw, 340px)" }}>
                        <AnimatePresence>
                            <motion.img
                                key={desktopIdx}
                                src={desktopImages[desktopIdx]}
                                alt={proj.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    position: "absolute",
                                    top: 0, left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "top",
                                }}
                            />
                        </AnimatePresence>
                    </div>
                    <div className="laptop-chin" />
                </div>
                <div className="phone-frame">
                    <div className="phone-notch" />
                    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                        <AnimatePresence>
                            <motion.img
                                key={phoneIdx}
                                src={phoneImages[phoneIdx]}
                                alt={proj.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    position: "absolute",
                                    top: 0, left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "top",
                                }}
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="project-row-info">
                <span className="project-row-index">0{index + 1}</span>
                <h2>{proj.name}</h2>
                <p dangerouslySetInnerHTML={{ __html: proj.description }} />
                <div className="project-tags">
                    {proj.tags.map((tag, i) => (
                        <span key={i} className="project-tag">{tag}</span>
                    ))}
                </div>
                <div className="project-cta-row">
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-cta">
                        <FaGithub /> View on GitHub
                    </a>
                    {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-cta project-cta-outline">
                            <FaExternalLinkAlt /> Live Site
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}