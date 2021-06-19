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

  const [scrolled, setScrolled] = useState(false);
  const [scrolledClass, setScrolledClass] = useState();

  const [widthPage, setWidthPage] = useState();

  const handleScroll = () => {
    const offsetY = window.scrollY;

    if (widthPage <= 576) { // if WidthPage state value <= 576 change condition for scroll and set class name
      if(offsetY > 150 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }
    else if (widthPage >= 577) { // if WidthPage state value >= 577 change condition for scroll and set class name
      if(offsetY > 30 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }
    else if (widthPage >= 769) { // if WidthPage state value >= 769 change condition for scroll and set class name
      if(offsetY > 30 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); //if Scroll Page Run handleScroll function

    window.addEventListener('load', () => { setWidthPage(window.innerWidth);}); //if Load Page Update widthPage State Value
    window.addEventListener('resize', () => { setWidthPage(window.innerWidth);}); //if Resize Page Update widthPage State Value
    if(scrolled){
      setScrolledClass('scrolled');
    }else {
      setScrolledClass('')
    }
  }, [handleScroll]);

  // if Changed Location.pathname Change state:
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  // Check pathName For Set Default Top Panel Or Not:
  if ((pathName === '/factories' || pathName === '/sign-in') && width <= 991) {
    return <TopPanelWhitBackIcon scrolledClass={scrolledClass} />
  }

  // if get default Header:
  return <DefaultTopPanel />
};

export default TopPanel;