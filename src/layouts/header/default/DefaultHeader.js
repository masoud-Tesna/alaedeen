// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Divider, Space, Menu, Dropdown } from 'antd';

// import categories drop down:
import { CategoriesDropDownVertical as Categories } from "../../blocks/categories/CategoriesDropDownVertical";





const DefaultHeader = () => {
  return (
    <Row className="header--container">
      <Col span={24} className="header--col">
        <Row className="h-100" gutter={24}>
          <Col className="topPanel--content__left my-auto" span={ 16 }>
            <div className="logo" />
          </Col>
          <Col className="topPanel--content__right my-auto" span={ 8 }>
            <Space size={0.5}>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  عربی
                </span>
              </a>
              <Divider type="vertical" className="border-70"/>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  English
                </span>
              </a>
              <Divider type="vertical" className="border-70"/>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  فارسی
                </span>
              </a>

              <a className="topPanel--content__item home-icon">
                <span className="topPanel--item__text">
                  <i className="fal fa-home text-white vv-font-size-1-5"></i>
                </span>
              </a>

              <a className="topPanel--content__item question-icon">
                <span className="topPanel--item__text">
                  <i className="fal fa-question-circle text-white vv-font-size-1-5"></i>
                </span>
              </a>

            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DefaultHeader;