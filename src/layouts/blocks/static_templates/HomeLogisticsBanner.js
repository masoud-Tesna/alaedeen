// import Style File:
import './styles/HomeLogisticsBanner.less';
import { Col, Row } from "antd";

// import helper functions:
import { __ } from '../../../functions/Helper';
import { useWindowSize } from "../../../functions";

// get language context:
import { useGetLanguageState } from "../../../contexts/language/LanguageContext";

import { useTranslation } from "react-i18next";

// import banner images
import logisticsBannerFa from '../../../assets/images/logisticsBanner-fa.png';
import logisticsBannerRtl from '../../../assets/images/logisticsBanner-rtl.png';
import logisticsBannerRtlXs from '../../../assets/images/logisticsBannerXs-rtl.png';
import logisticsBannerLtr from '../../../assets/images/logisticsBanner-ltr.png';
import logisticsBannerLtrXs from '../../../assets/images/logisticsBannerXs-rtl.png';

const HomeLogisticsBanner = () => {

  // initial state for language:
  const { language } = useGetLanguageState();

  const { width } = useWindowSize();

  const { t } = useTranslation();

  return (
    <div className="homeLogisticsBanner--container">
      <div className="homeLogisticsBanner--content h-100">

        {/*for Mobile And Fa Or Ar Language*/}
        {(width < 768 && (language === 'fa' || language === 'ar')) &&
          <img className="homeLogisticsBanner--img" src={ logisticsBannerRtlXs } alt={ t(__('Logistics Services')) }/>
        }

        {/*for Mobile And En Language*/}
        {(width < 768 && language === 'en') &&
          <img className="homeLogisticsBanner--img" src={ logisticsBannerLtrXs } alt={ t(__('Logistics Services')) }/>
        }

        {/*for Desktop And En Language*/}
        {(width >= 768 && language === 'en') &&
          <img className="homeLogisticsBanner--img" src={ logisticsBannerLtr } alt={ t(__('Logistics Services')) }/>
        }

        {/*for Desktop And Fa Language*/}
        {/*{(width >= 768 && language === 'fa') &&
         <img className="homeLogisticsBanner--img" src={ logisticsBannerFa } alt={ t(__('Logistics Services')) }/>
        }
*/}
        {/*for Desktop And Ar Language*/}
        {(width >= 768 && (language === 'ar' || language === 'fa')) &&
          <img className="homeLogisticsBanner--img" src={ logisticsBannerRtl } alt={ t(__('Logistics Services')) }/>
        }

        {/*<Col className="homeLogisticsBanner--caption" span={11}>
          <Row className="h-100 homeLogisticsBanner--details" align="middle">
            Desktop
            <Col span={24} className="d-none d-lg-block py-3 text-secondary font-weight-600 text-center vv-font-size-4 homeLogisticsBanner--caption__text1">{ t(__('Logistics')) }</Col>
            <Col span={24} className="d-none d-lg-block px-3 py-3 text-white vv-font-size-1-2 homeLogisticsBanner--caption__text2">
              <div className="caption--text2__top vv-font-size-2 pb-5">
                { t(__('Worried about shipping?')) }
              </div>
              <div className="caption--text2__middle vv-font-size-2 pb-5">
                { t(__('Send your goods through the most reliable shipping service providers.')) }
              </div>
              <div className="caption--text2__bottom vv-font-size-2">
                { t(__(' Get the best price now!')) }
              </div>
            </Col>
            Mobile
            <Col span={24} className="d-lg-none py-0 py-lg-3 text-secondary font-weight-600 text-center vv-font-size-2-5 homeLogisticsBanner--caption__text1">{ t(__('Logistics Services')) }</Col>
            <Col span={24} className="d-lg-none text-white font-weight-600 text-center vv-font-size-1-5 homeLogisticsBanner--caption__text1">{ t(__('Get the best price now!')) }</Col>
            Desktop & Mobile
            <Col span={24} className="py-3 text-center homeLogisticsBanner--caption__btn">
              <a href="https://alaedeen.com/horn/logistics/" className="text-black border-0 d-inline-block">
                { t(__('Go to page')) }
              </a>
            </Col>
          </Row>
        </Col>*/}
      </div>
    </div>
  );
};

export default HomeLogisticsBanner;