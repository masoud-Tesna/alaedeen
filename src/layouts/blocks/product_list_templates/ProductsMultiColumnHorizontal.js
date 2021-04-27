import React from 'react';

// import style file:
import './styles/ProductsMultiColumnHorizontal.less';

// import polygon images:
import polygon_1 from '../../../assets/images/polygon1.png';
import polygon_2 from '../../../assets/images/polygon2.png';
import polygon_3 from '../../../assets/images/polygon3.png';

// import ANT Design Components used:
import { Col, Row, Space } from "antd";

const ProductsMultiColumnHorizontal = (props) => {

  const {caption, category_id} = props;
  const productSlice = props.productSlice || 3;

  return (
    <div className="ProductsMultiColumnHorizontal--container">
      <Row className="ProductsMultiColumnHorizontal--content">
        <Col className="text-black vv-font-size-2 font-weight-bold mb-3" span={24}>
          { caption }
        </Col>

        <Col className="ProductsMultiColumnHorizontal--item" span={24}>
          <Space size={16}>
            <div className="ProductsMultiColumnHorizontal--polygon">
              <img src={ polygon_1 } alt="polygon 1"/>
            </div>
            <div className="rounded-10 shadow-y-2 d-flex align-items-center justify-content-center ProductsMultiColumnHorizontal--image">
              <img src="https://www.rugvista.nl/image/new1col4/307242.jpg" alt="carpet1"/>
            </div>
            <div className="ProductsMultiColumnHorizontal--details">
              <div className="vv-font-size-1-9 text-primary font-weight-bold mb-3 ProductsMultiColumnHorizontal--details__price">
                $3.90 - 5.20
              </div>
              <div className="mb-3 ProductsMultiColumnHorizontal--details__quantity">
                <span className="vv-font-size-1-4 text-47">100 pieces</span>
                <span className="vv-font-size-1-2rem text-92"> (MOQ)</span>
              </div>
              <div className="ProductsMultiColumnHorizontal--details__view">
                <span className="vv-font-size-1-4 text-8b mr-3">25</span>
                <span className="vv-font-size-1-4 text-8b">View</span>
              </div>
            </div>
          </Space>
        </Col>

        <Col className="ProductsMultiColumnHorizontal--item" span={24}>
          <Space size={16}>
            <div className="ProductsMultiColumnHorizontal--polygon">
              <img src={ polygon_2 } alt="polygon 2"/>
            </div>
            <div className="rounded-10 shadow-y-2 d-flex align-items-center justify-content-center ProductsMultiColumnHorizontal--image">
              <img src="https://www.rugvista.nl/image/desk_pdp_zoom/427514.jpg" alt="carpet1"/>
            </div>
            <div className="ProductsMultiColumnHorizontal--details">
              <div className="vv-font-size-1-9 text-primary font-weight-bold mb-3 ProductsMultiColumnHorizontal--details__price">
                $3.90 - 5.20
              </div>
              <div className="mb-3 ProductsMultiColumnHorizontal--details__quantity">
                <span className="vv-font-size-1-4 text-47">100 pieces</span>
                <span className="vv-font-size-1-2rem text-92"> (MOQ)</span>
              </div>
              <div className="ProductsMultiColumnHorizontal--details__view">
                <span className="vv-font-size-1-4 text-8b mr-3">25</span>
                <span className="vv-font-size-1-4 text-8b">View</span>
              </div>
            </div>
          </Space>
        </Col>

        <Col className="ProductsMultiColumnHorizontal--item" span={24}>
          <Space size={16}>
            <div className="ProductsMultiColumnHorizontal--polygon">
              <img src={ polygon_3 } alt="polygon 3"/>
            </div>
            <div className="rounded-10 shadow-y-2 d-flex align-items-center justify-content-center ProductsMultiColumnHorizontal--image">
              <img src="https://www.rugvista.nl/image/desk_pdp/415496.jpg" alt="carpet1"/>
            </div>
            <div className="ProductsMultiColumnHorizontal--details">
              <div className="vv-font-size-1-9 text-primary font-weight-bold mb-3 ProductsMultiColumnHorizontal--details__price">
                $3.90 - 5.20
              </div>
              <div className="mb-3 ProductsMultiColumnHorizontal--details__quantity">
                <span className="vv-font-size-1-4 text-47">100 pieces</span>
                <span className="vv-font-size-1-2rem text-92"> (MOQ)</span>
              </div>
              <div className="ProductsMultiColumnHorizontal--details__view">
                <span className="vv-font-size-1-4 text-8b mr-3">25</span>
                <span className="vv-font-size-1-4 text-8b">View</span>
              </div>
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsMultiColumnHorizontal;