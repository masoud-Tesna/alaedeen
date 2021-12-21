import { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import axios from "axios";

import { useQuery } from "react-query";
import { useGetConfig } from "../contexts/config/ConfigContext";

export function useGetTopRankingProducts(cat1, cat2, cat3) {
  const [load, setLoad] = useState(true);
  const [productsCat1, setProductsCat1] = useState([]);
  const [productsCat2, setProductsCat2] = useState([]);
  const [productsCat3, setProductsCat3] = useState([]);
  const [parametersCat1, setParametersCat1] = useState([]);
  const [parametersCat2, setParametersCat2] = useState([]);
  const [parametersCat3, setParametersCat3] = useState([]);
  const [error, setError] = useState(null);

  // get initial config:
  const { config } = useGetConfig();

  useEffect(() => {
    let mounted  = true;
    setLoad(true);

    if (mounted && config.language) {

      // async function for get API:
      async function getProduct() {
        return await axios.all([
          axios.get(`https://alaedeen.com/horn/products-api/?${cat1}&lang_code=${config.language}`),
          axios.get(`https://alaedeen.com/horn/products-api/?${cat2}&lang_code=${config.language}`),
          axios.get(`https://alaedeen.com/horn/products-api/?${cat3}&lang_code=${config.language}`)
        ]);
      }

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
  }, [cat1, cat2, cat3, config.language]);

  return { productsCat1, productsCat2, productsCat3, parametersCat1, parametersCat2, parametersCat3, load, error }
}

export function useGetApi(mode, params, key, options) {

  // get initial config from context:
  const { config } = useGetConfig();

  const url = `https://alaedeen.com/horn/${ mode }/?${ params }&lang_code=${ config.language }`;
  const queryKey = `${key}_${config.language}`;


  // async function for get API:
  async function getApi() {
    const { data } = await axios.get(url);
    return data;
  }

  return useQuery(['getApi', queryKey], getApi, {
    ...options
  });
}

// function for sign in by email and password:
export const signInApi = async (values) => {

  const { data } = await axios.post(`https://alaedeen.com/horn/login-api/?lang_code=${values.language}`, { user_login: values.user_login, password: values.password });
  return data;

};

export function useResizeImage({ image_path, image_folder, image_width, image_height, useQueryKey }) {

  // async function for get API:
  const url = `https://alaedeen.com/horn/image-resize-api/?image_path=${image_path}&image_folder=${image_folder}&image_width=${image_width}&image_height=${image_height}`;
  async function getImageResized() {
    const { data } = await axios.get(url);
    return data;
  }

  return useQuery(['imageResponsive', useQueryKey], getImageResized, {
    enabled: !!image_path
  });
}

export function useWindowSize() {
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

export function useQueryString() {
  return new URLSearchParams(useLocation().search);
}
