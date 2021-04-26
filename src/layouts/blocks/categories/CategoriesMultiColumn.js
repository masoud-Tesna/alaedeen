import React from 'react';

// import Style LESS File:
import './styles/CategoriesMultiColumn.less';
import { Col, Divider, Row } from "antd";

// import categories image:
import cat_1 from '../../../assets/images/categories/1.png';
import cat_2 from '../../../assets/images/categories/2.png';
import cat_3 from '../../../assets/images/categories/3.png';
import cat_4 from '../../../assets/images/categories/4.png';
import cat_5 from '../../../assets/images/categories/5.png';
import cat_6 from '../../../assets/images/categories/6.png';
import cat_7 from '../../../assets/images/categories/7.png';

const CategoriesMultiColumn = () => {
  return (
    <div className="categoriesMultiColumn--container h-100">
      <Row className="h-100">
        <Col className="categoriesMultiColumn--item border-right border-70" span={12}>
          <Row className="border-bottom border-bc">
            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
              <img className="rounded-circle shadow-circle" src={cat_1}  alt="cat_1"/>
            </Col>
            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2">
              Carpets
            </Col>
          </Row>
        </Col>

        <Col className="categoriesMultiColumn--item" span={12}>
          <Row className="border-bottom border-bc">
            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
              <img className="rounded-circle shadow-circle" src={cat_2}  alt="cat_2"/>
            </Col>
            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2">
              Kids & Baby Carpet
            </Col>
          </Row>
        </Col>

        <Col className="categoriesMultiColumn--item border-right border-70" span={12}>
          <Row className="border-bottom border-bc">
            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
              <img className="rounded-circle shadow-circle" src={cat_3}  alt="cat_3"/>
            </Col>
            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2">
              Collage of skin...
            </Col>
          </Row>
        </Col>

        <Col className="categoriesMultiColumn--item" span={12}>
          <Row className="border-bottom border-bc">
            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
              <img className="rounded-circle shadow-circle" src={cat_4}  alt="cat_4"/>
            </Col>
            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2">
              Cloth carpet
            </Col>
          </Row>
        </Col>

        <Col className="categoriesMultiColumn--item border-right border-70" span={12}>
          <Row className="border-bottom border-bc">
            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
              <img className="rounded-circle shadow-circle" src={cat_5}  alt="cat_5"/>
            </Col>
            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2">
              Handmade carpet
            </Col>
          </Row>
        </Col>

        <Col className="categoriesMultiColumn--item" span={12}>
          <Row className="border-bottom border-bc">
            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
              <img className="rounded-circle shadow-circle" src={cat_6}  alt="cat_6"/>
            </Col>
            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2">
              Tableau rug
            </Col>
          </Row>
        </Col>

        <Col className="categoriesMultiColumn--item border-right border-70" span={12}>
          <Row>
            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
              <img className="rounded-circle shadow-circle" src={cat_7}  alt="cat_7"/>
            </Col>
            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2">
              Mats & Rugs
            </Col>
          </Row>
        </Col>

        <Col className="categoriesMultiColumn--item vv-cursor-pointer" span={12}>
          <Row>
            <Col span={24} className="categoriesMultiColumn--icon text-center my-2">
              <Row align="middle" className="h-100">
                <Col span={24}>
                  <i className="far fa-list-ul mr-2 display-1 font-weight-500 text-primary" />
                </Col>
              </Row>
            </Col>
            <Col span={24} className="categoriesMultiColumn--icon-title text-center text-47 vv-font-size-1-8 pb-2">
              All Categories
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CategoriesMultiColumn;