// import Styles For default:
import './styles/DefaultFooter.less';

// Ant Design Import:
import { Row, Col, Space, Button, Tooltip, Skeleton } from 'antd';

// import Custom Hooks:
import { useGetApi, useWindowSize } from '../../../functions';

// import logo:
import appleStore from "../../assets/images/appleStore.svg";
import googlePlay from "../../assets/images/googlePlay.svg";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import React from "react";
import { Link } from "react-router-dom";
import { useGetConfig } from "../../../contexts/config/ConfigContext";

const DefaultFooter = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  let spaceSize;

  if (width >= 992) {
    spaceSize = 'large';
  }else{
    spaceSize = 'small';
  }

  // get initial config:
  const { config } = useGetConfig();

  // get categories from API:
  const { isLoading: categoriesIsLoading, data: categories_data } = useGetApi(`home-categories-api`, '', `allCategories`);
  const { categories } = categories_data || [];

  const { isLoading: pagesIsLoading, data: pages_data } = useGetApi(`footer-pages-api`, "store_id=440", `footerPage`);

  const pages = pages_data || [];

  // set initial link for instagram related to each language: (comment now. because commented social networks link)
  //let instagramLink = config.language === 'en' ? "https://instagram.com/hornb2b" : config.language === 'fa' ? "https://instagram.com/hornb2b.ir" : config.language === 'ar' ? "https://instagram.com/horn.ar" : "https://instagram.com/hornb2b";

  // Mobile Application Coming Son Tooltip Text:
  const comingSonTooltipText = <span>{ t(__('coming son')) }</span>;

  return (
    <Row className="footer--container">
      {/*<Col className="bg-footer footer--container__topSection" span={24}>
        <Row justify="space-between">
          <Col>
            <Space className="" size={ spaceSize }>
              <div className="footer--topSection__logoApp" />
              <div className="d-inline my-auto">
                <div className="d-none d-lg-inline">
                  <div className="vv-font-size-2-2 font-weight-600 text-white d-inline">{ t(__('Download the Alaedeen App for iOS or Android')) }</div>
                  <i className={ `fas fa-angle-${config.language === 'en' ? 'right' : 'left'} text-bc vv-font-size-1-7 ${config.language === 'en' ? '' : 'align-middle'}` } />
                </div>

                <span className="d-block d-lg-none vv-font-size-1-4 font-weight-bold text-white">{ t(__('Download the Alaedeen app')) }</span>
                <span className="d-block d-lg-none mt-1 vv-font-size-1-3 font-weight-600 text-white">{ t(__('Buy and sell safely and cheaply')) }</span>
              </div>
            </Space>
          </Col>

          <Col className="mt-2 d-none d-lg-block">
            <Space size="large">
              <div className="footer--topSection__storeIcon">
                <Tooltip placement="top" title={comingSonTooltipText}>
                  <img className="border border-bc rounded-5" src={ appleStore } alt="_app_store" />
                </Tooltip>
              </div>
              <div className="footer--topSection__storeIcon">
                <Tooltip placement="top" title={comingSonTooltipText}>
                  <img className="border border-bc rounded-5" src={ googlePlay } alt="_google_play" />
                </Tooltip>
              </div>
            </Space>
          </Col>

          <Col className="d-lg-none my-auto footer--topSection__btnInstall">
            <Tooltip placement="top" title={comingSonTooltipText}>
              <Button className="border border-primary bg-primary border-w-2 text-white font-weight-600 p-0" size="small">{ t(__('Install')) }</Button>
            </Tooltip>
          </Col>
        </Row>
      </Col>*/}

      <Col className="bg-footer-light footer--container__middleSection" span={24}>
        <Row className="row-cols-2 row-cols-md-3" gutter={[8, 24]}>
          <Col>
            <Row gutter={[0, 5]}>
              <Col className="text-white vv-font-size-1-7 font-weight-600 mb-4" span={24}>
                { t(__('Tips and Help')) }
              </Col>

              {pagesIsLoading &&
                <>
                  <Col span={24} className="text-47">
                    <Skeleton.Input style={{ width: "calc(.5 * 31vw + 50%)", height: "3vh" }} active={true} size={"small"} />
                  </Col>
                  <Col span={24} className="text-47">
                    <Skeleton.Input style={{ width: "calc(.5 * 37vw + 50%)", height: "3vh" }} active={true} size={"small"} />
                  </Col>
                  <Col span={24} className="text-47">
                    <Skeleton.Input style={{ width: "calc(.5 * 20vw + 50%)", height: "3vh" }} active={true} size={"small"} />
                  </Col>
                  <Col span={24} className="text-47">
                    <Skeleton.Input style={{ width: "calc(.5 * 35vw + 50%)", height: "3vh" }} active={true} size={"small"} />
                  </Col>
                </>
              }

              {pages?.map(page => {
                return(
                  <Col key={`footerPage_${page.page_id}`} className="text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    <Link to= {`/page/${page.seo_name}`} className={!page?.description ? 'link--disable': ''}>
                      { page.page}
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>

          <Col>
            <Row gutter={[0, 5]}>
              <Col className="text-white vv-font-size-1-7 font-weight-600 mb-4" span={24}>
                { t(__('Explore')) }
              </Col>

              { categoriesIsLoading &&
                <>
                  <Col span={ 24 } className="text-47">
                    <Skeleton.Input style={ { width: "calc(.5 * 31vw + 50%)", height: "3vh" } } active={ true }
                                    size={ "small" }/>
                  </Col>
                  <Col span={ 24 } className="text-47">
                    <Skeleton.Input style={ { width: "calc(.5 * 37vw + 50%)", height: "3vh" } } active={ true }
                                    size={ "small" }/>
                  </Col>
                  <Col span={ 24 } className="text-47">
                    <Skeleton.Input style={ { width: "calc(.5 * 20vw + 50%)", height: "3vh" } } active={ true }
                                    size={ "small" }/>
                  </Col>
                  <Col span={ 24 } className="text-47">
                    <Skeleton.Input style={ { width: "calc(.5 * 35vw + 50%)", height: "3vh" } } active={ true }
                                    size={ "small" }/>
                  </Col>
                </>
              }

              {categories?.slice(0, 6)?.map((category) => {
                return (
                  <Col key={category?.category_id} className="text-white vv-font-size-1-5 footer--middleSection-link" span={24}>
                    {/*link: /categories/${category?.seo_name}*/}
                    <Link to={ `/categories/${category?.seo_name}` } className={category?.p_count === 0 ? 'link--disable': ''}>
                      { category.category }
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Col>

      <Col className="bg-footer footer--container__bottomSection" span={24}>
        {/* justify={ width >= 992 ? "space-between": 'center' }: fealan shabake ejtemayi comment shod. */}
        <Row justify="center">
          <Col xs={{ order: 2 }} lg={{ order: 1 }} className="vv-font-size-1-4 text-white mt-3 my-lg-auto">
            © 2018 - 2021 {t(__('footer_reserved_msg'))}
          </Col>
          {/*<Col xs={{ order: 1 }} lg={{ order: 2 }} className="my-lg-auto">
            <Space size="middle">
              <div className="footer--bottomSection-socialLink facebook">
                <a href="#" className="">
                  <i className="fab fa-facebook-f" />
                </a>
              </div>

              <div className="footer--bottomSection-socialLink instagram">
                <a className="" href={instagramLink} target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram" />
                </a>
              </div>

              <div className="footer--bottomSection-socialLink twitter">
                <a href="#" className="">
                  <i className="fab fa-twitter" />
                </a>
              </div>

              <div className="footer--bottomSection-socialLink youtube">
                <a href="#" className="">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </Space>
          </Col>*/}
        </Row>
      </Col>
    </Row>
  );
};

export { DefaultFooter };