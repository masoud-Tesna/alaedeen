import React from 'react';

// import Style LESS File:
import './home.less';

// import Design:
import { Col, Row } from "antd";

// import blocks:
import CategoriesMultiColumn from "../layouts/blocks/categories/CategoriesMultiColumn";
import HomeLogisticsBanner from "../layouts/blocks/static_templates/HomeLogisticsBanner";
import { OneRequestMultipleQuotes as RequestForm } from "../layouts/blocks/static_templates/OneRequestMultipleQuotes";
import RequestsList from "../layouts/blocks/static_templates/RequestsList";
import Stats from "../layouts/blocks/static_templates/Stats";
import ShipProductsBanner from "../layouts/blocks/static_templates/ShipProductsBanner";
import ProductsMultiColumnVertical from "../layouts/blocks/product_list_templates/ProductsMultiColumnVertical";
import TopRankingProducts from "../layouts/blocks/static_templates/TopRankingProducts";
import PremiumFactories from "../layouts/blocks/static_templates/PremiumFactories";
import RecommendedProducts from "../layouts/blocks/static_templates/RecommendedProducts";

const Home = () => {
  return (
    <>
      <div className="top--section bg-white">
        <Row gutter={24}>
          <Col span={6}>
            <CategoriesMultiColumn />
          </Col>

          <Col span={12}>
            <HomeLogisticsBanner />
          </Col>

          <Col span={6}>
            <Row className="h-100">
              <Col className="topSection--requestForm" span={24}>
                <RequestForm />
              </Col>
              <Col className="topSection--requestsList" span={24}>
                <RequestsList />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="stats--section">
        <Stats />
      </div>

      <div className="shipProductsBanner--section product--section">
        <Row className="rounded-10 shadow-y-2 bg-white section--row" gutter={16}>
          <Col className="pl-0" span={10}>
            <ShipProductsBanner />
          </Col>
          <Col className="pr-0" span={14}>
            {/*<ProductsMultiColumnVertical productSlice={3} detailIcon="company" />*/}
          </Col>
        </Row>
      </div>

      <div className="topRankingProducts--section">
        <TopRankingProducts />
      </div>

      <div className="PremiumFactories--section">
        <PremiumFactories />
      </div>

      <div className="recommended--section">
        <RecommendedProducts />
      </div>
    </>
  );
};

export { Home };