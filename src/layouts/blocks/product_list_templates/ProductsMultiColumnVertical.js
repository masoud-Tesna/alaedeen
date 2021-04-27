import React, { useEffect, useState } from 'react';

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
    <div className="productsMultiColumnVertical--container">
      <Row className="productsMultiColumnVertical--items">
        <Col className="productsMultiColumnVertical--item" span={24/productSlice}>
          <Row justify="center">
            <Col span={24} className="text-center productsMultiColumnVertical--item__image">
              <img src={ product_1 } alt="product 1"/>
            </Col>
          </Row>
        </Col>

        <Col className="productsMultiColumnVertical--item" span={24/productSlice}>
          <Row justify="center">
            <Col span={24} className="text-center productsMultiColumnVertical--item__image">
              <img src={ product_2 } alt="product 2"/>
            </Col>
          </Row>
        </Col>

        <Col className="productsMultiColumnVertical--item" span={24/productSlice}>
          <Row justify="center">
            <Col span={24} className="text-center productsMultiColumnVertical--item__image">
              <img src={ product_3 } alt="product 3"/>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsMultiColumnVertical;