// import Style File:
import './styles/RecommendedProducts.less';

// import ANT Design Components Used:
import { Button, Col, Row } from "antd";

// import Another Components Used:
import ProductsMultiColumnVertical from "../product_list_templates/ProductsMultiColumnVertical";
import SkeletonMultiColumnVertical from "../product_list_templates/skeletons/SkeletonMultiColumnVertical";

// import Custom hooks:
import { useGetApi, useWindowSize } from "../../../functions";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

const RecommendedProducts = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  const product_items_per_page = width >= 768 ? 20 : 12;

  // get products from API:
  const { isLoading, data: { products, show_more } } = useGetApi(`products-home-api`, `show_home=Y&items_per_page=${product_items_per_page}`, `recommendedProducts`);

  let productsMultiColumnVertical_items = { span: 8 };

  if (width <= 991) {
    productsMultiColumnVertical_items = { span: 12 };
  }

  return (
    <div className="recommendedProducts--container">
      <Row>
        <Col className="recommendedProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 768 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
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
                  skeltonNumbers = {width >= 768 ? 20 : 12}
                  grid={productsMultiColumnVertical_items}
                  width = { width }
                  height = {width >= 768 ? 363.933 : 273.05}
                /> :
                <>
                  {products?.map((product, i) => {
                    return (
                      <ProductsMultiColumnVertical
                        key = { i }
                        className="bg-white rounded-10 shadow-y-2"
                        product={product}
                        allDetails
                        widthProductImage={width >= 768 ? 287 : 164}
                        heightProductImage={width >= 768 ? 230 : 170}
                      />
                    );
                  })}
                </>
              }

            </Row>
            {(!isLoading && show_more === 'Y') &&
              <div className="text-center mt-4 productsMultiColumnVertical--item__loadMore">
                <Button className="text-47 rounded-md bg-transparent border-primary" size="large">
                  { t(__('Show More')) }
                </Button>
              </div>
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecommendedProducts;