// Custom Styles:
import './styles/custom.less';

//import Style File:
import './styles/App.less';

// flag icons:
import 'flag-icon-css/less/flag-icon.less';

// Components:
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Design:
import { Layout, Row, Col, Space, Divider } from 'antd';

// Pages:
import { Home } from "./pages";

import googlePlay from './assets/images/googlePlay.svg';
import appleStore from './assets/images/appleStore.svg';

// Layouts:
import TopPanel from "./layouts/topPanel";
import { Header as SiteHeader } from "./layouts/header";

function App() {

  const { Header, Footer, Content } = Layout;

  return (
    <Layout className="layout">
      <Router>
        <TopPanel />
        <Header className="site--header">
          <SiteHeader />
        </Header>
        <Content>
          <div className="site-layout-content">
            <Switch>
              <Route path="/home" component={Home} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Content>
        <Footer>
         <Row className="footer--container">
          <Col className="bg-footer footer--container__topSection" span={24}>
           <Row justify="space-between">
             <Col>
               <Space size="large">
                 <div className="footer--topSection__logoApp"></div>
                 <span className="vv-font-size-2-2 font-weight-600 text-white">Download the Horn App for iOS or Android <i className="fas fa-angle-right text-e6 vv-font-size-1-7 ml-3" /></span>
               </Space>
             </Col>
             <Col className="mt-2">
               <Space size="large">
                  <span className="footer--topSection__storeIcon">
                    <img className="border border-bc rounded-5" src={ appleStore } alt="_app_store" />
                  </span>
                 <span className="footer--topSection__storeIcon">
                    <img className="border border-bc rounded-5" src={ googlePlay } alt="_google_play" />
                  </span>
               </Space>
             </Col>
           </Row>
         </Col>
          <Col className="bg-footer-light footer--container__middleSection" span={24}>
            <Row className="row-cols-2 row-cols-md-4">
              <Col>
                <Row gutter={[0, 5]}>
                  <Col className="text-white vv-font-size-1-7 font-weight-600 mb-4" span={24}>
                    Tips and Help
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    About Horn
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Company Registration
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Horn Blog
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Help
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Contact us
                  </Col>
                </Row>
              </Col>

              <Col>
                <Row gutter={[0, 5]}>
                  <Col className="text-white vv-font-size-1-7 font-weight-600 mb-4" span={24}>
                    Legal Bits
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Terms of Use
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Privacy Policy
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Posting Policy
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Cookie Policy
                  </Col>
                </Row>
              </Col>

              <Col>
                <Row gutter={[0, 5]}>
                  <Col className="text-white vv-font-size-1-7 font-weight-600 mb-4" span={24}>
                    For Business
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Order Fright
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Horn Business
                  </Col>
                </Row>
              </Col>

              <Col>
                <Row gutter={[0, 5]}>
                  <Col className="text-white vv-font-size-1-7 font-weight-600 mb-4" span={24}>
                    Explore
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Electric & Electronic
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Construction Related
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Production Related
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Food & Beverage
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Furniture
                  </Col>
                  <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    Medical
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="bg-footer footer--container__bottomSection" span={24}>
            <Row justify="space-between">
              <Col className="vv-font-size-1-4 text-white my-auto">
                © 2018 - 2021 Horn Company, All rights reserved
              </Col>
              <Col className="my-auto">
                <Space size="middle">
                  <div className="footer--bottomSection-socialLink facebook">
                    <span className="text-decoration-none">
                      <i className="fab fa-facebook-f" />
                    </span>
                  </div>

                  <div className="footer--bottomSection-socialLink instagram">
                    <span className="text-decoration-none">
                      <i className="fab fa-instagram" />
                    </span>
                  </div>

                  <div className="footer--bottomSection-socialLink twitter">
                    <span className="text-decoration-none">
                      <i className="fab fa-twitter" />
                    </span>
                  </div>

                  <div className="footer--bottomSection-socialLink youtube">
                    <span className="text-decoration-none">
                      <i className="fab fa-youtube" />
                    </span>
                  </div>
                </Space>
              </Col>
            </Row>
          </Col>
         </Row>
        </Footer>
      </Router>
    </Layout>
  );
}

export default App;
