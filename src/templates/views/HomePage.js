import "./styles/HomePage.less";
import {Col, Row} from "antd";
import {Helmet} from "react-helmet";
import {SeoGenerator} from "../../utilities/functions/Helper";
import {useTranslation} from "react-i18next";
import Requests from "./homePage/requests/Requests";
import Categories from "./homePage/categories";

const HomePage = () => {
  
  const { t } = useTranslation();
  
  return (
    <Row className="homePage--container">
  
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
      
      <Col span={24} className="--requestSection">
        <Requests />
      </Col>
      
      <Col span={24} className="--secondSection">
        <Row gutter={[0, 32]}>
          <Col span={24}>
            <Row gutter={16} className="__top">
              <Col span={6} className="--startSection">
                <Categories />
              </Col>
              
              <Col span={12} className="--middleSection">
                Carousel
              </Col>
              
              <Col span={6} className="--endSection">
                End Section
              </Col>
            </Row>
          </Col>
          <Col span={24}>Bottom</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomePage;
