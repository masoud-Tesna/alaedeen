// import Footer:
import { DefaultFooter } from './default/DefaultFooter';
import { useParsPathName } from "../../functions/Helper";

const SiteFooter = (props) => {

  // Get Location:
  const pathName = useParsPathName();

  // Check pathName For Set Default Top Panel Or Not:
  if (pathName === 'sign-in' || pathName === 'all-categories' || pathName === 'categories' || pathName === 'product' || pathName === 'register' || pathName === 'recommended') {
    return <></> // remove Footer
  }

  // if get default Top panel:
  return <DefaultFooter />
};

export { SiteFooter };
