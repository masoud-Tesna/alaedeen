import { Link } from "react-router-dom";

// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Input, Button  } from 'antd';

// import logo:
import logoXs from '../../../assets/images/logoXs.png';

// Show suffix for search input:
const suffix = <span className="suffix-content vv-font-size-2"><i className="far fa-search vv-font-size-2" /> Search</span>;

const prefix = <i className="far fa-search text-primary vv-font-size-2" />;

const DefaultHeader = () => {
  return (
    <Row className="h-100 header--container">
      <Col span={24} className="header--col shadow-line d-none d-lg-block">
        <Row className="h-100 " gutter={{ md: 8, lg: 16, xl: 50 }}>
          <Col className="header--content__left" md={ 15 } lg={ 15 } xl={ 16 }>
            <Row className="h-100">
              <Col className="my-auto" span={7}>
                <div className="logo">
                  <Link to={"/"} >
                    <img src={logoXs} alt="Horn" />
                  </Link>
                </div>
              </Col>
              <Col className="my-auto header--left__searchBox" span={17}>
                <Input placeholder="What are you looking for..." suffix={suffix} />
              </Col>
            </Row>
          </Col>
          <Col className="header--content__right my-auto" md={ 9 } lg={ 9 } xl={ 8 }>
            <Row className="h-100" gutter={12}>
              <Col span={9}>
                <Row align="middle" gutter={12}>
                  <Col>
                    <i className="fal fa-user display-3 text-70 d-block" />
                  </Col>
                  <Col span={16}>
                    <Row gutter={[0, 24]}>
                      <Col span={24}>
                        <Link className="text-70 vv-font-size-2" to={"/sign-in"} >
                          Sign in
                        </Link>
                      </Col>
                      <Col span={24}>
                        <Link className="text-70 vv-font-size-2" to={"/register"} >
                          Join Free
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={15} className="pr-0 pr-lg-5 btn-request my-auto">
                <Button className="border border-primary-darken border-w-2 text-primary-darken  font-weight-600 p-0" size="large">Request a Quote</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24} className="d-lg-none header--mobile__searchBox">
        <Input placeholder="What are you looking for..." prefix={prefix} />
      </Col>
    </Row>
  );
};

export default DefaultHeader;