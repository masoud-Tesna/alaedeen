import React from 'react';

// import style file:
import './styles/ProductsMultiColumnHorizontal.less';

// import ANT Design Components used:
import { Col, Row } from "antd";

const ProductsMultiColumnHorizontal = (props) => {

  const {caption, category_id} = props;
  const productSlice = props.productSlice || 3;

  return (
    <div className="ProductsMultiColumnHorizontal--container">
      <Row>
        <Col className="text-black vv-font-size-2 font-weight-bold" span={24}>
          { caption }
        </Col>
        <Col className="ProductsMultiColumnHorizontal--contant">
        </Col>
      </Row>
    </div>
  );
};

export default ProductsMultiColumnHorizontal;