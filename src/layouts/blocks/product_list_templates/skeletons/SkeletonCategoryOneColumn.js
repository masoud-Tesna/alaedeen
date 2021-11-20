import React, { useState } from 'react';

// import style file:
import '../styles/ProductsMultiColumnVertical.less';

// import Ant Design Components:
import { Col, Row, Skeleton } from "antd";

const SkeletonGrid = (props) => {

  const { height, width } = props;

  return (
    <Col className={ `productsMultiColumnVertical--item` } {...props.grid} xs={ props.xs } lg={ props.lg } style={{ minHeight: `${height}px` }}>
      <Row className={ `h-100 ${props.className}` } justify="center" gutter={{ xs: 13, lg: 35 }}>
        <Col flex={ width >= 992 ? '195px' : '128px' } className="d-flex- align-items-center- justify-content-center- productsOneColumnVertical--item__image">
          <Skeleton.Image active={true} className="w-100 h-100 border-bottom border-w-05 rounded-top-10" />
        </Col>
        <Col flex="1 1">
          <Row className="h-100" gutter={[0, 5]}>
            <Col span={24}>
              <Skeleton.Input style={{ width: 250, height: 20 }} active={true} size={"small"} />
            </Col>
            <Col span={24}>
              <Skeleton.Input style={{ width: 160, height: 20 }} active={true} size={"small"} />
            </Col>
            <Col span={24}>
              <Skeleton.Input style={{ width: 400, height: 20 }} active={true} size={"small"} />
            </Col>
            <Col span={24} className="text-right pr-3">
              <Skeleton.Input style={{ width: 70, height: 20,}} active={true} size={"small"} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

const SkeletonCategoryOneColumn = (props) => {

  const [skeletonNumbers] = useState(props.skeltonNumbers);

  let RowsSkeleton = [];
  for (let i = 1; i <= skeletonNumbers; i++) {
    RowsSkeleton.push(<SkeletonGrid {...props} key={i+1} />);
  }
  return <>{RowsSkeleton}</>;
};

export default SkeletonCategoryOneColumn;