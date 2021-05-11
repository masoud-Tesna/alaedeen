// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Space, Button } from 'antd';

// import Custom Hooks:
import { useWindowSize } from '../../../functions';

// import logo:
import appleStore from "../../../assets/images/appleStore.svg";
import googlePlay from "../../../assets/images/googlePlay.svg";

const DefaultFooter = () => {

  const { width } = useWindowSize();

  let spaceSize;

  if (width >= 992) {
    spaceSize = 'large';
  }else{
    spaceSize = 'small';
  }

  return (
    <Row className="footer--container">
      <Col className="bg-footer footer--container__topSection" span={24}>
        <Row justify="space-between">
          <Col>
            <Space size={ spaceSize }>
              <div className="footer--topSection__logoApp" />
              <div className="d-inline my-auto">
                <span className="d-none d-lg-inline vv-font-size-2-2 font-weight-600 text-white">Download the Horn App for iOS or Android <i className="fas fa-angle-right text-e6 vv-font-size-1-7 ml-3" /></span>

                <span className="d-block d-lg-none vv-font-size-1-4 font-weight-bold text-white">Download the Horn app</span>
                <span className="d-block d-lg-none mt-1 vv-font-size-1-3 font-weight-600 text-white">Buy and sell safely and cheaply</span>
              </div>
            </Space>
          </Col>
          <Col className="mt-2 d-none d-lg-block">
            <Space size="large">
              <span className="footer--topSection__storeIcon">
                <img className="border border-bc rounded-5" src={ appleStore } alt="_app_store" />
              </span>
              <span className="footer--topSection__storeIcon">
                    <img className="border border-bc rounded-5" src={ googlePlay } alt="_google_play" />
                  </span>
            </Space>
          </Col>
          <Col className="d-lg-none my-auto footer--topSection__btnInstall">
            <Button className="border border-primary bg-primary border-w-2 text-white font-weight-600 p-0" size="small">Install</Button>
          </Col>
        </Row>
      </Col>
      <Col className="bg-footer-light footer--container__middleSection" span={24}>
        <Row className="row-cols-2 row-cols-md-4" gutter={[8, 24]}>
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
                Carpets
              </Col>
              <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                Handmade carpet
              </Col>
              <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                Kids & Baby Carpet
              </Col>
              <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                Tableau rug
              </Col>
              <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                Collage of skin and carpets
              </Col>
              <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                Mats & Rugs
              </Col>
              <Col className="vv-cursor-pointer text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                Cloth carpet
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className="bg-footer footer--container__bottomSection" span={24}>
        <Row justify={ width >= 992 ? "space-between": 'center' }>
          <Col xs={{ order: 2 }} lg={{ order: 1 }} className="vv-font-size-1-4 text-white mt-3 my-lg-auto">
            © 2018 - 2021 Horn Company, All rights reserved
          </Col>
          <Col xs={{ order: 1 }} lg={{ order: 2 }} className="my-lg-auto">
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
  );
};

export { DefaultFooter };