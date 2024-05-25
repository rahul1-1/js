/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${10 * page}`
      );
      const data = await res.json();
      setProducts(data);
      // setTotalProducts(data.total);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //   Some of the use cases of Intersection Observer are:

  // Lazy loading images.
  // Detect if an element is in the viewport or not.
  // Auto-play a video if in the viewport, otherwise pause the video.
  // Infinite scrolling.

  // const observerTarget = useRef(null);
  //  const [totalProducts, setTotalProducts] = useState(0);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const [entry] = entries;
  //       if (entry.isIntersecting && !isLoading && products.length < totalProducts) {
  //         fetchProducts();
  //       }
  //     },
  //     {
  //       root: null, // Default is the viewport
  //       rootMargin: '0px',
  //       threshold: 1.0 // Trigger when the target is fully visible
  //     }
  //   );

  //   if (observerTarget.current) {
  //     observer.observe(observerTarget.current);
  //   }

  //   return () => {
  //     if (observerTarget.current) {
  //       observer.unobserve(observerTarget.current);
  //     }
  //   };
  // }, [isLoading, products, totalProducts]);

  const myThrottle = (cb, d) => {
    let last = 0;
    return (...args) => {
      let now = new Date().getTime();
      if (now - last < d) return;
      last = now;
      return cb(...args);
    };
  };
  const handleScroll = myThrottle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
        document.documentElement.offsetHeight &&
      !isLoading &&
      products.limit < products.total
    ) {
      fetchProducts();
    }
  }, 500);
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const { products: allProducts } = products;
  return (
    <div>
      <h1>Infinite Scrolling</h1>
      {allProducts?.length > 0 && (
        <div className="products">
          {allProducts?.map((prod) => (
            <span key={prod.id} className="products__single">
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))}
        </div>
      )}
      {isLoading && <h1>Loading ....</h1>}
    </div>
    // <div ref={observerTarget} className="observer-target"></div>
  );
};

export default App;
