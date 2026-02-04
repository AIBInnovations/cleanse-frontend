"use client";
import "./MarqueeBanner.css";
import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reelsData = [
  // Set 1
  [
    {
      id: 1,
      title: "Morning Ritual",
      subtitle: "Golden Hour Glow",
      video: "/videos/reel1.mp4",
      poster: "/serum.jpg",
      position: "left-top"
    },
    {
      id: 2,
      title: "Sacred Rituals",
      subtitle: "Embrace Your Natural Glow",
      video: "/videos/reel2.mp4",
      poster: "/cream.jpg",
      position: "center"
    },
    {
      id: 3,
      title: "Evening Care",
      subtitle: "Restore & Rejuvenate",
      video: "/videos/reel3.mp4",
      poster: "/pink.jpg",
      position: "right-bottom"
    }
  ],
  // Set 2
  [
    {
      id: 4,
      title: "Deep Cleanse",
      subtitle: "Purify Your Skin",
      video: "/videos/reel4.mp4",
      poster: "/tall.jpg",
      position: "left-top"
    },
    {
      id: 5,
      title: "Hydration Boost",
      subtitle: "Lock In Moisture",
      video: "/videos/reel5.mp4",
      poster: "/serum.jpg",
      position: "center"
    },
    {
      id: 6,
      title: "Night Recovery",
      subtitle: "Wake Up Refreshed",
      video: "/videos/reel6.mp4",
      poster: "/cream.jpg",
      position: "right-bottom"
    }
  ]
];

const MarqueeBanner = () => {
  const marqueeBannerRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSet, setCurrentSet] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentReels = reelsData[currentSet];

  useGSAP(
    () => {
      // Marquee scroll animation
      ScrollTrigger.create({
        trigger: marqueeBannerRef.current,
        start: "top bottom",
        end: "150% top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const marquee1X = 25 - progress * 50;
          gsap.set(marquee1Ref.current, { x: `${marquee1X}%` });

          const marquee2X = -25 + progress * 50;
          gsap.set(marquee2Ref.current, { x: `${marquee2X}%` });
        },
      });

      // Cards entrance animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
            rotateY: index === 0 ? -15 : index === 2 ? 15 : 0,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: marqueeBannerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Parallax effect on cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const yOffset = index === 0 ? -30 : index === 2 ? 30 : 0;

        gsap.to(card, {
          y: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: marqueeBannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });
    },
    { scope: marqueeBannerRef }
  );

  const handleCardHover = (index) => {
    setHoveredCard(index);
    const card = cardsRef.current[index];
    if (!card) return;

    const cardInner = card.querySelector('.reel-card-inner');
    gsap.to(card, {
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });
    if (cardInner) {
      gsap.to(cardInner, {
        borderRadius: "1.25rem",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleCardLeave = (index) => {
    setHoveredCard(null);
    const card = cardsRef.current[index];
    if (!card) return;

    const cardInner = card.querySelector('.reel-card-inner');
    gsap.to(card, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    if (cardInner) {
      gsap.to(cardInner, {
        borderRadius: "1.25rem",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const navigateReels = (direction) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Change set immediately
    if (direction === 'next') {
      setCurrentSet((prev) => (prev + 1) % reelsData.length);
    } else {
      setCurrentSet((prev) => (prev - 1 + reelsData.length) % reelsData.length);
    }

    // Reset cards and animate in one by one
    setTimeout(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card,
          {
            y: 40,
          },
          {
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            onComplete: () => {
              if (index === cardsRef.current.length - 1) {
                setIsTransitioning(false);
              }
            }
          }
        );
      });
    }, 20);
  };

  return (
    <section className="marquee-banner" ref={marqueeBannerRef}>
      <div className="marquees">
        <div className="marquee-header marquee-header-1" ref={marquee1Ref}>
          <h1>Ancient wisdom meets modern beauty</h1>
        </div>
        <div className="marquee-header marquee-header-2" ref={marquee2Ref}>
          <h1>Pure ingredients for radiant skin</h1>
        </div>
      </div>

      <div className="reels-header-top">
        <h2 className="reels-tagline">CLEAN LIVING</h2>
      </div>

      <button
        className="reel-nav-btn reel-nav-prev"
        onClick={() => navigateReels('prev')}
        aria-label="Previous reels"
        disabled={isTransitioning}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        className="reel-nav-btn reel-nav-next"
        onClick={() => navigateReels('next')}
        aria-label="Next reels"
        disabled={isTransitioning}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="reels-container">
        {currentReels.map((reel, index) => (
          <div
            key={reel.id}
            className={`reel-card reel-card-${reel.position} ${hoveredCard === index ? 'active' : ''}`}
            ref={el => cardsRef.current[index] = el}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={() => handleCardLeave(index)}
          >
            <div className="reel-card-inner">
              <div className="reel-media">
                <img
                  src={reel.poster}
                  alt={reel.title}
                  className="reel-poster"
                />
                <div className="reel-overlay"></div>
              </div>

              <div className="reel-content">
                <span className="reel-badge">Reel</span>
                <div className="reel-info">
                  <p className="reel-subtitle">{reel.subtitle}</p>
                  <h4 className="reel-title">{reel.title}</h4>
                </div>
                <div className="reel-play">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              <div className="reel-shine"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="reels-footer">
        <a
          href="https://www.instagram.com/cleanseayurveda/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-handle"
        >
          <svg viewBox="0 0 24 24" fill="none" className="instagram-icon">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
          </svg>
          <span>@CleanseAyurveda</span>
        </a>
      </div>
    </section>
  );
};

export default MarqueeBanner;
