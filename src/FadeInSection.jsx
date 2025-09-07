// FadeInSection.jsx
import { motion } from "framer-motion";

export default function FadeInSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // start hidden and slightly below
      whileInView={{ opacity: 1, y: 0 }} // fade in and move up
      viewport={{ once: true, amount: 0.2 }} // trigger when 20% visible, only once
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
