// import Style File:
import './styles/HomeLogisticsBanner.less';

// import helper functions:
import { useWindowSize } from "../../../utilities/functions";

import { useTranslation } from "react-i18next";

import { useGetConfig } from "../../../contexts/config/ConfigContext";

// import banner images:
import bannerXlEn from '../../assets/images/banner-xl-en.jpg';
import bannerXlFa from '../../assets/images/banner-xl-fa.jpg';
import bannerXlAr from '../../assets/images/banner-xl-ar.jpg';

import bannerXsEn from '../../assets/images/banner-xs-en.jpg';
import bannerXsFa from '../../assets/images/banner-xs-fa.jpg';
import bannerXsAr from '../../assets/images/banner-xs-ar.jpg';
import { Link } from "react-router-dom";

const HomeLogisticsBanner = () => {

  // get initial config:
  const { config } = useGetConfig();

  const { width } = useWindowSize();

  const { t } = useTranslation();

  return (
    <div className="homeLogisticsBanner--container">
      <div className="homeLogisticsBanner--content h-100">

        {/* For Desktop ? code else for Mobile : code */}
        {width >= 992 ?
          <>
            { ['en', 'zh', 'ru'].find(lng => lng === config.language) &&
              <img className="homeLogisticsBanner--img" src={ bannerXlEn } alt={ t('alaedeen_title') }/>
            }

            { config.language === 'fa' &&
            <img className="homeLogisticsBanner--img" src={ bannerXlFa } alt={ t('alaedeen_title') }/>
            }

            { config.language === 'ar' &&
            <img className="homeLogisticsBanner--img" src={ bannerXlAr } alt={ t('alaedeen_title') }/>
            }
          </> :
          /*For Mobile*/
          <>
            { ['en', 'zh', 'ru'].find(lng => lng === config.language) &&
            <img className="homeLogisticsBanner--img" src={ bannerXsEn } alt={ t('alaedeen_title') }/>
            }

            { config.language === 'fa' &&
            <img className="homeLogisticsBanner--img" src={ bannerXsFa } alt={ t('alaedeen_title') }/>
            }

            { config.language === 'ar' &&
            <img className="homeLogisticsBanner--img" src={ bannerXsAr } alt={ t('alaedeen_title') }/>
            }
          </>
        }

        <Link to="/register"/>

      </div>
    </div>
  );
};

export default HomeLogisticsBanner;
