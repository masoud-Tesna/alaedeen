// import Custom Hooks:
import { useWindowSize, useShowImage } from "../../../functions";

// import style file:
import './styles/ProductsMultiColumnVertical.less';

// import Ant Design Components:
import { Col, Row, Skeleton } from "antd";

// import store icon:
import store_1 from '../../../assets/images/store-icon/1.png';


const ProductsMultiColumnVertical = (props) => {

  const { width } = useWindowSize();

  const { allDetails } = props;
  const { swiper } = props;
  const { load } = props;

  let paragraph_rows = { rows: 2 };
  if (width <= 991) {
    paragraph_rows = { rows: 1 };
  }

  const { product } = props;
  
  const detailIcon = props.detailIcon || 'default';

  const productPrice = parseFloat(product.price).toFixed(2);
  const productListPrice = parseFloat(product.list_price).toFixed(2);
  const productImage = useShowImage(product.main_pair.detailed.image_path, product.product);

  const manufacturing_country = product.manufacturing_country;

  if (swiper && load) {
    return (
      <Col className={ `productsMultiColumnVertical--item` } {...props.grid} span={24}>
        <Row className={ `h-100 ${props.className}` } justify="center">
          <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
            <Skeleton.Image active={true} className="w-100 h-100 border-bottom border-w-05 rounded-top-10" />
          </Col>
          <Col span={24} className="px-4 text-47 vv-font-size-1-8 text-truncate mb-3 productsMultiColumnVertical--item__title">
            <Skeleton active={true} paragraph={ paragraph_rows } />
          </Col>
        </Row>
      </Col>
    );
  }

  return (
    <Col className={ `productsMultiColumnVertical--item` } {...props.grid}>
      <Row className={ `h-100 pb-3 pb-lg-0 ${props.className}` } justify="center">
        <Col className="align-self-start" span={24}>
          <Row>
            <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
              {productImage}
            </Col>

            <Col span={24} className={ `${ !allDetails && 'd-none d-lg-block' } text-47 vv-font-size-1-8 text-truncate productsMultiColumnVertical--item__title` }>
              { product.product }
            </Col>
          </Row>
        </Col>

        {productPrice != 0.000 &&
          <Col span={24} className="productsMultiColumnVertical--item__price">
            <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-5' } text-primary font-weight-bold` }>${ productPrice } </span>
            { productListPrice != 0.00 &&
            <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-5' } text-primary font-weight-bold` }> - ${productListPrice}</span>
            }
            {product.quantity_unit &&
              <span className={ `${ !allDetails && 'd-none d-lg-inline' } vv-font-size-1-6 text-92` }> / { product.quantity_unit }</span>
            }
          </Col>
        }

        {(product.min_qty && product.quantity_unit) &&
          <Col span={24} className="productsMultiColumnVertical--item__quantity">
            <span className={ `${ width >= 992 ? 'vv-font-size-1-4' : 'vv-font-size-1-2rem' } text-47` }>{ product.min_qty } { product.quantity_unit }</span>
            <span className={` ${ width >= 992 ? 'vv-font-size-1-2rem' : 'vv-font-size-1' } text-92 `}> (MOQ)</span>
          </Col>
        }

        <Col span={24} className={ `${ !allDetails && 'd-none d-lg-block' } px-4 mb-2 align-self-end productsMultiColumnVertical--item__location-detailIcon` }>
          <Row justify="space-between" align="bottom">
            <Col className="productsMultiColumnVertical--item__location">
              <i className="fal fa-map-marker-alt text-red-a0 mr-2 mr-lg-3" />
              <span className="text-47">{ product.wk_location }</span>
            </Col>
            <Col className="align-self-end productsMultiColumnVertical--item__detailIcon">
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