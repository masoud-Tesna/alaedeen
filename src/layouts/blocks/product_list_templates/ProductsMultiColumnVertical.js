import React from 'react';

// import uses Components:
import axios from 'axios';

// import style file:
import './styles/ProductsMultiColumnVertical.less';

// import Ant Design Components:
import { Col, Row } from "antd";

// import image product
import product_1 from '../../../assets/images/products/1.png';
import product_2 from '../../../assets/images/products/2.png';
import product_3 from '../../../assets/images/products/3.png';

// import store icon:
import store_1 from '../../../assets/images/store-icon/1.png';
import store_2 from '../../../assets/images/store-icon/2.png';
import store_3 from '../../../assets/images/store-icon/3.png';

const ShowImage = ({ image, alt }) => {
  return <img className="" src={ image } alt={ alt }/>
}

const ProductsMultiColumnVertical = (props) => {
  
  const detailIcon = props.detailIcon || 'default';

  return (
    <Col className={ `productsMultiColumnVertical--item` } {...props.grid}>
      <Row className={ `h-100 ${props.className}` } justify="center">
        <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">

        </Col>

        <Col span={24} className="px-4 text-47 vv-font-size-1-8 text-truncate productsMultiColumnVertical--item__title">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Col>

        <Col span={24} className="px-4 productsMultiColumnVertical--item__price">
          <span className="vv-font-size-1-9 text-primary font-weight-bold">$3.90 - 5.20</span>
          <span className="vv-font-size-1-6 text-92"> / piece</span>
        </Col>

        <Col span={24} className="px-4 productsMultiColumnVertical--item__quantity">
          <span className="vv-font-size-1-4 text-47">100 pieces</span>
          <span className="vv-font-size-1-2rem text-92"> (MOQ)</span>
        </Col>

        <Col span={24} className="px-4 mb-2 productsMultiColumnVertical--item__location-detailIcon">
          <Row justify="space-between" align="bottom">
            <Col>
              <i className="fal fa-map-marker-alt text-red-a0 display-5 mr-3" />
              <span className="text-47 vv-font-size-1-7">Tehran,Iran</span>
            </Col>
            <Col className="align-self-end">
              {detailIcon === 'default' ?
                <i className="flag-icon flag-icon-ir vv-font-size-1-9" /> :
                <img src={ store_1 } alt="store 1"/>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductsMultiColumnVertical;