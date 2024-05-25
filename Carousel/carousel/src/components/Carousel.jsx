/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";

const Carousel = ({
  images = [],
  isLoading = false,
  // eslint-disable-next-line react/prop-types
  imageLimit = images.length,
  imgPerSlide = 2,
  customPrevButton,
  customNextButton,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef(null);
  const [imgWidth , setImgWidth] = useState(0)

  // --------------------  Preloading Images ---------------
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = images.map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = image.url;
          });
        });
        await Promise.all(promises);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    if (images.length > 0) {
      preloadImages();
    }
  }, [images]);
  
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  function goToPrev() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit - 1 : prevIndex - 1
    );
  }
  function goToNext() {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageLimit - 1 ? 0 : prevIndex + 1
    );
  }
  return isLoading || !isLoaded ? (
    <div>Loading ...</div>
  ) : (
    <div className="carousel" style={{width: imgPerSlide * imgWidth}}>
      <div className="image-container"
      style={{transform:`translateX(-${currentIndex*imgWidth}px)`}}
      >
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image) => {
            return (
              <img
              onLoad={()=> setImgWidth(imgRef?.current?.offsetWidth)}
              ref={imgRef}
                key={image.id}
                src={image.url}
                alt={image.title}
                className="image"
              />
            );
          })}
      </div>
      <button className="btn prev" onClick={goToPrev}>
        Prev
      </button>
      <button className="btn next" onClick={goToNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
