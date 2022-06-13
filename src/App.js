import { lazy, Suspense } from "react";

// Custom Styles:
import './templates/styles/custom.less';

//import Style File:
import './templates/styles/App.less';

// Components:
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

// Design:
import { ConfigProvider, Layout } from 'antd';

// import Config context:
import { useGetConfig } from "./contexts/config/ConfigContext";

import { MatchMediaBreakpoints, MatchBreakpoint } from "react-hook-breakpoints"

// Templates:
import { SiteHeader } from "./templates/header";

import { Helmet } from "react-helmet";

import { useGetAuthState } from "./contexts/user/UserContext";

import DashboardRoutes from "./templates/views/DashboardRoutes";
import DashboardMain from "./templates/views/dashboard/templates/DashboardMain";
import LoadSpinner from "./templates/common/LoadSpinner";


import { ThemeProvider } from 'styled-components';


// Pages:
const HomePage = lazy(() => import('./templates/views/HomePage'));

const Home = lazy(() => import('./templates/views/Home'));

const SignIn = lazy(() => import('./templates/views/SignIn'));

const Register = lazy(() => import('./templates/views/Register'));

const Factories = lazy(() => import('./templates/views/Factories'));

const AllCategories = lazy(() => import('./templates/views/AllCategories'));

const Categories = lazy(() => import('./templates/views/Categories'));

const Product = lazy(() => import('./templates/views/Product'));

const Recommended = lazy(() => import('./templates/views/Recommended'));

const ReadyToShip = lazy(() => import('./templates/views/ReadyToShip'));

const Page = lazy(() => import('./templates/views/Page'));

const ContactUs = lazy(() => import('./templates/views/ContactUs'));

const Store = lazy(() => import('./templates/views/Store'));

const Rfq = lazy(() => import("./templates/views/Rfq"));

const SiteFooter = lazy(() => import('./templates/footer'));

const App = () => {

  // get initial config:
  const { config } = useGetConfig();

  const { user_data } = useGetAuthState();

  const dir = ['fa', 'ar'].find(lng => lng === config.language) ? 'rtl' : 'ltr';

  const lang = config.language;

  const { Footer, Content } = Layout;
  
  const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  };

  return (
    <ConfigProvider direction={ dir }>
      <ThemeProvider theme={{ dir }}>
        <MatchMediaBreakpoints breakpoints={breakpoints}>
          <Helmet
            htmlAttributes={ {
              lang,
            } }
          >
    
            <script type="text/javascript">
              { `
                  !function () {
                    function t() {
                      let t = document.createElement("script");
                      t.type = "text/javascript",
                        t.async = !0,
                        localStorage.getItem("rayToken") ?
                          t.src = "https://app.raychat.io/scripts/js/" + o + "?rid=" + localStorage.getItem("rayToken") + "&href=" + window.location.href :
                          t.src = "https://app.raychat.io/scripts/js/" + o + "?href=" + window.location.href;
            
                      let e = document.getElementsByTagName("script")[ 0 ];
                      e.parentNode.insertBefore(t, e)
                    }
            
                    let e = document,
                      a = window,
                      o = "2ec01bb9-7711-48ad-8967-ae9c7c728824";
                    "complete" === e.readyState ? t() : a.attachEvent ? a.attachEvent("onload", t) : a.addEventListener("load", t, !1)
                  }();
                ` }
            </script>
    
            { user_data?.auth?.user_id &&
    
            <script type="text/javascript">
              { `
                
                window.addEventListener('raychat_ready', function (ets) {
                    window.Raychat.setUser({
                      email: '${ user_data?.auth?.email }',
                      name: '${ user_data?.auth?.firstname } ${ user_data?.auth?.lastname }',
                      about: '${ user_data?.auth?.company }',
                      phone: '${ user_data?.auth?.phone }',
                      avatar: '${ user_data?.auth?.company_logo?.logo_path }',
                      updateOnce: true
                    });
                  });
                
                 
                
                ` }
            </script>
    
            }
    
          </Helmet>
    
          <Layout className="layout">
            <Router>
              <SiteHeader/>
    
              <Content>
                <div className="site-layout-content" id="siteLayoutContent">
                  <DashboardMain>
                    <Routes>
                      {/* Home Route */ }
                      <Route exact path="/" element={ <Suspense fallback={ null } ><Home/></Suspense> }/>
                      
                      <Route exact path="/home" element={ <Suspense fallback={ <LoadSpinner /> } ><HomePage/></Suspense> }/>
    
                      {/* Sign in Route */ }
                      <Route path="/sign-in" element={ <Suspense fallback={ null } ><SignIn/></Suspense> }/>
    
                      {/* Register Route */ }
                      <Route path="/register" element={ <Suspense fallback={ null } ><Register/></Suspense> }/>
    
                      {/* Factories Route */ }
                      <Route path="/factories" element={ <Suspense fallback={ null } ><Factories/></Suspense> }/>
    
                      {/* All Categories Route */ }
                      <Route path="/all-categories" element={ <Suspense fallback={ null } ><AllCategories/></Suspense> }/>
    
                      {/* if open categories page without category path, redirect to all-category route */ }
                      <Route exact path="/categories" element={ <Navigate to="/all-categories"/> }/>
    
                      {/* categories Route (categories/electronic) */ }
                      <Route path="/categories/:category" element={ <Suspense fallback={ null }><Categories/></Suspense> }/>
    
                      {/* if open product details page without product path, redirect to all-category route */ }
                      <Route exact path="/product" element={ <Navigate to="/all-categories"/> }/>
    
                      {/* Product details Route */ }
                      <Route path="/product/:product" element={ <Suspense fallback={ null }><Product/></Suspense> }/>
    
                      {/* Recommended details Route */ }
                      <Route path="/recommended" element={ <Suspense fallback={ null }><Recommended/></Suspense> }/>
    
                      {/* Ready To Ship details Route */ }
                      <Route path="/ready-to-ship" element={ <Suspense fallback={ null }><ReadyToShip/></Suspense> }/>
    
                      {/* show page detail Route */ }
                      <Route path="/page/:page" element={ <Suspense fallback={ null }><Page/></Suspense> }/>
    
                      {/* contact us */ }
                      <Route exact path="/page/alaedeen-contact-us"
                             element={ <Suspense fallback={ null }><ContactUs/></Suspense> }/>
    
                      {/* show blog detail Route */ }
                      <Route path="/blog/:blog" element={ <Suspense fallback={ null }><Page/></Suspense> }/>
      
                      {/* Show Free Company Details Route */ }
                      <Route path="/store/:company" element={ <Suspense fallback={ null }><Store /></Suspense> }/>
    
                      <Route path="/rfq" element={ <Suspense fallback={ <LoadSpinner /> }><Rfq /></Suspense> }/>
    
                      {/* Dashboard Routes */ }
                      { DashboardRoutes() }
    
                    </Routes>
                  </DashboardMain>
                </div>
              </Content>
    
              <MatchBreakpoint min="md">
                <Suspense fallback={null}>
                  <Footer>
                    <SiteFooter/>
                  </Footer>
                </Suspense>
              </MatchBreakpoint>
            </Router>
          </Layout>
        </MatchMediaBreakpoints>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
