// import Footer:
import { DefaultFooter } from './default/DefaultFooter';
import { useParsPathName } from "../../functions/Helper";
import Footer from "./default/Footer";

const SiteFooter = () => {

  // Get Location:
  const pathName = useParsPathName();

  // Check pathName For Set Default Footer Or Not:
  if (
    pathName === 'sign-in'
    || pathName === 'all-categories'
    || pathName === 'categories'
    || pathName === 'product'
    || pathName === 'register'
    || pathName === 'recommended'
    || pathName === 'dashboard'
  ) {
    return <></> // remove Footer
  }

  // if get default Footer:
  return <><Footer /> <DefaultFooter /></>
};

export { SiteFooter };
