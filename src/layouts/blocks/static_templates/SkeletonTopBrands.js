import React, { useState } from 'react';

// import style file:
import './styles/SkeletonTopBrands.less';

// import Ant Design Components:
import { Col, Row, Skeleton } from "antd";

const SkeletonGrid = (props) => {
  return (
    <Col className={ `skeletonTopBrands--item` } {...props.grid}>
      <Row className={ `h-100 ${props.className}` } justify="center">
        <Col span={24} className="d-flex align-items-center justify-content-center skeletonTopBrands--item__image">
          <Skeleton.Image active={true} className="" />
        </Col>
        <Col span={12} className="px-4 text-47 vv-font-size-1-8 text-truncate text-center skeletonTopBrands--item__title">
          <Skeleton active={true} paragraph={{ rows: 1 }} />
        </Col>
      </Row>
    </Col>
  );
}

const SkeletonTopBrands = (props) => {

  const [skeletonNumbers] = useState(props.skeltonNumbers);

  let RowsSkeleton = [];
  for (let i = 0; i < skeletonNumbers; i++) {
    RowsSkeleton.push(<SkeletonGrid {...props} key={i} />);
  }
  return <>{RowsSkeleton}</>;
};

export default SkeletonTopBrands;