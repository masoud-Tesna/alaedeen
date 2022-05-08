// import Style File:
import './styles/TopBrands.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

// import Another Components Used:
import ScrollContainer from 'react-indiana-drag-scroll';
import SkeletonTopBrands from "./skeletons/SkeletonTopBrands";

// import custom hooks:
import { useGetApiOld, useWindowSize } from "../../../functions";

// import helper functions:
import { __, fn_stripHtml } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetConfig } from "../../../contexts/config/ConfigContext";

import ShowResponsiveImage from "../../common/ShowResponsiveImage";

const FactoriesLogo = ({ logo, alt, object_id, width }) => {

  // get initial config:
  const { config } = useGetConfig();
  
  if (config.language === 'fa' && logo.fa) {
    return (
      <ShowResponsiveImage
        imagePath={ logo.fa }
        imageFolder='company_logo'
        width={width >= 992 ? 150 : 65}
        height={width >= 992 ? 150 : 65}
        imageAlt={ alt }
        object_id={object_id}
        object_type={`company_logo_fa`}
      />
    );
  }

  if (config.language !== 'fa' && logo.en) {
    return (
      <ShowResponsiveImage
        imagePath={ logo.en }
        imageFolder='company_logo'
        width={width >= 992 ? 150 : 65}
        height={width >= 992 ? 150 : 65}
        imageAlt={ alt }
        object_id={object_id}
        object_type={`company_logo_en`}
      />
    );
  }

  return (
    <i className="fal fa-image text-bc display-2" />
  );

}

const TopBrands = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  // get top brands from API:
  const { isLoading, data } = useGetApiOld(
    `premium-factories-api`,
    `items_per_page=5`,
    `topBrandsHomePage`,
    {
      refetchOnWindowFocus: false
    }
  );
  const { factories } = data || [];

  return (
    <div className="topBrands--container">
      <Row>
        <Col className="topBrands--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 992 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
              { t(__('Top Brands')) }
            </Col>
          </Row>
        </Col>
        <Col className="topBrands--items" span={24}>
          <Row className="h-100 bg-white rounded-10 shadow-y-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" justify="space-around" gutter={ { xs: 0, lg: 16 }}>

            {width >= 992 ?
              <>

                {isLoading ?
                  <SkeletonTopBrands
                    skeleton = {true}
                    skeltonNumbers = {5}
                    grid={{ span: 8 }}
                    height = {234.367}

                  /> :
                  <>
                    {factories?.map((brand) => {
                      return (
                        <Col className="topBrands--item" key={ `TopBrands_xl_${brand.company_id}` }>
                          <a className="d-block h-100 link--disable" href={`https://store.alaedeen.com/?store_id=${brand.company_id}`}>
                            <div className="d-flex align-items-end justify-content-center topBrands--item__image">
                              <FactoriesLogo
                                logo={ brand.logo }
                                alt={ brand.company }
                                object_id={brand.company_id}
                                width={width}
                              />
                            </div>
                            <div className="vv-font-size-2-2 text-47 text-center mt-3 topBrands--item__name">
                              { brand.company }
                            </div>

                            { brand.description &&
                            <div className="vv-font-size-1-9 text-8b text-center mt-3 text-truncate topBrands--item__name">
                              {fn_stripHtml(brand.description) }
                            </div>
                            }
                          </a>
                        </Col>
                      );
                    })}
                  </>
                }

              </> :
              <Col className="topBrands--scroll" span={24}>
                <ScrollContainer className="text-select-none d-flex topBrands--scrollContainer">

                  {isLoading ?
                    <SkeletonTopBrands
                      skeleton = {true}
                      skeltonNumbers = {5}
                      swiper
                    /> :
                    <>
                      {factories?.map((brand) => {
                        return (
                          <div className="d-inline topBrandsScroll--item__content" key={ `TopBrands_xs_${brand.company_id}` }>
                            <a className="d-block h-100 link--disable" href={`https://store.alaedeen.com/?store_id=${brand.company_id}`}>
                              <Row className="topBrandsScroll--item" justify="center">
                                <div className="d-flex align-items-end justify-content-center w-100 topBrands--item__image">
                                  <FactoriesLogo
                                    logo={ brand.logo }
                                    alt={ brand.company }
                                    object_id={brand.company_id}
                                    width={width}
                                  />
                                </div>
                                <div className="vv-font-size-1-4 font-weight-600 text-47 text-center text-truncate mt-1 w-100 topBrands--item__name">
                                  { brand.company }
                                </div>
                                { brand.description &&
                                <div className="vv-font-size-1-4 text-8b text-center text-truncate mt-1 w-100 topBrands--item__name">
                                  { fn_stripHtml(brand.description) }
                                </div>
                                }
                              </Row>
                            </a>
                          </div>
                        );
                      })}
                    </>
                  }

                </ScrollContainer>
              </Col>
            }

          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TopBrands;