import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

//import style file:
import './styles/Categories.less';

//  import ant design components:
import { Button, Col, Collapse, Row, Space } from "antd";

import InfiniteScroll from "react-infinite-scroller";

// import config context:
import { useGetConfig } from "../../contexts/config/ConfigContext";

// import helper functions:
import { useWindowSize } from "../../functions";

// import helpers function:
import { __, SeoGenerator } from "../../functions/Helper";
import { useTranslation } from "react-i18next";

// import product show and product skeleton show:
import CategoryOneColumn from "../blocks/product_list_templates/CategoryOneColumn";
import CategoryMultiColumn from "../blocks/product_list_templates/CategoryMultiColumn";

// import filters show:
import ProductFilters from "../blocks/product_filters";
import LoaderSpinner from "../common/LoadSpinner";
import { useInfiniteQuery } from "react-query";


import SkeletonCategoryMultiColumn from "../blocks/product_list_templates/skeletons/SkeletonCategoryMultiColumn";
import SkeletonCategoryOneColumn from "../blocks/product_list_templates/skeletons/SkeletonCategoryOneColumn";


const Recommended = () => {

  // get initial config
  const { config } = useGetConfig();

  const { t } = useTranslation();

  // get window width
  const { width } = useWindowSize();

  // initial for work in URL
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // initial state show product column:
  const [productShowType, setProductShowType] = useState(window.localStorage.getItem('productShowType') || "oneColumn");

  const productShowTypeHandleClick = showType => {
    window.localStorage.setItem("productShowType", showType);
    setProductShowType(showType);
  }

  // create initial filters state:
  const [filtersApi, setFiltersApi] = useState([]);

  // for working in select feature (featuresHashContainer: if selecting any feature, featuresHash: if click confirm filter):
  const [featuresHashContainer, setFeaturesHashContainer] = useState("");
  const [featuresHash, setFeaturesHash] = useState("");


  const [isLoadingHandle, setIsLoadingHandle] = useState(false);

  // get products from API before selecting filters and after selecting filter:
  const fetchProducts = async ({ pageParam = 1 }) => {

    const { data } = await axios.get(
      `https://alaedeen.com/horn/recommended-api/?items_per_page=20&page=${pageParam}&features_hash=${featuresHash}&recShowMore=Y`
    );

    return { results: data, nextPage: pageParam + 1 };
  };

  const {
    isLoading: productsIsLoading,
    data,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(["posts", featuresHash], fetchProducts, {
    getNextPageParam: (lastPage) => {

      const allPageInParams = Math.ceil(lastPage?.results?.params?.total_items / lastPage?.results?.params?.items_per_page);

      if (lastPage?.nextPage < allPageInParams) return lastPage?.nextPage;
      return undefined;
    }
  });

  const { pages }= data || [];

  // get filters:
  useEffect(() => {
    // function for get category filters::
    async function getProductFilters() {
      setIsLoadingHandle(true);
      const url = `https://alaedeen.com/horn/recommended-filters-api/?features_hash=${featuresHashContainer}&lang_code=${config.language}`;
      return await axios.get(url);
    }

    if (config.language) {
      getProductFilters()
        .then(res => {
          // category filters add to filtersApi state:
          setFiltersApi(res.data);
          setIsLoadingHandle(false);
        });
    }

  }, [featuresHashContainer, config.language]);
  // get filters and sub categories from filtersApi Or empty array:
  const {filters} = filtersApi || [];

  // function for handle select feature:
  const featureHandleClick = (filter_id = "", variant_id = "") => {
    // send filter_id, variant_id and featuresHashContainer for get feature hash (377-2001 eg):
    async function filterToHash() {
      setIsLoadingHandle(true);
      const url = `https://alaedeen.com/horn/products-filter-to-hash-api/?features_hash=${featuresHashContainer}&filter_id=${filter_id}&variant_id=${variant_id}`;
      return await axios.get(url);
    }

    filterToHash()
      .then(res => {
        // filter hash add to featuresHashContainer state:
        setFeaturesHashContainer(res.data);
        setIsLoadingHandle(false);
      });
  }

  // function for handle select feature:
  const featureRemoveHandleClick = (filter_id = "", variant_id = "") => {
    // send filter_id, variant_id and featuresHashContainer for remove feature from hash (377-2001 eg):
    async function filterRemoveFromHash() {
      const url = `https://alaedeen.com/horn/products-filter-delete-from-hash-api/?features_hash=${featuresHashContainer}&filter_id=${filter_id}&variant_id=${variant_id}`;
      return await axios.get(url);
    }

    filterRemoveFromHash()
      .then(res => {
        // new filter hash add to featuresHashContainer state:
        setFeaturesHashContainer(res.data);

        if (featuresHash) {
          setFeaturesHash(res.data);
        }

        if (queryParams.has('features_hash')) {
          queryParams.set('features_hash', res.data)
          navigate.replace({
            search: queryParams.toString(),
          })
        }

      });
  }

  const handleResetFilter = () => {
    setFeaturesHashContainer("");

    if (featuresHash) {
      setFeaturesHash("");
    }
  }

  // function for handle confirm filter btn:
  const handleConfirmFilters = () => {
    // add feature hash from featuresHashContainer state to featuresHash state for get product equal filters select:
    setFeaturesHash(featuresHashContainer);
  }

  // scroll to productContentDesktop ref if desktop mode or productContentMobile ref if mobile mode (if change categorySeoName, page and products state):
  const productContentDesktop = useRef(null);
  const productContentMobile = useRef(null);


  // filter show or hide in mobile device by filter btn:
  const [filterContentMobileToggle, setFilterContentMobileToggle] = useState("");

  const { Panel } = Collapse;

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [featuresHash]);

  return (
    <Row className="mt-0 mt-lg-4 products--container category-products-list" gutter={[0, 23]}>
      <SeoGenerator
        title={ t(__('recommended products')) }
        description={ t(__('recommended products')) }
        keywords={ `recommended products, recommended, ${t('alaedeen_keywords')}` }
        canonical="https://alaedeen.com/recommended"
      />

      {(isLoadingHandle || productsIsLoading) &&
        <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/>
      }

      <Col className="products-content" span={24} ref={productContentDesktop}>
        <div className="h-100">
          <Row gutter={{ xs: 0, lg: 20 }}>

            {width < 992 &&
              <>
                <Col span={24} className="my-4">
                  <Row gutter={5} align={"middle"}>
                    <Col span={11} className="productShowType text-right">
                      <Space size={15}>
                        <i className={ `icon-vv-list-without-options-business cursor-pointer display-6 ${productShowType === 'oneColumn' && 'active'}` } onClick={() => productShowTypeHandleClick('oneColumn')} />
                        <i className={ `icon-vv-grid-list-business cursor-pointer display-6 ${productShowType === 'multiColumn' ? 'active': ''}` } onClick={() => productShowTypeHandleClick('multiColumn')} />
                        <Button
                          className={ `filtersBtnCollapse ${filterContentMobileToggle === 'filterMobileCollapse' ? 'openFilter' : 'closeFilter'}` }
                          icon={<i className="fal fa-filter" />}
                          onClick={() => setFilterContentMobileToggle(prevState => !prevState ? "filterMobileCollapse" : "")}>
                          { t(__('filters')) } {filterContentMobileToggle === 'filterMobileCollapse' && '-'}
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                  <div>
                    { (filters && filters.length !== 0) &&
                    <Collapse
                      ghost
                      activeKey={ filterContentMobileToggle }
                      className="filterMobileCollapse"
                    >
                      <Panel showArrow={ false } header={ "" } className="filterMobileCollapse--panel" key="filterMobileCollapse">
                        <ProductFilters
                          filters = {filters}
                          /*product_length = {products?.length || ""}*/
                          featuresHashContainer = {featuresHashContainer}
                          featureHandleClick={featureHandleClick}
                          featureRemoveHandleClick={featureRemoveHandleClick}
                          featureResetHandleClick={handleResetFilter}
                          handleConfirmFilters={handleConfirmFilters}
                        />
                      </Panel>
                    </Collapse>
                    }
                  </div>
                </Col>
              </>
            }

            {(width >= 992 && (filters?.length === 0 && !280)) &&
            <Col span={6}>
              {/* Loading...*/}
            </Col>
            }

            {(width >= 992 && filters && filters.length !== 0) &&
              <ProductFilters
                filters = {filters}
                /*product_length = {products?.length || ""}*/
                featuresHashContainer = {featuresHashContainer}
                featureHandleClick={featureHandleClick}
                featureRemoveHandleClick={featureRemoveHandleClick}
                featureResetHandleClick={handleResetFilter}
                handleConfirmFilters={handleConfirmFilters}
              />
            }

            <Col xs={24} lg={18} ref={productContentMobile}>
              <Row  gutter={[0, 22]}>

                {width >= 992 &&
                  <Col span={24} className="text-right productShowType">
                  <Space size={"large"}>
                    <i className={ `icon-vv-list-without-options-business cursor-pointer display-6 ${productShowType === 'oneColumn' && 'active'}` } onClick={() => productShowTypeHandleClick('oneColumn')} />
                    <i className={ `icon-vv-grid-list-business cursor-pointer display-6 ${productShowType === 'multiColumn' ? 'active': ''}` } onClick={() => productShowTypeHandleClick('multiColumn')} />
                  </Space>
                </Col>
                }
                <Col span={24}>
                  <Row className={ `h-100 ${productShowType === 'oneColumn' && 'bg-white shadow-y rounded-lg rounded-md-md'}` } justify="center">

                    {/*if product show type === oneColumn*/}
                    {productShowType === 'oneColumn' &&
                      <>
                        {productsIsLoading ?
                          <Col span={24}>
                            <Row gutter={20}>
                              <SkeletonCategoryOneColumn
                                skeleton = {true}
                                skeltonNumbers = {20}
                                grid={{ span: 24 }}
                                width={width}
                                height = {width >= 992 ? 186 : 150}
                              />
                            </Row>
                          </Col> :
                          <Col span={24}>
                            <InfiniteScroll
                              hasMore={hasNextPage}
                              loadMore={fetchNextPage}
                              loader={
                                <Col span={24} key={0}>
                                  <Row gutter={20}>
                                    <SkeletonCategoryOneColumn
                                      skeleton = {true}
                                      skeltonNumbers = {1}
                                      grid={{ span: 24 }}
                                      width={width}
                                      height = {width >= 992 ? 186 : 150}
                                    />
                                  </Row>
                                </Col>
                              }
                            >
                              {pages?.map((page) =>
                                page?.results?.products.map((product, i) => {
                                  return (
                                    <CategoryOneColumn
                                      product={product}
                                    />
                                  );
                                })
                              )}
                            </InfiniteScroll>
                          </Col>
                        }
                      </>
                    }

                    {/*if product show type === multiColumn*/}
                    {productShowType === 'multiColumn' &&
                      <>
                        {productsIsLoading ?
                          <Col span={24}>
                            <Row gutter={20}>
                              <SkeletonCategoryMultiColumn
                                skeleton = {true}
                                skeltonNumbers = {20}
                                xs={12}
                                lg={6}
                                width = { width }
                                height = {width >= 992 ? 298 : 261}
                              />
                            </Row>
                          </Col> :
                          <Col span={24}>
                            <InfiniteScroll
                              hasMore={hasNextPage}
                              loadMore={fetchNextPage}
                              loader={
                                <Col span={24} key={0}>
                                  <Row gutter={20}>
                                    <SkeletonCategoryMultiColumn
                                      skeleton = {true}
                                      skeltonNumbers = {width >= 992 ? 4 : 2}
                                      xs={12}
                                      lg={6}
                                      width = { width }
                                      height = {width >= 992 ? 298 : 261}
                                    />
                                  </Row>
                                </Col>
                              }
                            >
                              <Col span={24}>



                                <Row className="h-100" gutter={[ { xs:8, lg: 23 }, { xs:10, lg: 23 }]} justify={"center"}>
                                  {pages?.map((page) =>
                                    page?.results?.products.map((product, i) => {
                                      return (
                                        <CategoryMultiColumn
                                          product={ product }
                                          allDetails
                                          widthProductImage={ width >= 992 ? 194 : 170 }
                                          heightProductImage={ width >= 992 ? 194 : 170 }
                                        />
                                      );
                                    })
                                  )}
                                </Row>
                              </Col>
                            </InfiniteScroll>
                          </Col>
                        }
                      </>
                    }

                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>

    </Row>
  );
};

export default Recommended;
