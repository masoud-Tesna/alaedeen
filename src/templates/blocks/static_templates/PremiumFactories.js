import { Link } from "react-router-dom";

// import Style File:
import './styles/PremiumFactories.less';

// import ANT Design Components Used:
import { Col, Row, Skeleton } from "antd";

// import Verified
import verifiedIcon from '../../../assets/images/verified.png';

// import another components used:
import SkeletonTopBrands from "./skeletons/SkeletonTopBrands";

// import custom hook used:
import { useGetApi, useWindowSize } from '../../../functions';

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetConfig } from "../../../contexts/config/ConfigContext";

import ShowResponsiveImage from "../../common/ShowResponsiveImage";

const FactoriesLogo = ({ logo, alt, object_id, width }) => {

  // get initial config:
  const { config } = useGetConfig();

  if ((config.language === 'en' || config.language === 'ar') && logo.en) {
    return (
      <ShowResponsiveImage
        imagePath={ logo.en }
        imageFolder='company_logo'
        width={width >= 992 ? 60 : 26}
        height={width >= 992 ? 60 : 26}
        imageAlt={ alt }
        object_id={object_id}
        object_type={`company_logo_en`}
        skeletonWidth={width >= 992 ? "60px" : "26px"}
        skeletonHeight={width >= 992 ? "60px" : "26px"}
      />
    );
  }

  if (config.language === 'fa' && logo.fa) {
    return (
      <ShowResponsiveImage
        imagePath={ logo.fa }
        imageFolder='company_logo'
        width={width >= 992 ? 60 : 26}
        height={width >= 992 ? 60 : 26}
        imageAlt={ alt }
        object_id={object_id}
        object_type={`company_logo_fa`}
        skeletonWidth={width >= 992 ? "60px" : "26px"}
        skeletonHeight={width >= 992 ? "60px" : "26px"}
      />
    );
  }

  return (
    <i className="fal fa-image text-bc display-2" />
  );

}

const FactoriesImages = ({ images, alt, object_id, width }) => {

  return(
    <div className="d-flex premiumFactories--item__detailImages">
      <div className="premiumFactories--factoryImages__item1">
        <ShowResponsiveImage
          imagePath={ images[ 0 ] }
          imageFolder='profiles'
          imageAlt={ alt }
          object_id={`img_0${object_id}`}
          object_type={`factories_image_0`}
        />
      </div>
      <Row className="premiumFactories--factoryImages__item_2_3">
        <Col span={24} className="premiumFactories--factoryImages__item2 mb-4 align-self-start">
          <ShowResponsiveImage
            imagePath={ images[ 1 ] }
            imageFolder='profiles'
            imageAlt={ alt }
            object_id={`img_1${object_id}`}
            object_type={`factories_image_1`}
            skeletonWidth="136px"
            skeletonHeight="101px"
          />
        </Col>
        <Col span={24} className="premiumFactories--factoryImages__item3 align-self-end">
          <ShowResponsiveImage
            imagePath={ images[ 2 ] }
            imageFolder='profiles'
            imageAlt={ alt }
            object_id={`img_2${object_id}`}
            object_type={`factories_image_2`}
            skeletonWidth="136px"
            skeletonHeight="101px"
          />
        </Col>
      </Row>
    </div>
  );
}

const PremiumFactories = () => {

// get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  const { width } = useWindowSize();

  // get premium factories from API:
  const { isLoading, data } = useGetApi(`premium-factories-api`, `items_per_page=3`, `premiumFactoriesHomePage`);
  const { factories } = data || [];

  return (
    <div className="premiumFactories--container">
      <Row>
        <Col className="premiumFactories--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 768 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
              { t(__('Premium OEM Factories')) }
            </Col>
            <Col className="my-auto">
              <Link to="/factories" className={ `${ width >= 768 ? 'vv-font-size-1-8' : 'vv-font-size-1-4' } text-33` } >
                { t(__('View More')) } <i className={ `far fa-chevron-${config.language === 'en' ? 'right' : 'left'} ${ width >= 768 ? 'vv-font-size-1-8' : 'vv-font-size-1-4' } ${config.language === 'en' ? '' : 'align-middle'}` } />
              </Link>
            </Col>
          </Row>
        </Col>
        <Col className="premiumFactories--content" span={24}>
          <Row className="premiumFactories--items" justify="space-between" gutter={{ xs: 0, sm: 5, md: 5, lg: 8, xl: 10, xxl: 35 }}>
            {width >= 768 ?
              <>
                {isLoading ?
                  <SkeletonTopBrands
                    skeleton = {true}
                    skeltonNumbers = {3}
                    grid={{ span: 8 }}
                    height = {324.7}

                  /> :
                  <>
                    {factories?.map((factory, index) => {
                      return (
                        <Col span={8} key={index}>
                          <div className="premiumFactories--item rounded-10 shadow-y-2 bg-white h-100">
                            <Row className="mb-4 d-flex- align-items-center- premiumFactories--item__detail">
                              <Col flex="70px" className="premiumFactories--item__image">
                                <FactoriesLogo
                                  logo={ factory.logo }
                                  alt={ factory.company }
                                  object_id={factory.company_id}
                                  width={width}
                                />
                              </Col>
                              <Col flex="1 1" className="w-100- premiumFactories--item__caption">
                                <div className="vv-font-size-1-6 text-black text-truncate premiumFactories--item__name">
                                  { factory.company }
                                </div>
                                <div className="premiumFactories--item__verified">
                                  <img src={ verifiedIcon } alt="Verified"/>
                                </div>
                              </Col>
                            </Row>

                            <FactoriesImages
                              images={factory.images || ''}
                              alt={ factory.company }
                              object_id={factory.company_id}
                              width={width}
                            />

                          </div>
                          <Link className="premiumFactories--item__link" to={ `/factories?factory=${factory.company_id}` } />
                        </Col>
                      );
                    })}
                  </>
                }
              </>:

              <>
                {isLoading ?
                  <SkeletonTopBrands
                    skeleton = {true}
                    skeltonNumbers = {3}
                    grid={{ span: 8 }}
                  /> :
                  <>
                    {factories?.map((factory, index) => {
                      return (
                        <Col key={index}>
                          <div className="premiumFactories--itemXs">
                            <div className="premiumFactories--factoryImages__Xs">
                              <ShowResponsiveImage
                                imagePath={ factory?.images[ 0 ] }
                                imageFolder='profiles'
                                imageAlt={ factory?.company }
                                object_id={`img_0${factory.company_id}`}
                                object_type={`factories_image_0`}
                                skeletonWidth="120px"
                                skeletonHeight="120px"
                              />
                            </div>
                            <div className="mt-2">
                              <Row className="premiumFactoriesXs--item__detail">
                                <Col className="text-truncate my-auto text-black" span={18}>{factory.company}</Col>
                                <Col className="text-right premiumFactories--factoryIcon__Xs" span={6}>
                                  <FactoriesLogo
                                    logo={ factory.logo }
                                    alt={ factory.company }
                                    object_id={factory.company_id}
                                    width={width}
                                  />
                                </Col>
                              </Row>
                            </div>
                          </div>
                          <Link className="premiumFactories--item__link" to={ `/factories?factory=${factory.company_id}` } />
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