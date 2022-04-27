import React, { useState } from 'react';

// import style file:
import '../styles/CategoryOneColumn.less';

// import Ant Design Components:
import { Col, Row, Skeleton } from "antd";
import ShowResponsiveImage from "../../../common/ShowResponsiveImage";

const SkeletonGrid = (props) => {

  const { height, width } = props;

  return (
    <Col className={ `productsOneColumnVertical--item` } {...props.grid} xs={ props.xs } lg={ props.lg } style={{ minHeight: `${height}px` }}>
      <Row className={ `h-100 ${props.className}` } justify="center" gutter={{ xs: 13, lg: 35 }}>
        <Col flex={ width >= 992 ? '195px' : '128px' } className="d-flex- align-items-center- justify-content-center- productsOneColumnVertical--item__image">
          <div className="imageContent">
            <ShowResponsiveImage
              imagePath=""
            />
          </div>
        </Col>
        <Col flex="1 1" className="text-truncate">
          <Row className="h-100" gutter={[0, 5]}>
            <Col span={24}>
              <Skeleton.Input style={{ width: width >= 992 ? 250 : 130, height: 20 }} active size="small" />
            </Col>
            <Col span={24}>
              <Skeleton.Input style={{ width: width >= 992 ? 160 : 90, height: 20 }} active size="small" />
            </Col>
            <Col span={24}>
              <Skeleton.Input style={{ width: width >= 992 ? 400 : 180, height: 20 }} active size="small" />
            </Col>
            <Col span={24} className="text-sm-left text-lg-right pr-3">
              <Skeleton.Input style={{ width: 70, height: 20,}} active size="small" />
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