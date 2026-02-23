"use client";
import "./lookbook.css";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const collections = [
  { title: "Morning Ritual", desc: "Start your day with ancient Ayurvedic wisdom", img: "/images/1.png", span: "tall" },
  { title: "Golden Hour", desc: "Saffron-infused luxury for radiant skin", img: "/images/2.png", span: "" },
  { title: "Sacred Roots", desc: "Hair care rooted in tradition", img: "/images/3.png", span: "" },
  { title: "Wellness Journey", desc: "Body care for mind and soul", img: "/images/hero.png", span: "wide" },
  { title: "Night Elixir", desc: "Overnight repair with precious herbs", img: "/images/4.png", span: "" },
  { title: "Pure Botanics", desc: "Nature's finest ingredients", img: "/images/1.png", span: "tall" },
  { title: "Bridal Glow", desc: "Traditional beauty rituals for the big day", img: "/images/banner.png", span: "" },
  { title: "Daily Essentials", desc: "Your everyday Ayurvedic routine", img: "/images/3.png", span: "" },
];

export default function Lookbook() {
  const itemsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      itemsRef.current.filter(Boolean),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  });

  return (
    <div className="lookbook-page">
      {/* Hero */}
      <section className="lookbook-hero">
        <div className="lookbook-hero-content">
          <div className="lookbook-breadcrumb">
            <Link href="/">HOME</Link>/ <span>LOOKBOOK</span>
          </div>
          <h1 className="lookbook-hero-title">LOOKBOOK</h1>
          <p className="lookbook-hero-subtitle">
            Explore our curated collections and sacred beauty rituals.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="lookbook-gallery">
        <div className="lookbook-grid">
          {collections.map((item, index) => (
            <div
              key={item.title}
              className={`lookbook-item ${item.span ? `lookbook-${item.span}` : ""}`}
              ref={(el) => (itemsRef.current[index] = el)}
              style={{ opacity: 0 }}
            >
              <div className="lookbook-item-img">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <div className="lookbook-item-overlay">
                <h3 className="lookbook-item-title">{item.title}</h3>
                <p className="lookbook-item-desc">{item.desc}</p>
                <Link href="/wardrobe" className="lookbook-item-btn">Shop Collection</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
