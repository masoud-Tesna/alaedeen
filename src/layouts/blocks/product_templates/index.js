// import style file:
import './styles/ProductTemplate.less';

// import ant design components:
import {Col, Row} from "antd";

import {useGetLanguageState} from "../../../contexts/language/LanguageContext";
import ImageGallery from "./components/ImageGallery";

const ProductTemplate = (props) => {

  const { product } = props;

  // get initial language
  const { language } = useGetLanguageState();
  return (
    <Row>
      <Col span={24} className="productDetails--content">
        <Row gutter={[0, 24]}>
          <Col span={24} className="productDetails--topSection">
            <div>
              <Row gutter={20}>
                <Col span={10} className="productDetails--imageContainer">
                  <Row gutter={[0, 10]}>
                    <ImageGallery />
                  </Row>
                </Col>
                <Col span={14}>
                  Right
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={24} className="productDetails--bottomSection">
            <div>
              <Row gutter={20}>
                <Col span={24}>
                  Bottom
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductTemplate;