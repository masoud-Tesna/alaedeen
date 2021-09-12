// import style file:
import './styles/CategoryOneColumn.less';
import { Button, Col, Image, Row, Space } from "antd";
import { useWindowSize } from "../../../functions";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import TextTruncate from "react-text-truncate";
import { __, fn_stripHtml } from "../../../functions/Helper";
import { useTranslation } from "react-i18next";


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
          {product.main_pair ?
            <ShowResponsiveImage imagePath={ product?.main_pair?.detailed?.image_path } imageFolder='detailed' width={ width >= 768 ? 160 : 115} height={ width >= 768 ? 160 : 115} imageAlt={ product.product }/> :
            <Image
              width={width >= 768 ? 178 : 115}
              height={width >= 768 ? 150 : 115}
              preview={false}
              src="error"
              fallback="data:image/png;base64,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"
            />
          }
        </Col>

        <Col flex="1 1">
          <Row className="h-100" gutter={[0, 5]}>
            <Col span={24} className="text-47 font-weight-bold text-truncate productsOneColumnVertical--item__title">
              { product.product }
            </Col>

            {productPrice != 0.000 &&
            <Col span={24} className="productsOneColumnVertical--item__price">
              <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-3' } text-primary font-weight-bold` }>${ productPrice } </span>

              { productListPrice != 0.00 &&
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
                <Col>
                  <Space size={"large"}>

                    {product?.wk_location &&
                    <div className="productsOneColumnVertical--item__location">
                      <i className="icon-vv-location text-ab vv-font-size-2-2" /> { product?.wk_location }
                    </div>
                    }

                    {product?.manufacturing_country &&
                    <div className="productsOneColumnVertical--item__sendRequestBtn">
                      <i className={ `flag-icon flag-icon-${product?.manufacturing_country?.toString().trim().toLowerCase()} vv-font-size-2 align-bottom` } /> { product?.manufacturing_country }
                    </div>
                    }


                  </Space>
                </Col>
                <Col className="text-47 d-none d-lg-block">
                  <Button className="border border-primary p-0 productsOneColumnVertical--item__sendRequestBtn" size="large">{t(__('send request'))}</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

      </Row>
      <a className="productsOneColumnVertical--item__link" href={ product.link } />
    </Col>
  );
};

export default CategoryOneColumn;
