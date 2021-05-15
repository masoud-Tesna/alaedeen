// Components:
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import Custom Hooks:
import { useWindowSize } from '../../functions';

// Layouts:
import DefaultTopPanel from "./defautl/DefaultTopPanel";
import TopPanelWhitBackIcon from "./defautl/TopPanelWhitBackIcon";

const TopPanel = () => {
  // Get Location:
  let location = useLocation();

  // Get Width Window:
  const { width } = useWindowSize();

  // Set State For Path NAme:
  const [pathName, setPathName] = useState(location.pathname);

  // if Changed Location.pathname Change state:
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  // Check pathName For Set Default Top Panel Or Not:
  if (pathName === '/factories' && width <= 991) {
    return <TopPanelWhitBackIcon />
  }

  // if get default Header:
  return <DefaultTopPanel />
};

export default TopPanel;