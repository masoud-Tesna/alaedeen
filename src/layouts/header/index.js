// import Custom Hooks:
import { useWindowSize } from '../../functions';
import { useParsPathName } from "../../functions/Helper";

// Layouts:
import DefaultHeader from "./default/DefaultHeader";

const Header = () => {

  // Get Width Window:
  const { width } = useWindowSize();

  // Get Location:
  const pathName = useParsPathName();

  // Check pathName For Set Default Header Or Not:
  if ((pathName === 'factories' && width <= 991) || pathName === 'sign-in' || pathName === 'all-categories') {
    return <></> // remove Footer
  }

  // if get default Top panel:
  return <DefaultHeader />
};

export { Header };
