"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HoverWord = ({ word, imageSrc, imageAlt = "Hover image" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="hover-word-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`hover-word-text ${isHovered ? "hovered" : ""}`}>
        {word}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="hover-word-image-wrapper"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={140}
              height={70}
              className="hover-word-image"
              priority
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default HoverWord;
