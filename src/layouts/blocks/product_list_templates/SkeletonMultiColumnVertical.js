import React, { useState } from 'react';

// import style file:
import './styles/ProductsMultiColumnVertical.less';

// import Ant Design Components:
import { Col, Row, Skeleton } from "antd";

const SkeletonGrid = (props) => {
  const { width } = props;
  const { height } = props;
  let paragraph_rows = { rows: 2 };
  if (width <= 991) {
    paragraph_rows = { rows: 1 };
  }
  return (
    <Col className={ `productsMultiColumnVertical--item` } {...props.grid} style={{ minHeight: `${height}px` }}>
      <Row className={ `h-100 ${props.className}` } justify="center">
        <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
          <Skeleton.Image active={true} className="w-100 h-100 border-bottom border-w-05 rounded-top-10" />
        </Col>
        <Col span={24} className="px-4 text-47 vv-font-size-1-8 text-truncate productsMultiColumnVertical--item__title">
          <Skeleton active={true} paragraph={ paragraph_rows } />
        </Col>
        <Col span={24} className="d-none d-lg-block px-4 mb-2 productsMultiColumnVertical--item__location-detailIcon">
          <Row justify="space-between" align="bottom">
            <Col className="align-self-end skeletonForLocation" span={16}>
              <Skeleton active={true} paragraph={{ rows: 0 }} />
            </Col>
            <Col className="align-self-end">
              <Skeleton.Avatar active={true} size={"default"} shape={"square"} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

const SkeletonMultiColumnVertical = (props) => {

  const [skeletonNumbers] = useState(props.skeltonNumbers);

  let RowsSkeleton = [];
  for (let i = 1; i <= skeletonNumbers; i++) {
    RowsSkeleton.push(<SkeletonGrid {...props} key={i+1} />);
  }
  return <>{RowsSkeleton}</>;
};

export default SkeletonMultiColumnVertical;