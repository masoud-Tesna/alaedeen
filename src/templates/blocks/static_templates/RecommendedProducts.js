// import Style File:
import './styles/RecommendedProducts.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

// import Another Components Used:
import ProductsMultiColumnVertical from "../product_list_templates/ProductsMultiColumnVertical";
import SkeletonMultiColumnVertical from "../product_list_templates/skeletons/SkeletonMultiColumnVertical";

// import Custom hooks:
import { useGetApiOld, useWindowSize } from "../../../utilities/functions";

// import helper functions:
import { __ } from '../../../utilities/functions/Helper';

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RecommendedProducts = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  const product_items_per_page = width >= 992 ? 20 : 12;

  // get products from API:
  const { isLoading, data } = useGetApiOld(
    `recommended-api`,
    `recShowHome=Y&items_per_page=${product_items_per_page}`,
    `recommendedHomeProducts_${product_items_per_page}`,
    {
      refetchOnWindowFocus: false
    }
  );
  const { products } = data || [];

  let productsMultiColumnVertical_items = { span: 8 };

  if (width < 992) {
    productsMultiColumnVertical_items = { span: 12 };
  }

  return (
    <div className="recommendedProducts--container">
      <Row>
        <Col className="recommendedProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 992 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
              { t(__('Recommended for you')) }
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="productsMultiColumnVertical--container">
            <Row className="productsMultiColumnVertical--items row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" justify="center" gutter={[16, 20]}>

              {isLoading ?
                <SkeletonMultiColumnVertical
                  skeleton = {true}
                  skeltonNumbers = {width >= 992 ? 20 : 12}
                  grid={productsMultiColumnVertical_items}
                  width = { width }
                  height = {width >= 992 ? 363.933 : 273.05}
                /> :
                <>
                  {products?.map(product => {
                    return (
                      <ProductsMultiColumnVertical
                        key = { `RecommendedProducts_${product?.product_id}` }
                        className="bg-white rounded-10 shadow-y-2"
                        product={product}
                        allDetails
                        widthProductImage={width >= 992 ? 287 : 164}
                        heightProductImage={width >= 992 ? 230 : 170}
                      />
                    );
                  })}
                </>
              }

            </Row>
            <div className="text-center mt-5 productsMultiColumnVertical--item__loadMore">
              <Link className="text-47 rounded-md border border-primary d-inline-block" to={ "/recommended" }>
                { t(__('Show More')) }
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecommendedProducts;