import React, { useState, useEffect } from "react";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [email, setEmail] = useState("");
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // بيانات التصاميم مع 5 صور لكل تصميم (بدون مسافات زائدة في الروابط)
  const designs = [
    {
      id: 1,
      name: "Galaxy Warrior",
      images: [
        "https://placehold.co/400x600/1a1a2e/ffffff?text=Galaxy+1",
        "https://placehold.co/400x600/2d2d44/ffffff?text=Galaxy+2",
        "https://placehold.co/400x600/3e3e5a/ffffff?text=Galaxy+3",
        "https://placehold.co/400x600/505070/ffffff?text=Galaxy+4",
        "https://placehold.co/400x600/626286/ffffff?text=Galaxy+5",
      ],
      buyLink: "https://paypal.me/yourname/cyberpunk", // ← رابط مختلف (تم إزالة المسافات)
      originalPrice: 6,
      discount: 50,
      rating: 4.8,
      views: 1250,
      description: "A powerful warrior standing in the middle of a cosmic galaxy, ready to defend the universe.",
      features: [
        "Premium cotton fabric",
        "Soft and breathable material",
        "Unisex fit",
        "High-definition print",
      ],
      reviews: [
        { rating: 5, comment: "Absolutely stunning design!", author: "John Doe" },
        { rating: 4, comment: "Great shirt, perfect fit.", author: "Jane Smith" },
      ],
    },
    {
      id: 2,
      name: "Neon Cyberpunk",
      images: [
        "https://placehold.co/400x600/0f3460/ffffff?text=Cyber+1",
        "https://placehold.co/400x600/1a4877/ffffff?text=Cyber+2",
        "https://placehold.co/400x600/265d8e/ffffff?text=Cyber+3",
        "https://placehold.co/400x600/3171a5/ffffff?text=Cyber+4",
        "https://placehold.co/400x600/3c85bc/ffffff?text=Cyber+5",
      ],
      buyLink: "https://printly.com/",
      originalPrice: 6,
      discount: 50,
      rating: 4.9,
      views: 2100,
      description: "Futuristic city lights reflecting on a lone rider with glowing tech armor.",
      features: [
        "Eco-friendly ink printing",
        "Durable for daily wear",
        "Slight stretch for comfort",
        "Resistant to fading",
      ],
      reviews: [
        { rating: 5, comment: "Looks amazing! Perfect for any fan.", author: "Alex T." },
        { rating: 5, comment: "Everyone asks where I got it!", author: "Sarah L." },
      ],
    },
  ];

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const goToHome = () => {
    setCurrentView("home");
    setSelectedDesign(null);
  };

  const viewDesign = (design) => {
    setSelectedDesign(design);
    setCurrentView("detail");
  };

  // نجمة تقييم
  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.18-1.81.588-1.81l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}</span>
    </div>
  );

  // جمع جميع التقييمات
  const allReviews = designs.flatMap(d => d.reviews);
  const totalReviews = allReviews.length;

  // التمرير التلقائي بين التقييمات
  useEffect(() => {
    if (totalReviews <= 1) return;
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev === totalReviews - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [totalReviews]);

  // الصفحة الرئيسية
  const HomeScreen = () => {
    const currentReview = allReviews[activeReviewIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1
              onClick={goToHome}
              className="text-2xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors"
            >
              TeeNira
            </h1>
            <p className="text-gray-600 text-sm">Wear Your Art</p>
          </div>
        </header>

        {/* Hero Banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="https://placehold.co/1200x400/3b82f6/ffffff?text=Man+Wearing+Tee"
            alt="Hero Banner"
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Essential Blanks</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We've Perfected the Oversized T-Shirt – Effortless Fit, Ultimate Comfort.
          </p>
        </section>

        {/* Designs Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs.map((design) => {
              const discountedPrice = calculateDiscountedPrice(design.originalPrice, design.discount);
              return (
                <div
                  key={design.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => viewDesign(design)}
                >
                  <img
                    src={design.images[0]}
                    alt={design.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {design.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <StarRating rating={design.rating} />
                      <span className="text-sm text-gray-500">{design.views} views</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${design.originalPrice}
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                        {design.discount}% OFF
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewDesign(design);
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="mt-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Let customers speak for us
          </h2>
          <div className="flex justify-center mb-4">
            <StarRating rating={4.8} />
            <span className="text-gray-600 ml-2">
              from {totalReviews} reviews
            </span>
          </div>

          <div className="relative max-w-md mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100 text-center transition-opacity duration-500">
              <div className="flex justify-center items-center mb-3">
                <StarRating rating={currentReview.rating} />
                <span className="font-semibold ml-2">{currentReview.author}</span>
              </div>
              <p className="text-gray-700 italic">"{currentReview.comment}"</p>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {allReviews.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === activeReviewIndex ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    );
  };

  // صفحة التفاصيل
  const DetailScreen = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0);

    const handlePrevImage = () => {
      setCurrentImageIndex(
        (prev) => (prev === 0 ? selectedDesign.images.length - 1 : prev - 1)
      );
    };

    const handleNextImage = () => {
      setCurrentImageIndex(
        (prev) => (prev === selectedDesign.images.length - 1 ? 0 : prev + 1)
      );
    };

    const handlePrevReview = () => {
      setReviewIndex(
        (prev) => (prev === 0 ? selectedDesign.reviews.length - 1 : prev - 1)
      );
    };

    const handleNextReview = () => {
      setReviewIndex(
        (prev) => (prev === selectedDesign.reviews.length - 1 ? 0 : prev + 1)
      );
    };

    const currentReview = selectedDesign.reviews[reviewIndex];
    const discountedPrice = calculateDiscountedPrice(
      selectedDesign.originalPrice,
      selectedDesign.discount
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={goToHome}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-indigo-600">TeeNira</h1>
          </div>
        </header>

        {/* Design Detail */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md">
                <img
                  src={selectedDesign.images[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="w-full max-h-[500px] object-cover rounded-xl shadow-lg"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:bg-gray-100 rounded-full p-2 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:bg-gray-100 rounded-full p-2 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex space-x-2 mt-4">
                {selectedDesign.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentImageIndex ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedDesign.name}
              </h2>
              <div className="flex items-center space-x-4 mb-6">
                <StarRating rating={selectedDesign.rating} />
                <span className="text-gray-600">{selectedDesign.views} views</span>
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${selectedDesign.originalPrice}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded">
                  {selectedDesign.discount}% OFF
                </span>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {selectedDesign.description}
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features:</h3>
              <ul className="space-y-2 mb-8">
                {selectedDesign.features.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={selectedDesign.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg text-center transition-colors shadow-md"
              >
                Buy Now
              </a>
            </div>
          </div>

          {/* Customer Reviews */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <div className="flex items-center mb-4">
              <StarRating rating={selectedDesign.rating} />
              <span className="text-gray-600 ml-2">
                from {selectedDesign.reviews.length} reviews
              </span>
            </div>
            <div className="relative">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
                <div className="flex items-center mb-4">
                  <StarRating rating={currentReview.rating} />
                  <span className="font-semibold ml-2">{currentReview.author}</span>
                </div>
                <p className="text-gray-700 italic mb-2">"{currentReview.comment}"</p>
              </div>
              <button
                onClick={handlePrevReview}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:bg-gray-100 rounded-full p-2 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextReview}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:bg-gray-100 rounded-full p-2 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  };

  // تذييل الصفحة
  const Footer = () => (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Customer Service */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CUSTOMER SERVICE</h2>
          <dl className="space-y-3 text-gray-300">
            <div>
              <dt className="text-lg font-medium">HOURS</dt>
              <dd className="text-base">Mon-Sat (11AM-6PM)</dd>
            </div>
            <div>
              <dt className="text-lg font-medium">EMAIL</dt>
              <dd className="text-base">help@teenira.com</dd>
            </div>
            <div>
              <dt className="text-lg font-medium">ADDRESS</dt>
              <dd className="text-base">Lahore, Pakistan</dd>
            </div>
          </dl>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-2xl font-bold mb-4">NEWSLETTER SIGN UP</h2>
          <p className="text-gray-300 mb-4 text-sm">
            Sign up for exclusive updates & new arrivals.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Thank you, ${email}!`);
              setEmail("");
            }}
            className="flex flex-col space-y-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="border border-gray-600 bg-black text-white px-4 py-2 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-200 mt-2"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Social & Payments */}
        <div>
          {/* Follow Us */}
          <h2 className="text-2xl font-bold mb-4">FOLLOW US</h2>
          <div className="flex space-x-4 mb-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02 3.88-.02 7.76-.01 11.64-.02 1.53 0 2.71 1.08 2.71 2.62 0 1.53-.01 3.06-.02 4.59-.01 1.23-.9 2.27-2.1 2.44-1.55.21-3.1.43-4.65.63-1.18.16-2.31.54-3.32 1.15-2.33 1.38-4.66 2.77-6.98 4.16-1.4.84-2.8 1.68-4.2 2.51-1.46.87-2.87 1.78-4.32 2.64-1.27.75-2.61.41-3.36-.85-.75-1.26-.41-2.61.85-3.36 1.33-.79 2.67-1.58 4.01-2.36 1.4-.81 2.8-1.63 4.2-2.45.81-.48 1.61-.96 2.42-1.44 1.09-.66 1.49-1.95.83-3.04-.25-.42-.5-.84-.76-1.25-.25-.42-.51-.84-.76-1.25-.44-.73-.88-1.46-1.32-2.19-.21-.35-.41-.7-.61-1.05-.1-.18-.14-.3-.08-.47.06-.17.18-.28.35-.33.16-.05.33-.04.5.01.17.05.3.15.4.3.15.22.3.45.44.67.14.23.28.46.42.69.14.24.28.48.42.72.29.5.57 1 .86 1.49.14.24.28.48.42.72.14.25.27.5.41.75.07.13.14.26.21.39.07.13.14.26.2.39.06.13.13.26.19.39.06.13.12.26.18.39.06.13.12.26.17.39.05.13.1.26.15.39.05.13.1.26.14.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04.13.08.26.12.39.04......"/>
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors"
              aria-label="Pinterest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.401-5.957 1.401-5.957s-.357-.714-.357-1.77c0-1.662.962-2.899 2.16-2.899 1.034 0 1.588.782 1.588 1.707 0 1.034-.659 2.574-.998 4.002-.281 1.193.593 2.16 1.775 2.16 2.127 0 3.768-2.246 3.768-5.485 0-2.861-2.063-4.877-5.008-4.877-3.48 0-5.595 2.662-5.595 5.222 0 1.068.417 2.183 1.061 2.748.093.084.114.144.077.24-.09.24-.566 1.259-.64 1.446-.02.05-.084.07-.128.027-1.1-1.026-1.775-2.41-1.775-4.146 0-3.188 2.472-6.097 6.911-6.097 3.758 0 6.669 2.656 6.669 6.05 0 3.82-2.293 6.377-5.115 6.377-1.018 0-1.963-.524-2.291-1.184l-.629 2.376c-.232.87-.861 1.997-1.264 2.684.92.283 1.897.436 2.897.436 6.627 0 11.962-5.336 11.962-11.963C24 5.373 18.627 0 12 0z"/>
              </svg>
            </a>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-500">Payments</h2>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              {/* Litecoin */}
              <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/Hjs6NsQ/buy-ltc.png" alt="buy-ltc" className="h-10 hover:scale-105 transition-transform" />
              </a>

              {/* Bitcoin */}
              <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/HptcKHmr/buy-btc.png" alt="buy-btc" className="h-10 hover:scale-105 transition-transform" />
              </a>

              {/* Credit Card */}
              <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/GvhCDLf4/cc1.png" alt="cc1" className="h-10 hover:scale-105 transition-transform" />
              </a>

              {/* Perfect Money */}
              <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/xtW552xY/buy-perfectmoney.png" alt="buy-perfectmoney" className="h-10 hover:scale-105 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} TeeNira. All rights reserved.
      </div>
    </footer>
  );

  return currentView === "home" ? <HomeScreen /> : <DetailScreen />;
                    }
