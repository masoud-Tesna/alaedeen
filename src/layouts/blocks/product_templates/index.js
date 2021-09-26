// import style file:
import './styles/ProductTemplate.less';

// import ant design components:
import {Button, Col, Row} from "antd";

import {useWindowSize} from "../../../functions";
import {useTranslation} from "react-i18next";
import {__} from "../../../functions/Helper";
import FeaturesGrid from "./components/FeaturesGrid";
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import ProductTab from "../product_tabs";

const ProductTemplate = (props) => {

  // get initial config:
  const { config } = useGetConfig();

  const { product, isLoading } = props;

  // get screen width:
  const { width } = useWindowSize();

  const { t } = useTranslation();

  const productPrice = parseFloat(product?.price).toFixed(2);
  const productListPrice = parseFloat(product?.list_price).toFixed(2);

  return (
    <Row>
      <Col span={24} className="productDetails--content">
        <Row gutter={[0, 24]}>
          <Col span={24} className="productDetails--topSection">
            <div>
              <Row gutter={20}>
                <Col span={10} className="productDetails--imageContainer">
                  <Row gutter={[0, 10]}>
                    Image Gallery
                  </Row>
                </Col>
                <Col span={14}>
                  <Row className="h-100" gutter={[0, 10]}>
                    <Col span={24} className="productDetails--title">
                      <h1>{ product?.product }</h1>
                    </Col>

                    {(config.countryCode !== 'IR' && productPrice != 0.000) &&
                      <Col span={24} className="productDetails--price">
                        <span className={ `${ width >= 768 ? 'vv-font-size-2-5' : 'vv-font-size-1-5' } text-primary font-weight-bold` }>
                          ${ productPrice }
                        </span>
                        { productListPrice != 0.00 &&
                        <span className={ `${ width >= 768 ? 'vv-font-size-2-5' : 'vv-font-size-1-5' } text-primary font-weight-bold` }> - ${productListPrice}</span>
                        }
                        {product?.quantity_unit &&
                        <span className={ ` vv-font-size-1-9 text-90 font-weight-600` }>
                            / { product?.quantity_unit }
                          </span>
                        }
                        {(product?.min_qty && product?.quantity_unit) &&
                        <span className="vv-font-size-1-9 text-90 font-weight-600">
                            | {t(__('Minimum quantity'))}: { product?.min_qty } { product?.quantity_unit }
                          </span>
                        }
                      </Col>
                    }

                    <Col span={24} className="productDetails--getLatestPrice">
                      { t(__('get latest price')) }
                    </Col>

                    <Col span={24} className="productDetails--features">
                      <FeaturesGrid features={product?.product_features} />
                    </Col>

                    <Col span={24} className="productDetails--locationRequestBtn">
                      <Row justify={"space-between"}>
                        <Col className="productDetails--location">
                          {product?.wk_location &&
                            <>
                              <i className="fal fa-map-marker-alt text-red-a0 mr-2 mr-lg-3" />
                              <span className="text-47">{ product.wk_location }</span>
                            </>
                          }
                        </Col>
                        <Col className="productDetails--requestBtn">
                          <Button className="border border-primary p-0 productsOneColumnVertical--item__sendRequestBtn" size="large">{t(__('send request'))}</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={24} className="productDetails--bottomSection">
            <div>
              <ProductTab features={product?.product_features} product_description={product?.full_description} />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductTemplate;