import { useResizeImage } from "../../functions";
import { Skeleton } from "antd";

const ShowResponsiveImage = ({ imagePath, width, height, imageAlt }) => {
  const { image, load } = useResizeImage( imagePath, 'profiles', width, height );
  console.log(imageAlt)
  return (
    <>
      { load ?
        <Skeleton.Image active={true} className="w-100 h-100 rounded-10" /> :
        <img src={ image } alt={ imageAlt } />
      }
    </>
  );
}

export default ShowResponsiveImage;