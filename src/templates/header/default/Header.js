import {lazy, Suspense} from "react";
import {MatchBreakpoint} from "react-hook-breakpoints";

const MobileHeader = lazy(() => import('./breakPoints/MobileHeader'));
const DesktopHeader = lazy(() => import('./breakPoints/DesktopHeader'));

const Header = () => {
  
  return (
    <>
      <MatchBreakpoint max="sm">
        <Suspense fallback={null}>
          <MobileHeader />
        </Suspense>
      </MatchBreakpoint>
      
      <MatchBreakpoint min="md">
        <Suspense fallback={null}>
          <DesktopHeader />
        </Suspense>
      </MatchBreakpoint>
    </>
  );
};

export default Header;
