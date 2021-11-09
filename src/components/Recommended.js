import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

//import style file:
import './styles/Categories.less';

//  import ant design components:
import { Button, Col, Collapse, Pagination, Row, Space } from "antd";

// import config context:
import { useGetConfig } from "../contexts/config/ConfigContext";

// import helper functions:
import { useGetApi, useQueryString, useWindowSize } from "../functions";

// import helpers function:
import { __ } from "../functions/Helper";
import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

// import product show and product skeleton show:
import CategoryOneColumn from "../layouts/blocks/product_list_templates/CategoryOneColumn";
import CategoryMultiColumn from "../layouts/blocks/product_list_templates/CategoryMultiColumn";

// import filters show:
import ProductFilters from "../layouts/blocks/product_filters";
import LoaderSpinner from "../layouts/blocks/static_templates/LoadSpinner";


const Recommended = () => {

  // get initial config
  const { config } = useGetConfig();

  const { t } = useTranslation();

  // get window width
  const { width } = useWindowSize();

  // initial for work in URL
  const history = useHistory();
  const query = useQueryString();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // initial state show product column:
  const [productShowType, setProductShowType] = useState(window.localStorage.getItem('productShowType') || "oneColumn");

  const productShowTypeHandleClick = showType => {
    window.localStorage.setItem("productShowType", showType);
    setProductShowType(showType);
  }

  // create page state for paging
  const [page, setPage] = useState(query.get("page") || 1);

  // create initial filters state:
  const [filtersApi, setFiltersApi] = useState([]);

  // for working in select feature (featuresHashContainer: if selecting any feature, featuresHash: if click confirm filter):
  const [featuresHashContainer, setFeaturesHashContainer] = useState("");
  const [featuresHash, setFeaturesHash] = useState("");


  const [isLoadingHandle, setIsLoadingHandle] = useState(false);

  // if change category path => remove page and features_hash from URL & reset page, filtersApi, featuresHash and featuresHashContainer state:
/*  useEffect(() => {

    // remove param from URL:
    //query.delete('page');
    //query.delete('features_hash');

    // reset states:
    setPage(query.get("page") || 1);
    //setPage(1);
    setFiltersApi([]);
    setFeaturesHash(query.get("features_hash") || "");
    //setFeaturesHash("");
    setFeaturesHashContainer(query.get("features_hash") || "");

  }, []);*/

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
          history.replace({
            search: queryParams.toString(),
          })
        }

      });
  }

  const handleResetFilter = () => {
    setFeaturesHashContainer("");

    if (queryParams.has('features_hash')) {
      queryParams.delete('features_hash')
      history.replace({
        search: queryParams.toString(),
      })
    }

    if (featuresHash) {
      setFeaturesHash("");
    }
  }

  // function for handle confirm filter btn:
  const handleConfirmFilters = () => {
    // add feature hash from featuresHashContainer state to featuresHash state for get product equal filters select:
    setFeaturesHash(featuresHashContainer);

    // attaching filter hash and page in to url: (fealan comment shod ta dorost konam)
    history.push(`/recommended/?page=${page}${featuresHashContainer && `&features_hash=${featuresHashContainer}`}`);
  }

  // get products from API before selecting filters and after selecting filter:
  const { isLoading, data: product_data } = useGetApi(`recommended-api`, `items_per_page=20&page=${page}&features_hash=${featuresHash}&pShowMore=Y`, `recommendedMoreProducts_${page ? `_${page}` : ''}${featuresHash ? `_${featuresHash}` : ''}`);

  // get products and params from product_data Or empty array:
  const { products, params} = product_data || [];

  // scroll to productContentDesktop ref if desktop mode or productContentMobile ref if mobile mode (if change categorySeoName, page and products state):
  const productContentDesktop = useRef(null);
  const productContentMobile = useRef(null);
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [page]);

  // function for handle change page:
  const handleChangePage = pageNumber => {
    // add selecting page number in to page state (refetch for get products):
    setPage(pageNumber);

    // attaching filter hash and page in to url:
    history.push(`/recommended/?page=${pageNumber}${featuresHashContainer && `&features_hash=${featuresHashContainer}`}`);
  }

  // pagination render element:
  const paginationItemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <i className ={ `fal fa-chevron-${config.language === 'en' ? 'left' : 'right'} vv-font-size-2` } />;
    }
    if (type === 'next') {
      return <i className ={ `fal fa-chevron-${config.language === 'en' ? 'right' : 'left'} vv-font-size-2` } />;
    }
    return originalElement;
  }


  // filter show or hide in mobile device by filter btn:
  const [filterContentMobileToggle, setFilterContentMobileToggle] = useState("");

  const { Panel } = Collapse;

  return (
    <Row className="mt-0 mt-lg-4 products--container" gutter={[0, 23]}>

      <Helmet>
        <title>{ t(__('recommended product')) }</title>
        <meta name="description" content={ t('alaedeen_description') } />
        <meta name="keywords" content={ t('alaedeen_keywords') } />
        <link rel="canonical" href={ `https://alaedeen.com/recommended` } />
      </Helmet>

      {(isLoadingHandle || isLoading) &&
        <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/>
      }

      <Col className="products-content" span={24} ref={productContentDesktop}>
        <div className="h-100">
          <Row gutter={{ xs: 0, lg: 20 }}>

            {width < 992 &&
              <>
                <Col span={24} className="my-4">
                  <Row gutter={5} align={"middle"}>
                    <Col span={13} className="text-truncate">
                      <span className="text-47 vv-font-size-1-2rem">{products?.length} {t(__('products'))}:</span>
                    </Col>
                    <Col span={11} className="productShowType text-right">
                      <Space size={15}>
                        <i className={ `icon-vv-list-without-options-business cursor-pointer display-6 ${productShowType === 'oneColumn' && 'active'}` } onClick={() => productShowTypeHandleClick('oneColumn')} />
                        <i className={ `icon-vv-grid-list-business cursor-pointer display-6 ${productShowType === 'multiColumn' && 'active'}` } onClick={() => productShowTypeHandleClick('multiColumn')} />
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
                          product_length = {products?.length || ""}
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

            {(width >= 992 && (filters?.length === 0 && !isLoading)) &&
            <Col span={6}>
              {/* Loading...*/}
            </Col>
            }

            {(width >= 992 && filters && filters.length !== 0) &&
              <ProductFilters
                filters = {filters}
                product_length = {products?.length || ""}
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
                    <i className={ `icon-vv-grid-list-business cursor-pointer display-6 ${productShowType === 'multiColumn' && 'active'}` } onClick={() => productShowTypeHandleClick('multiColumn')} />
                  </Space>
                </Col>
                }
                <Col span={24}>
                  <Row className={ `h-100 ${productShowType === 'oneColumn' && 'bg-white shadow-y rounded-lg rounded-md-md'}` } justify="center">

                    {isLoading ?
                      <>
                        {/* Loading...*/}
                      </> :
                      <>

                        {/*if product show type === oneColumn*/}
                        {productShowType === 'oneColumn' &&
                        products?.map((product, i) => {
                          return (
                            <CategoryOneColumn
                              product={product}
                            />
                          );
                        })
                        }

                        {/*if product show type === multiColumn*/}
                        {productShowType === 'multiColumn' &&
                        <Col span={24}>
                          <Row className="h-100" gutter={[ { xs:8, lg: 23 }, { xs:10, lg: 23 }]} justify={"center"}>
                            { products?.map((product, i) => {
                              return (
                                <CategoryMultiColumn
                                  product={ product }
                                  allDetails
                                  widthProductImage={ width >= 768 ? 194 : 170 }
                                  heightProductImage={ width >= 768 ? 194 : 170 }
                                />
                              );
                            }) }
                          </Row>
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

      {params?.total_items > 20 &&
      <Col span={24} className="text-center products--pagination">
        { (params && params.length !== 0) &&
        <Pagination
          size="default"
          total={ params.total_items }
          pageSize={20}
          defaultCurrent={page || 1}
          showSizeChanger={false}
          itemRender={paginationItemRender}
          onChange={(page) => {handleChangePage(page)}}
        />
        }
      </Col>
      }

    </Row>
  );
};

export default Recommended;
