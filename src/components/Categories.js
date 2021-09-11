import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

//import style file:
import './styles/Categories.less';

//  import ant design components:
import { Carousel, Col, Image, Pagination, Row, Space } from "antd";
import ShowResponsiveImage from "../layouts/common/ShowResponsiveImage";

// import language context:
import { useGetLanguageState } from "../contexts/language/LanguageContext";

// import helper functions:
import { useGetApi, useQueryString, useWindowSize } from "../functions";

// import product show and product skeleton show:
import CategoryOneColumn from "../layouts/blocks/product_list_templates/CategoryOneColumn";
import CategoryMultiColumn from "../layouts/blocks/product_list_templates/CategoryMultiColumn";

// import filters show:
import ProductFilters from "../layouts/blocks/product_filters";

// import helpers function:
import { __, splitArray } from "../functions/Helper";
import { useTranslation } from "react-i18next";

// import swiper:
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Scrollbar } from 'swiper';

// Import Swiper styles

import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

// install Swiper modules
SwiperCore.use([Scrollbar]);

const Categories = () => {

  // get initial language
  const { language } = useGetLanguageState();

  const { t } = useTranslation();

  // get window width
  const { width } = useWindowSize();

  // initial for work in URL
  const history = useHistory();
  const query = useQueryString();

  // get category path from url:
  const { category: categorySeoName } = useParams();

  // initial state show product column:
  const [productShowType, setProductShowType] = useState(window.localStorage.getItem('productShowType') || "oneColumn");

  const productShowTypeHandleClick = showType => {
    window.localStorage.setItem("productShowType", showType);
    setProductShowType(showType);
  }

  // create page state for paging
  const [page, setPage] = useState();

  // create initial filters state:
  const [filtersApi, setFiltersApi] = useState([]);

  // for working in select feature (featuresHashContainer: if selecting any feature, featuresHash: if click confirm filter):
  const [featuresHashContainer, setFeaturesHashContainer] = useState("");
  const [featuresHash, setFeaturesHash] = useState("");

  // if change category path => remove page and features_hash from URL & reset page, filtersApi, featuresHash and featuresHashContainer state:
  useEffect(() => {

    // remove param from URL:
    query.delete('page');
    query.delete('features_hash');

    // reset states:
    setPage(query.get("page") || 1);
    setFiltersApi([]);
    setFeaturesHash(query.get("features_hash") || "");
    setFeaturesHashContainer("");

  }, [categorySeoName]);

  // get category filters:
  useEffect(() => {
    // function for get category filters::
    async function getProductFilters() {
      const url = `https://alaedeen.com/horn/product-filters-api/?category_path=${categorySeoName}&features_hash=${featuresHashContainer}`;
      return await axios.get(url);
    }

    getProductFilters()
      .then(res => {
        // category filters add to filtersApi state:
        setFiltersApi(res.data);
      });

  }, [featuresHashContainer, categorySeoName]);
  // get filters and sub categories from filtersApi Or empty array:
  const {filters, subCategories} = filtersApi || [];

  // function for handle select feature:
  const featureHandleClick = (filter_id = "", variant_id = "") => {
    // send filter_id, variant_id and featuresHashContainer for get feature hash (377-2001 eg):
    async function filterToHash() {
      const url = `https://alaedeen.com/horn/products-filter-to-hash-api/?features_hash=${featuresHashContainer}&filter_id=${filter_id}&variant_id=${variant_id}`;
      return await axios.get(url);
    }

    filterToHash()
      .then(res => {
        // filter hash add to featuresHashContainer state:
        setFeaturesHashContainer(res.data);
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
      });
  }

  // function for handle confirm filter btn:
  const handleConfirmFilters = () => {
    // add feature hash from featuresHashContainer state to featuresHash state for get product equal filters select:
    setFeaturesHash(featuresHashContainer);

    // attaching filter hash and page in to url:
    history.push(`/categories/${categorySeoName}/?page=${page}&features_hash=${featuresHashContainer}`);
  }

  // get products from API before selecting filters and after selecting filter:
  const { isLoading, data: product_data } = useGetApi(`products-api`, `category_path=${categorySeoName}&items_per_page=20&page=${page}&features_hash=${featuresHash}`, `category_product_${categorySeoName}_${page}_${featuresHash}`);

  // get products and params from product_data Or empty array:
  const { products, params} = product_data || [];

  // scroll top if change categorySeoName, page and products state:
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySeoName, page, products]);

  // change document title if get params from API:
  document.title = `Alaedeen.com | ${params?.category_name || 'categories'}`;

  // function for handle change page:
  const handleChangePage = pageNumber => {
    // add selecting page number in to page state (refetch for get products):
    setPage(pageNumber);

    // attaching filter hash and page in to url:
    history.push(`/categories/${categorySeoName}/?page=${pageNumber}&features_hash=${featuresHashContainer}`);
  }

  // pagination render element:
  const paginationItemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <i className ={ `fal fa-chevron-${language === 'en' ? 'left' : 'right'} vv-font-size-2` } />;
    }
    if (type === 'next') {
      return <i className ={ `fal fa-chevron-${language === 'en' ? 'right' : 'left'} vv-font-size-2` } />;
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



  return (
    <Row className="mt-4 products--container" gutter={[0, 23]}>

      {params?.category_level && params?.category_level === 2 &&
        <Col span={24}>
          <Row gutter={20}>
            {width >= 992 &&
            <>
              <Col span={6}>
                <Row className="bg-white shadow-y rounded-lg p-4 subCategoriesSlider">
                  <Col span={24}>
                    <Row justify={"space-between"} align={"middle"}>
                      <Col className="vv-font-size-2 font-weight-600 text-uppercase">
                        { t(__('categories')) }
                      </Col>
                      <Col>
                        <Space size={12}>
                          <i className={ `fa fa-chevron-${language === 'en' ? 'left' : 'right'} text-47 vv-font-size-1-7 vv-cursor-pointer` } onClick={handleSubCategorySliderPrev} />
                          <i className={ `fa fa-chevron-${language === 'en' ? 'right' : 'left'} text-47 vv-font-size-1-7 vv-cursor-pointer` } onClick={handleSubCategorySliderNext} />
                        </Space>
                      </Col>
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
                                    <Link to={ `/categories/${subCategory?.seo_name}` }>{ subCategory?.category }</Link>
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
              <Col span={18}>
                <Row className="h-100" gutter={[0, 10]}>
                  <Col span={24} className="categoriesCarousel">
                    <Carousel draggable={true} pauseOnDotsHover={true} rtl={true}>

                      <div className="categoriesCarousel--item">
                        <img className="d-block w-100" src={`https://picsum.photos/1000/250`} alt="First slide" />
                      </div>
                      <div className="categoriesCarousel--item">
                        <img className="d-block w-100" src={`https://picsum.photos/1000/250`} alt="Second slide" />
                      </div>
                    </Carousel>
                  </Col>

                  <Col span={24} className="subCategoriesSwiper">
                    <Row gutter={10} className="bg-white py-4 px-3 h-100">

                      <Col span={24}>
                        <Swiper
                          slidesPerView={5}
                          scrollbar={{
                            "hide": true
                          }}
                        >
                          {subCategories && subCategories.map(subCategory => {
                            return(
                              <SwiperSlide key={ `subCategoriesSwiper_${subCategory?.category_id}` }>
                                <div>
                                  <Row>
                                    <Col span={24} className="text-center my-2">
                                      <div className="subCategoriesRow--image">
                                        { subCategory?.main_pair?.detailed ?
                                          <ShowResponsiveImage imagePath={ subCategory?.main_pair?.detailed?.image_path } imageFolder='detailed' width={92} height={92} imageAlt={ subCategory?.category }/> :
                                          <Image
                                            width={92}
                                            height={92}
                                            preview={false}
                                            src="error"
                                            fallback="data:image/png;base64,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"
                                          />
                                        }
                                      </div>
                                    </Col>
                                    <Col span={24} className="text-center vv-font-size-1-6 text-47  pb-2 text-truncate px-3">
                                      {subCategory?.category}
                                    </Col>
                                  </Row>
                                  <Link to={ `/categories/${subCategory?.seo_name}` } className="subCategoriesRow--link"/>
                                </div>
                              </SwiperSlide>
                            )
                          })}
                        </Swiper>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </>
            }
          </Row>
        </Col>
      }


      <Col className="products-content" span={24}>
        <div className="h-100">
          <Row gutter={20}>

            {isLoading &&
            <Col span={6}>
              {/* Loading...*/}
            </Col>
            }

            {(filters && filters.length !== 0) &&
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
              featureResetHandleClick={setFeaturesHashContainer}
              handleConfirmFilters={handleConfirmFilters}
            />
            }

            <Col span={(filters && filters.length !== 0) ? 18 : 24}>
              <Row  gutter={[0, 22]}>
                <Col span={24} className="text-right productShowType">
                  <Space size={"large"}>
                    <i className={ `icon-vv-list-without-options-business cursor-pointer display-6 ${productShowType === 'oneColumn' && 'active'}` } onClick={() => productShowTypeHandleClick('oneColumn')} />
                    <i className={ `icon-vv-grid-list-business cursor-pointer display-6 ${productShowType === 'multiColumn' && 'active'}` } onClick={() => productShowTypeHandleClick('multiColumn')} />
                  </Space>
                </Col>
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
                                key = { i }
                                product={product}
                              />
                            );
                          })
                        }

                        {/*if product show type === multiColumn*/}
                        {productShowType === 'multiColumn' &&
                          <Col span={24}>
                            <Row className="h-100" gutter={[23, 23]}>
                              { products?.map((product, i) => {
                                return (
                                  <CategoryMultiColumn
                                    key={ i }
                                    product={ product }
                                    allDetails
                                    widthProductImage={ width >= 768 ? 194 : 164 }
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

      {(products?.length !== 0 && products?.length > 20) &&
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

export { Categories };
