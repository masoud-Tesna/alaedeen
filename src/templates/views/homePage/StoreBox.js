// react hooks:
import {memo} from "react";

// style:
import "./styles/StoreBox.less";

// antd components:
import {Col, Row} from "antd";

// styled components:
import styled from "styled-components";
import rtl from "styled-components-rtl";


const Details = styled(Col)`
  ${rtl`
    padding-left: 16px;
  `};
`;

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
      
      <Details className="--details" flex="1 1">
        <Row gutter={[0, 24]}>
          <Col span={24} className="--caption">
            {caption}
          </Col>
          
          <Col span={24} className="--description">
            {description}
          </Col>
        </Row>
      </Details>
    </Row>
  );
};

export default memo(StoreBox);
