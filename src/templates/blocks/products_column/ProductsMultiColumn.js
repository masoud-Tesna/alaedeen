import "./styles/ProductsMultiColumn.less";
import {Col, Row} from "antd";

import productImage from "../../assets/images/product-img.jpg";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import TextTruncate from "react-text-truncate";
import {__} from "../../../utilities/functions/Helper";

const ProductsMultiColumn = ({product}) => {
  
  return (
    <Row className="productsMultiColumn--container" gutter={[0, 8]}>
      <Col className="--topSection align-self-start">
        <Row gutter={[0, 8]}>
          <Col span={24} className="--image">
            <img src={productImage} alt=""/>
          </Col>
  
          <Col span={24} className="--title">
            <TextTruncate
              line={3}
              element="div"
              truncateText=" …"
              text="Long Distance Laser Flashlight Military 532NM Green Beam 303 Laser Pointer With Star Cap"
            />
          </Col>
  
          <Col span={24} className="--price">
            US$ 3.60 - 3.80 <span className="__piece">/ Piece</span>
          </Col>
  
          <Col span={24} className="--piece">
            2 Pieces <span className="__piece"> (MOQ)</span>
          </Col>
        </Row>
      </Col>
      
      <Col span={24} className="--bottomSection --location align-self-end">
        <i className={ `fi fi-ir vv-font-size-1-9` } /> <span className="vv-font-size-1-5 text-92">Madrid, Spain</span>
      </Col>
    </Row>
  );
};

export default ProductsMultiColumn;
