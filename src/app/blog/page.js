"use client";
import "./blog.css";
import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Hair Care", "Skin Care", "Wellness", "Rituals", "Ingredients"];

const blogs = [
  {
    id: 1,
    title: "The Ancient Wisdom of Ayurvedic Hair Rituals",
    category: "Hair Care",
    date: "Jan 28, 2025",
    image: "/images/b1.png",
    excerpt: "Discover centuries-old techniques passed down through generations for naturally lustrous, healthy hair rooted in Ayurvedic tradition.",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding Your Dosha for Better Skin",
    category: "Skin Care",
    date: "Jan 22, 2025",
    image: "/images/b2.png",
    excerpt: "Learn how your unique constitution affects your skincare needs and discover the perfect routine for your dosha type.",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Morning Rituals for Radiant Complexion",
    category: "Wellness",
    date: "Jan 15, 2025",
    image: "/images/b3.png",
    excerpt: "Simple daily practices that transform your skin from within, blending ancient wisdom with modern self-care.",
    readTime: "3 min read",
  },
  {
    id: 4,
    title: "The Sacred Power of Turmeric in Skincare",
    category: "Ingredients",
    date: "Jan 10, 2025",
    image: "/images/why1.png",
    excerpt: "Explore why turmeric has been the golden secret of Ayurvedic beauty for over 5,000 years.",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Building a Nighttime Ayurvedic Routine",
    category: "Rituals",
    date: "Jan 5, 2025",
    image: "/images/why2.png",
    excerpt: "Wind down with intention — a complete guide to evening skincare rituals that restore and rejuvenate.",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Rose Water: Nature's Most Elegant Toner",
    category: "Ingredients",
    date: "Dec 28, 2024",
    image: "/images/why3.png",
    excerpt: "From Mughal gardens to modern vanities — the timeless journey of rose water in beauty rituals.",
    readTime: "5 min read",
  },
  {
    id: 7,
    title: "Balancing Pitta Dosha in Summer",
    category: "Wellness",
    date: "Dec 20, 2024",
    image: "/images/c1.png",
    excerpt: "Keep your fire element in check with cooling Ayurvedic practices designed for the warmer months.",
    readTime: "4 min read",
  },
  {
    id: 8,
    title: "Oil Pulling: Ancient Detox for Modern Life",
    category: "Rituals",
    date: "Dec 15, 2024",
    image: "/images/c2.png",
    excerpt: "A 3,000-year-old practice that cleanses, heals, and brings clarity — one swish at a time.",
    readTime: "3 min read",
  },
];

export default function BlogPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const featuredRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  const featuredBlog = blogs.find((b) => b.featured);
  const gridBlogs = filteredBlogs.filter((b) => !b.featured || activeCategory !== "All");

  useGSAP(() => {
    // Hero parallax
    if (heroRef.current) {
      const heroImg = heroRef.current.querySelector(".blog-hero-bg img");
      if (heroImg) {
        gsap.fromTo(heroImg,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }
    }

    // Featured card reveal
    if (featuredRef.current) {
      gsap.fromTo(featuredRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // Grid cards stagger
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // Parallax on card images
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const img = card.querySelector(".blog-grid-card-img img");
      if (!img) return;
      gsap.fromTo(img,
        { yPercent: -8, force3D: true },
        {
          yPercent: 8,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3,
          },
        }
      );
    });
  });

  return (
    <div className="blog-page">
      {/* Hero */}
      <section className="blog-hero" ref={heroRef}>
        <div className="blog-hero-bg">
          <img src="/images/b2.png" alt="" />
        </div>
        <div className="blog-hero-overlay" />
        <div className="blog-hero-content">
          <div className="blog-breadcrumb">
            <Link href="/">HOME</Link> / <span>JOURNAL</span>
          </div>
          <h1 className="blog-hero-title">THE<br />JOURNAL</h1>
          <p className="blog-hero-subtitle">
            Ancient wisdom, modern stories — explore the art of Ayurvedic living.
          </p>
        </div>
        <div className="blog-hero-scroll-indicator">
          <span>Scroll</span>
          <div className="blog-scroll-line" />
        </div>
      </section>

      {/* Featured Article - Full width cinematic card */}
      {activeCategory === "All" && featuredBlog && (
        <section className="blog-featured" ref={featuredRef} style={{ opacity: 0 }}>
          <Link href={`/blog/${featuredBlog.id}`} className="blog-featured-card">
            <div className="blog-featured-img">
              <img src={featuredBlog.image} alt={featuredBlog.title} />
            </div>
            <div className="blog-featured-overlay" />
            <div className="blog-featured-content">
              <div className="blog-featured-badge">Featured Story</div>
              <div className="blog-featured-meta">
                <span className="blog-featured-cat">{featuredBlog.category}</span>
                <span className="blog-featured-divider" />
                <span className="blog-featured-date">{featuredBlog.date}</span>
                <span className="blog-featured-divider" />
                <span className="blog-featured-read">{featuredBlog.readTime}</span>
              </div>
              <h2 className="blog-featured-title">{featuredBlog.title}</h2>
              <p className="blog-featured-excerpt">{featuredBlog.excerpt}</p>
              <div className="blog-featured-cta">
                <span>Read Full Story</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="blog-featured-number">01</div>
          </Link>
        </section>
      )}

      {/* Category Filter */}
      <section className="blog-filter">
        <div className="blog-filter-inner">
          <div className="blog-filter-label">Filter</div>
          <div className="blog-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid - Bento/Masonry style */}
      <section className="blog-grid-section" ref={gridRef}>
        <div className="blog-grid-container">
          {gridBlogs.map((blog, index) => (
            <Link
              href={`/blog/${blog.id}`}
              key={blog.id}
              className={`blog-grid-card ${index === 0 ? "blog-grid-card-wide" : ""} ${index === 3 ? "blog-grid-card-tall" : ""}`}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ opacity: 0 }}
            >
              <div className="blog-grid-card-img">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-grid-card-body">
                <div className="blog-grid-card-meta">
                  <span className="blog-grid-card-cat">{blog.category}</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="blog-grid-card-title">{blog.title}</h3>
                <p className="blog-grid-card-excerpt">{blog.excerpt}</p>
                <div className="blog-grid-card-footer">
                  <span className="blog-grid-card-date">{blog.date}</span>
                  <div className="blog-grid-card-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter">
        <div className="blog-newsletter-inner">
          <div className="blog-newsletter-content">
            <span className="blog-newsletter-tag">STAY ROOTED</span>
            <h2 className="blog-newsletter-title">Stories Delivered<br />To Your Inbox</h2>
            <p className="blog-newsletter-desc">
              Get weekly Ayurvedic insights, rituals, and exclusive content — straight from our journal.
            </p>
            <form className="blog-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="blog-newsletter-visual">
            <img src="/images/cta.png" alt="Ayurvedic rituals" />
          </div>
        </div>
      </section>
    </div>
  );
}
