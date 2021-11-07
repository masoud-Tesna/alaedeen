import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";

//import style file:
import './styles/Categories.less';

//  import ant design components:
import { Button, Carousel, Col, Collapse, Pagination, Row, Space, Typography } from "antd";

// import config context:
import { useGetConfig } from "../contexts/config/ConfigContext";

// import helper functions:
import { useGetApi, useQueryString, useWindowSize } from "../functions";

// import helpers function:
import { __, splitArray } from "../functions/Helper";
import { useTranslation } from "react-i18next";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

import { Helmet } from "react-helmet";

// import product show and product skeleton show:
const CategoryOneColumn = lazy(() => import('../layouts/blocks/product_list_templates/CategoryOneColumn'));
const CategoryMultiColumn = lazy(() => import('../layouts/blocks/product_list_templates/CategoryMultiColumn'));

// import filters show:
const ProductFilters = lazy(() => import('../layouts/blocks/product_filters'));
const SubCategoriesSwiperMobile = lazy(() => import('./categories/SubCategoriesSwiperMobile'));
const SubCategoriesSwiperDesktop = lazy(() => import('./categories/SubCategoriesSwiperDesktop'));
const LoaderSpinner = lazy(() => import('../layouts/blocks/static_templates/LoadSpinner'));

const Categories = () => {

  // get initial config
  const { config } = useGetConfig();
  //const { configDispatch } = useConfigDispatch();

  const { t } = useTranslation();

  // get window width
  const { width } = useWindowSize();

  // initial for work in URL
  const history = useHistory();
  const query = useQueryString();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // get category path from url:
  const { category: categorySeoName } = useParams();

  // get url data lang:
  /*const { data: urlData } = useGetApi(`url-lang-api`, `path=${categorySeoName}&type=c`, `url_data_${categorySeoName}`);

  if (urlData && urlData?.lang_code) {
    if (urlData?.lang_code !== config.language) {
      configDispatch(changeLanguageAction(urlData?.lang_code));
    }
  }*/

  // initial state show product column:
  const [productShowType, setProductShowType] = useState(window.localStorage.getItem('productShowType') || "oneColumn");

  const productShowTypeHandleClick = showType => {
    window.localStorage.setItem("productShowType", showType);
    setProductShowType(showType);
  }

  // create page state for paging
  const [page, setPage] = useState(query.get("page") || 1);

  // create page state for paging
  const storeId = query.get("store_id");

  // create initial filters state:
  const [filtersApi, setFiltersApi] = useState([]);

  // for working in select feature (featuresHashContainer: if selecting any feature, featuresHash: if click confirm filter):
  const [featuresHashContainer, setFeaturesHashContainer] = useState("");
  const [featuresHash, setFeaturesHash] = useState("");


  const [isLoadingHandle, setIsLoadingHandle] = useState(false);

  // if change category path => remove page and features_hash from URL & reset page, filtersApi, featuresHash and featuresHashContainer state:
  useEffect(() => {

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

  }, [categorySeoName]);

  // get category filters:
  useEffect(() => {
    let mount = true;
    // function for get category filters::
    async function getProductFilters() {
      setIsLoadingHandle(true);
      const url = `https://alaedeen.com/horn/product-filters-api/?category_path=${categorySeoName}&features_hash=${featuresHashContainer}&lang_code=${config.language}${storeId ? `&store_id=${storeId}` : ''}`;
      return await axios.get(url);
    }

    if (config.language && mount) {
      getProductFilters()
        .then(res => {
          // category filters add to filtersApi state:
          setFiltersApi(res.data);
          setIsLoadingHandle(false);
        });
    }
    return () => {
      mount = false;
    }

  }, [featuresHashContainer, categorySeoName, config.language, storeId]);
  // get filters and sub categories from filtersApi Or empty array:
 const {filters, subCategories} = filtersApi || [];

/*  const { isLoading: load2, data: filter2 } = useGetApi(`product-filters-api`, `category_path=${categorySeoName}&features_hash=${featuresHashContainer}&lang_code=${config.language}${storeId ? `&store_id=${storeId}` : ''}`, `filter2_${categorySeoName}${page ? `_${page}` : ''}${featuresHashContainer ? `_${featuresHashContainer}` : ''}${storeId ? `_${storeId}` : ''}`);

  const {filters, subCategories} = filter2 || [];*/

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

        /*setFeaturesHash(prevState => {
          if (prevState) {
            return res.data
          }
        });*/
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
    history.push(`/categories/${categorySeoName}/?page=${page}${featuresHashContainer && `&features_hash=${featuresHashContainer}`}${storeId ? `&store_id=${storeId}` : ''}`);
  }

  // get products from API before selecting filters and after selecting filter:
  const { isLoading, data: product_data } = useGetApi(`products-api`, `category_path=${categorySeoName}&items_per_page=20&page=${page}&features_hash=${featuresHash}${storeId ? `&store_id=${storeId}` : ''}`, `category_product_${categorySeoName}${page ? `_${page}` : ''}${featuresHash ? `_${featuresHash}` : ''}${storeId ? `_${storeId}` : ''}`);

  // get products and params from product_data Or empty array:
  const { products, categoryBanners, params} = product_data || [];

  // scroll to productContentDesktop ref if desktop mode or productContentMobile ref if mobile mode (if change categorySeoName, page and products state):
  const productContentDesktop = useRef(null);
  const productContentMobile = useRef(null);
  useEffect(() => {
/*    if (width >= 992) {
      productContentDesktop.current.scrollIntoView({ behavior: "smooth" });
    } else {
      productContentMobile.current.scrollIntoView({ behavior: "smooth" });
    }*/
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [page]);

  // function for handle change page:
  const handleChangePage = pageNumber => {
    // add selecting page number in to page state (refetch for get products):
    setPage(pageNumber);

    // attaching filter hash and page in to url:
    history.push(`/categories/${categorySeoName}/?page=${pageNumber}${featuresHashContainer && `&features_hash=${featuresHashContainer}`}${storeId ? `&store_id=${storeId}` : ''}`);
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



  // ref for access category slider:
  const subCategorySliderRef = useRef();

  // function for next sub category slider:
  const handleSubCategorySliderNext = () => subCategorySliderRef.current.next();

  // function for previous sub category slider:
  const handleSubCategorySliderPrev = () => subCategorySliderRef.current.prev();

  // split sub categories to 6 item:
  let splitSubCategories = [];
  if (subCategories) {
    splitSubCategories = splitArray(subCategories, 6);
  }

  // filter show or hide in mobile device by filter btn:
  const [filterContentMobileToggle, setFilterContentMobileToggle] = useState("");

  const { Panel } = Collapse;


  const [ellipsisCategoryDesc, setEllipsisCategoryDesc] = useState(true);

  const { Paragraph } = Typography;

  const categoryDescWithSubCategory = useRef();

  const categoryDescWithSubCategoryHandle = () => {
    setEllipsisCategoryDesc(prevState => !prevState);
    if (!ellipsisCategoryDesc) {
      return categoryDescWithSubCategory.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const categoryDescWithoutSubCategory = useRef();

  const categoryDescWithoutSubCategoryHandle = () => {
    setEllipsisCategoryDesc(prevState => !prevState);
    if (!ellipsisCategoryDesc) {
      return categoryDescWithoutSubCategory.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Row className="mt-0 mt-lg-4 products--container" gutter={[0, 23]}>

      <Helmet>
        <title>{ `Alaedeen.com | ${params?.category_name || t(__('categories'))}` }</title>
        <link rel="canonical" href={ `https://alaedeen.com/categories/${categorySeoName}` } />
      </Helmet>

      {(isLoadingHandle || isLoading) &&
      <Suspense fallback="...">
        <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/>
      </Suspense>
      }

      {subCategories?.length > 0 &&
        <Col span={24}>
          <Row className="test" gutter={{ xs: 0, lg: 20 }}>
          {width >= 992 ?
            <>
              <Col span={6}>
                <Row className="bg-white shadow-y rounded-lg p-4 subCategoriesSlider" style={{ height: categoryBanners?.length > 0 ? '100%' : 410.767 }}>
                  <Col span={24}>
                    <Row>
                      <Col span={24}>
                        <Row justify={"space-between"} align={"middle"}>
                          <Col className="vv-font-size-2 font-weight-600 text-uppercase">
                            { t(__('categories')) }
                          </Col>

                          {subCategories?.length > 6 &&
                          <Col>
                            <Space size={12}>
                              <i className={ `fa fa-chevron-${config.language === 'en' ? 'left' : 'right'} text-47 vv-font-size-1-7 vv-cursor-pointer` } onClick={handleSubCategorySliderPrev} />
                              <i className={ `fa fa-chevron-${config.language === 'en' ? 'right' : 'left'} text-47 vv-font-size-1-7 vv-cursor-pointer` } onClick={handleSubCategorySliderNext} />
                            </Space>
                          </Col>
                          }

                        </Row>
                      </Col>
                      <Col span={24} className="mt-4">
                        <Carousel
                          dots={false}
                          autoplay={false}
                          ref={subCategorySliderRef}
                        >
                          {splitSubCategories?.map((splitSubCategory, index) => {
                            return (
                              <div key={ `splitSubCategory_${index}` }>
                                <Row gutter={[0, 8]}>
                                  {splitSubCategory?.map(subCategory => {
                                    return(
                                      <Col key={`subCategoriesSlider_${subCategory?.category_id}`} span={24} className="subCategoriesSlider--item">
                                        <Link to={ `/categories/${subCategory?.seo_name}` } className={subCategory?.p_count === 0 && 'categoryLink--disable'}>{ subCategory?.category }</Link>
                                      </Col>
                                    )
                                  })}
                                </Row>
                              </div>
                            )
                          })}
                        </Carousel>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={18}>
                <Row className="h-100" gutter={[0, 10]}>

                  {categoryBanners?.length > 0 &&
                  <Col span={24} className="categoriesCarousel">
                    <Carousel draggable={true} pauseOnDotsHover={true} rtl={true}>

                      {isLoading ?
                        <span>Loading!</span> :
                        categoryBanners.map(categoryBanner => {
                          return (
                            <div className="categoriesCarousel--item" key={`category_banner${categoryBanner.object_id}`}>
                              <img className="d-block w-100" src={categoryBanner.value} alt="" />
                            </div>
                          )
                        })
                      }

                    </Carousel>
                  </Col>
                  }

                  <Col span={24} className="subCategoriesSwiper">
                    <Suspense fallback="...">
                      <SubCategoriesSwiperDesktop subCategories={subCategories || []} />
                    </Suspense>
                  </Col>

                  { (params?.category_description !== "" && categoryBanners?.length === 0) &&
                    <Col span={24} className="category-description" ref={categoryDescWithSubCategory}>

                      <Paragraph ellipsis={ellipsisCategoryDesc ? { rows: 4 } : false} className="vv-font-size-2 text-70 font-weight-500">
                        <div dangerouslySetInnerHTML={ { __html: params?.category_description }} />
                      </Paragraph>

                      <div className="text-center" onClick={() => categoryDescWithSubCategoryHandle()}>
                        <i className="fas fa-grip-lines text-primary display-6 d-block cursor-pointer" />
                        <i className={ `fas fa-angle-${ellipsisCategoryDesc ? 'down' : 'up'} open-desc text-primary display-6 d-block cursor-pointer` } />
                      </div>
                    </Col>
                  }
                </Row>
              </Col>
            </> :
            <>
              <Suspense fallback="...">
                <SubCategoriesSwiperMobile subCategories={subCategories || []} category_name = {params?.category_name || ""} />
              </Suspense>

              { (params?.category_description !== "" && categoryBanners?.length === 0) &&
                <Col span={24} className="category-description" ref={categoryDescWithSubCategory}>

                  <Paragraph ellipsis={ellipsisCategoryDesc ? { rows: 4 } : false} className="vv-font-size-2 text-70 font-weight-500">
                    <div dangerouslySetInnerHTML={ { __html: params?.category_description }} />
                  </Paragraph>

                  <div className="text-center" onClick={() => categoryDescWithSubCategoryHandle()}>
                    <i className="fas fa-grip-lines text-primary display-6 d-block cursor-pointer" />
                    <i className={ `fas fa-angle-${ellipsisCategoryDesc ? 'down' : 'up'} open-desc text-primary display-6 d-block cursor-pointer` } />
                  </div>
                </Col>
              }
            </>

          }
        </Row>
        </Col>
      }

      <Col className="products-content" span={24} ref={productContentDesktop}>
        <div className="h-100">
          <Row gutter={{ xs: 0, lg: 20 }}>
            {width < 992 &&
              <>
                {(params?.category_description !== "" && subCategories?.length === 0) &&
                  <Col span={24} className="category-description" ref={categoryDescWithoutSubCategory}>

                  <Paragraph ellipsis={ellipsisCategoryDesc ? { rows: 4 } : false} className="vv-font-size-2 text-70 font-weight-500">
                    <div dangerouslySetInnerHTML={ { __html: params?.category_description }} />
                  </Paragraph>

                  <div className="text-center" onClick={() => categoryDescWithoutSubCategoryHandle()}>
                    <i className="fas fa-grip-lines text-primary display-6 d-block cursor-pointer" />
                    <i className={ `fas fa-angle-${ellipsisCategoryDesc ? 'down' : 'up'} open-desc text-primary display-6 d-block cursor-pointer` } />
                  </div>
                </Col>
                }

                <Col span={24} className="mb-4">
                  <Row gutter={5} align={"middle"}>
                    <Col span={13} className="text-truncate">
                      <span className="text-47 vv-font-size-1-2rem">{products?.length} {t(__('products'))}:</span>
                      <span className="text-91 vv-font-size-1-2rem">{params?.category_name}</span>
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
                        <Suspense fallback="...">
                          <ProductFilters
                            filters = {filters}
                            category_id = {params?.category_id || ""}
                            category_seo_name = {categorySeoName || ""}
                            category_name = {params?.category_name || ""}
                            subCategories = {subCategories || []}
                            product_length = {products?.length || ""}
                            featuresHashContainer = {featuresHashContainer}
                            featureHandleClick={featureHandleClick}
                            featureRemoveHandleClick={featureRemoveHandleClick}
                            featureResetHandleClick={handleResetFilter}
                            handleConfirmFilters={handleConfirmFilters}
                          />
                        </Suspense>
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
            <Suspense fallback="...">
              <ProductFilters
                filters = {filters}
                category_id = {params?.category_id || ""}
                category_seo_name = {categorySeoName || ""}
                category_name = {params?.category_name || ""}
                subCategories = {subCategories || []}
                product_length = {products?.length || ""}
                featuresHashContainer = {featuresHashContainer}
                featureHandleClick={featureHandleClick}
                featureRemoveHandleClick={featureRemoveHandleClick}
                featureResetHandleClick={handleResetFilter}
                handleConfirmFilters={handleConfirmFilters}
              />
            </Suspense>
            }

            <Col xs={24} lg={18} ref={productContentMobile}>
              <Row  gutter={[0, 22]}>

                {(params?.category_description !== "" && subCategories?.length === 0 && width >= 992) &&
                  <Col span={24} className="category-description" ref={categoryDescWithoutSubCategory}>

                    <Paragraph ellipsis={ellipsisCategoryDesc ? { rows: 4 } : false} className="vv-font-size-2 text-70 font-weight-500">
                      <div dangerouslySetInnerHTML={ { __html: params?.category_description }} />
                    </Paragraph>

                    <div className="text-center" onClick={() => categoryDescWithoutSubCategoryHandle()}>
                      <i className="fas fa-grip-lines text-primary display-6 d-block cursor-pointer" />
                      <i className={ `fas fa-angle-${ellipsisCategoryDesc ? 'down' : 'up'} open-desc text-primary display-6 d-block cursor-pointer` } />
                    </div>
                  </Col>
                }

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
                            <Suspense fallback="...">
                              <CategoryOneColumn
                                key = { i }
                                product={product}
                              />
                            </Suspense>
                          );
                        })
                        }

                        {/*if product show type === multiColumn*/}
                        {productShowType === 'multiColumn' &&
                        <Col span={24}>
                          <Row className="h-100" gutter={[ { xs:8, lg: 23 }, { xs:10, lg: 23 }]} justify={"center"}>
                            { products?.map((product, i) => {
                              return (
                                <Suspense fallback="...">
                                  <CategoryMultiColumn
                                    key={ i }
                                    product={ product }
                                    allDetails
                                    widthProductImage={ width >= 768 ? 194 : 170 }
                                    heightProductImage={ width >= 768 ? 194 : 170 }
                                  />
                                </Suspense>
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

export default Categories;
