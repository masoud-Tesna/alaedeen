// import Style File:
import './styles/RecommendedProducts.less';

// import ANT Design Components Used:
import { Button, Col, Row } from "antd";

// import Another Components Used:
import ProductsMultiColumnVertical from "../product_list_templates/ProductsMultiColumnVertical";

import SkeletonMultiColumnVertical from "../product_list_templates/SkeletonMultiColumnVertical";
import { useGetProductApi, useWindowSize } from "../../../functions";

const RecommendedProducts = () => {

  const { width } = useWindowSize();

  const product_items_per_page = width >= 992 ? 20 : 12;
  const url = `items_per_page=${product_items_per_page}&company_id=181&page=1&lang_code=en`;

  const { load, products } = useGetProductApi(url);

  return (
    <div className="recommendedProducts--container">
      <Row>
        <Col className="recommendedProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 992 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
              Recommended for you
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="h-100 productsMultiColumnVertical--container">
            <Row className="h-100 productsMultiColumnVertical--items row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" justify="space-around" gutter={[16, 20]}>

              {products.map((product, i) => {
                return (
                  <ProductsMultiColumnVertical
                    key = { i }
                    className="bg-white rounded-10 shadow-y-2"
                    product={product}
                    allDetails
                  />
                );
              })}

              {load &&
                <SkeletonMultiColumnVertical
                  className = "bg-white rounded-10 shadow-y-2"
                  skeleton = {true}
                  sskeltonNumbers = {width >= 992 ? 20 : 12}
                />
              }

              <div className="text-center mt-4 productsMultiColumnVertical--item__loadMore">
                <Button className="text-47 rounded-md bg-transparent border-primary" size="large">
                  Show More
                </Button>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecommendedProducts;