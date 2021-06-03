import { Link } from "react-router-dom";

// import Style File:
import './styles/TopBrands.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

// import Another Components Used:
import ScrollContainer from 'react-indiana-drag-scroll';
import SkeletonTopBrands from "./SkeletonTopBrands";

// import custom hooks:
import { useGetPremiumFactories, useWindowSize } from "../../../functions";

// get current language from context:
import { useGetLanguageState } from "../../../contexts/language/LanguageContext";

// import helper functions:
import { __, fn_stripHtml } from '../../../functions/Helper';

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

const TopBrands = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  const { factories, load } = useGetPremiumFactories('items_per_page=5');

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

                {load ?
                  <SkeletonTopBrands
                    skeleton = {true}
                    skeltonNumbers = {5}
                    grid={{ span: 8 }}
                    height = {234.367}

                  /> :
                  <>
                    {factories.map((brand) => {
                      return (
                        <Col className="topBrands--item" key={ brand.company_id * 10 }>
                          <Link className="d-block h-100" to={ `/factories?factory=${brand.company_id}` }>
                            <div className="d-flex align-items-end justify-content-center topBrands--item__image">
                              <FactoriesLogo logo={ brand.logo } alt={ brand.company }/>
                            </div>
                            <div className="vv-font-size-2-2 text-47 text-center mt-3 topBrands--item__name">
                              { brand.company }
                            </div>

                            { brand.description &&
                            <div className="vv-font-size-1-9 text-8b text-center mt-3 text-truncate topBrands--item__name">
                              {fn_stripHtml(brand.description) }
                            </div>
                            }
                          </Link>
                        </Col>
                      );
                    })}
                  </>
                }

              </> :
              <Col className="topBrands--scroll" span={24}>
                <ScrollContainer className="text-select-none d-flex topBrands--scrollContainer">

                  {load ?
                    <SkeletonTopBrands
                      skeleton = {true}
                      skeltonNumbers = {5}
                      swiper
                    /> :
                    <>
                      {factories.map((brand) => {
                        return (
                          <div className="d-inline topBrandsScroll--item__content" key={brand.company_id}>
                            <Row className="topBrandsScroll--item" justify="center">
                              <div className="d-flex align-items-end justify-content-center w-100 topBrands--item__image">
                                <FactoriesLogo logo={ brand.logo } alt={ brand.company }/>
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