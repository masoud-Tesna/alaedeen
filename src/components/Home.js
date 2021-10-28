import { Suspense, lazy } from 'react';

// import Style LESS File:
import './styles/Home.less';

// import Custom Hooks:
import { useWindowSize } from '../functions';

// import Design:
import { Col, Row } from "antd";

import { Helmet } from "react-helmet";

// import component blocks:
const CategoriesMultiColumn = lazy(() => import('../layouts/blocks/categories/CategoriesMultiColumn'));
const HomeLogisticsBanner = lazy(() => import('../layouts/blocks/static_templates/HomeLogisticsBanner'));
const RequestForm = lazy(() => import('../layouts/blocks/static_templates/OneRequestMultipleQuotes'));
const RequestsList = lazy(() => import('../layouts/blocks/static_templates/RequestsList'));
const Stats = lazy(() => import('../layouts/blocks/static_templates/Stats'));
const ShipProductsBanner = lazy(() => import('../layouts/blocks/static_templates/ShipProductsBanner'));
const HomePageShowProducts = lazy(() => import('../layouts/blocks/static_templates/HomePageShowProducts'));
const PremiumFactories = lazy(() => import('../layouts/blocks/static_templates/PremiumFactories'));
const RecommendedProducts = lazy(() => import('../layouts/blocks/static_templates/RecommendedProducts'));
const TopBrands = lazy(() => import('../layouts/blocks/static_templates/TopBrands'));
const WhatHorn = lazy(() => import('../layouts/blocks/static_templates/WhatHorn'));
// add after:
/*const TopRankingProducts = lazy(() => import('../layouts/blocks/static_templates/TopRankingProducts'));
const RecentlyProductsView = lazy(() => import('../layouts/blocks/static_templates/RecentlyProductsView'));*/

const Home = () => {

  const { width } = useWindowSize();

  return (
    <>

      {/*set Title and description*/}
      <Helmet>
        <title>{ `Alaedeen.com | Iranian Exporters, Manufacturers, Logistics, Suppliers Directory, B2B Business Directory` }</title>
      </Helmet>

      <div className="top--section bg-white">
        <Row gutter={width >= 768 && 24}>
          {/* if Screen Width >= 768px (Desktop) Show Component: */}
          {width >= 768 &&
            <Col span={6}>
              <Suspense fallback="...">
                <CategoriesMultiColumn />
              </Suspense>
            </Col>
          }

          <Col span={width >= 768 ? 12 : 24}>
            <Suspense fallback="...">
              <HomeLogisticsBanner />
            </Suspense>
          </Col>

          {/* if Screen Width <= 991px (Mobile) Show Component: */}
          {width <= 991 &&
            <Col span={24}>
              <CategoriesMultiColumn />
            </Col>
          }

          {/* if Screen Width >= 768px (Desktop) Show Component: */}
          {width >= 768 ?
            <Col span={6}>
              <Row className="h-100">
                <Col className="topSection--requestForm" span={24}>
                  <Suspense fallback="...">
                    <RequestForm />
                  </Suspense>
                </Col>
                <Col className="topSection--requestsList" span={24}>
                  <Suspense fallback="...">
                    <RequestsList />
                  </Suspense>
                </Col>
              </Row>
            </Col> :
            /* if Screen Width <= 991px (Mobile) Show Component: */
            <Col span={24} className="px-3">
              <Suspense fallback="...">
                <RequestsList />
              </Suspense>
            </Col>
          }

        </Row>
      </div>

      <div className="stats--section">
        <Suspense fallback="...">
          <Stats />
        </Suspense>
      </div>

      <div className="shipProductsBanner--section product--section">
        <Row className="rounded-10 shadow-y-2 bg-white section--row" gutter={{ xs: 0, lg: 16 }}>
          <Col className="pl-0" span={10}>
            <Suspense fallback="...">
              <ShipProductsBanner />
            </Suspense>
          </Col>
          <Col className="pr-0" span={14}>
            <Suspense fallback="...">
              <HomePageShowProducts />
            </Suspense>
          </Col>
        </Row>
      </div>

      {/*<div className="topRankingProducts--section">
        <TopRankingProducts />
      </div>*/}

      <div className="PremiumFactories--section">
        <Suspense fallback="...">
          <PremiumFactories />
        </Suspense>
      </div>

      <div className="recommended--section">
        <Suspense fallback="...">
          <RecommendedProducts />
        </Suspense>
      </div>

      {/*<div className="visitsProducts--section">
        <RecentlyProductsView />
      </div>*/}

      <div className="topBrands--section">
        <Suspense fallback="...">
          <TopBrands />
        </Suspense>
      </div>

      <div className="d-none d-lg-block whatHorn--section">
        <Suspense fallback="...">
          <WhatHorn />
        </Suspense>
      </div>
    </>
  );
};

export default Home;