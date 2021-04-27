import React, { useEffect, useState } from 'react';

// import uses Components:
import axios from 'axios';
import TextTruncate from 'react-text-truncate';

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

const ProductsMultiColumnVertical = ({ productSlice, detailIcon = 'default' }) => {

  const [load, setLoad] = useState(true);

  const [getProducts, setGetProducts] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {

    const lang_code = 'en';

    const url = `https://hornb2b.com/products-api/?items_per_page=${productSlice}&company_id=181&lang_code=${lang_code}`;

    axios.get (url)
      .then ((res) => {
        setLoad(false);
        setGetProducts(res.data);
      })
      .catch ((error) => {
        setLoad(false);
        setError(error);
      });
  }, [productSlice]);



  return (
    <div className="h-100 productsMultiColumnVertical--container">
      <Row className="h-100 productsMultiColumnVertical--items">
        <Col className="productsMultiColumnVertical--item" span={24/productSlice}>
          <Row className="h-100" justify="center">
            <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
              <img className="" src={ product_1 } alt="product 1"/>
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
            <Col span={24} className="px-4 productsMultiColumnVertical--item__location-detailIcon">
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

        <Col className="productsMultiColumnVertical--item" span={24/productSlice}>
          <Row className="h-100" justify="center">
            <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
              <img className="" src={ product_2 } alt="product 2"/>
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
            <Col span={24} className="px-4 productsMultiColumnVertical--item__location-detailIcon">
              <Row justify="space-between" align="bottom">
                <Col>
                  <i className="fal fa-map-marker-alt text-red-a0 display-5 mr-3" />
                  <span className="text-47 vv-font-size-1-7">Tehran,Iran</span>
                </Col>
                <Col className="align-self-end">
                  {detailIcon === 'default' ?
                    <i className="flag-icon flag-icon-ir vv-font-size-1-9" /> :
                    <img src={ store_2 } alt="store 2"/>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col className="productsMultiColumnVertical--item" span={24/productSlice}>
          <Row className="h-100" justify="center">
            <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
              <img className="" src={ product_3 } alt="product 3"/>
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
            <Col span={24} className="px-4 productsMultiColumnVertical--item__location-detailIcon">
              <Row justify="space-between" align="bottom">
                <Col>
                  <i className="fal fa-map-marker-alt text-red-a0 display-5 mr-3" />
                  <span className="text-47 vv-font-size-1-7">Tehran,Iran</span>
                </Col>
                <Col className="align-self-end">
                  {detailIcon === 'default' ?
                    <i className="flag-icon flag-icon-ir vv-font-size-1-9" /> :
                    <img src={ store_3 } alt="store 3"/>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsMultiColumnVertical;