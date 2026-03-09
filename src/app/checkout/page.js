"use client";
import "./checkout.css";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { couponApi, orderApi, paymentApi } from "@/lib/endpoints";
import { loadRazorpay } from "@/lib/razorpay";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

export default function CheckoutPage() {
  const { cartItems, cartCount, subtotal, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Step management
  const [activeStep, setActiveStep] = useState(1);

  // Shipping form
  const [shipping, setShipping] = useState({
    email: "",
    phone: "",
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Payment form
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billing, setBilling] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [upiId, setUpiId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(null); // null | "valid" | "invalid"
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponDiscountType, setCouponDiscountType] = useState("percentage");
  const [couponLoading, setCouponLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Discount tier logic (matching cart page)
  const activeTier = useMemo(() => {
    const tiers = [
      { threshold: 3500, discount: 15 },
      { threshold: 2000, discount: 10 },
      { threshold: 500, discount: 5 },
    ];
    return tiers.find((t) => subtotal >= t.threshold) || null;
  }, [subtotal]);

  const tierDiscount = activeTier ? (subtotal * activeTier.discount) / 100 : 0;
  const isFreeShippingCoupon = couponDiscountType === "free_shipping" && couponStatus === "valid";
  const shippingCost = subtotal >= 1200 || isFreeShippingCoupon ? 0 : 99;
  // Backend returns pre-calculated discount amount, use directly
  const couponAmount = couponDiscount;
  const total = subtotal - tierDiscount - couponAmount + shippingCost;

  const handleShippingChange = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field, value) => {
    setBilling((prev) => ({ ...prev, [field]: value }));
  };

  const goToStep = (step) => {
    setActiveStep(step);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponStatus(null);
    try {
      const data = await couponApi.validate(couponCode.trim(), subtotal);
      setCouponStatus("valid");
      setCouponDiscount(data.discount || 0);
      setCouponDiscountType(data.discountType || "percentage");
    } catch {
      setCouponStatus("invalid");
      setCouponDiscount(0);
      setCouponDiscountType("percentage");
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    setOrderLoading(true);
    setOrderError("");

    const orderData = {
      shippingInfo: shipping,
      billingInfo: billingSameAsShipping ? shipping : billing,
      billingSameAsShipping,
      couponCode: couponStatus === "valid" ? couponCode.trim() : undefined,
      giftWrap: false,
    };

    try {
      if (paymentMethod === "cod") {
        const data = await orderApi.placeOrder({ ...orderData, paymentMethod: "cod" });
        clearCart();
        setPlacedOrder(data.order);
        setOrderLoading(false);
      } else {
        // Razorpay flow (handles card, UPI, netbanking, etc.)
        const loaded = await loadRazorpay();
        if (!loaded) {
          setOrderError("Failed to load payment gateway. Please try again.");
          setOrderLoading(false);
          return;
        }

        const rpData = await paymentApi.createRazorpay(orderData);

        const options = {
          key: rpData.razorpayKeyId,
          amount: rpData.amount,
          currency: rpData.currency || "INR",
          name: "Cleanse Ayurveda",
          description: "Order Payment",
          order_id: rpData.razorpayOrderId,
          prefill: {
            name: shipping.fullName,
            email: shipping.email,
            contact: shipping.phone,
          },
          theme: { color: "#663532" },
          handler: async (response) => {
            try {
              const verifyData = await paymentApi.verifyRazorpay({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                ...orderData,
              });
              clearCart();
              setPlacedOrder(verifyData.order);
            } catch {
              setOrderError("Payment verification failed. Please contact support.");
            } finally {
              setOrderLoading(false);
            }
          },
          modal: {
            ondismiss: () => {
              setOrderLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      }
    } catch (err) {
      setOrderError(err?.response?.data?.message || err?.message || "Failed to place order. Please try again.");
      setOrderLoading(false);
    }
  };

  // Order confirmation view
  if (placedOrder) {
    return (
      <div className="checkout-page">
        <section className="checkout-empty">
          <div className="checkout-empty-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="checkout-empty-title">Order Confirmed!</h2>
          <p className="checkout-empty-text">
            Your order <strong>#{placedOrder.orderId}</strong> has been placed successfully.
          </p>
          <p className="checkout-empty-text" style={{ marginTop: "0.5rem" }}>
            Total: &#8377;{placedOrder.pricing?.total?.toFixed(2)}
          </p>
          {placedOrder.loyaltyPointsEarned > 0 && (
            <p className="checkout-empty-text" style={{ marginTop: "0.25rem", color: "#4CAF50" }}>
              +{placedOrder.loyaltyPointsEarned} loyalty points earned!
            </p>
          )}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center" }}>
            <Link href="/profile" className="checkout-empty-btn" style={{ background: "transparent", border: "1px solid #333", color: "#333" }}>View Orders</Link>
            <Link href="/wardrobe" className="checkout-empty-btn">Continue Shopping</Link>
          </div>
        </section>
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <section className="checkout-empty">
          <div className="checkout-empty-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6h12l1.5 12H4.5L6 6z" />
              <path d="M9 6V4a3 3 0 016 0v2" />
            </svg>
          </div>
          <h2 className="checkout-empty-title">Your Bag is Empty</h2>
          <p className="checkout-empty-text">Add some items before checking out</p>
          <Link href="/wardrobe" className="checkout-empty-btn">Browse Products</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Hero */}
      <section className="checkout-hero">
        <div className="checkout-hero-content">
          <div className="checkout-breadcrumb">
            <Link href="/">HOME</Link>/ <span>CHECKOUT</span>
          </div>
          <h1 className="checkout-hero-title">Checkout</h1>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="checkout-steps">
        <div className="checkout-steps-track">
          {[1, 2, 3].map((step) => {
            const labels = ["Shipping", "Payment", "Review"];
            return (
              <div key={step} className="checkout-step-item" onClick={() => goToStep(step)}>
                <div className={`checkout-step-circle ${activeStep >= step ? "active" : ""}`}>
                  {activeStep > step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <span className={`checkout-step-label ${activeStep >= step ? "active" : ""}`}>
                  {labels[step - 1]}
                </span>
                {step < 3 && <div className={`checkout-step-line ${activeStep > step ? "active" : ""}`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="checkout-main">
        {/* Left Column - Forms */}
        <div className="checkout-forms">

          {/* Step 1: Shipping */}
          {activeStep === 1 && (
            <div className="checkout-form-section">
              <h3 className="checkout-section-title">Contact Information</h3>
              <div className="checkout-form-grid">
                <div className="checkout-input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={shipping.email}
                    onChange={(e) => handleShippingChange("email", e.target.value)}
                  />
                </div>
                <div className="checkout-input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={shipping.phone}
                    onChange={(e) => handleShippingChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <h3 className="checkout-section-title checkout-section-title--spaced">Shipping Address</h3>
              <div className="checkout-form-stack">
                <div className="checkout-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={shipping.fullName}
                    onChange={(e) => handleShippingChange("fullName", e.target.value)}
                  />
                </div>
                <div className="checkout-input-group">
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    placeholder="Street address"
                    value={shipping.address1}
                    onChange={(e) => handleShippingChange("address1", e.target.value)}
                  />
                </div>
                <div className="checkout-input-group">
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={shipping.address2}
                    onChange={(e) => handleShippingChange("address2", e.target.value)}
                  />
                </div>
                <div className="checkout-form-grid">
                  <div className="checkout-input-group">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={shipping.city}
                      onChange={(e) => handleShippingChange("city", e.target.value)}
                    />
                  </div>
                  <div className="checkout-input-group">
                    <label>State</label>
                    <select
                      value={shipping.state}
                      onChange={(e) => handleShippingChange("state", e.target.value)}
                    >
                      <option value="" disabled>Select state</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="checkout-form-grid">
                  <div className="checkout-input-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={shipping.pincode}
                      onChange={(e) => handleShippingChange("pincode", e.target.value)}
                    />
                  </div>
                  <div className="checkout-input-group">
                    <label>Country</label>
                    <input
                      type="text"
                      value={shipping.country}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <button className="checkout-continue-btn" onClick={() => goToStep(2)}>
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {activeStep === 2 && (
            <div className="checkout-form-section">
              {/* Billing same as shipping */}
              <div className="checkout-toggle-row">
                <label className="checkout-toggle">
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                  />
                  <span className="checkout-toggle-slider"></span>
                </label>
                <span className="checkout-toggle-label">Billing address same as shipping</span>
              </div>

              {/* Billing address (if different) */}
              {!billingSameAsShipping && (
                <div className="checkout-billing-form">
                  <h3 className="checkout-section-title">Billing Address</h3>
                  <div className="checkout-form-stack">
                    <div className="checkout-input-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={billing.fullName}
                        onChange={(e) => handleBillingChange("fullName", e.target.value)}
                      />
                    </div>
                    <div className="checkout-input-group">
                      <label>Address Line 1</label>
                      <input
                        type="text"
                        placeholder="Street address"
                        value={billing.address1}
                        onChange={(e) => handleBillingChange("address1", e.target.value)}
                      />
                    </div>
                    <div className="checkout-input-group">
                      <label>Address Line 2</label>
                      <input
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        value={billing.address2}
                        onChange={(e) => handleBillingChange("address2", e.target.value)}
                      />
                    </div>
                    <div className="checkout-form-grid">
                      <div className="checkout-input-group">
                        <label>City</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={billing.city}
                          onChange={(e) => handleBillingChange("city", e.target.value)}
                        />
                      </div>
                      <div className="checkout-input-group">
                        <label>State</label>
                        <select
                          value={billing.state}
                          onChange={(e) => handleBillingChange("state", e.target.value)}
                        >
                          <option value="" disabled>Select state</option>
                          {indianStates.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="checkout-form-grid">
                      <div className="checkout-input-group">
                        <label>Pincode</label>
                        <input
                          type="text"
                          placeholder="000000"
                          value={billing.pincode}
                          onChange={(e) => handleBillingChange("pincode", e.target.value)}
                        />
                      </div>
                      <div className="checkout-input-group">
                        <label>Country</label>
                        <input
                          type="text"
                          value={billing.country}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <h3 className="checkout-section-title checkout-section-title--spaced">Payment Method</h3>
              <div className="checkout-payment-methods">
                <label className={`checkout-payment-option ${paymentMethod === "razorpay" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                  />
                  <span className="checkout-radio-custom"></span>
                  <div className="checkout-payment-info">
                    <span className="checkout-payment-name">Razorpay</span>
                    <span className="checkout-payment-logo">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                    </span>
                  </div>
                  {paymentMethod === "razorpay" && (
                    <p className="checkout-payment-note">You will be redirected to Razorpay to complete payment securely.</p>
                  )}
                </label>

                <label className={`checkout-payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span className="checkout-radio-custom"></span>
                  <div className="checkout-payment-info">
                    <span className="checkout-payment-name">Cash on Delivery</span>
                    <span className="checkout-payment-logo">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                      </svg>
                    </span>
                  </div>
                </label>

                <label className={`checkout-payment-option ${paymentMethod === "upi" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <span className="checkout-radio-custom"></span>
                  <div className="checkout-payment-info">
                    <span className="checkout-payment-name">UPI</span>
                    <span className="checkout-payment-logo">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                  </div>
                  {paymentMethod === "upi" && (
                    <div className="checkout-upi-input">
                      <div className="checkout-input-group">
                        <label>UPI ID</label>
                        <input
                          type="text"
                          placeholder="name@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {/* Coupon Code */}
              <h3 className="checkout-section-title checkout-section-title--spaced">Coupon Code</h3>
              <div className="checkout-coupon-row">
                <div className="checkout-input-group checkout-coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponStatus(null);
                      setCouponDiscount(0);
                      setCouponDiscountType("percentage");
                    }}
                  />
                </div>
                <button className="checkout-coupon-btn" onClick={handleApplyCoupon} disabled={couponLoading}>{couponLoading ? "..." : "Apply"}</button>
              </div>
              {couponStatus === "valid" && (
                <p className="checkout-coupon-msg checkout-coupon-valid">
                  {couponDiscountType === "free_shipping" ? "Free shipping applied!" : couponDiscountType === "fixed" ? `\u20B9${couponDiscount} off applied!` : `${couponDiscount}% off applied!`}
                </p>
              )}
              {couponStatus === "invalid" && (
                <p className="checkout-coupon-msg checkout-coupon-invalid">Invalid coupon</p>
              )}

              <button className="checkout-continue-btn" onClick={() => goToStep(3)}>
                Review Order
              </button>
            </div>
          )}

          {/* Step 3: Review */}
          {activeStep === 3 && (
            <div className="checkout-form-section">
              <h3 className="checkout-section-title">Shipping Address</h3>
              <div className="checkout-review-card">
                <div className="checkout-review-details">
                  <p className="checkout-review-name">{shipping.fullName || "Not provided"}</p>
                  <p className="checkout-review-line">{shipping.address1}</p>
                  {shipping.address2 && <p className="checkout-review-line">{shipping.address2}</p>}
                  <p className="checkout-review-line">
                    {shipping.city}{shipping.state ? `, ${shipping.state}` : ""} {shipping.pincode}
                  </p>
                  <p className="checkout-review-line">{shipping.country}</p>
                  <p className="checkout-review-line">{shipping.email}</p>
                  <p className="checkout-review-line">{shipping.phone}</p>
                </div>
                <button className="checkout-edit-link" onClick={() => goToStep(1)}>Edit</button>
              </div>

              <h3 className="checkout-section-title checkout-section-title--spaced">Payment Method</h3>
              <div className="checkout-review-card">
                <div className="checkout-review-details">
                  <p className="checkout-review-name">
                    {paymentMethod === "razorpay" && "Razorpay"}
                    {paymentMethod === "cod" && "Cash on Delivery"}
                    {paymentMethod === "upi" && `UPI${upiId ? ` - ${upiId}` : ""}`}
                  </p>
                </div>
                <button className="checkout-edit-link" onClick={() => goToStep(2)}>Edit</button>
              </div>

              {orderError && <p style={{ color: "#c44", fontSize: "0.9rem", marginBottom: "1rem" }}>{orderError}</p>}
              <button className="checkout-place-order-btn" onClick={handlePlaceOrder} disabled={orderLoading}>
                {orderLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="checkout-summary-wrapper">
          <div className="checkout-summary-card">
            <h3 className="checkout-summary-title">
              Order Summary
              <span className="checkout-summary-count">{cartCount} {cartCount === 1 ? "item" : "items"}</span>
            </h3>

            <div className="checkout-summary-items">
              {cartItems.map((item, i) => {
                const quantity = Number(item.quantity) || 1;
                return (
                  <div key={`${item.name}-${i}`} className="checkout-summary-item">
                    <div className="checkout-summary-item-img">
                      <img src={item.image || `/images/${(i % 4) + 1}.png`} alt={item.name} />
                      <span className="checkout-summary-item-qty">{quantity}</span>
                    </div>
                    <div className="checkout-summary-item-info">
                      <span className="checkout-summary-item-name">{item.name}</span>
                      <span className="checkout-summary-item-price">
                        &#8377;{(parseFloat(item.price) * quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="checkout-summary-rows">
              <div className="checkout-summary-line">
                <span>Subtotal</span>
                <span>&#8377;{subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-line">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `\u20B9${shippingCost}`}</span>
              </div>
              {activeTier && (
                <div className="checkout-summary-line checkout-summary-discount">
                  <span>Discount ({activeTier.discount}% off)</span>
                  <span>-&#8377;{tierDiscount.toFixed(2)}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="checkout-summary-line checkout-summary-discount">
                  <span>Coupon ({couponDiscountType === "fixed" ? `\u20B9${couponDiscount}` : couponDiscountType === "free_shipping" ? "Free Shipping" : `${couponDiscount}%`} off)</span>
                  <span>-&#8377;{couponAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="checkout-summary-line checkout-summary-total">
                <span>Total</span>
                <span>&#8377;{total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/wardrobe" className="checkout-continue-shopping">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
