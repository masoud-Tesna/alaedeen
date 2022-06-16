import "./styles/HomePage.less";
import {Col, Row} from "antd";
import {Helmet} from "react-helmet";
import {SeoGenerator} from "../../utilities/functions/Helper";
import {useTranslation} from "react-i18next";
import Requests from "./homePage/requests/Requests";
import CategoriesList from "./homePage/CategoriesList";
import HomeCarousel from "./homePage/HomeCarousel";
import JoinBox from "./homePage/JoinBox";
import RecommendedProductsBox from "./homePage/RecommendedProductsBox";
import StoreBox from "./homePage/StoreBox";
import serviceProvideImage from "../assets/images/home-service-provider-box.jpg";
import manufacturerImage from "../assets/images/home-manufacturer-box.jpg";
import RecommendedProducts from "./homePage/RecommendedProducts";

const manufacturerBox = {
  image: manufacturerImage,
  caption: "manufacturer box",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
}

const serviceProvide = {
  image: serviceProvideImage,
  caption: "service Provide box",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
}

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
          <Col span={24} className="__top">
            <Row gutter={16}>
              <Col span={6} className="--startSection">
                <CategoriesList />
              </Col>
              
              <Col span={12} className="--middleSection">
                <HomeCarousel />
              </Col>
              
              <Col span={6} className="--endSection">
                <Row gutter={[0, 8]} className="h-100">
                  <Col span={24}>
                    <JoinBox />
                  </Col>
                  
                  <Col span={24} style={{height: "calc(100% - 156.05px)"}}>
                    <RecommendedProductsBox />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          
          <Col span={24} className="__bottom">
            <Row gutter={27}>
              <Col xs={24} lg={12} className="--startSection">
                <StoreBox {...manufacturerBox} />
              </Col>
              
              <Col xs={24} lg={12} className="--endSection">
                <StoreBox {...serviceProvide} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      
      <Col span={24} className="--recommendedProductSection">
        <RecommendedProducts />
      </Col>
    </Row>
  );
};

export default HomePage;
