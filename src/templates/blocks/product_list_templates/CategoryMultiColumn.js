// import style file:
import './styles/CategoryMultiColumn.less';
import { Col, Row } from "antd";
import { useWindowSize } from "../../../utilities/functions";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import { Link } from "react-router-dom";

const CategoryMultiColumn = (props) => {

  // get screen width:
  const { width } = useWindowSize();

  // check show all details:
  const { allDetails } = props;

  // get width and height product image:
  const { heightProductImage } = props;

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
              <ShowResponsiveImage
                imagePath={ product?.main_pair?.detailed?.image_path }
                imageFolder='detailed'
                width={heightProductImage}
                height={heightProductImage}
                imageAlt={ product?.product }
                object_id={product?.product_id}
                object_type={`prd`}
              />
            </Col>

            <Col span={24} className="text-47 font-weight-bold px-3 text-truncate productsMultiColumnVertical--item__title">
              { product?.product }
            </Col>

            {(productPrice !== "0.00") &&
              <Col span={24} className="px-3 productsMultiColumnVertical--item__price">
                  <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-6' } text-primary font-weight-bold` }>
                      ${ productPrice }
                    </span>
                { productListPrice !== "0.00" &&
                <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-6' } text-primary font-weight-bold` }>
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
                  <span className={ `${ width >= 992 ? 'vv-font-size-1-4' : 'vv-font-size-1-2rem' } text-47` }>
                    { product.min_qty } { product.quantity_unit }
                  </span>
              <span className={` ${ width >= 992 ? 'vv-font-size-1-2rem' : 'vv-font-size-1' } text-92 `}>
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
                    <i className={ `fal fa-map-marker-alt text-red-a0 mr-2 mr-lg-3 ${ width >= 992 ? 'vv-font-size-2-2' : 'vv-font-size-2' }` } />
                    <span className={ `text-47 ${ width >= 992 ? 'vv-font-size-1-7' : 'vv-font-size-1-4' } font-weight-500` }>{ product.wk_location }</span>
                  </>
                  }

                </Col>
                <Col className="align-self-end productsMultiColumnVertical--item__detailIcon">
                  <i className={ `fi fi-${ manufacturing_country.toLowerCase() } ${ width >= 992 ? 'vv-font-size-2' : 'vv-font-size-1-8' } mr-2` } />
                  <span className={ `${ width >= 992 ? 'vv-font-size-1-6' : 'vv-font-size-1-4' } text-92 font-weight-500` }>{ manufacturing_country }</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Link className="productsMultiColumnVertical--item__link" to={`/product/${product?.seo_name}`} />
    </Col>
  );
};

export default CategoryMultiColumn;
