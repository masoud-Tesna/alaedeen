import React, { useEffect } from "react";
import { Image } from "antd";

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

export { useShowImage }