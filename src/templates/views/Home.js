// import Style LESS File:
import './styles/Home.less';

import { Helmet } from "react-helmet";

import { SeoGenerator } from "../../functions/Helper";

// import Custom Hooks:
import { useWindowSize } from '../../functions';

// import Design:
import { Col, Row } from "antd";

import { useTranslation } from "react-i18next";

// import component blocks:
import CategoriesMultiColumn from "../blocks/categories/CategoriesMultiColumn";
import HomeLogisticsBanner from "../blocks/static_templates/HomeLogisticsBanner";
import Stats from "../blocks/static_templates/Stats";
import PremiumFactories from "../blocks/static_templates/PremiumFactories";
import RecommendedProducts from "../blocks/static_templates/RecommendedProducts";
import TopBrands from "../blocks/static_templates/TopBrands";
import WhatHorn from "../blocks/static_templates/WhatHorn";
import News from "../blocks/static_templates/News";

// add after:
//import TopRankingProducts from "../templates/blocks/static_templates/TopRankingProducts";
//import RecentlyProductsView from "../templates/blocks/static_templates/RecentlyProductsView";
//import ShipProductsBanner from "../blocks/static_templates/ShipProductsBanner";
//import ReadyToShipProducts from "../blocks/static_templates/ReadyToShipProducts";

const Home = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  return (
    <>

      {/* set schema Organization for home url */}
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://alaedeen.com",
              "logo": "https://alaedeen.com/alaedeen-xs.png"
            }
          `}
        </script>
      </Helmet>

      <SeoGenerator
        title={ t('alaedeen_title') }
        description={ t('alaedeen_description') }
        keywords={ t('alaedeen_keywords') }
      >
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://alaedeen.com",
              "logo": "https://alaedeen.com/alaedeen-xs.png"
            }
          `}
        </script>
      </SeoGenerator>

      <div className="top--section bg-white">
        <Row gutter={width >= 992 && 12}>

          {width >= 992 ?
            <>
              <Col span={6}>
                <CategoriesMultiColumn />
              </Col>
              <Col span={width >= 992 ? 18 : 24}>
                <HomeLogisticsBanner />
              </Col>
            </> :
            <>
              <Col span={width >= 992 ? 18 : 24}>
                <HomeLogisticsBanner />
              </Col>
              <Col span={24}>
                <CategoriesMultiColumn />
              </Col>
            </>
          }

        </Row>
      </div>

      <div className="stats--section">
        <Stats />
      </div>

      {/*<div className="shipProductsBanner--section product--section">
        <Row className="rounded-10 shadow-y-2 bg-white section--row" gutter={{ xs: 0, lg: 16 }}>
          <Col className="pl-0" span={10}>
            <ShipProductsBanner />
          </Col>
          <Col className="pr-0" span={14}>
            <ReadyToShipProducts />
          </Col>
        </Row>
      </div>*/}

      {/*<div className="topRankingProducts--section">
        <TopRankingProducts />
      </div>*/}

      <div className="PremiumFactories--section">
        <PremiumFactories />
      </div>

      <div className="recommended--section">
        <RecommendedProducts />
      </div>

      {/*<div className="visitsProducts--section">
        <RecentlyProductsView />
      </div>*/}

      <div className="topBrands--section">
        <TopBrands />
      </div>

      <div className="d-none d-lg-block whatHorn--section">
        <WhatHorn />
      </div>

      <div className="d-none d-lg-block news--section">
        <News />
      </div>
    </>
  );
};

export default Home;