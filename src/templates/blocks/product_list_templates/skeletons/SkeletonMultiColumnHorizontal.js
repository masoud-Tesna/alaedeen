import React, { useState } from 'react';

// import style file:
import '../styles/ProductsMultiColumnHorizontal.less';

// import Ant Design Components:
import { Col, Skeleton, Space } from "antd";

const SkeletonGrid = (props) => {
  const { Xs } = props;
  return (
    <Col className={ `ProductsMultiColumnHorizontal--item vv-cursor-pointer ${props.className}` } {...props.grid}>
      {!Xs ?
        <Space size={16}>
          <div className="ProductsMultiColumnHorizontal--polygon">
            <Skeleton.Avatar active size="default" shape="circle" />
          </div>
          <div className="rounded-10 shadow-y-2 d-flex align-items-center justify-content-center ProductsMultiColumnHorizontal--image">
            <Skeleton.Image active className="w-100 h-100 rounded-10" />
          </div>
          <div className="ProductsMultiColumnHorizontal--details">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        </Space>:

        <>
          <div className="rounded-10 shadow-y-2 d-flex align-items-center justify-content-center ProductsMultiColumnHorizontal--image">
            <Skeleton.Image active className="w-100 h-100 rounded-10" />
          </div>
          <div className="ProductsMultiColumnHorizontal--detailsXs mt-3 pt-1 text-center">
            <Skeleton.Input style={{ width: '60%' }} active size="small" />
          </div>
          <div className="ProductsMultiColumnHorizontal--detailsXs mt-1 text-center">
            <Skeleton.Input style={{ width: '30%' }} active size="small" />
          </div>
        </>
      }
    </Col>
  );
}

const SkeletonMultiColumnHorizontal = (props) => {

  const [skeletonNumbers] = useState(props.skeltonNumbers);

  let RowsSkeleton = [];
  for (let i = 1; i <= skeletonNumbers; i++) {
    RowsSkeleton.push(<SkeletonGrid {...props} key={i} />);
  }
  return <>{RowsSkeleton}</>;
};

export default SkeletonMultiColumnHorizontal;