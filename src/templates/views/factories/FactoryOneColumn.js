// import style file:
import "./styles/FactoryOneColumn.less";

// import ANT Design Components Used:
import { Button, Col, Row, Space, Image, Skeleton } from "antd";
import { CommentOutlined } from "@ant-design/icons";

// import Custom hooks:
import { useWindowSize } from "../../../functions";

// import Verified
import verifiedIcon from "../../assets/images/verified.png";

// import Another Package used:
import TextTruncate from "react-text-truncate";

// import Skeleton used:
import SkeletonFactoriesShow from "../../blocks/skeletons/SkeletonFactoriesShow";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import React from "react";

const FactoryOneColumn = ({ factories, isLoading, selectedStoreId }) => {

  const { t } = useTranslation();
  const { width } = useWindowSize();

  const FactoriesLogo = ({ logo, imageAlt, object_id, store_type }) => {

    // get initial config:
    const { config } = useGetConfig();

    const logoSizeMobile = 53;

    if ((config.language === 'en' || config.language === 'ar') && logo.en) {
      return (
        <ShowResponsiveImage
          imagePath={ logo?.en }
          imageFolder='company_logo'
          width={logoSizeMobile}
          height={logoSizeMobile}
          skeletonWidth={ `${logoSizeMobile}px` }
          skeletonHeight={ `${logoSizeMobile}px` }
          skeletonSvgWidth="3rem"
          skeletonRadius="50%"
          imageAlt={ imageAlt }
          object_id={object_id}
          object_type={`company_logo_en`}
        />
      );
    }

    if (config.language === 'fa' && logo.fa) {
      return (
        <ShowResponsiveImage
          imagePath={ logo.fa }
          imageFolder='company_logo'
          width={logoSizeMobile}
          height={logoSizeMobile}
          skeletonWidth={ `${logoSizeMobile}px` }
          skeletonHeight={ `${logoSizeMobile}px` }
          skeletonSvgWidth="3rem"
          skeletonRadius="50%"
          imageAlt={ imageAlt }
          object_id={object_id}
          object_type={`company_logo_fa`}
        />
      );
    }

    return (
      <ShowResponsiveImage
        skeletonWidth="53px"
        skeletonHeight="53px"
        skeletonRadius="50%"
        skeletonSvgWidth="3rem"
      />
    );

  }

  const ShowMainMarket = ({ mainMarkets }) => {

    const length = mainMarkets.length;
    return (
      <Space>

        {/* show market country */}
        {mainMarkets.map((mainMarket, i) => {
          return (
            i <= 3 &&
            <span key={i}>
                  { mainMarket.country }
            </span>
          );
        })}

        {/* if length of market > 4 show ... dot */}
        { length > 4 && '...' }
      </Space>
    );
  }

  // if loading for get data from api:
  if (isLoading) {
    return <SkeletonFactoriesShow
      skeleton = {true}
      skeltonNumbers = {3}
    />
  }

  return factories?.map(factory => {

    if (factory?.store_type === "A") {
      return (
        <Col span={24} key = { factory?.company_id } className={ `factory--container ${selectedStoreId === factory?.company_id ? "byParam" : ""}` }>
          <Row gutter={width >= 992 ? 16 : 0} className="bg-white rounded-10 border border-70 h-100">
            <Col flex='400px' className="d-none d-lg-block h-100 factory--imageContainer">
              <a className="d-block w-100 h-100 link--disable" href={`https://store.alaedeen.com/?store_id=${factory?.company_id}`}>
                <ShowResponsiveImage
                  imagePath={ factory?.images && factory?.images[0] }
                  imageFolder='profiles'
                  width={400}
                  height={313}
                  imageAlt={ factory?.general?.company }
                  object_id={`img_0_${factory?.company_id}`}
                  object_type={`factory_image_0`}
                />
              </a>
            </Col>
            <Col flex="1 1">
              <Row gutter={[0,10]}>
                <Col className="factory--topSection" span={24}>
                  <Row gutter={10}>
                    <Col span={8} className="product-xs d-lg-none">
                      <div className="rounded-10 shadow-y-2 text-center factory--productImage">
                        {factory?.products.length ?
                          <div className="product--image">
                            <ShowResponsiveImage
                              imagePath={ factory?.products[0]?.main_pair?.detailed?.image_path }
                              imageFolder='detailed'
                              width={120}
                              height={150}
                              skeletonWidth="100%"
                              skeletonHeight="147px"
                              imageAlt={ factory?.products[0]?.product }
                              object_id={factory?.products[0]?.product_id}
                              object_type={`prd`}
                            />
                          </div> :
                          <div className="product--image no--image">
                            <ShowResponsiveImage
                              skeletonWidth="100%"
                              skeletonHeight="147px"
                            />
                          </div>
                        }
                        <div className="factory--logo">
                          <FactoriesLogo
                            logo={ factory?.logo }
                            imageAlt={ factory?.general?.company }
                            object_id={factory?.company_id}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xs={16} lg={24}>
                      <Row gutter={[0, {xs:0, lg:5}]}>
                        <Col span={24}>
                          <Row gutter={{ xs:4, lg:10 }}>
                            <Col flex="1 1" className="text-truncate text-33 factory--name">
                              {factory?.general?.company}
                            </Col>
                            <Col flex="44px" className="factory--verified">
                              <img src={ verifiedIcon } alt="verified"/>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24} className="factory--aboutUs d-lg-none">
                          {factory?.about_us ?
                            <TextTruncate
                              className="text-33 factory--aboutUs__paragraph"
                              line={ 5 }
                              element="div"
                              truncateText=" …"
                              text={ factory?.about_us && `${t(__('About Us'))}: ${factory?.about_us}` }
                            /> :
                            <Skeleton className="factory--aboutUs__empty" active={false} paragraph={{ rows: 4 }} />
                          }
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col className="factory--middleSection" span={24}>
                  <Row className="d-lg-none row-cols-3 factory--profileDetails" gutter={15}>
                    <Col>
                      <Row gutter={ [ 0, 5 ] }>
                        <Col className="profileDetail--value text-black text-truncate" span={ 24 }>
                          {factory?.production_capability?.total_employees || "..."}
                        </Col>
                        <Col className="profileDetail--variable text-92 font-weight-600 text-truncate" span={ 24 }>
                          {t(__('Total employees'))}
                        </Col>
                      </Row>
                    </Col>

                    <Col>
                      <Row gutter={ [ 0, 5 ] }>
                        <Col className="profileDetail--value text-black text-truncate" span={ 24 }>
                          {factory?.production_capability?.factory_size || "..."}
                        </Col>
                        <Col className="profileDetail--variable text-92 font-weight-600 text-truncate" span={ 24 }>
                          {t(__('Factory size'))}
                        </Col>
                      </Row>
                    </Col>

                    <Col>
                      <Row gutter={ [ 0, 5 ] }>
                        <Col className="profileDetail--value text-black text-truncate" span={ 24 }>
                          {factory?.production_capability?.r_and_d_employees || "..."}
                        </Col>
                        <Col className="profileDetail--variable text-92 font-weight-600 text-truncate" span={ 24 }>
                          {t(__('R&D employees'))}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="d-none d-lg-flex" gutter={12}>
                    <Col span={7} className="factory--aboutUs">
                      {factory?.about_us ?
                        <TextTruncate
                          className="text-33 factory--aboutUs__paragraph"
                          line={ 5 }
                          element="div"
                          truncateText=" …"
                          text={ factory?.about_us && `${t(__('About Us'))}: ${factory?.about_us}` }
                        /> :
                        <Skeleton className="factory--aboutUs__empty" active={false} paragraph={{ rows: 4 }} />
                      }
                    </Col>

                    <Col span={17} className="factory--products">
                      <Row className="row-cols-4" gutter={16}>
                        {factory?.products.length ?
                          factory?.products.map(product => {
                            return (
                              <Col key={product?.product_id}>
                                <div className="rounded-10 shadow-y-2 text-center factory--productImage">
                                  <ShowResponsiveImage
                                    imagePath={ product?.main_pair?.detailed?.image_path }
                                    imageFolder='detailed'
                                    width={127}
                                    height={131}
                                    skeletonWidth="130px"
                                    skeletonHeight="131px"
                                    imageAlt={ product?.product }
                                    object_id={product?.product_id}
                                    object_type={`prd`}
                                  />
                                </div>
                              </Col>
                            );
                          }) :
                          new Array(4).fill("", 0, 4).map((_, i) => {
                            return(
                              <Col key={i}>
                                <div className="rounded-10 shadow-y-2 text-center factory--productImage">
                                  <ShowResponsiveImage
                                    skeletonWidth="100%"
                                    skeletonHeight="131px"
                                  />
                                </div>
                              </Col>
                            );
                          })

                        }
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col className="factory--bottomSection" span={24}>
                  <Row className="d-none d-lg-flex factory--profileDetail" gutter={15}>
                    <Col span={12}>
                      <Row className="profileDetail" gutter={[0, 4]}>
                        <Col className="text-33 profileDetail--caption" span={24}>
                          {t(__('Production capability'))}
                        </Col>
                        <Col span={24}>
                          <Row className="row-cols-3 profileDetail--content" gutter={10}>
                            <Col>
                              <Row gutter={ [ 0, 2 ] }>
                                <Col className="profileDetail--value text-black font-weight-bold text-truncate" span={ 24 }>
                                  {factory?.production_capability?.total_employees || "..."}
                                </Col>
                                <Col className="profileDetail--variable text-92 font-weight-500 text-truncate" span={ 24 }>
                                  {t(__('Total employees'))}
                                </Col>
                              </Row>
                            </Col>

                            <Col>
                              <Row gutter={ [ 0, 2 ] }>
                                <Col className="profileDetail--value text-black font-weight-bold text-truncate" span={ 24 }>
                                  {factory?.production_capability?.factory_size || "..."}
                                </Col>
                                <Col className="profileDetail--variable text-92 font-weight-500 text-truncate" span={ 24 }>
                                  {t(__('Factory size'))}
                                </Col>
                              </Row>
                            </Col>

                            <Col>
                              <Row gutter={ [ 0, 2 ] }>
                                <Col className="profileDetail--value text-black font-weight-bold text-truncate" span={ 24 }>
                                  {factory?.production_capability?.r_and_d_employees || "..."}
                                </Col>
                                <Col className="profileDetail--variable text-92 font-weight-500 text-truncate" span={ 24 }>
                                  {t(__('R&D employees'))}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={12}>
                      <Row className="profileDetail" gutter={[0, 4]}>
                        <Col className="text-33 profileDetail--caption" span={24}>
                          {t(__('Export Capability'))}
                        </Col>
                        <Col span={24}>
                          <Row className="profileDetail--content" gutter={10}>
                            <Col span={16}>
                              <Row gutter={ [ 0, 2 ] }>
                                <Col className="profileDetail--value text-black font-weight-bold text-truncate" span={ 24 }>
                                  {factory?.export_capability?.main_markets ?
                                    <ShowMainMarket mainMarkets={factory?.export_capability?.main_markets} />:
                                    <>---</>
                                  }
                                </Col>
                                <Col className="profileDetail--variable text-92 font-weight-500 text-truncate" span={ 24 }>
                                  {t(__('Main markets'))}
                                </Col>
                              </Row>
                            </Col>

                            <Col span={8}>
                              <Row gutter={ [ 0, 2 ] }>
                                <Col className="profileDetail--value text-black font-weight-bold text-truncate" span={ 24 }>
                                  {factory?.export_capability?.export_rate || "..."}
                                </Col>
                                <Col className="profileDetail--variable text-92 font-weight-500 text-truncate" span={ 24 }>
                                  {t(__('Export rate'))}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row justify="space-between">
                    <Col className="factory--location">
                      <i className="fal fa-map-marker-alt text-primary" />
                      <span className="text-47">{ factory?.general?.country }, { factory?.general?.state }</span>
                    </Col>

                    <Col>
                      <Button
                        icon={ <i className="far fa-address-book vv-font-size-1-7"/> }
                        className="p-0 bg-transparent border-0 factory--contacts"
                        size={ "large" }
                      >
                        { t(__('Contacts')) }
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      );
    }

    return (
      <Col span={12} key = { factory?.company_id } className={ `factory--container storeType--free ${selectedStoreId === factory?.company_id ? "byParam" : ""}` }>
        <Row className="bg-white rounded-10 border border-70 h-100" gutter={[0, 7]}>
          <Col className="factory--topSection" span={24}>
            <Row>
              <Col span={24} className="factory--logo">
                <FactoriesLogo
                  logo={ factory?.logo }
                  imageAlt={ factory?.general?.company }
                  object_id={factory?.company_id}
                  store_type="F"
                />
              </Col>

              <Col span={24} className="text-truncate text-33 factory--name">
                {factory?.general?.company}
              </Col>

              <Col span={24} className="factory--aboutUs mt-2">
                {factory?.about_us ?
                  <TextTruncate
                    className="text-33 factory--aboutUs__paragraph"
                    line={ 3 }
                    element="div"
                    truncateText=" …"
                    text={ factory?.about_us && `${t(__('About Us'))}: ${factory?.about_us}` }
                  /> :
                  <Skeleton className="factory--aboutUs__empty" active={false} paragraph={{ rows: 3 }} />
                }
              </Col>
            </Row>
          </Col>

          <Col className="factory--bottomSection align-self-end" span={24}>
            <Row justify="space-between">
              <Col className="factory--location">
                <i className="fal fa-map-marker-alt text-primary" />
                <span className="text-47">{ factory?.general?.country }, { factory?.general?.state }</span>
              </Col>

              <Col>
                <Button
                  icon={ <i className="far fa-address-book vv-font-size-1-7"/> }
                  className="p-0 bg-transparent border-0 factory--contacts"
                  size={ "large" }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );

  });
};

export default FactoryOneColumn;
