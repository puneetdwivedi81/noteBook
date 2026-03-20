import React from "react";

function Reviews() {

  // ✅ Realistic reviews for your Notebook project
  const reviewsData = [
    {
      name: "Aman Verma",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      message:
        "The Create My Notebook app is very useful. I like how login is required before creating notes, which keeps my data secure and organized.",
    },
    {
      name: "Sneha Sharma",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      message:
        "Public and private notes feature is amazing! I can share useful notes publicly while keeping personal notes private.",
    },
    {
      name: "Rahul Singh",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      message:
        "Clean UI and smooth experience. The contact us section works perfectly and the authentication system feels professional.",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Users Say About Create My Notebook
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {reviewsData.map((review, index) => (
            <blockquote
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow"
            >
              <p className="text-gray-600 mb-4">{review.message}</p>

              {/* ⭐ Stars */}
              <div className="flex text-yellow-400 mb-4">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.897l-7.335 3.869 1.401-8.168L.132 9.211l8.2-1.193z" />
                    </svg>
                  ))}
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-semibold">{review.name}</span>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;