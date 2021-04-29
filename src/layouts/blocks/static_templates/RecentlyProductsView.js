import React, { useEffect, useState } from 'react';

// import Style File:
import './styles/RecommendedProducts.less';

// import ANT Design Components Used:
import { Button, Col, Row } from "antd";

// import Another Components Used:
import axios from 'axios';

import ProductsMultiColumnVertical from "../product_list_templates/ProductsMultiColumnVertical";

import SkeletonMultiColumnVertical from "../product_list_templates/SkeletonMultiColumnVertical";

const RecentlyProductsView = () => {

  const [load, setLoad] = useState(true);

  const [getProducts, setGetProducts] = useState([]);

  const [error, setError] = useState(null);

  const getProductLists = () => {

    setLoad(true);

    const lang_code = 'en';

    const url = `https://hornb2b.com/products-api/?items_per_page=5&company_id=181`;

    axios.get (url)
      .then ((res) => {
      setGetProducts(res.data.products);
    })
      .catch ((error) => {
      setError(error);
    })
      .finally(() => {
        setLoad(false);
      });
  }

  useEffect(() => {
    getProductLists();
  }, []);
  return (
    <div className="recommendedProducts--container">
      <Row>
        <Col className="recommendedProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className="text-33 text-uppercase vv-font-size-3 font-weight-bold">
              Your visits
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="h-100 productsMultiColumnVertical--container">
            <Row className="h-100 productsMultiColumnVertical--items row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" justify="space-around" gutter={16}>

              {getProducts.map((product, i) => {
                return (
                  <ProductsMultiColumnVertical
                    key = { i }
                    className="bg-white rounded-10 shadow-y-2"
                    product={product}
                  />
                );
              })}

              {load &&
                <SkeletonMultiColumnVertical
                  className = "bg-white rounded-10 shadow-y-2"
                  skeleton = {true}
                  skeltonNumbers = {5}
                />
              }
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecentlyProductsView;