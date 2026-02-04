"use client";
import "./CTA.css";
import { useRef, useEffect } from "react";
import Link from "next/link";

import Copy from "../Copy/Copy";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    const container = ctaRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const leftImage = container.querySelector(
        ".cta-col:nth-child(1) .cta-side-img"
      );
      const rightImage = container.querySelector(
        ".cta-col:nth-child(3) .cta-side-img"
      );

      const st = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const leftTranslateY = 30 - progress * 30;
          gsap.set(leftImage, {
            y: `${leftTranslateY}rem`,
          });

          const rightTranslateY = -progress * 30;
          gsap.set(rightImage, {
            y: `${rightTranslateY}rem`,
          });
        },
      });

      return () => {
        st.kill();
      };
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="cta" ref={ctaRef}>
      <div className="container">
        <div className="cta-col">
          <div className="cta-side-img">
            <img src="/category-face.png" alt="" />
          </div>
          <div className="cta-col-copy">
            <Copy>
              <p className="bodyCopy sm">
                Crafted to honor ancient wisdom, our formulas prioritize
                purity, potency, and results.
              </p>
            </Copy>
          </div>
        </div>
        <div className="cta-col">
          <div className="cta-main-img">
            <div className="cta-header">
              <Copy>
                <h3>A ritual for<br />radiant skin</h3>
              </Copy>
            </div>
            <img src="/product-display.png" alt="" />
            <div className="cta-main-copy-inner">
              <div className="btn">
                <Copy type="flicker">
                  <Link href="/wardrobe">Explore Collection</Link>
                </Copy>
              </div>
            </div>
          </div>
        </div>
        <div className="cta-col">
          <div className="cta-side-img">
            <img src="/category-hair.png" alt="" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="cta-main-copy">
          <div className="btn">
            <Copy type="flicker">
              <Link href="/wardrobe">Explore Collection</Link>
            </Copy>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
