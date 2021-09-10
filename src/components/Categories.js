import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

//import style file:
import './styles/Categories.less';

//  import ant design components:
import { Col, Pagination, Row, Space } from "antd";

// import language context:
import { useGetLanguageState } from "../contexts/language/LanguageContext";

// import helper functions:
import { useGetApi, useQueryString, useWindowSize } from "../functions";

// import product show and product skeleton show:
import CategoryOneColumn from "../layouts/blocks/product_list_templates/CategoryOneColumn";
import ProductFilters from "../layouts/blocks/product_filters";
import axios from "axios";
import CategoryMultiColumn from "../layouts/blocks/product_list_templates/CategoryMultiColumn";

const Categories = () => {

  // get initial language
  const { language } = useGetLanguageState();

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

  return (
    <Row className="mt-5 products--container">
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
