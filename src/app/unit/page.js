"use client";
import "./unit.css";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { products } from "../wardrobe/products";
import Copy from "@/components/Copy/Copy";
import Product from "@/components/Product/Product";
import { useCartStore } from "@/store/cartStore";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Unit() {
  const heroRef = useRef(null);
  const activeMinimapIndex = useRef(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const pathname = usePathname();

  const currentProduct =
    products.find((p) => p.name === "Kumkumadi Night Elixir") || products[6];

  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setRelatedProducts(shuffled.slice(0, 4));
  }, []);

  useEffect(() => {
    if (pathname === "/unit") {
      window.scrollTo(0, 0);

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("scrollToTop", handleScrollToTop);

    return () => {
      window.removeEventListener("scrollToTop", handleScrollToTop);
    };
  }, []);

  useGSAP(() => {
    const snapshots = document.querySelectorAll(".product-snapshot");
    const minimapImages = document.querySelectorAll(
      ".product-snapshot-minimap-img"
    );
    const totalImages = snapshots.length;

    gsap.set(snapshots[0], { y: "0%", scale: 1 });
    gsap.set(minimapImages[0], { scale: 1.25 });
    for (let i = 1; i < totalImages; i++) {
      gsap.set(snapshots[i], { y: "100%", scale: 1 });
      gsap.set(minimapImages[i], { scale: 1 });
    }

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        let currentActiveIndex = 0;

        for (let i = 1; i < totalImages; i++) {
          const imageStart = (i - 1) / (totalImages - 1);
          const imageEnd = i / (totalImages - 1);

          let localProgress = (progress - imageStart) / (imageEnd - imageStart);
          localProgress = Math.max(0, Math.min(1, localProgress));

          const yValue = 100 - localProgress * 100;
          gsap.set(snapshots[i], { y: `${yValue}%` });

          const scaleValue = 1 + localProgress * 0.5;
          gsap.set(snapshots[i - 1], { scale: scaleValue });

          if (localProgress >= 0.5) {
            currentActiveIndex = i;
          }
        }

        if (currentActiveIndex !== activeMinimapIndex.current) {
          gsap.to(minimapImages[currentActiveIndex], {
            scale: 1.25,
            duration: 0.3,
            ease: "power2.out",
          });

          for (let i = 0; i < currentActiveIndex; i++) {
            gsap.to(minimapImages[i], {
              scale: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          for (let i = currentActiveIndex + 1; i < totalImages; i++) {
            gsap.to(minimapImages[i], {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          activeMinimapIndex.current = currentActiveIndex;
        }
      },
    });

    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <section className="product-hero" ref={heroRef}>
        <div className="product-hero-col product-snapshots">
          <div className="product-snapshot">
            <img src="/product/product_shot_01.jpg" alt="" />
          </div>
          <div className="product-snapshot">
            <img src="/product/product_shot_02.jpg" alt="" />
          </div>
          <div className="product-snapshot">
            <img src="/product/product_shot_03.jpg" alt="" />
          </div>
          <div className="product-snapshot">
            <img src="/product/product_shot_04.jpg" alt="" />
          </div>
          <div className="product-snapshot">
            <img src="/product/product_shot_05.jpg" alt="" />
          </div>
          <div className="product-snapshot-minimap">
            <div className="product-snapshot-minimap-img">
              <img src="/product/product_minimap_01.jpg" alt="" />
            </div>
            <div className="product-snapshot-minimap-img">
              <img src="/product/product_minimap_02.jpg" alt="" />
            </div>
            <div className="product-snapshot-minimap-img">
              <img src="/product/product_minimap_03.jpg" alt="" />
            </div>
            <div className="product-snapshot-minimap-img">
              <img src="/product/product_minimap_04.jpg" alt="" />
            </div>
            <div className="product-snapshot-minimap-img">
              <img src="/product/product_minimap_05.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="product-hero-col product-meta">
          <div className="product-meta-container">
            <div className="product-meta-header">
              <h3>Kumkumadi Night Elixir</h3>
              <h3>$95</h3>
            </div>
            <div className="product-meta-header-divider"></div>
            <div className="product-color-container">
              <p className="md">Tone</p>
              <div className="product-colors">
                <div className="product-color">
                  <span style={{backgroundColor: '#D4B575'}}></span>
                </div>
              </div>
            </div>
            <div className="product-sizes-container">
              <p className="md">Size</p>
              <div className="product-sizes">
                <p className="md selected">[ 15ml ]</p>
                <p className="md">[ 30ml ]</p>
              </div>
            </div>
            <div className="product-meta-buttons">
              <button
                className="primary"
                onClick={() => addToCart(currentProduct)}
              >
                Add To Bag
              </button>
              <button className="secondary">Save Item</button>
            </div>
          </div>
        </div>
      </section>

      <section className="product-details specifications">
        <div className="product-col product-col-copy">
          <div className="product-col-copy-wrapper">
            <Copy>
              <h4>Key Ingredients</h4>
            </Copy>
            <Copy>
              <p className="bodyCopy lg">
                This legendary formula contains pure Kashmiri saffron and 16 precious
                Ayurvedic herbs including sandalwood, lotus, and manjistha. Each ingredient
                is carefully sourced and cold-processed to preserve its potency and
                therapeutic benefits.
              </p>
              <p className="bodyCopy lg">
                Blended in a base of pure sesame and almond oils, this elixir penetrates
                deeply to nourish skin at the cellular level. Apply nightly to cleansed skin
                for visibly brighter, more luminous complexion by morning.
              </p>
            </Copy>
          </div>
        </div>
        <div className="product-col product-col-img">
          <img src="/product/product_shot_03.jpg" alt="" />
        </div>
      </section>

      <section className="product-details shipping-details">
        <div className="product-col product-col-img">
          <img src="/product/product_shot_04.jpg" alt="" />
        </div>
        <div className="product-col product-col-copy">
          <div className="product-col-copy-wrapper">
            <Copy>
              <h4>Shipping & Returns</h4>
            </Copy>
            <Copy>
              <p className="bodyCopy lg">
                All orders are carefully packaged and shipped within 2-3 business days.
                We use eco-friendly packaging materials aligned with our commitment to
                sustainability. Free shipping on orders over $75. International delivery
                available to select countries.
              </p>
              <p className="bodyCopy lg">
                We stand behind every product we create. If you're not completely satisfied,
                return unopened products within 30 days for a full refund. Contact our
                wellness team for any concerns about your order or skincare needs.
              </p>
            </Copy>
          </div>
        </div>
      </section>

      <section className="related-products">
        <div className="container">
          <div className="related-products-header">
            <h3>You May Also Love</h3>
          </div>
          <div className="related-products-container">
            <div className="container">
              {relatedProducts.map((product) => (
                <Product
                  key={product.name}
                  product={product}
                  productIndex={products.indexOf(product) + 1}
                  showAddToCart={true}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
