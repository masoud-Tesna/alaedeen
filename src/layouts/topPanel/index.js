// Components:
import { useLayoutEffect, useState } from 'react';

// import Custom Hooks:
import { useWindowSize } from '../../functions';

// Layouts:
import DefaultTopPanel from "./defautl/DefaultTopPanel";
import TopPanelWhitBackIcon from "./defautl/TopPanelWhitBackIcon";
import { useParsPathName } from "../../functions/Helper";

const TopPanel = () => {

  // Get Width Window:
  const { width } = useWindowSize();

  // Get Location:
  const pathName = useParsPathName();

  const [scrolled, setScrolled] = useState("");

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setScrolled("scrolled");
    } else {
      setScrolled("");
    }
  };

  useLayoutEffect(() => {

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Check pathName For Set Default Top Panel Or Not:
  if (((pathName === 'factories') && width <= 991) || pathName === 'all-categories' || pathName === 'sign-in' || pathName === 'register') {
    return <TopPanelWhitBackIcon scrolledClass={ scrolled } pathName={pathName} />
  }

  // if get default Header:
  return <DefaultTopPanel />
};

export default TopPanel;