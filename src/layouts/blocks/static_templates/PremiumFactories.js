import { Link } from "react-router-dom";

// import Style File:
import './styles/PremiumFactories.less';

// import ANT Design Components Used:
import { Col, Row, Skeleton } from "antd";

// import Verified
import verifiedIcon from '../../../assets/images/verified.png';

// import another components used:
import SkeletonTopBrands from "./SkeletonTopBrands";

// import get language context:
import { useGetLanguageState } from "../../../contexts/language/LanguageContext";


// import custom hook used:
import { useGetPremiumFactories, useWindowSize } from '../../../functions';

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

const FactoriesLogo = ({ logo, alt }) => {

  const { language } = useGetLanguageState();

  if (language === 'en' && logo.en) {
    return (
      <img src={ logo.en } alt={ alt }/>
    );
  }

  if (language === 'fa' && logo.fa) {
    return (
      <img src={ logo.fa } alt={ alt }/>
    );
  }

  return (
    <i className="fal fa-image text-bc display-2" />
  );

}

const FactoriesImages = ({ images, alt }) => {

  return(
    <div className="d-flex premiumFactories--item__detailImages">
      <div className="premiumFactories--factoryImages__item1">
        {images[0] ?
          <img src={ images[ 0 ] } alt={ alt }/> :
          <Skeleton.Image active={true} className="premiumFactories--skeletonImages__item1" />
        }
      </div>
      <Row className="premiumFactories--factoryImages__item_2_3">
        <Col span={24} className="premiumFactories--factoryImages__item2 mb-4 align-self-start">
          {images[1] ?
            <img src={ images[ 1 ] } alt={ alt }/> :
            <Skeleton.Image active={true} className="premiumFactories--skeletonImages__item_2_3" />
          }
        </Col>
        <Col span={24} className="premiumFactories--factoryImages__item3 align-self-end">
          {images[2] ?
            <img src={ images[ 2 ] } alt={ alt }/> :
            <Skeleton.Image active={true} className="premiumFactories--skeletonImages__item_2_3" />
          }
        </Col>
      </Row>
    </div>
  );
}

const PremiumFactories = () => {

  // initial state for language:
  const { language } = useGetLanguageState();

  const { t } = useTranslation();

  const { width } = useWindowSize();

  const { factories, load } = useGetPremiumFactories();

  return (
    <div className="premiumFactories--container">
      <Row>
        <Col className="premiumFactories--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 992 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
              { t(__('Premium OEM Factories')) }
            </Col>
            <Col className="my-auto">
              <Link to="/factories" className={ `${ width >= 992 ? 'vv-font-size-1-8' : 'vv-font-size-1-4' } text-33` } >
                { t(__('View More')) } <i className={ `far fa-chevron-${language === 'en' ? 'right' : 'left'} ${ width >= 992 ? 'vv-font-size-1-8' : 'vv-font-size-1-4' } ${language === 'en' ? '' : 'align-middle'}` } />
              </Link>
            </Col>
          </Row>
        </Col>
        <Col className="premiumFactories--content" span={24}>
          <Row className="premiumFactories--items" justify="space-between" gutter={{ xs: 0, sm: 5, md: 5, lg: 8, xl: 10, xxl: 35 }}>
            {width >= 992 ?
              <>
                {load ?
                  <SkeletonTopBrands
                    skeleton = {true}
                    skeltonNumbers = {3}
                    grid={{ span: 8 }}
                    height = {324.7}

                  /> :
                  <>
                    {factories.map((factory, index) => {
                      return (
                        <Col span={8} key={index}>
                          <Link className="d-block h-100" to={ `/factories?factory=${factory.company_id}` }>
                            <div className="premiumFactories--item rounded-10 shadow-y-2 bg-white h-100">
                              <div className="mb-4 d-flex align-items-center premiumFactories--item__detail" style={{ height: '60px' }}>
                                <div className="premiumFactories--item__image">
                                  <FactoriesLogo logo={ factory.logo } alt={ factory.company }/>
                                </div>
                                <div className="w-100 premiumFactories--item__caption">
                                  <div className="vv-font-size-1-6 text-black text-truncate premiumFactories--item__name">
                                    { factory.company }
                                  </div>
                                  <div className="premiumFactories--item__verified">
                                    <img src={ verifiedIcon } alt="Verified"/>
                                  </div>
                                </div>
                              </div>

                              <FactoriesImages
                                images={factory.images || ''}
                                alt={ factory.company }
                              />

                            </div>
                          </Link>
                        </Col>
                      );
                    })}
                  </>
                }
              </>:

              <>
                {load ?
                  <SkeletonTopBrands
                    skeleton = {true}
                    skeltonNumbers = {3}
                    grid={{ span: 8 }}
                  /> :
                  <>
                    {factories.map((factory, index) => {
                      return (
                        <Col span={8} key={index}>
                          <Link className="d-block h-100" to={ `/factories?factory=${factory.company_id}` }>
                            <div className="premiumFactories--itemXs">
                              <div className="premiumFactories--factoryImages__Xs">
                                <img src={ factory.images[0] } alt="factoryImage_1"/>
                              </div>
                              <div className="mt-2">
                                <Row className="premiumFactoriesXs--item__detail">
                                  <Col className="text-truncate my-auto text-black" span={18}>{factory.company}</Col>
                                  <Col className="text-right premiumFactories--factoryIcon__Xs" span={6}>
                                    <FactoriesLogo logo={ factory.logo } alt={ factory.company }/>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </Link>
                        </Col>
                      );
                    })}
                  </>
                }
              </>
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PremiumFactories;