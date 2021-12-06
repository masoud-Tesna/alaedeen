// import style file:
import '../styles/CategoriesMultiColumn.less';

// import Ant Design Components:
import { Col, Image, Row, Skeleton } from "antd";

import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import ShowResponsiveImage from "../../../common/ShowResponsiveImage";

const SkeletonGrid = (props) => {
  return (
    <>
      {props.swiper ?
        <>
          <Col span={9} className="categoriesMultiColumn--item">
            <Row className="categoriesMultiColumn--item__row">
              <Col span={24} className="categoriesMultiColumn--img text-center py-2">
                <div className="categoriesMultiColumn--img__wrapper">
                  <ShowResponsiveImage
                    imagePath=""
                    skeletonWidth="73px"
                    skeletonHeight="73px"
                    skeletonRadius="50%"
                  />
                </div>
              </Col>
              <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-5 pb-2 text-wrap px-3">
                <Skeleton.Input style={{ width: '8rem', height: '1.2rem', marginTop: '1.6rem' }} active={true} size={'default'} />
              </Col>
            </Row>
          </Col>
        </> :
          <Col className="categoriesMultiColumn--item" span={12}>
          <Row className={`categoriesMultiColumn--item__row ${ props.itemKey <= 6 ? 'categoriesMultiColumn--item__borderBottom': '' }`}>
            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
              <div className="categoriesMultiColumn--img__wrapper isLoading">
                <ShowResponsiveImage
                  imagePath=""
                  skeletonWidth="80px"
                  skeletonHeight="80px"
                  skeletonRadius="50%"
                />
              </div>
            </Col>
            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2 text-truncate px-3">
              <Skeleton.Input style={{ width: 80, height: 15, marginTop: 8 }} active={true} size={'default'} />
            </Col>
          </Row>
        </Col>
      }

    </>
  );
}

const CategoriesMultiColumnSkeleton = (props) => {

  const skeletonNumbers = props.skeltonNumbers;

  let RowsSkeleton = [];
  for (let i = 1; i <= skeletonNumbers; i++) {
    RowsSkeleton.push(<SkeletonGrid {...props} key={i+1} itemKey={i} />);
  }

  if (props.swiper) {
    return (
      <>
        <Col className="categoriesMultiColumn--item" span={7}>
          <Row>
            <Row className="categoriesMultiColumn--item__row">
              <Col span={24} className="categoriesMultiColumn--img text-center py-2">
                <div className="categoriesMultiColumn--img__wrapper">
                  <ShowResponsiveImage
                    imagePath=""
                    skeletonWidth="73px"
                    skeletonHeight="73px"
                    skeletonRadius="50%"
                  />
                </div>
              </Col>
              <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-5 pb-2 text-wrap px-3">
                <Skeleton.Input style={{ width: '8rem', height: '1.2rem', marginTop: '1.6rem' }} active={true} size={'default'} />
              </Col>
            </Row>
          </Row>
        </Col>
        <Col span={17}>
          <ScrollContainer className="text-select-none d-flex requestsList--scrollContainer">
            {RowsSkeleton}
          </ScrollContainer>
        </Col>
      </>
    );
  }

  return (
    <div className={ `${props.width >= 768 ? 'categoriesMultiColumn--container' : 'categoriesMultiColumn--containerXs my-4'} h-100` }>
      <Row className={ 'h-100' }>
        <>{RowsSkeleton}</>
      </Row>
    </div>
  );

};

export default CategoriesMultiColumnSkeleton;