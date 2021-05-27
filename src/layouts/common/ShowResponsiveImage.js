import { useResizeImage } from "../../functions";

const ShowResponsiveImage = ({ imagePath, width, height, imageAlt }) => {
  const { image } = useResizeImage( imagePath, 'profiles', width, height );
  console.log(imageAlt)
  return (
    <img src={ image } alt={ imageAlt } />
  );
}

export default ShowResponsiveImage;