// import style file:
import './styles/CategoryMultiColumn.less';
import { Col, Image, Row } from "antd";
import { useWindowSize } from "../../../functions";
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

const CategoryMultiColumn = (props) => {

  // get initial config:
  const { config } = useGetConfig();

  // get screen width:
  const { width } = useWindowSize();

  // check show all details:
  const { allDetails } = props;

  // get width and height product image:
  const { widthProductImage, heightProductImage } = props;

  // product data:
  const { product } = props;

  const productPrice = parseFloat(product.price).toFixed(2);
  const productListPrice = parseFloat(product.list_price).toFixed(2);

  const manufacturing_country = product.manufacturing_country;

  return (
    <Col className={ `productsMultiColumnVertical--item` } xs={12} lg={6}>
      <Row className="h-100 pb-3 pb-lg-0 bg-white shadow-y" justify="center">
        <Col className="align-self-start" span={24}>
          <Row>
            <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
              { product?.main_pair ?
                <ShowResponsiveImage
                  imagePath={ product?.main_pair?.detailed?.image_path }
                  imageFolder='detailed'
                  width={heightProductImage}
                  height={heightProductImage}
                  imageAlt={ product?.product }
                  object_id={product?.product_id}
                  object_type={`prd`}
                /> :
                <Image
                  width={widthProductImage}
                  height={heightProductImage}
                  preview={false}
                  src="error"
                  fallback="data:image/png;base64,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"
                />
              }
            </Col>

            <Col span={24} className="text-47 font-weight-bold px-3 text-truncate productsMultiColumnVertical--item__title">
              { product?.product }
            </Col>

            {(config.countryCode !== 'IR' && productPrice !== "0.00") &&
            <Col span={24} className="px-3 productsMultiColumnVertical--item__price">
                <span className={ `${ width >= 768 ? 'vv-font-size-1-9' : 'vv-font-size-1-6' } text-primary font-weight-bold` }>
                    ${ productPrice }
                  </span>
              { productListPrice !== "0.00" &&
              <span className={ `${ width >= 768 ? 'vv-font-size-1-9' : 'vv-font-size-1-6' } text-primary font-weight-bold` }>
                    - ${productListPrice}
                  </span>
              }
              {product.quantity_unit &&
              <span className={ `${ !allDetails && 'd-none d-lg-inline' } vv-font-size-1-4 text-92` }>
                    / { product.quantity_unit }
                  </span>
              }
            </Col>
            }

            {(product?.min_qty && product?.quantity_unit) &&
            <Col span={24} className="px-3 productsMultiColumnVertical--item__quantity">
                  <span className={ `${ width >= 768 ? 'vv-font-size-1-4' : 'vv-font-size-1-2rem' } text-47` }>
                    { product.min_qty } { product.quantity_unit }
                  </span>
              <span className={` ${ width >= 768 ? 'vv-font-size-1-2rem' : 'vv-font-size-1' } text-92 `}>
                    (MOQ)
                  </span>
            </Col>
            }
          </Row>
        </Col>

        <Col span={24} className="align-self-end pb-3 pt-2">
          <Row>
            <Col span={24} className="px-3 mb-2 align-self-end productsMultiColumnVertical--item__location-detailIcon">
              <Row justify="space-between" align="bottom">
                <Col className="productsMultiColumnVertical--item__location">
                  {product?.wk_location &&
                  <>
                    <i className={ `fal fa-map-marker-alt text-red-a0 mr-2 mr-lg-3 ${ width >= 768 ? 'vv-font-size-2-2' : 'vv-font-size-2' }` } />
                    <span className={ `text-47 ${ width >= 768 ? 'vv-font-size-1-7' : 'vv-font-size-1-4' } font-weight-500` }>{ product.wk_location }</span>
                  </>
                  }

                </Col>
                <Col className="align-self-end productsMultiColumnVertical--item__detailIcon">
                  <i className={ `flag-icon flag-icon-${ manufacturing_country.toLowerCase() } ${ width >= 768 ? 'vv-font-size-2' : 'vv-font-size-1-8' } mr-2` } />
                  <span className={ `${ width >= 768 ? 'vv-font-size-1-6' : 'vv-font-size-1-4' } text-92 font-weight-500` }>{ manufacturing_country }</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <a className="productsMultiColumnVertical--item__link" href={ product.link } />
    </Col>
  );
};

export default CategoryMultiColumn;