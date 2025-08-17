import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

// بيانات التصاميم
const designs = [
  {
    id: 1,
    title: "Anime Character 1",
    description: "High-quality anime t-shirt design.",
    originalPrice: 6.0,
    discount: 50,
    imageUrl: "https://i.ibb.co/3mpPGf8/photo-2025-08-16-05-20-40.jpg",
    reviews: [
      { rating: 5, comment: "Amazing design!", author: "User123" },
      { rating: 4, comment: "Good quality!", author: "AnimeFan" },
    ],
  },
  {
    id: 2,
    title: "Anime Character 2",
    description: "Unique anime character design.",
    originalPrice: 6.0,
    discount: 30,
    imageUrl: "https://i.ibb.co/hCsPnpY/photo-2025-08-16-05-20-43.jpg",
    reviews: [
      { rating: 5, comment: "Loved it!", author: "MangaLover" },
    ],
  },
];

// حساب السعر بعد الخصم
const calculateDiscountedPrice = (originalPrice, discount) => {
  return (originalPrice - (originalPrice * discount) / 100).toFixed(2);
};

// شاشة التفاصيل
const DetailScreen = ({ design, goBack }) => {
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    if (design.reviews && design.reviews.length > 0) {
      const interval = setInterval(() => {
        setReviewIndex((prevIndex) => (prevIndex + 1) % design.reviews.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [design.reviews]);

  const currentReview =
    design.reviews?.[reviewIndex] ?? {
      rating: 0,
      comment: "No reviews yet",
      author: "Anonymous",
    };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white relative">
      <button
        onClick={goBack}
        className="absolute top-4 left-4 bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center mt-8">
        <img
          src={design.imageUrl}
          alt={design.title}
          className="w-64 h-64 object-cover rounded-2xl shadow-xl"
        />
        <h1 className="text-3xl font-bold mt-4">{design.title}</h1>
        <p className="text-gray-400 mt-2">{design.description}</p>

        <div className="mt-4 flex items-center gap-x-2">
          <span className="text-2xl font-bold text-green-400">
            ${calculateDiscountedPrice(design.originalPrice, design.discount)}
          </span>
          <span className="line-through text-gray-500">
            ${design.originalPrice.toFixed(2)}
          </span>
        </div>

        {/* المراجعات */}
        <div className="mt-6 bg-gray-800 p-4 rounded-xl w-80 text-center">
          <div className="flex justify-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <AiFillStar
                key={i}
                className={`${
                  i < currentReview.rating ? "text-yellow-400" : "text-gray-500"
                } text-xl`}
              />
            ))}
          </div>
          <p className="italic">"{currentReview.comment}"</p>
          <p className="text-sm text-gray-400 mt-1">- {currentReview.author}</p>
        </div>
      </div>
    </div>
  );
};

// شاشة الرئيسية
const HomeScreen = ({ viewDesign }) => (
  <div className="p-6 bg-gray-900 min-h-screen text-white">
    <h1 className="text-4xl font-bold mb-6 text-center">Anime T-Shirt Store</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {designs.map((design) => (
        <div
          key={design.id}
          className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          onClick={() => viewDesign(design)}
        >
          <img
            src={design.imageUrl}
            alt={design.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="text-xl font-bold mt-3">{design.title}</h2>
          <p className="text-gray-400">{design.description}</p>
          <div className="mt-3 flex items-center gap-x-2">
            <span className="text-lg font-bold text-green-400">
              ${calculateDiscountedPrice(design.originalPrice, design.discount)}
            </span>
            <span className="line-through text-gray-500 text-sm">
              ${design.originalPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              viewDesign(design);
            }}
            className="mt-3 w-full bg-green-600 hover:bg-green-500 px-3 py-2 rounded-lg"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  </div>
);

// الفوتر
const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 mt-6">
    <div className="container mx-auto flex justify-center space-x-6">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400"
      >
        <FaFacebookF size={24} />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-pink-400"
      >
        <FaInstagram size={24} />
      </a>
      <a
        href="https://www.tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-400"
      >
        <FaTiktok size={24} />
      </a>
    </div>
    <p className="text-center text-gray-500 mt-2">
      © 2025 Anime T-Shirt Store. All rights reserved.
    </p>
  </footer>
);

// التطبيق الرئيسي
const App = () => {
  const [selectedDesign, setSelectedDesign] = useState(null);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="flex-grow">
        {selectedDesign ? (
          <DetailScreen design={selectedDesign} goBack={() => setSelectedDesign(null)} />
        ) : (
          <HomeScreen viewDesign={setSelectedDesign} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
