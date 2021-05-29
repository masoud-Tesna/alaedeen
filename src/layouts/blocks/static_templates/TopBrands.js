// import Style File:
import './styles/TopBrands.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

// import Another Components Used:
import { fn_stripHtml } from '../../../functions/Helper';
import ScrollContainer from 'react-indiana-drag-scroll';
import SkeletonTopBrands from "./SkeletonTopBrands";

// import custom hooks:
import { useGetApi, useWindowSize } from "../../../functions";

const TopBrands = () => {

  const { width } = useWindowSize();


  const { load, items } = useGetApi(`top-brands-api`, 'items_per_page=5', 'top_brands');

  return (
    <div className="topBrands--container">
      <Row>
        <Col className="topBrands--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 992 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
             Top Brands
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
                    {items.map((brand, index) => {
                      return (
                        <Col className="topBrands--item" key={ index }>
                          <div className="d-flex align-items-end justify-content-center topBrands--item__image">
                            {brand.logo ?
                              <img src={ brand.logo.image_path } alt={ brand.logo.alt }/> :
                              <i className="fal fa-image text-bf" />
                            }

                          </div>
                          <div className="vv-font-size-2-2 text-47 text-center mt-3 topBrands--item__name">
                            { brand.company }
                          </div>

                          { brand.company_description &&
                            <div className="vv-font-size-1-9 text-8b text-center mt-3 topBrands--item__name">
                              {fn_stripHtml(brand.company_description) }
                            </div>
                          }
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
                      {items.map((brand, index) => {
                        return (
                          <div className="d-inline topBrandsScroll--item__content" key={index}>
                            <Row className="topBrandsScroll--item" justify="center">
                              <div className="d-flex align-items-end justify-content-center w-100 topBrands--item__image">
                                {brand.logo ?
                                  <img src={ brand.logo.image_path } alt={ brand.logo.alt }/> :
                                  <i className="fal fa-image text-bf" />
                                }

                              </div>
                              <div className="vv-font-size-1-4 font-weight-600 text-47 text-center text-truncate mt-1 w-100 topBrands--item__name">
                                { brand.company }
                              </div>
                              { brand.company_description &&
                                <div className="vv-font-size-1-4 text-8b text-center text-truncate mt-1 w-100 topBrands--item__name">
                                  { fn_stripHtml(brand.company_description) }
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