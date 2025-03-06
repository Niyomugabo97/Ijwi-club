import React, { useEffect, useState } from "react";

const Admin = ({ images, setImages }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [distribution, setDistribution] = useState(""); // State for distribution (text input)

  // Initialize images on component mount
  useEffect(() => {
    const initialImages = [
      { id: 1, src: "/images/ijwi-club.jpg", distribution: "Events" },
      { id: 2, src: "/images/toastmasters-club.jpg",  distribution: "Member" },
      { id: 3, src: "/images/toastmasters.jpg", distribution: "Log" },
    
    ];
    setImages(initialImages); // Set initial images
  }, [setImages]);

  // Handle image file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (imageFile && distribution.trim() !== "") {
      const newImage = {
        id: Date.now(), // Generate a unique ID
        name: imageName,
        src: URL.createObjectURL(imageFile), // Temporary URL for preview
        distribution: distribution, // Include distribution from text input
      };

      // Add the new image to the images array
      setImages((prevImages) => [...prevImages, newImage]);

      // Clear the form inputs
      setImageFile(null);
      setImageName("");
      setDistribution(""); // Reset distribution input
    } else {
      alert("Please upload an image and enter a distribution.");
    }
  };

  // Handle image deletion
  const handleDeleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  // Handle "Add Again" button click
  const handleAddAgain = (image) => {
     // Pre-fill the image name
    setDistribution(image.distribution); // Pre-fill the distribution
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard - Image List</h1>
      <form onSubmit={handleFormSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Upload Image:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
      
        <div>
          <label>Distribution:</label>
          <input
            type="text"
            value={distribution}
            onChange={(e) => setDistribution(e.target.value)}
            placeholder="Enter distribution (e.g., Events, Activities)"
            required
          />
        </div>
        <button type="submit">Add Image</button>
      </form>

      <h2>Image List</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <div key={image.id} style={{ margin: "10px", textAlign: "center" }}>
            <img
              src={image.src}
              alt={image.name}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          
            <p>Distribution: {image.distribution}</p> {/* Display distribution */}
            <button
              onClick={() => handleDeleteImage(image.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              Delete
            </button>
            <button
              onClick={() => handleAddAgain(image)} // Add Again button
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              Add Again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;