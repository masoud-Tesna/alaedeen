// import Custom Hooks:
import { useWindowSize } from '../../functions';
import { useParsPathName } from "../../functions/Helper";

// Templates:
import DefaultHeader from "./default/DefaultHeader";

const Header = () => {

  // Get Width Window:
  const { width } = useWindowSize();

  // Get Location:
  const pathName = useParsPathName();

  // Check pathName For Set Default Header Or Not:
  if (((pathName === 'factories' || pathName === 'categories' || pathName === 'recommended') && width < 992) || pathName === 'sign-in' || pathName === 'register' || pathName === 'all-categories' || pathName === 'product') {
    return <></> // remove Footer
  }

  // if get default Top panel:
  return <DefaultHeader pathName={pathName} />
};

export { Header };
