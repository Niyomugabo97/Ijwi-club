import React, { useState, useEffect } from "react";

const Home = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the image every 3 seconds
  useEffect(() => {
    if (images.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="home">
      <h1>Welcome to Toastmasters Club, where leaders are made.</h1>
      <h2>All activities done in a week:</h2>
      <div className="gallery-container">
        <div
          className="image-gallery"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 1s ease",
            display: "flex",
          }}
        >
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="image-preview">
                <img
                  src={image.src}
                  alt={image.name}
                  className="large-image responsive-image"
                  width="300"
                />
                <p>{image.name}</p>
                <p>Distribution: {image.distribution}</p> {/* Display distribution */}
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;