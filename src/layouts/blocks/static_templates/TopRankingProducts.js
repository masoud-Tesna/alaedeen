import React from 'react';

// import style file:
import './styles/TopRankingProducts.less';

// import ANT Design Components used:
import { Col, Row } from "antd";

// import Another Components used:
import ProductsMultiColumnHorizontal from "../product_list_templates/ProductsMultiColumnHorizontal";

const TopRankingProducts = () => {
  return (
    <div className="TopRankingProducts--container">
      <Row>
        <Col className="TopRankingProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className="text-33 text-uppercase vv-font-size-3 font-weight-bold">
              TOP-RANKING PRODUCTS
            </Col>
            <Col className="my-auto">
              <a className="vv-font-size-1-8 text-33">View More <i
                className="far fa-chevron-right vv-font-size-1-8 ml-3" /></a>
            </Col>
          </Row>
        </Col>
        <Col className="rounded-10 shadow-y-2 bg-white py-5 topRankingProducts--content" span={24}>
          <Row className="topRankingProducts--items">
            <Col className="topRankingProducts--item px-4" span={8}>
              <ProductsMultiColumnHorizontal caption="Carpets" category_id={181} productSlice={3} />
            </Col>
            <Col className="topRankingProducts--item px-4" span={8}>
              <ProductsMultiColumnHorizontal caption="Handmade carpet" category_id={181} productSlice={3} />
            </Col>
            <Col className="topRankingProducts--item px-4" span={8}>
              <ProductsMultiColumnHorizontal caption="Kids & Baby Carpet" category_id={181} productSlice={3} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TopRankingProducts;