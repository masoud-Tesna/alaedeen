import React, { useEffect } from 'react';

// import uses Components:


// import style file:
import './styles/ProductsMultiColumnVertical.less';

// import Ant Design Components:
import { Col, Row } from "antd";

// import image product
import product_1 from '../../../assets/images/products/1.png';
import product_2 from '../../../assets/images/products/2.png';
import product_3 from '../../../assets/images/products/3.png';

// import store icon:
import store_1 from '../../../assets/images/store-icon/1.png';
import store_2 from '../../../assets/images/store-icon/2.png';
import store_3 from '../../../assets/images/store-icon/3.png';



import { useShowImage } from "../../../functions/useShowImage";

const ProductsMultiColumnVertical = (props) => {

  const { product } = props;
  
  const detailIcon = props.detailIcon || 'default';

  const productPrice = parseFloat(product.price).toFixed(2);
  const productListPrice = parseFloat(product.list_price).toFixed(2);

  const manufacturing_country = product.manufacturing_country;

  return (
    <Col className={ `productsMultiColumnVertical--item` } {...props.grid}>
      <Row className={ `h-100 ${props.className}` } justify="center">
        <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
          {useShowImage(product.main_pair.detailed.image_path, product.product)}
        </Col>

        <Col span={24} className="px-4 text-47 vv-font-size-1-8 text-truncate productsMultiColumnVertical--item__title">
          { product.product }
        </Col>

        {productPrice != 0.000 &&
          <Col span={24} className="px-4 productsMultiColumnVertical--item__price">
            <span className="vv-font-size-1-9 text-primary font-weight-bold"> { productPrice } - { productListPrice }</span>
            {product.quantity_unit &&
              <span className="vv-font-size-1-6 text-92"> / { product.quantity_unit }</span>
            }
          </Col>
        }

        {(product.min_qty && product.quantity_unit) &&
          <Col span={24} className="px-4 productsMultiColumnVertical--item__quantity">
            <span className="vv-font-size-1-4 text-47">{ product.min_qty } { product.quantity_unit }</span>
            <span className="vv-font-size-1-2rem text-92"> (MOQ)</span>
          </Col>
        }

        <Col span={24} className="px-4 mb-2 align-self-end productsMultiColumnVertical--item__location-detailIcon">
          <Row justify="space-between" align="bottom">
            <Col>
              <i className="fal fa-map-marker-alt text-red-a0 display-5 mr-3" />
              <span className="text-47 vv-font-size-1-7">{ product.wk_location }</span>
            </Col>
            <Col className="align-self-end">
              {detailIcon === 'default' ?
                <><i className={ `flag-icon flag-icon-${ manufacturing_country.toLowerCase() } vv-font-size-1-9` } /> <span className="vv-font-size-1-5 text-92">{ manufacturing_country }</span></> :
                <img src={ store_1 } alt="store 1"/>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductsMultiColumnVertical;