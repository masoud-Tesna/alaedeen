// import react hooks:
import {lazy, Suspense} from "react";

// import MatchBreakpoint:
import {MatchBreakpoint} from "react-hook-breakpoints";

const MobileHeader = lazy(() => import('./breakPoints/MobileHeader')); // if screen size is mobile
const DesktopHeader = lazy(() => import('./breakPoints/DesktopHeader')); // if screen size is desktop

const Header = ({ isHeader = true, isMenu= true }) => {
  
  return (
    <>
      <MatchBreakpoint max="sm">
        <Suspense fallback={null}>
          <MobileHeader />
        </Suspense>
      </MatchBreakpoint>
      
      <MatchBreakpoint min="md">
        <Suspense fallback={null}>
          <DesktopHeader isMenu={ isMenu } isHeader={ isHeader } />
        </Suspense>
      </MatchBreakpoint>
    </>
  );
};

export default Header;
