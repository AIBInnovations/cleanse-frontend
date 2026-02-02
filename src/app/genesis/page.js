"use client";
import "./genesis.css";
import { useRef } from "react";

import Copy from "@/components/Copy/Copy";
import TextBlock from "@/components/TextBlock/TextBlock";
import BrandIcon from "@/components/BrandIcon/BrandIcon";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Genesis() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const projectPreview = document.querySelector(".project-preview");
      if (projectPreview) {
        gsap.set(projectPreview, { opacity: 0 });
      }

      ScrollTrigger.create({
        trigger: ".project-page-whitespace",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const projectPreviewWrapper = document.querySelector(
            ".project-preview-wrapper"
          );
          const previewCols = document.querySelectorAll(
            ".preview-col:not(.main-preview-col)"
          );
          const mainPreviewImg = document.querySelector(
            ".preview-img.main-preview-img img"
          );
          const projectPreviewSection = document.querySelector(".project-preview");

          if (!projectPreviewWrapper || !previewCols.length || !mainPreviewImg || !projectPreviewSection)
            return;

          // Fade in the background images when scrolling starts
          if (self.progress > 0) {
            const fadeProgress = Math.min(self.progress * 5, 1);
            projectPreviewSection.style.opacity = fadeProgress;
          } else {
            projectPreviewSection.style.opacity = 0;
          }

          const previewScreenWidth = window.innerWidth;
          const previewMaxScale = previewScreenWidth < 900 ? 4 : 2.65;

          const scale = 1 + self.progress * previewMaxScale;
          const yPreviewColTranslate = self.progress * 300;
          const mainPreviewImgScale = 2 - self.progress * 0.85;

          projectPreviewWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;

          previewCols.forEach((previewCol) => {
            previewCol.style.transform = `translateY(${yPreviewColTranslate}px)`;
          });

          mainPreviewImg.style.transform = `scale(${mainPreviewImgScale})`;
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section className="project-preview">
        <div className="project-preview-wrapper">
          <div className="preview-col">
            <div className="preview-img">
              <img src="/p1.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/p2.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/p3.png" alt="" />
            </div>
          </div>
          <div className="preview-col">
            <div className="preview-img">
              <img src="/p4.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/jar.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/product.png" alt="" />
            </div>
          </div>
          <div className="preview-col main-preview-col">
            <div className="preview-img">
              <img src="/category-face.png" alt="" />
            </div>
            <div className="preview-img main-preview-img">
              <img src="/jar.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/category-hair.png" alt="" />
            </div>
          </div>
          <div className="preview-col">
            <div className="preview-img">
              <img src="/p1.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/p2.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/p3.png" alt="" />
            </div>
          </div>
          <div className="preview-col">
            <div className="preview-img">
              <img src="/p4.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/jar.png" alt="" />
            </div>
            <div className="preview-img">
              <img src="/product.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="genesis-hero">
        <div className="gen-hero-img">
          <img src="/sacred.png" alt="" />
        </div>
        <div className="container">
          <div className="gen-hero-copy">
            <Copy animateOnScroll={false} delay={0.7} type="flicker">
              <p>Ancient wisdom preserved,</p>
              <p>Pure ingredients sourced,</p>
              <p>Beauty made sacred.</p>
            </Copy>
          </div>
          <div className="gen-hero-copy">
            <Copy animateOnScroll={false} delay={0.8} type="flicker">
              <p>We honor traditions,</p>
              <p>Crafted for today.</p>
            </Copy>
          </div>
          <div className="gen-hero-copy">
            <Copy animateOnScroll={false} delay={0.7}>
              <h1>The Story Behind Your Ritual</h1>
            </Copy>
            <div className="gen-hero-meta">
              <div className="gen-hero-meta-block">
                <Copy animateOnScroll={false} delay={0.9} type="flicker">
                  <p>We preserve formulas,</p>
                  <p>Passed through generations,</p>
                  <p>A study in nature.</p>
                </Copy>
              </div>
              <div className="gen-hero-meta-block">
                <Copy animateOnScroll={false} delay={1} type="flicker">
                  <p>[ EST. RISHIKESH 2024 ]</p>
                </Copy>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="genesis-about">
        <div className="container">
          <div className="genesis-about-logo">
            <BrandIcon fill="#3A2319" />
          </div>
          <div className="genesis-about-copy">
            <Copy>
              <h4>
                Cleanse Ayurveda is rooted in the belief that beauty should flow
                from nature. Every formula is crafted with sacred intention, shaped by
                ancient Ayurvedic wisdom and designed for modern self-care rituals. We honor
                tradition, harness botanicals, create purity without compromise.
              </h4>
            </Copy>
            <Copy>
              <h4 delay={0.5}>
                Our heritage lies in the Himalayan foothills, where Ayurveda was born. We create
                formulas that honor this lineage: pure, potent, and profoundly effective.
                Nature and science are harmonized, crafted for those who seek authentic
                beauty through time-tested ingredients. Cleanse is not skincare. It is a ritual.
              </h4>
            </Copy>
          </div>
        </div>
      </section>

      <section className="project-page-whitespace"></section>

      <TextBlock />
    </div>
  );
}
