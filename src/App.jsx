import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [email, setEmail] = useState("");
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, selectedDesign]);

  // بيانات التصاميم (6 منتجات)
  const designs = [
    {
      id: 1,
      name: "Hangin' With My Boos Shirt, Cute Pumpkin Bat...",
      images: [
        "https://placehold.co/400x600/ff7f00/ffffff?text=Halloween+Shirt",
      ],
      buyLink: "https://paypal.me/yourname/halloween",
      originalPrice: 18.99,
      discount: 50,
      rating: 4.8,
      reviewsCount: 55700,
      description: "Cute Halloween shirt with ghosts and pumpkins.",
      features: ["High-resolution PNG", "Instant download", "Commercial use"],
      compatibility: ["Ai", "Ps", "Id"],
      tags: ["Halloween", "Pumpkin", "Ghosts"],
      isBestseller: true,
      seller: "Etsy seller",
      shipping: "Free shipping",
      reviews: [
        { rating: 5, comment: "Perfect for Halloween!", author: "Linda M." },
      ],
    },
    {
      id: 2,
      name: "Basketball Png, Basketball Mom Png",
      images: [
        "https://placehold.co/400x600/ffffff/000000?text=Basketball+Mom",
      ],
      buyLink: "https://paypal.me/yourname/basketball",
      originalPrice: 4.51,
      discount: 50,
      rating: 5.0,
      reviewsCount: 510,
      description: "Basketball Mom PNG and SVG files perfect for shirts, mugs, and more.",
      features: ["High-resolution PNG", "SVG file", "Instant download"],
      compatibility: ["Ai", "Ps", "Id"],
      tags: ["Basketball", "Sports", "Mom"],
      isBestseller: true,
      seller: "Etsy seller",
      shipping: "Free shipping",
      reviews: [
        { rating: 5, comment: "Perfect for my basketball team shirts!", author: "Sarah J." },
      ],
    },
    {
      id: 3,
      name: "300+ Premium T-shirt Designs Bundle",
      images: [
        "https://placehold.co/400x600/000000/ffffff?text=300+T-Shirts",
      ],
      buyLink: "https://paypal.me/yourname/bundle",
      originalPrice: 4.54,
      discount: 60,
      rating: 4.5,
      reviewsCount: 13,
      description: "Bundle of 300+ premium t-shirt designs in SVG and PNG formats.",
      features: ["300+ designs", "SVG & PNG", "Commercial use"],
      compatibility: ["Ai", "Ps", "Id"],
      tags: ["Bundle", "SVG", "PNG"],
      isBestseller: true,
      seller: "GraphicSouk",
      shipping: "Free shipping",
      reviews: [
        { rating: 5, comment: "Great value for the price!", author: "Mike R." },
      ],
    },
    {
      id: 4,
      name: "Custom T-Shirt Design Service",
      images: [
        "https://placehold.co/400x600/000000/ffffff?text=Custom+Designer",
      ],
      buyLink: "https://printly.com/",
      originalPrice: 24.97,
      discount: 60,
      rating: 4.8,
      reviewsCount: 126,
      description: "Professional custom t-shirt design service for your business or event.",
      features: ["Custom design", "Unlimited revisions", "Fast turnaround"],
      compatibility: ["Ai", "Ps", "Id", "Service"],
      tags: ["Custom", "Design", "Service"],
      isBestseller: true,
      seller: "CraftsinDigital",
      shipping: "Free shipping",
      reviews: [
        { rating: 5, comment: "Amazing design service! Will order again.", author: "Jessica L." },
      ],
    },
    {
      id: 5,
      name: "Daffy Duck Streetwear Design",
      images: [
        "https://placehold.co/400x600/000000/ffffff?text=Daffy+Duck",
      ],
      buyLink: "https://paypal.me/yourname/daffy",
      originalPrice: 9.99,
      discount: 40,
      rating: 4.7,
      reviewsCount: 89,
      description: "Daffy Duck streetwear design with vibrant colors and urban style.",
      features: ["High-quality print", "Streetwear style", "Commercial use"],
      compatibility: ["Ai", "Ps", "Id"],
      tags: ["Daffy", "Cartoon", "Streetwear"],
      isBestseller: true,
      seller: "GraphicSouk",
      shipping: "Free shipping",
      reviews: [
        { rating: 5, comment: "My son loves this design!", author: "Emily R." },
      ],
    },
    {
      id: 6,
      name: "Heroes Digital Pack",
      images: [
        "https://placehold.co/400x600/ffffff/000000?text=Heroes+Pack",
      ],
      buyLink: "https://paypal.me/yourname/heroes",
      originalPrice: 6.99,
      discount: 40,
      rating: 4.7,
      reviewsCount: 152,
      description: "Heroes-themed digital files for various applications.",
      features: ["Multiple hero designs", "SVG and PNG", "Commercial use"],
      compatibility: ["Ai", "Ps", "Id"],
      tags: ["Heroes", "Digital", "Comics"],
      isBestseller: true,
      seller: "CraftsinDigital",
      shipping: "Free shipping",
      reviews: [
        { rating: 5, comment: "Great for my comic-themed products!", author: "Alex T." },
      ],
    }
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

  // نجمة التقييم
  const StarRating = ({ rating, showNumber = false }) => (
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
      {showNumber && <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>}
    </div>
  );

  // أيقونات التوافق
  const CompatibilityIcons = ({ compatibility }) => (
    <div className="flex items-center space-x-2 mt-1">
      {compatibility.includes("Ai") && (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-1 py-0.5 rounded">Ai</span>
      )}
      {compatibility.includes("Ps") && (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-1 py-0.5 rounded">Ps</span>
      )}
      {compatibility.includes("Id") && (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-1 py-0.5 rounded">Id</span>
      )}
      {compatibility.includes("Service") && (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1 py-0.5 rounded">Service</span>
      )}
    </div>
  );

  // الصفحة الرئيسية
  const HomeScreen = () => {
    const currentReview = allReviews[activeReviewIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
            <h1
              onClick={goToHome}
              className="text-3xl md:text-4xl font-extrabold text-indigo-700 cursor-pointer hover:text-indigo-900 transition-colors tracking-wide"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              TeeNira
            </h1>
          </div>
        </header>

        {/* Hero Banner */}
        <section className="relative py-8 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
          <div
            className="relative w-full h-64 md:h-80 bg-cover bg-center rounded-none shadow-lg"
            style={{ backgroundImage: "url('/images/herobanner.jpg')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-none"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
              <div className="mb-6 px-4 py-1 bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-full text-sm font-medium backdrop-blur-sm">
                Premium T-Shirt Designs
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-center">
                Express Your
                <br />
                <span className="block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Unique Style
                </span>
              </h2>
              <p className="text-base md:text-lg mb-6 max-w-xl text-center">
                Discover our collection of premium quality t-shirts featuring stunning designs that help you stand out from the crowd.
              </p>
            </div>
          </div>
          <div className="mt-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Essential Blanks
            </h2>
            <p className="text-lg text-gray-600">
              We've Perfected the Oversized T-Shirt – Effortless Fit, Ultimate Comfort.
            </p>
          </div>
        </section>

        {/* Designs Grid - 2 per row on mobile */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bestsellers</h2>
          <div className="grid grid-cols-2 gap-4">
            {designs.map((design) => {
              const discountedPrice = calculateDiscountedPrice(design.originalPrice, design.discount);
              return (
                <div
                  key={design.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100"
                  onClick={() => viewDesign(design)}
                >
                  {/* الصورة */}
                  <div className="relative">
                    <img
                      src={design.images[0]}
                      alt={design.name}
                      className="w-full h-48 object-cover"
                    />
                    {design.isBestseller && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Bestseller
                      </div>
                    )}
                  </div>

                  {/* التفاصيل */}
                  <div className="p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Digital download
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                      {design.name}
                    </h3>
                    
                    <div className="flex items-center mb-2">
                      <StarRating rating={design.rating} showNumber={true} />
                      <span className="text-xs text-gray-500 ml-1">({design.reviewsCount})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-lg font-bold text-green-600">
                          ${discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${design.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-1 py-0.5 rounded">
                        {design.discount}% OFF
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-1">
                      Ad by {design.seller} {design.seller === "Etsy seller" && "🌟"}
                    </div>
                    
                    {design.shipping && (
                      <div className="text-xs text-green-600 mb-2">
                        {design.shipping}
                      </div>
                    )}
                    
                    <CompatibilityIcons compatibility={design.compatibility} />
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewDesign(design);
                      }}
                      className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
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
    const [selectedImage, setSelectedImage] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0);
    const swiperRef = useRef(null);

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center relative">
            <button
              onClick={goToHome}
              className="absolute left-0 text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Back</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
              TeeNira
            </h1>
          </div>
        </header>

        {/* Design Detail */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <div className="flex flex-col items-center">
              {/* Swiper الصور الرئيسية */}
              <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="h-96 w-full max-w-md rounded-xl shadow-lg overflow-hidden mb-4"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setSelectedImage(swiper.activeIndex);
                }}
                initialSlide={selectedImage}
              >
                {selectedDesign.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.trim()}
                      alt={`${selectedDesign.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* مؤشرات الصور المصغّرة (Thumbnails) */}
              <div className="flex gap-2 justify-center flex-wrap max-w-md">
                {selectedDesign.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(index);
                      if (swiperRef.current) {
                        swiperRef.current.slideTo(index);
                      }
                    }}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImage
                        ? 'border-indigo-600 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.trim()}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center mb-2">
                {selectedDesign.isBestseller && (
                  <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                    Bestseller
                  </span>
                )}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedDesign.name}
              </h2>
              
              <div className="flex items-center space-x-4 mb-6">
                <StarRating rating={selectedDesign.rating} />
                <span className="text-gray-600">{selectedDesign.reviewsCount} reviews</span>
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${selectedDesign.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded">
                  {selectedDesign.discount}% OFF
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">Digital download</span>
                <CompatibilityIcons compatibility={selectedDesign.compatibility} />
              </div>
              
              {selectedDesign.seller && (
                <div className="text-sm text-gray-500 mb-4">
                  Ad by {selectedDesign.seller} {selectedDesign.seller === "Etsy seller" && "🌟"}
                </div>
              )}
              
              {selectedDesign.shipping && (
                <div className="text-sm text-green-600 mb-4">
                  {selectedDesign.shipping}
                </div>
              )}
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {selectedDesign.description}
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features:</h3>
              <ul className="space-y-2 mb-8">
                {selectedDesign.features.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={selectedDesign.buyLink?.trim()}
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleNextReview}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:bg-gray-100 rounded-full p-2 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
          <h2 className="text-2xl font-bold mb-4">FOLLOW US</h2>
          <div className="flex space-x-4 mb-6">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6" fill="currentColor">
                <path d="M41,17.5c-2.5,0-4.8-0.8-6.7-2.2c-1.9-1.4-3.2-3.4-3.7-5.7V9h-6v21.6c0,3-2.4,5.4-5.4,5.4s-5.4-2.4-5.4-5.4s2.4-5.4,5.4-5.4c0.4,0,0.8,0,1.2,0.1V19c-0.4,0-0.8-0.1-1.2-0.1c-6,0-11,4.9-11,11s4.9,11,11,11s11-4.9,11-11V22c2.5,1.8,5.6,2.9,9,2.9V17.5z"/>
              </svg>
            </a>
            <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.401-5.957 1.401-5.957s-.357-.714-.357-1.77c0-1.662.962-2.899 2.16-2.899 1.034 0 1.588.782 1.588 1.707 0 1.034-.659 2.574-.998 4.002-.281 1.193.593 2.16 1.775 2.16 2.127 0 3.768-2.246 3.768-5.485 0-2.861-2.063-4.877-5.008-4.877-3.48 0-5.595 2.662-5.595 5.222 0 1.068.417 2.183 1.061 2.748.093.084.114.144.077.24-.09.24-.566 1.259-.64 1.446-.02.05-.084.07-.128.027-1.1-1.026-1.775-2.41-1.775-4.146 0-3.188 2.472-6.097 6.911-6.097 3.758 0 6.669 2.656 6.669 6.05 0 3.82-2.293 6.377-5.115 6.377-1.018 0-1.963-.524-2.291-1.184l-.629 2.376c-.232.87-.861 1.997-1.264 2.684.92.283 1.897.436 2.897.436 6.627 0 11.962-5.336 11.962-11.963C24 5.373 18.627 0 12 0z"/>
              </svg>
            </a>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-500">PAYMENTS</h2>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/Hjs6NsQ/buy-ltc.png" alt="buy-ltc" className="h-10 hover:scale-105 transition-transform" />
              </a>
              <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/HptcKHmr/buy-btc.png" alt="buy-btc" className="h-10 hover:scale-105 transition-transform" />
              </a>
              <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/GvhCDLf4/cc1.png" alt="cc1" className="h-10 hover:scale-105 transition-transform" />
              </a>
              <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/xtW552xY/buy-perfectmoney.png" alt="buy-perfectmoney" className="h-10 hover:scale-105 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} TeeNira. All rights reserved.
      </div>
    </footer>
  );

  return currentView === "home" ? <HomeScreen /> : <DetailScreen />;
                  }
