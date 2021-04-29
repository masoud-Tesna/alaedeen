import React, { useEffect, useState } from 'react';

// import Style File:
import './styles/RecommendedProducts.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

// import Another Components Used:
import axios from 'axios';

import ProductsMultiColumnVertical from "../product_list_templates/ProductsMultiColumnVertical";

import SkeletonMultiColumnVertical from "../product_list_templates/SkeletonMultiColumnVertical";

const RecommendedProducts = () => {

  const [load, setLoad] = useState(true);

  const [page, SetPage] = useState(1);

  const [allPage, setAllPage] = useState();

  const [getProducts, setGetProducts] = useState([]);

  const [productParams, setProductParams] = useState(null);

  const [error, setError] = useState(null);



  const ShowMore = (params) => {
    if (params) {
      const allPageInParams = Math.ceil(params.total_items / params.items_per_page);
      setAllPage(allPageInParams);
      SetPage(page + 1);
    }
  }

  const getProductLists = () => {

    setLoad(true);

    const lang_code = 'en';

    const url = `https://hornb2b.com/products-api/?items_per_page=20&company_id=181&page=${page}&lang_code=${lang_code}`;

    axios.get (url).then ((res) => {
      setLoad(false);
      setGetProducts([...getProducts, ...res.data.products]);
      setProductParams(res.data.params);
    }).catch ((error) => {
      setLoad(false);
      setError(error);
    });
  }

  useEffect(() => {
    getProductLists();
  }, [page]);

  return (
    <div className="recommendedProducts--container">
      <Row>
        <Col className="recommendedProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className="text-33 text-uppercase vv-font-size-3 font-weight-bold">
              Recommended for you
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="h-100 productsMultiColumnVertical--container">
            <Row className="h-100 productsMultiColumnVertical--items row-cols-5" justify="space-around" gutter={[16, 20]}>


              {getProducts.map((product) => {
                return (<ProductsMultiColumnVertical
                  key = { product.product_id }
                  className="bg-white rounded-10 shadow-y-2"
                  product={product}
                />);
              })}

              {load &&
                <SkeletonMultiColumnVertical
                  className = "bg-white rounded-10 shadow-y-2"
                  skeleton = {true}
                  skeltonNumbers = {5}
                />
              }

              { productParams && page !== allPage &&
              <div onClick={() => {ShowMore(productParams)}}>Show More</div>
              }
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecommendedProducts;