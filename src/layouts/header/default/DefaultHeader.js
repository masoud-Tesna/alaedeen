// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Space, Input, Button  } from 'antd';

// import logo:
import logoXs from '../../../assets/images/logoXs.png';

// click on search:
const onSearch = value => console.log(value);

// Show suffix for search input:
const suffix = <span className="suffix-content vv-font-size-2"><i className="fal fa-search vv-font-size-2" /> Search</span>;

const DefaultHeader = () => {
  return (
    <Row className="h-100 header--container shadow-line">
      <Col span={24} className="header--col">
        <Row className="h-100" gutter={{ md: 8, lg: 16, xl: 50 }}>
          <Col className="topPanel--content__left" md={ 15 } lg={ 15 } xl={ 16 }>
            <Row className="h-100">
              <Col className="my-auto" span={7}>
                <div className="logo">
                  <img src={logoXs} />
                </div>
              </Col>
              <Col className="my-auto topPanel--left__searchBox" span={17}>
                <Input placeholder="What are you looking for..." suffix={suffix} />
              </Col>
            </Row>
          </Col>
          <Col className="topPanel--content__right my-auto" md={ 9 } lg={ 9 } xl={ 8 }>
            <Row className="h-100" gutter={12}>
              <Col span={9}>
                <Row align="middle" gutter={12}>
                  <Col>
                    <i className="fal fa-user display-3 text-70 d-block" />
                  </Col>
                  <Col span={16}>
                    <Row gutter={[0, 24]}>
                      <Col span={24}>
                        <a className="text-70 vv-font-size-2">Sign in</a>
                      </Col>
                      <Col span={24}>
                        <a className="text-70 vv-font-size-2">Join Free</a>
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
    </Row>
  );
};

export default DefaultHeader;