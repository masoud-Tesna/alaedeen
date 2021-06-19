import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import Footer:
import { DefaultFooter } from './default/DefaultFooter';

const SiteFooter = () => {

  // Get Location:
  let location = useLocation();

  // Set State For Path NAme:
  const [pathName, setPathName] = useState(location.pathname);

  // if Changed Location.pathname Change state:
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  // Check pathName For Set Default Top Panel Or Not:
  if (pathName === '/sign-in') {
    return (
      <>

      </>
    );
  }

  // if get default Top panel:
  return <DefaultFooter />
};

export { SiteFooter };