import React, { useState } from 'react';

// import style file:
import '../styles/ProductsMultiColumnVertical.less';

// import Ant Design Components:
import { Col, Row, Skeleton } from "antd";

const SkeletonGrid = (props) => {
  const { height } = props;
  return (
    <Col className={ `productsMultiColumnVertical--item` } {...props.grid} xs={ props.xs } lg={ props.lg } style={{ minHeight: `${height}px` }}>
      <Row className={ `h-100 ${props.className} bg-white shadow-y` } justify="center">
        <Col span={24} className="align-self-start">
          <Row gutter={[0, 10]}>
            <Col span={24} className="d-flex align-items-center justify-content-center productsMultiColumnVertical--item__image">
              <Skeleton.Image active className="w-100 h-100 border-bottom border-w-05 rounded-top-10" />
            </Col>
            <Col span={24} className="px-4 text-47 vv-font-size-1-8 text-truncate productsMultiColumnVertical--item__title m-0">
              <Skeleton.Input style={{ width: 150, height: 20 }} active size="small" />
            </Col>
          </Row>
        </Col>
        
        <Col span={24} className="px-4 mb-2 productsMultiColumnVertical--item__location-detailIcon align-self-end">
          <Row justify="space-between" align="bottom">
            <Col className="align-self-end skeletonForLocation" span={16}>
              <Skeleton active paragraph={{ rows: 0 }} />
            </Col>
            <Col className="align-self-end">
              <Skeleton.Avatar active size="default" shape="square" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

const SkeletonCategoryMultiColumn = (props) => {

  const [skeletonNumbers] = useState(props.skeltonNumbers);

  let RowsSkeleton = [];
  for (let i = 1; i <= skeletonNumbers; i++) {
    RowsSkeleton.push(<SkeletonGrid {...props} key={i+1} />);
  }
  return <>{RowsSkeleton}</>;
};

export default SkeletonCategoryMultiColumn;