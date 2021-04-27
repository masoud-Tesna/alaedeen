// Components:
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Layouts:
import DefaultHeader from "./default/DefaultHeader";

const Header = () => {

  // Get Location:
  let location = useLocation();

  // Set State For Path NAme:
  const [pathName, setPathName] = useState(location.pathname);

  // if Changed Location.pathname Change state:
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  // Check pathName For Set Default Top Panel Or Not:
  if (pathName === '/not-default') {
    return (
      <>
        Not Default Header
      </>
    );
  }

  // if get default Top panel:
  return <DefaultHeader />
};

export { Header };