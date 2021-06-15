// Components:
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import Custom Hooks:
import { useWindowSize } from '../../functions';

// Layouts:
import DefaultHeader from "./default/DefaultHeader";

const Header = () => {

  // Get Width Window:
  const { width } = useWindowSize();

  // Get Location:
  let location = useLocation();

  // Set State For Path NAme:
  const [pathName, setPathName] = useState(location.pathname);

  // if Changed Location.pathname Change state:
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  // Check pathName For Set Default Header Or Not:
  if (pathName === '/factories' && width <= 991) {
    return (
      <>

      </>
    );
  }

  if (pathName === '/sign-in') {
    return (
      <>

      </>
    );
  }

  // if get default Top panel:
  return <DefaultHeader />
};

export { Header };