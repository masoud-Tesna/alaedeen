import React, { useEffect } from 'react';

// import Custom Hooks:
import { useWindowSize } from '../functions';

// import Style LESS File:
import './styles/Home.less';

// import Design:
import { Col, Row } from "antd";

// import blocks:
import CategoriesMultiColumn from "../layouts/blocks/categories/CategoriesMultiColumn";
import HomeLogisticsBanner from "../layouts/blocks/static_templates/HomeLogisticsBanner";
import { OneRequestMultipleQuotes as RequestForm } from "../layouts/blocks/static_templates/OneRequestMultipleQuotes";
import RequestsList from "../layouts/blocks/static_templates/RequestsList";
import Stats from "../layouts/blocks/static_templates/Stats";
import ShipProductsBanner from "../layouts/blocks/static_templates/ShipProductsBanner";
import TopRankingProducts from "../layouts/blocks/static_templates/TopRankingProducts";
import PremiumFactories from "../layouts/blocks/static_templates/PremiumFactories";
import RecommendedProducts from "../layouts/blocks/static_templates/RecommendedProducts";
import RecentlyProductsView from "../layouts/blocks/static_templates/RecentlyProductsView";
import TopBrands from "../layouts/blocks/static_templates/TopBrands";
import WhatHorn from "../layouts/blocks/static_templates/WhatHorn";
import HomePageShowProducts from "../layouts/blocks/static_templates/HomePageShowProducts";

const Home = () => {

  const { width } = useWindowSize();

  useEffect(() => {
    document.title = "hornb2b.com: Iranian Exporters, Manufacturers, Logistics, Suppliers Directory, B2B Business Directory"
  }, []);

  return (
    <>
      <div className="top--section bg-white">
        <Row gutter={width >= 992 && 24}>
          {/* if Screen Width >= 992px (Desktop) Show Component: */}
          {width >= 992 &&
            <Col span={6}>
              <CategoriesMultiColumn />
            </Col>
          }

          <Col span={width >= 992 ? 12 : 24}>
            <HomeLogisticsBanner />
          </Col>

          {/* if Screen Width <= 991px (Mobile) Show Component: */}
          {width <= 991 &&
            <Col span={24}>
              <CategoriesMultiColumn />
            </Col>
          }

          {/* if Screen Width >= 992px (Desktop) Show Component: */}
          {width >= 992 ?
            <Col span={6}>
              <Row className="h-100">
                <Col className="topSection--requestForm" span={24}>
                  <RequestForm />
                </Col>
                <Col className="topSection--requestsList" span={24}>
                  <RequestsList />
                </Col>
              </Row>
            </Col> :
            /* if Screen Width <= 991px (Mobile) Show Component: */
            <Col span={24} className="px-3">
              <RequestsList />
            </Col>
          }

        </Row>
      </div>

      <div className="stats--section">
        <Stats />
      </div>

      <div className="shipProductsBanner--section product--section">
        <Row className="rounded-10 shadow-y-2 bg-white section--row" gutter={{ xs: 0, lg: 16 }}>
          <Col className="pl-0" span={10}>
            <ShipProductsBanner />
          </Col>
          <Col className="pr-0" span={14}>
            <HomePageShowProducts />
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

      <div className="visitsProducts--section">
        <RecentlyProductsView />
      </div>

      <div className="topBrands--section">
        <TopBrands/>
      </div>

      <div className="d-none d-lg-block whatHorn--section">
        <WhatHorn />
      </div>
    </>
  );
};

export { Home };