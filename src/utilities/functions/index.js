import {useState, useEffect} from "react";

import { useLocation } from 'react-router-dom';

import axios from "axios";

import { useQuery } from "react-query";
import { useGetConfig } from "../../contexts/config/ConfigContext";
import { useGetAuthState } from "../../contexts/user/UserContext";

export const useGetApiOld = (mode, params, key, options) => {

  // get initial config from context:
  const { config } = useGetConfig();

  const url = `https://alaedeen.com/horn/${ mode }/?${ params }&lang_code=${ config.language }`;
  const queryKey = `${key}_${config.language}`;


  // async function for get API:
  const getApi = async () => {
    const { data } = await axios.get(url);
    return data;
  }

  return useQuery(['getApi', queryKey], getApi, {
    ...options
  });
}

// TODO: Change All Get Api by useGetApiOld() change to new API (useGetApiNew()), And remove old get API...
export const useGetApi = (path, params, key, options) => {

  // get initial config from context:
  const { config } = useGetConfig();

  const queryKey = `${key}_${config.language}`;


  // async function for get API:
  const getApi = async () => {
    const { data } = await axios.get(`https://alaedeen.com/horn/api/${ path }/`,
      {
        params: {
          ...params,
          "lang_code" : config.language
        }
      });
    return data;
  }

  return useQuery(['getApi', queryKey], getApi, {
    ...options
  });
}

export const useGetProductsLimitStat = () => {

  const { user_data } = useGetAuthState();

  const company_id = user_data?.auth?.company_id;

  const {isLoading, isFetching, data, refetch} = useGetApiOld('products-limit-stat-api', `company_id=${company_id}`, `products_limit_stat_${user_data?.auth?.company_id}`, { enabled:  !!company_id, refetchOnWindowFocus: false });

  return {isLoading, isFetching, data, refetch};
}

// function for sign in by email and password:
export const signInApi = async (values) => {

  const { data } = await axios.post(`https://alaedeen.com/horn/login-api/?lang_code=${values.language}`, { user_login: values.user_login, password: values.password });
  return data;

};

export const useResizeImage = (
  {
    image_path,
    image_folder,
    image_width,
    image_height,
    useQueryKey,
    options
  }
) => {

  // async function for get API:
  const url = `https://alaedeen.com/horn/image-resize-api/?image_path=${image_path}&image_folder=${image_folder}&image_width=${image_width}&image_height=${image_height}`;
  const getImageResized = async () => {
    const { data } = await axios.get(url);
    return data;
  }

  return useQuery(['imageResponsive', useQueryKey], getImageResized, {
    ...options,
    enabled: !!image_path
  });
}

export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
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

export const useQueryString = () => {
  return new URLSearchParams(useLocation().search);
}

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      const handler = (event) => setMatches(event.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );
  return matches;
}

export const useBreakpoint = () => {
  const breakpoints = {
    isXs: useMediaQuery("(max-width: 576px)"),
    isSm: useMediaQuery("(min-width: 576px)"),
    isMd: useMediaQuery("(min-width: 768px)"),
    isLg: useMediaQuery("(min-width: 992px)"),
    isXl: useMediaQuery("(min-width: 1200px)"),
    isXXl: useMediaQuery("(min-width: 1600px)"),
    active: "xs"
  };
  if (breakpoints.isXs) breakpoints.active = "xs";
  if (breakpoints.isSm) breakpoints.active = "sm";
  if (breakpoints.isMd) breakpoints.active = "md";
  if (breakpoints.isLg) breakpoints.active = "lg";
  if (breakpoints.isXl) breakpoints.active = "xl";
  if (breakpoints.isXXl) breakpoints.active = "xxl";
  return breakpoints;
}

