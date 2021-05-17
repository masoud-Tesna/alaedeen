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

    if (mounted) {
      getProduct()
        .then(res => {
        setProducts(res.data.products);
        setParameters(res.data.params);
      })
        .then(() => {
          setLoad(false);
        })
        .catch ((error) => {
          setError(error);
          setLoad(false);
        })
    }
    return () => mounted = false;
  }, [params]);

  return { load, products, parameters, error }
}

function useGetTopRankingProducts(cat1, cat2, cat3) {
  const [load, setLoad] = useState(true);
  const [productsCat1, setProductsCat1] = useState([]);
  const [productsCat2, setProductsCat2] = useState([]);
  const [productsCat3, setProductsCat3] = useState([]);
  const [parametersCat1, setParametersCat1] = useState([]);
  const [parametersCat2, setParametersCat2] = useState([]);
  const [parametersCat3, setParametersCat3] = useState([]);
  const [error, setError] = useState(null);

  async function getProduct() {
    return await axios.all([
      axios.get(`https://hornb2b.com/products-api/?${cat1}`),
      axios.get(`https://hornb2b.com/products-api/?${cat2}`),
      axios.get(`https://hornb2b.com/products-api/?${cat3}`)
    ]);
  }

  useEffect(() => {
    let mounted  = true;

    if (mounted) {
      getProduct()
        .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
          setProductsCat1(firstResponse.data.products);
          setProductsCat2(secondResponse.data.products);
          setProductsCat3(thirdResponse.data.products);

          setParametersCat1(thirdResponse.data.params);
          setParametersCat2(thirdResponse.data.params);
          setParametersCat3(thirdResponse.data.params);
        }))
        .then(() => {
          setLoad(false);
        })
        .catch ((error) => {
          setError(error);
          setLoad(false);
        })
    }
    return () => mounted = false;
  }, [cat1, cat2, cat3]);

  return { load, productsCat1, productsCat2, productsCat3, parametersCat1, parametersCat2, parametersCat3, error }
}

function useGetApi(url, item, loading = true) {
  const [load, setLoad] = useState(loading);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);


  async function getApi() {
    return await axios.get(url);
  }

  useEffect(() => {
    let mounted  = true;

    if (mounted) {
      getApi()
        .then(res => {
          setItems(res.data[item]);
        })
        .then(() => {
          setLoad(false);
        })
        .catch ((error) => {
          setError(error);
          setLoad(false);
        })
    }
    return () => mounted = false;
  }, [url, loading]);

  return { load, items, error }
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

export { useGetProductApi, useGetTopRankingProducts, useGetApi, useWindowSize, useShowImage, useQuery }