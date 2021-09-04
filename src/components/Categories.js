import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

//import style file:
import './styles/Categories.less';

//  import ant design components:
import { Col, Pagination, Row } from "antd";

// import language context:
import { useGetLanguageState } from "../contexts/language/LanguageContext";

// import helper functions:
import { useGetApiQuery, useQueryString, useWindowSize } from "../functions";

// import product show and product skeleton show:
import SkeletonMultiColumnVertical from "../layouts/blocks/product_list_templates/SkeletonMultiColumnVertical";
import ProductsBoxForCategory from "../layouts/blocks/product_list_templates/ProductsBoxForCategory";
import { useTranslation } from "react-i18next";
import { __ } from "../functions/Helper";
import ProductFilters from "../layouts/blocks/product_filters";
import axios from "axios";

const Categories = () => {

  // get initial language
  const { language } = useGetLanguageState();

  // get window width
  const { width } = useWindowSize();

  // initial for work in URL
  const history = useHistory();
  const query = useQueryString();
  const location = useLocation();

  // get category path from url:
  const { category: categorySeoName } = useParams();

  // create page state for paging
  const [page, setPage] = useState(query.get("page") || 1);

  // create initial filters state:
  const [filtersApi, setFiltersApi] = useState([]);

  // for working in select feature (featuresHashContainer: if selecting any feature, featuresHash: if click confirm filter):
  const [featuresHashContainer, setFeaturesHashContainer] = useState("");
  const [featuresHash, setFeaturesHash] = useState("");

  // if change category path remove reset page, filtersApi, featuresHash and featuresHashContainer & remove page and features_hash from url:
  useEffect(() => {

    setPage(1);
    setFiltersApi([]);
    setFeaturesHash([]);
    setFeaturesHashContainer([]);
    query.delete('features_hash');

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
  const { isLoading, data: product_data } = useGetApiQuery(`products-api`, `category_path=${categorySeoName}&items_per_page=20&page=${page}&features_hash=${featuresHash}`, `category_product_${categorySeoName}_${page}_${featuresHash}`);

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
              <Row className="h-100" justify="center" gutter={[ { xs: 16, md: 50 }, 22]}>

                {isLoading ?
                  <SkeletonMultiColumnVertical
                    skeleton = {true}
                    skeltonNumbers ={ 20 }
                    width = { width >= 768 ? 233 : 120 }
                    height = {width >= 768 ? 233 : 120}
                  /> :
                  <>
                    {products?.map((product, i) => {
                      return (
                        <ProductsBoxForCategory
                          key = { i }
                          product={product}
                        />
                      );
                    })}
                  </>
                }

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
