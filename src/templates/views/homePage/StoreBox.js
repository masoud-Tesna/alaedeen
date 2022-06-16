import "./styles/StoreBox.less";
import {Col, Row} from "antd";
import {memo} from "react";

const StoreBox = (
  {
    image,
    caption,
    description
  }
) => {
  return (
    <Row className="storeBox--container">
      <Col className="--image">
        <img src={image} alt={caption}/>
      </Col>
      
      <Col className="--details" flex="1 1">
        <Row gutter={[0, 24]}>
          <Col span={24} className="--caption">
            {caption}
          </Col>
          
          <Col span={24} className="--description">
            {description}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(StoreBox);
