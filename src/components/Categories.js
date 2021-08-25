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

  const { language } = useGetLanguageState();

  const { width } = useWindowSize();

  const history = useHistory();
  const query = useQueryString();
  const location = useLocation();

  const { category: categorySeoName } = useParams();

  const initialPage = query.get("cat_path");

  const [page, setPage] = useState(initialPage || 1);

  const { isLoading, data, isFetching } = useGetApiQuery(`products-api`, `category_path=${categorySeoName}&items_per_page=20&page=${page}`, `category_product_${categorySeoName}_${page}`);

  const { products, params } = data || [];


  const paginationItemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <i className ={ `fal fa-chevron-${language === 'en' ? 'left' : 'right'} vv-font-size-2` } />;
    }
    if (type === 'next') {
      return <i className ={ `fal fa-chevron-${language === 'en' ? 'right' : 'left'} vv-font-size-2` } />;
    }
    return originalElement;
  }

  useEffect(() => {
    if (isFetching) {
      window.scrollTo(0, 0);
    }
  }, [isFetching]);

  const handleChangePage = pageNumber => {
    setPage(pageNumber);

    history.push({
      pathname: location.pathname,
      search: `?page=${pageNumber}`
    })
  }

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
                      key = { i }
                      className="bg-white rounded-5 shadow-bottom-lg"
                      product={product}
                      productsPage
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
