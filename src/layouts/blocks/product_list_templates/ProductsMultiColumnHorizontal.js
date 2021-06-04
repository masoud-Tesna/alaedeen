import React from 'react';

// import Custom Hooks:
import { useWindowSize } from "../../../functions";

// import style file:
import './styles/ProductsMultiColumnHorizontal.less';

// import polygon images:
import polygon_1 from '../../../assets/images/polygon1.png';
import polygon_2 from '../../../assets/images/polygon2.png';
import polygon_3 from '../../../assets/images/polygon3.png';

// import ANT Design Components used:
import { Col, Row, Space } from "antd";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

const ProductsMultiColumnHorizontal = (props) => {

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

  // get width and height product image:
  const { widthProductImage, heightProductImage } = props;

  // get product data:
  const { product } = props;

  const productPrice = parseFloat(product.price).toFixed(2);
  const productListPrice = parseFloat(product.list_price).toFixed(2);

  let polygon;
  if (width >= 992) {
    if (props.productKey + 1 === 1) {
      polygon = polygon_1;
    } else if (props.productKey + 1 === 2) {
      polygon = polygon_2;
    } else if (props.productKey + 1 === 3) {
      polygon = polygon_3;
    }

    return (
      <Col className={ `ProductsMultiColumnHorizontal--item ${props.className}` } {...props.grid}>
        <a className="d-block" href={ product.link }>
          <Space size={16}>
            <div className="ProductsMultiColumnHorizontal--polygon">
              <img src={ polygon } alt="polygon 1"/>
            </div>
            <div className="rounded-10 shadow-y-2 d-flex align-items-center justify-content-center ProductsMultiColumnHorizontal--image">
              <ShowResponsiveImage imagePath={ product.main_pair.detailed.image_path } imageFolder='detailed' width={widthProductImage || 140} height={heightProductImage || 140} imageAlt={ product.product }/>
            </div>
            <div className="ProductsMultiColumnHorizontal--details">
              {productPrice != 0.000 &&
              <div className="mb-3 ProductsMultiColumnHorizontal--details__price">
                <span className="vv-font-size-1-9 text-primary font-weight-bold">${ productPrice } </span>
                { productListPrice != 0.00 &&
                <span className="vv-font-size-1-9 text-primary font-weight-bold"> - ${productListPrice}</span>
                }
              </div>
              }

              {(product.min_qty && product.quantity_unit) &&
              <div className="mb-3 ProductsMultiColumnHorizontal--details__quantity">
                <span className="vv-font-size-1-4 text-47">{ product.min_qty } { product.quantity_unit }</span>
                <span className="vv-font-size-1-2rem text-92"> (MOQ)</span>
              </div>
              }
              <div className="ProductsMultiColumnHorizontal--details__view">
                <span className="vv-font-size-1-4 text-8b mr-3">{ product.popularity  }</span>
                <span className="vv-font-size-1-4 text-8b">{ t(__('View')) }</span>
              </div>
            </div>
          </Space>
        </a>
      </Col>
    );

  }

  return (
    <Col className={ `ProductsMultiColumnHorizontal--item ${props.className}` } {...props.grid}>
      <a className="d-block h-100" href={ product.link }>
        <Row className="h-100" justify="center">
          <div className="rounded-10 shadow-y-2 d-flex align-items-center justify-content-center ProductsMultiColumnHorizontal--image">
            <ShowResponsiveImage imagePath={ product.main_pair.detailed.image_path } imageFolder='detailed' width={widthProductImage || 90} height={heightProductImage || 90} imageAlt={ product.product }/>
          </div>

          <div className="w-100 align-self-end ProductsMultiColumnHorizontal--details">
            {productPrice != 0.000 &&
            <div className="text-center ProductsMultiColumnHorizontal--details__price">
              <span className="vv-font-size-1-1rem text-primary font-weight-bold">${ productPrice } </span>
              { productListPrice != 0.00 &&
              <span className="vv-font-size-1-1rem text-primary font-weight-bold"> - ${productListPrice}</span>
              }
            </div>
            }
            <div className="text-center ProductsMultiColumnHorizontal--details__view">
              <span className="vv-font-size-1 text-8b mr-3">{ product.popularity  }</span>
              <span className="vv-font-size-1 text-8b">{ t(__('View')) }</span>
            </div>
          </div>
        </Row>
      </a>
    </Col>
  );

};

export default ProductsMultiColumnHorizontal;