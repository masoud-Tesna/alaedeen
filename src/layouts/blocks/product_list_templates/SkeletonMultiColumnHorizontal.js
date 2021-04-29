import React, { useState } from 'react';

// import style file:
import './styles/ProductsMultiColumnHorizontal.less';

// import Ant Design Components:
import { Col, Row, Skeleton, Space } from "antd";

const SkeletonGrid = (props) => {
  return (
    <Col className={ `ProductsMultiColumnHorizontal--item vv-cursor-pointer ${props.className}` } {...props.grid}>
      <Space size={16}>
        <div className="ProductsMultiColumnHorizontal--polygon">
          <Skeleton.Avatar active={true} size={"default"} shape={"circle"} />
        </div>
        <div className="rounded-10 shadow-y-2 d-flex align-items-center justify-content-center ProductsMultiColumnHorizontal--image">
          <Skeleton.Image active={true} className="w-100 h-100 rounded-10" />
        </div>
        <div className="ProductsMultiColumnHorizontal--details">
          <Skeleton active={true} paragraph={{ rows: 2 }} />
        </div>
      </Space>
    </Col>
  );
}

const SkeletonMultiColumnHorizontal = (props) => {

  const [skeletonNumbers] = useState(props.skeltonNumbers);

  let RowsSkeleton = [];
  for (let i = 0; i < skeletonNumbers; i++) {
    RowsSkeleton.push(<SkeletonGrid {...props} key={i} />);
  }
  return <>{RowsSkeleton}</>;
};

export default SkeletonMultiColumnHorizontal;