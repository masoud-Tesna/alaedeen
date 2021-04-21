// Components:
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Layouts:
import DefaultTopPanel from "./defautl/DefaultTopPanel";

const TopPanel = () => {
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
        Not Default Top Panel
      </>
    );
  }

  // if get default Top panel:
  return <DefaultTopPanel />
};

export default TopPanel;