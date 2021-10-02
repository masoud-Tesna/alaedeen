// import Style File:
import './styles/HomeLogisticsBanner.less';

// import helper functions:
import { __ } from '../../../functions/Helper';
import { useWindowSize } from "../../../functions";

import { useTranslation } from "react-i18next";

// import banner images:
import logisticsBannerRtl from '../../../assets/images/logisticsBanner-rtl.png';
import logisticsBannerRtlXs from '../../../assets/images/logisticsBannerXs-rtl.png';
import logisticsBannerLtr from '../../../assets/images/logisticsBanner-ltr.png';
import logisticsBannerLtrXs from '../../../assets/images/logisticsBannerXs-rtl.png';
import { useGetConfig } from "../../../contexts/config/ConfigContext";

const HomeLogisticsBanner = () => {

  // get initial config:
  const { config } = useGetConfig();

  const { width } = useWindowSize();

  const { t } = useTranslation();

  return (
    <div className="homeLogisticsBanner--container">
      <div className="homeLogisticsBanner--content h-100">

        {/* for Mobile And persian Or arabic Language */}
        {(width < 992 && (config.language === 'fa' || config.language === 'ar')) &&
          <img className="homeLogisticsBanner--img" src={ logisticsBannerRtlXs } alt={ t(__('Logistics Services')) }/>
        }

        {/* for Mobile And English Language */}
        {(width < 992 && config.language === 'en') &&
          <img className="homeLogisticsBanner--img" src={ logisticsBannerLtrXs } alt={ t(__('Logistics Services')) }/>
        }

        {/* for Desktop And persian Or arabic Language */}
        {(width >= 768 && (config.language === 'ar' || config.language === 'fa')) &&
          <img className="homeLogisticsBanner--img" src={ logisticsBannerRtl } alt={ t(__('Logistics Services')) }/>
        }

        {/* for Desktop And English Language */}
        {(width >= 992 && config.language === 'en') &&
          <img className="homeLogisticsBanner--img" src={ logisticsBannerLtr } alt={ t(__('Logistics Services')) }/>
        }

      </div>
    </div>
  );
};

export default HomeLogisticsBanner;
