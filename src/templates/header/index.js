// import Custom Hooks:
import { useWindowSize } from '../../functions';
import { useParsPathName } from "../../functions/Helper";

// Templates:
import Header from "./default/Header";

const SiteHeader = () => {

  // Get Width Window:
  const { width } = useWindowSize();

  // Get Location:
  const pathName = useParsPathName();
  
  let headerProps = {};
  
  if (pathName === 'product') {
    headerProps = {
      isHeader: false
    }
  }

  // Check pathName For Set Default Header Or Not:
  if (
      (
        (
          pathName === 'factories'
          || pathName === 'categories'
          || pathName === 'recommended'
        )
        && width < 992
      )
    || pathName === 'sign-in'
    || pathName === 'register'
    || pathName === 'all-categories'
    || pathName === 'dashboard'
  ) {
    return <></> // remove Footer
  }

  // if app get default Top panel:
  return <Header { ...headerProps }s/>
};

export { SiteHeader };
