import { useResizeImage } from "../../functions";
import { Image, Skeleton } from 'antd';
import React from "react";

import styled from 'styled-components';

const SkeletonImage = styled.div`
  
  
  &.skeletonImage--custom,
   &.skeletonImage--custom .ant-skeleton.image--skeleton__error,
     &.skeletonImage--custom .ant-skeleton-image.image--skeleton__error {
      width: ${props => props.skeletonWidth}px;
    height: ${props => props.skeletonHeight}px;
    }
  
  &.skeletonImage-default {
    width: 100%;
    height: 100%;
    
    .ant-skeleton.image--skeleton__error,
    .ant-skeleton-image.image--skeleton__error {
      width: 100%;
      height: 100%;
    }
  }
`;

const ShowResponsiveImage = (
  {
    imagePath,
    imageFolder,
    width,
    height,
    skeletonWidth,
    skeletonHeight,
    imageAlt,
    object_id,
    object_type,
    className,
    preview
  }
) => {

  const { isLoading, data } = useResizeImage({
    image_path: imagePath,
    image_folder: imageFolder,
    image_width: width,
    image_height: height,
    useQueryKey: `${ object_type }_${ object_id }_${ width }_${ height }`
  });

  const { image } = data || "";
  return (
    <>
      { (isLoading || !image || imagePath) ?
        <SkeletonImage className={(skeletonWidth || skeletonHeight) ? 'skeletonImage--custom' : 'skeletonImage-default'} skeletonWidth={skeletonWidth} skeletonHeight={skeletonHeight}><Skeleton.Image className="image--skeleton__error"/></SkeletonImage> :
        image &&
        <Image
          className={ className }
          src={ image }
          alt={ imageAlt }
          preview={ !!preview }
        />

      }
    </>
  );
}

export default ShowResponsiveImage;