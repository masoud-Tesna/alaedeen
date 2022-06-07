import "./styles/HomePage.less";
import {Col, Row} from "antd";
import {Helmet} from "react-helmet";
import {SeoGenerator} from "../../utilities/functions/Helper";
import {useTranslation} from "react-i18next";
import Requests from "./homePage/requests/Requests";

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
    </Row>
  );
};

export default HomePage;
