// import Style LESS File:
import './styles/Home.less';

// import Custom Hooks:
import { useWindowSize } from '../../functions';

// import Design:
import { Col, Row } from "antd";

import { useTranslation } from "react-i18next";

// import component blocks:
import CategoriesMultiColumn from "../blocks/categories/CategoriesMultiColumn";
import HomeLogisticsBanner from "../blocks/static_templates/HomeLogisticsBanner";
import RequestForm from "../blocks/static_templates/OneRequestMultipleQuotes";
import RequestsList from "../blocks/static_templates/RequestsList";
import Stats from "../blocks/static_templates/Stats";
import ShipProductsBanner from "../blocks/static_templates/ShipProductsBanner";
import ReadyToShipProducts from "../blocks/static_templates/ReadyToShipProducts";
import PremiumFactories from "../blocks/static_templates/PremiumFactories";
import RecommendedProducts from "../blocks/static_templates/RecommendedProducts";
import TopBrands from "../blocks/static_templates/TopBrands";
import WhatHorn from "../blocks/static_templates/WhatHorn";
import { SeoGenerator } from "../../functions/Helper";
import { useGetConfig } from "../../contexts/config/ConfigContext";
import { Link } from "react-router-dom";

// add after:
//import TopRankingProducts from "../templates/blocks/static_templates/TopRankingProducts";
//import RecentlyProductsView from "../templates/blocks/static_templates/RecentlyProductsView";

const Home = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  // get initial config:
  const { config } = useGetConfig();

  return (
    <>

      {/*set Title and description*/}
      {/*<Helmet>
        <title>{ t('alaedeen_title') }</title>
        <meta name="description" content={ t('alaedeen_description') } />
        <meta name="keywords" content={ t('alaedeen_keywords') } />
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
      </Helmet>*/}

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

      {config.language === 'fa' &&
      <div className="fullHeightBanner">
        <Link to="/register/?lang_code=fa"/>
        <div className="banner" />
      </div>
      }

      <div className="top--section bg-white">
        <Row gutter={width >= 768 && 24}>
          {/* if Screen Width >= 768px (Desktop) Show Component: */}
          {width > 991 &&
          <Col span={6}>
            <CategoriesMultiColumn />
          </Col>
          }

          <Col span={width > 991 ? 12 : 24}>
            <HomeLogisticsBanner />
          </Col>

          {/* if Screen Width <= 991px (Mobile) Show Component: */}
          {width <= 991 &&
          <Col span={24}>
            <CategoriesMultiColumn />
          </Col>
          }

          {/* if Screen Width >= 768px (Desktop) Show Component: */}
          {width > 991 ?
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
            <ReadyToShipProducts />
          </Col>
        </Row>
      </div>

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
    </>
  );
};

export default Home;