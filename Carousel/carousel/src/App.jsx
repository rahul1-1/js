import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import './App.css'
function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  //
  const fetchImages = async (imageLimit) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imageLimit}`
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    fetchImages(8);
  },[])

  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isLoading={loading}
        imgPerSlide = {3}
        imageLimit = {8}
        // customPrevButton = {}
        // customNextButton = {}
      />
    </div>
  );
}

export default App;
