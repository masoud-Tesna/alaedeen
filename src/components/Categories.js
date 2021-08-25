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
import ProductsMultiColumnVertical from "../layouts/blocks/product_list_templates/ProductsMultiColumnVertical";
import SkeletonMultiColumnVertical from "../layouts/blocks/product_list_templates/SkeletonMultiColumnVertical";

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

  // set initial page:
  const initialPage = query.get("cat_path");

  // create page state for paging
  const [page, setPage] = useState(initialPage || 1);

  // get products from API:
  const { isLoading, data, isFetching } = useGetApiQuery(`products-api`, `category_path=${categorySeoName}&items_per_page=20&page=${page}`, `category_product_${categorySeoName}_${page}`);

  const { products, params } = data || [];

  // pagination render:
  const paginationItemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <i className ={ `fal fa-chevron-${language === 'en' ? 'left' : 'right'} vv-font-size-2` } />;
    }
    if (type === 'next') {
      return <i className ={ `fal fa-chevron-${language === 'en' ? 'right' : 'left'} vv-font-size-2` } />;
    }
    return originalElement;
  }

  // scroll top if change page:
  useEffect(() => {
    if (isFetching) {
      window.scrollTo(0, 0);
    }
  }, [isFetching]);

  // change title window:
  document.title = `Alaedeen.com | ${params?.category_name || 'categories'}`;

  // change page:
  const handleChangePage = pageNumber => {
    setPage(pageNumber);

    history.push({
      pathname: location.pathname,
      search: `?page=${pageNumber}`
    })
  }

  const productsMultiColumnVertical_items = width <= 991 ? { span: 12 } : { span: 6 };

  return (
    <Row className="mt-5 products--container">
      <Col className="products-content" span={24}>
        <div className="h-100">
          <Row className="h-100" justify="center" gutter={[ { xs: 16, md: 100 }, 22]}>

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
                    <ProductsMultiColumnVertical
                      key = { product.product_id }
                      className="bg-white rounded-5 shadow-bottom-lg"
                      product={product}
                      allDetails
                      grid={productsMultiColumnVertical_items}
                      widthProductImage={width >= 768 ? 280 : 170}
                      heightProductImage={width >= 768 ? 280 : 170}
                    />
                  );
                })}
              </>
            }
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
          defaultCurrent={initialPage || 1}
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
