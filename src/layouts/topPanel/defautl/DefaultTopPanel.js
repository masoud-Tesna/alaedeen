import React from 'react';

// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Divider, Space, Menu, Dropdown } from 'antd';
import { DownOutlined } from "@ant-design/icons";


const menu = (
  <Menu className="menu-test">
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

const DefaultTopPanel = () => {
  return (
    <Row className="bg-top-panel topPanel--container">
      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={24}>
          <Col className="topPanel--content__left my-auto" span={ 16 }>
            <Space size={1}>
              <span className="categories--dropDown topPanel--content__item hover">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="" onClick={e => e.preventDefault()}>
                    <i className="icon-vv-all-category mr-2" />
                    <span className="topPanel--item__text">Categories</span>
                    <DownOutlined className="ml-2" />
                  </a>
                </Dropdown>
              </span>
              <Divider type="vertical" className="border-70"/>
              <span className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  Stores
                </span>
              </span>
              <span className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  Logistics
                </span>
              </span>
              <span className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  International Exhibition
                </span>
              </span>
            </Space>
          </Col>
          <Col className="topPanel--content__right my-auto" span={ 8 }>
            <Space size={1}>
              <span className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  عربی
                </span>
              </span>
              <Divider type="vertical" className="border-70"/>
              <span className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  English
                </span>
              </span>
              <Divider type="vertical" className="border-70"/>
              <span className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  فارسی
                </span>
              </span>

              <span className="topPanel--content__item">
                <span className="topPanel--item__text">
                  <i className="fal fa-home text-white vv-font-size-1-5"></i>
                </span>
              </span>

              <span className="topPanel--content__item">
                <span className="topPanel--item__text">
                  <i className="fal fa-question-circle text-white vv-font-size-1-5"></i>
                </span>
              </span>

            </Space>
          </Col>
        </Row>

        {/* <i className="icon-vv-all-category" />
        <Divider type="vertical" className="bg-a5"/>
        <a href="#">Link</a>
        <Divider type="vertical" />
        <a href="#">Link</a> */}

      </Col>
    </Row>
  );
};

export default DefaultTopPanel;