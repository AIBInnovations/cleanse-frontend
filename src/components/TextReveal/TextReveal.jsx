"use client";
import "./TextReveal.css";
import Link from "next/link";
import HoverWord from "../HoverWord/HoverWord";
import "../HoverWord/HoverWord.css";

const TextReveal = () => {
  return (
    <section className="text-reveal">
      <div className="text-reveal-container">
        <p className="text-reveal-paragraph">
          We are dedicated to{" "}
          <HoverWord
            word="elevating"
            imageSrc="/p1.png"
            imageAlt="Elevating standards"
          />{" "}
          standards in{" "}
          <HoverWord
            word="beauty"
            imageSrc="/p2.png"
            imageAlt="Beauty products"
          />{" "}
          and care, creating confidence and timeless{" "}
          <HoverWord
            word="elegance"
            imageSrc="/p3.png"
            imageAlt="Timeless elegance"
          />{" "}
          for everyone.
        </p>
        <div className="text-reveal-cta">
          <Link href="/genesis" className="text-reveal-btn">
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TextReveal;
