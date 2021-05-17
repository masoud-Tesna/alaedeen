import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from 'react-router-dom';

// import ANT Design Components Used:
import { Image } from "antd";
import axios from "axios";

// Function For Get Product by API From Server:
function useGetProductApi(params) {
  const [load, setLoad] = useState(true);
  const [products, setProducts] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [error, setError] = useState(null);

  const url = `https://hornb2b.com/products-api/?${params}`;
  async function getProduct() {
    return await axios.get(url);
  }

  useEffect(() => {
    let mounted  = true;
    setLoad(true);

    if (mounted) {
      getProduct()
        .then(res => {
        setProducts(res.data.products);
        setParameters(res.data.params);
      })
        .catch ((error) => {
          setError(error);
        })
        .finally(() => {
          setLoad(false);
        });
    }
    return () => mounted = false;
  }, [params]);

  return { load, products, parameters, error }
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

function useShowImage(image, alt, width, height) {
  useEffect(() => {
    const test = 'test';
  }, []);

  return (
    <>
      <img src={ image } alt={ alt }/>
    </>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export { useGetProductApi, useWindowSize, useShowImage, useQuery }