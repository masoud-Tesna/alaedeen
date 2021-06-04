import { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import axios from "axios";

import { useGetLanguageState } from "../contexts/language/LanguageContext";

// Function For Get Product by API From Server:
export function useGetProductApi (params) {
  const [load, setLoad] = useState(true);
  const [products, setProducts] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [error, setError] = useState(null);

  const { language } = useGetLanguageState();

  useEffect(() => {
    // async function for get API:
    const url = `https://hornb2b.com/horn/products-api/?${params}&lang_code=${language}`;
    async function getProduct() {
      return await axios.get(url);
    }

    let mounted  = true;
    setLoad(true);
    if (language === 'null') {
      mounted  = false;
      return () => mounted = false;
    }

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
  }, [params, language]);

  return { products, parameters, load, error }
}

export function useGetTopRankingProducts (cat1, cat2, cat3) {
  const [load, setLoad] = useState(true);
  const [productsCat1, setProductsCat1] = useState([]);
  const [productsCat2, setProductsCat2] = useState([]);
  const [productsCat3, setProductsCat3] = useState([]);
  const [parametersCat1, setParametersCat1] = useState([]);
  const [parametersCat2, setParametersCat2] = useState([]);
  const [parametersCat3, setParametersCat3] = useState([]);
  const [error, setError] = useState(null);

  const { language } = useGetLanguageState();

  useEffect(() => {
    // async function for get API:
    async function getProduct() {
      return await axios.all([
        axios.get(`https://hornb2b.com/horn/products-api/?${cat1}&lang_code=${language}`),
        axios.get(`https://hornb2b.com/horn/products-api/?${cat2}&lang_code=${language}`),
        axios.get(`https://hornb2b.com/horn/products-api/?${cat3}&lang_code=${language}`)
      ]);
    }

    let mounted  = true;
    setLoad(true);

    if (language === 'null') {
      mounted  = false;
      return () => mounted = false;
    }

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
  }, [cat1, cat2, cat3, language]);

  return { productsCat1, productsCat2, productsCat3, parametersCat1, parametersCat2, parametersCat3, load, error }
}

export function useGetApi (mode, params, item, loading = true, setLanguage = true) {
  const [load, setLoad] = useState(loading);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const { language } = useGetLanguageState();

  useEffect(() => {
// async function for get API:
    let url;
    if (setLanguage) {
      url = `https://hornb2b.com/horn/${mode}/?${params}&lang_code=${language}`;
    }else {
      url = `https://hornb2b.com/horn/${mode}/?${params}`;
    }

    async function getApi() {
      return await axios.get(url);
    }

    let mounted  = true;
    setLoad(loading);

    if (language === 'null') {
      mounted  = false;
      return () => mounted = false;
    }

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
  }, [mode, params, item, loading, setLanguage, language]);

  return { items, load, error }
}

export function useGetPremiumFactories (params) {
  const [load, setLoad] = useState(true);
  const [factories, setFactories] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [error, setError] = useState(null);

  const { language } = useGetLanguageState();

  useEffect(() => {
    // async function for get API:
    const url = `https://hornb2b.com/horn/premium-factories-api/?${params}&lang_code=${language}`;
    async function getPremiumFactories() {
      return await axios.get(url);
    }

    let mounted  = true;
    setLoad(true);
    if (language === 'null') {
      mounted  = false;
      return () => mounted = false;
    }

    if (mounted) {
      getPremiumFactories()
        .then(res => {
          setFactories(res.data.factories);
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
  }, [params, language]);

  return { factories, parameters, load, error }
}

export function useGetFactories (params) {
  const [load, setLoad] = useState(true);
  const [factories, setFactories] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [error, setError] = useState(null);

  const { language } = useGetLanguageState();

  useEffect(() => {
    // async function for get API:
    const url = `https://hornb2b.com/horn/factories-api/?${params}&lang_code=${language}`;
    async function getFactories() {
      return await axios.get(url);
    }

    let mounted  = true;
    setLoad(true);
    if (language === 'null') {
      mounted  = false;
      return () => mounted = false;
    }

    if (mounted) {
      getFactories()
        .then(res => {
          setFactories(res.data.factories);
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
  }, [params, language]);

  return { factories, parameters, load, error }
}

export function useResizeImage (image_path, image_folder, image_width, image_height) {
  const [load, setLoad] = useState(true);
  const [image, setImage] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // async function for get API:
    const url = `https://hornb2b.com/horn/image-resize-api/?image_path=${image_path}&image_folder=${image_folder}&image_width=${image_width}&image_height=${image_height}`;
    async function getImageResized() {
      return await axios.get(url);
    }

    let mounted  = true;
    setLoad(true);

    if (mounted) {
      getImageResized()
        .then(res => {
          setImage(res.data.image);
        })
        .then(() => {
          setLoad(false);
        })
        .catch ((error) => {
          setError((prev => !prev));
          setLoad(false);
        })
    }

    return () => mounted = false;

  }, [image_path, image_folder, image_width, image_height, error]);

  return { image, load, error }
}

export function useWindowSize () {
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

export function useQuery () {
  return new URLSearchParams(useLocation().search);
}

export function useLocalStorage (key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
    }
  };

  return [storedValue, setValue];
}
