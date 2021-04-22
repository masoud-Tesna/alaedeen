// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Divider, Space, Menu, Dropdown } from 'antd';

// import categories drop down:
import { CategoriesDropDownVertical as Categories } from "../../blocks/categories/CategoriesDropDownVertical";





const DefaultTopPanel = () => {
  return (
    <Row className="bg-top-panel topPanel--container">
      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={24}>
          <Col className="topPanel--content__left my-auto" span={ 16 }>
            <Space size={1}>
              <Categories userClass="categories--dropDown topPanel--content__item hover" />
              <Divider type="vertical" className="border-70"/>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  Stores
                </span>
              </a>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  Logistics
                </span>
              </a>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  International Exhibition
                </span>
              </a>
            </Space>
          </Col>
          <Col className="topPanel--content__right my-auto" span={ 8 }>
            <Space size={1}>
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

              <span className="topPanel--content__item">
                <a className="topPanel--item__text">
                  <i className="fal fa-home text-white vv-font-size-1-5"></i>
                </a>
              </span>

              <span className="topPanel--content__item">
                <a className="topPanel--item__text">
                  <i className="fal fa-question-circle text-white vv-font-size-1-5"></i>
                </a>
              </span>

            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DefaultTopPanel;