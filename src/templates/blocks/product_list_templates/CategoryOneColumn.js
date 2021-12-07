// import style file:
import './styles/CategoryOneColumn.less';
import { Button, Col, Row, Space } from "antd";
import { useWindowSize } from "../../../functions";
import TextTruncate from "react-text-truncate";
import { __, fn_stripHtml } from "../../../functions/Helper";
import { useTranslation } from "react-i18next";

import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import { Link } from "react-router-dom";

const CategoryOneColumn = (props) => {

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

  // product data:
  const { product } = props;

  const productPrice = parseFloat(product.price).toFixed(2);
  const productListPrice = parseFloat(product.list_price).toFixed(2);

  return (
    <Col className="productsOneColumnVertical--item py-4 px-2" span={24}>
      <Row className="h-100 pb-3 pb-lg-0" justify="center" gutter={{ xs: 13, lg: 35 }}>

        <Col flex={ width >= 992 ? '195px' : '128px' } className="d-flex- align-items-center- justify-content-center- productsOneColumnVertical--item__image">
          <div className="imageContent">
            <ShowResponsiveImage
              imagePath={ product?.main_pair?.detailed?.image_path }
              imageFolder='detailed'
              width={width >= 992 ? 160 : 115}
              height={width >= 992 ? 160 : 115}
              imageAlt={ product?.product }
              object_id={product?.product_id}
              object_type={`prd`}
            />
          </div>
        </Col>

        <Col flex="1 1" className="text-truncate">
          <Row className="h-100" gutter={[0, 5]}>
            <Col span={24} className="text-47 font-weight-bold text-truncate productsOneColumnVertical--item__title">
              { product.product }
            </Col>

            {(productPrice !== "0.00") &&
            <Col span={24} className="productsOneColumnVertical--item__price">
              <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-3' } text-primary font-weight-bold` }>${ productPrice } </span>

              { productListPrice !== "0.00" &&
              <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-3' } text-primary font-weight-bold` }> - ${productListPrice}</span>
              }

              {product.quantity_unit &&
              <span className={ `${ width >= 992 ? 'vv-font-size-1-6' : 'vv-font-size-1-1' } text-92` }> / { product.quantity_unit }</span>
              }

              {(width < 992 && product?.min_qty && product?.quantity_unit) &&
              <>
                  <span className={ `${ width >= 768 ? 'vv-font-size-1-4' : 'vv-font-size-1-2rem' } text-47 ml-4` }>
                    { product.min_qty } { product.quantity_unit }
                  </span>
                <span className={` ${ width >= 768 ? 'vv-font-size-1-2rem' : 'vv-font-size-1' } text-92 `}>
                    (MOQ)
                  </span>
              </>
              }

            </Col>
            }

            <Col span={24} className="productsOneColumnVertical--item__description d-none d-lg-block">
              <TextTruncate
                className="vv-font-size-1-5 text-47"
                line={1}
                element="div"
                truncateText="…"
                text={fn_stripHtml(product.full_description)}
              />
            </Col>

            <Col span={24} className="border-bottom border-e6 productsOneColumnVertical--item__location-sendRequestBtn">
              <Row justify={"space-between"} align={"middle"}>
                {width >= 992 ?
                  <>
                    <Col>
                      <Space size={"large"}>

                        {product?.wk_location &&
                        <div className="productsOneColumnVertical--item__location">
                          <i className="icon-vv-location text-ab vv-font-size-2-2" /> { product?.wk_location }
                        </div>
                        }

                        {product?.manufacturing_country &&
                        <div className="productsOneColumnVertical--item__manufacturingLocation">
                          <i className={ `flag-icon flag-icon-${product?.manufacturing_country?.toString().trim().toLowerCase()} vv-font-size-2 align-bottom` } /> { product?.manufacturing_country }
                        </div>
                        }


                      </Space>
                    </Col>
                    <Col className="text-47">
                      <Button className="border border-primary p-0 productsOneColumnVertical--item__sendRequestBtn" size="large">{t(__('send request'))}</Button>
                    </Col>
                  </> :
                  <>
                    <Col className="productsOneColumnVertical--item__location">
                      <i className="icon-vv-location text-ab vv-font-size-2-2" /> { product?.wk_location }
                    </Col>
                    <Col className="productsOneColumnVertical--item__manufacturingLocation">
                      <i className={ `flag-icon flag-icon-${product?.manufacturing_country?.toString().trim().toLowerCase()} vv-font-size-2 align-bottom` } /> { product?.manufacturing_country }
                    </Col>
                  </>
                }

              </Row>
            </Col>
          </Row>
        </Col>

      </Row>
      <Link className="productsOneColumnVertical--item__link" to={`/product/${product?.seo_name}`} />
    </Col>
  );
};

export default CategoryOneColumn;
