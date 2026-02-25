"use client";
import "@/components/FeaturedSection/FeaturedSection.css";
import "./wardrobe.css";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { products } from "./products";
import { useCart } from "@/context/CartContext";
import { gsap } from "gsap";

export default function Wardrobe() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialTag = categoryParam || "All";
  const [activeTag, setActiveTag] = useState(initialTag);
  const [filteredProducts, setFilteredProducts] = useState(
    initialTag === "All" ? products : products.filter((p) => p.tag === initialTag)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const productRefs = useRef([]);
  const isInitialMount = useRef(true);

  const sortProducts = (productsToSort, sortOption) => {
    const sorted = [...productsToSort];
    switch (sortOption) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-az":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-za":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  const filterByPrice = (productsToFilter, range) => {
    switch (range) {
      case "under-500":
        return productsToFilter.filter((p) => p.price < 500);
      case "500-1000":
        return productsToFilter.filter((p) => p.price >= 500 && p.price <= 1000);
      case "above-1000":
        return productsToFilter.filter((p) => p.price > 1000);
      default:
        return productsToFilter;
    }
  };

  const applyFiltersAndSort = (tag, sort, price) => {
    let result = tag === "All"
      ? products
      : products.filter((product) => product.tag === tag);
    result = filterByPrice(result, price);
    result = sortProducts(result, sort);
    return result;
  };

  const handleFilterChange = (newTag) => {
    if (isAnimating) return;
    if (newTag === activeTag) return;

    setIsAnimating(true);
    setActiveTag(newTag);

    window.dispatchEvent(new CustomEvent("page-transition", { detail: { active: true } }));

    gsap.to(productRefs.current.filter(Boolean), {
      opacity: 0,
      y: 20,
      duration: 0.25,
      stagger: 0.03,
      ease: "power3.out",
      onComplete: () => {
        const filtered = applyFiltersAndSort(newTag, sortBy, priceRange);
        setFilteredProducts(filtered);
      },
    });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    const filtered = applyFiltersAndSort(activeTag, newSort, priceRange);
    setFilteredProducts(filtered);
  };

  const handlePriceFilterChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange(newPrice);
    const filtered = applyFiltersAndSort(activeTag, sortBy, newPrice);
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    productRefs.current = productRefs.current.slice(0, filteredProducts.length);

    gsap.fromTo(
      productRefs.current.filter(Boolean),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: isInitialMount.current ? 0.6 : 0.3,
        stagger: isInitialMount.current ? 0.05 : 0.03,
        ease: "power3.out",
        onComplete: () => {
          setIsAnimating(false);
          isInitialMount.current = false;
          window.dispatchEvent(new CustomEvent("page-transition", { detail: { active: false } }));
        },
      }
    );
  }, [filteredProducts]);

  return (
    <div className="wardrobe-page">
      {/* Hero Section - same as home */}
      <section className="wardrobe-hero">
        <div className="wardrobe-hero-content">
          <div className="wardrobe-breadcrumb">
            <Link href="/">HOME</Link>/ <Link href="/wardrobe">SHOP</Link>/ <span>{activeTag === "All" ? "ALL" : activeTag.toUpperCase()}</span>
          </div>
          <h1 className="wardrobe-hero-title">
            {activeTag === "All" ? "BODY SKIN CARE" : activeTag.toUpperCase()}
          </h1>
        </div>
      </section>

      {/* Category Filter + Sort */}
      <section className="wardrobe-filters">
        <div className="category-filter">
          {["All", "Face Care", "Hair Care", "Body Care"].map((tag) => (
            <button
              key={tag}
              className={`category-btn ${activeTag === tag ? "active" : ""}`}
              onClick={() => handleFilterChange(tag)}
              disabled={isAnimating}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="sort-filter-bar">
          <div className="filter-group">
            <label htmlFor="price-filter">Filter</label>
            <select
              id="price-filter"
              value={priceRange}
              onChange={handlePriceFilterChange}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              <option value="under-500">Under ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="above-1000">Above ₹1000</option>
            </select>
          </div>
          <span className="filter-divider"></span>
          <div className="filter-group">
            <label htmlFor="sort-by">Sort</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="name-az">A → Z</option>
              <option value="name-za">Z → A</option>
            </select>
          </div>
        </div>
      </section>

      {/* Section 1: 2 Products + Spotlight Banner */}
      <section className="wardrobe-section section-row-1">
        <div className="products-pair">
          {filteredProducts.slice(0, 2).map((product, index) => {
            const imgIndex = ((products.indexOf(product)) % 4) + 1;
            return (
              <div key={product.name + index} className="product-card" ref={(el) => (productRefs.current[index] = el)} style={{ opacity: 0 }}>
                <div className="product-card-image">
                  <img src={`/images/${imgIndex}.png`} alt={product.name} loading="lazy" />
                </div>
                <button className="product-card-cart-btn" onClick={() => addToCart(product)}>
                  <span className="cart-btn-circle">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </span>
                  <span className="cart-btn-text">Add to Cart</span>
                </button>
                <div className="product-card-info">
                  <h3 className="product-card-name">{product.name}</h3>
                  <p className="product-card-desc">{product.description}</p>
                  <div className="product-card-footer">
                    <span className="product-card-price">₹{product.price}</span>
                    <Link href="/unit" className="product-card-buy-btn">Buy Now</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="spotlight-banner">
          <img src="/images/top.png" alt="Featured Collection" className="spotlight-banner-img" />
        </div>
      </section>

      {/* Section 2: 4 Products in a Row */}
      <section className="wardrobe-section section-row-2">
        {filteredProducts.slice(2, 6).map((product, index) => {
          const imgIndex = ((products.indexOf(product)) % 4) + 1;
          return (
            <div key={product.name + index} className="product-card" ref={(el) => (productRefs.current[index + 2] = el)} style={{ opacity: 0 }}>
              <div className="product-card-image">
                <img src={`/images/${imgIndex}.png`} alt={product.name} loading="lazy" />
              </div>
              <button className="product-card-cart-btn" onClick={() => addToCart(product)}>
                <span className="cart-btn-circle">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </span>
                <span className="cart-btn-text">Add to Cart</span>
              </button>
              <div className="product-card-info">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-desc">{product.description}</p>
                <div className="product-card-footer">
                  <span className="product-card-price">₹{product.price}</span>
                  <Link href="/unit" className="product-card-buy-btn">Buy Now</Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Section 3: Side Banner + 4 Products */}
      <section className="wardrobe-section section-row-3">
        <div className="side-banner">
          <img src="/images/banner.png" alt="Ayurvedic Collection" className="side-banner-img" />
        </div>
        <div className="products-beside-banner">
          {filteredProducts.slice(6, 10).map((product, index) => {
            const imgIndex = ((products.indexOf(product)) % 4) + 1;
            return (
              <div key={product.name + index} className="product-card" ref={(el) => (productRefs.current[index + 6] = el)} style={{ opacity: 0 }}>
                <div className="product-card-image">
                  <img src={`/images/${imgIndex}.png`} alt={product.name} loading="lazy" />
                </div>
                <button className="product-card-cart-btn" onClick={() => addToCart(product)}>
                  <span className="cart-btn-circle">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </span>
                  <span className="cart-btn-text">Add to Cart</span>
                </button>
                <div className="product-card-info">
                  <h3 className="product-card-name">{product.name}</h3>
                  <p className="product-card-desc">{product.description}</p>
                  <div className="product-card-footer">
                    <span className="product-card-price">₹{product.price}</span>
                    <Link href="/unit" className="product-card-buy-btn">Buy Now</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
