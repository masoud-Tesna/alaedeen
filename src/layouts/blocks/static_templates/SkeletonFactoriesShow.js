// import style file:
import './styles/SkeletonFactoriesShow.less';

// import Ant Design Components:
import { Col, Row, Skeleton, Space } from "antd";

const SkeletonGrid = (props) => {
  const { width } = props;

  let about_rows = { rows: 5 };
  if (width <= 991) {
    about_rows = { rows: 4 };
  }

  return (
    <>
      <Col span={24} className="bg-white rounded-10 p-3 border border-70 factories--item">
        <Row gutter={16} className="h-100">
          <Col flex='400px' className="d-none d-lg-block h-100 factories--imageContainer">
            <Skeleton.Image active={true} className="w-100 h-100 rounded-10" />
          </Col>
          <Col flex="1 1" className="factories--dataContainer">
            <Row gutter={[0,8]}>
              <Col className="factories--data__topSection" span={24}>
                <Row className="d-none d-lg-flex" justify={"space-between"}>
                  <Col>
                    <Row gutter={16}>
                      <Col span={8} className="factories--iconContainer">
                        <Skeleton.Avatar active={true} size={"default"} shape={"square"} />
                      </Col>
                      <Col span={16} className="">
                        <Row className="h-100">
                          <Col span={24} className="vv-font-size-1-6 text-black font-weight-600">
                            <Skeleton.Input style={{ width: 140, height: 23 }} active={true} size={'default'} />
                          </Col>
                          <Col span={24} className="mt-2">
                            <Skeleton.Avatar active={true} size={"default"} shape={"circle"} />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="text-right factories--btnContainer">
                    <Space size={"middle"}>
                      <Skeleton.Button active={true} size={"default"} style={{ width: 130 }} shape={'round'} />
                      <Skeleton.Button active={true} size={"default"} style={{ width: 130 }} shape={'round'} />
                    </Space>
                  </Col>
                </Row>

                <Row className="d-flex d-lg-none">
                  <Col flex='69px' className="factories--iconContainer">
                    <Skeleton.Avatar active={true} size={"large"} style={{ width: '100%', height: '100%' }} shape={"square"} />
                  </Col>
                  <Col flex="1 1" className="">
                    <Row gutter={[0, 5]}>
                      <Col className="" span={24}>
                        <Row justify={"space-between"}>
                          <Col className="vv-font-size-1-4 text-black font-weight-600">
                            <Skeleton.Input style={{ width: 144, height: 21 }} active={true} size={'default'} />
                          </Col>
                          <Col className="factories--btnContainer">
                            <Skeleton.Button active={true} size={"small"} shape={'round'} />
                          </Col>
                        </Row>
                      </Col>
                      <Col className="" span={24}>
                        <Row>
                          <Col flex='47px' className="">
                            <Skeleton.Avatar active={true} size={"default"} shape={"square"} />
                          </Col>
                          <Col flex="1 1">
                            <div className="factories--informationItem">
                              <Row>
                                <Col span={24} className="vv-font-size-1-4 text-33">
                                  <Row justify={"space-between"}>
                                    <Col span={12} className="factories--fieldItem">
                                      <Row className="factories--fieldRow h-100">
                                        <Col span={24} className="vv-font-size-1-2 text-black font-weight-bold align-self-start">
                                          <Skeleton.Input style={{ width: 30, height: 13 }} active={true} size={'default'} />
                                        </Col>
                                        <Col span={24} className="vv-font-size-1-2 text-92 align-self-end">
                                          <Skeleton.Input style={{ width: 43, height: 13 }} active={true} size={'default'} />
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col span={12} className="factories--fieldItem">
                                      <Row className="factories--fieldRow h-100">
                                        <Col span={24} className="vv-font-size-1-2 text-black font-weight-bold align-self-start">
                                          <Skeleton.Input style={{ width: 30, height: 13 }} active={true} size={'default'} />
                                        </Col>
                                        <Col span={24} className="vv-font-size-1-2 text-92 align-self-end">
                                          <Skeleton.Input style={{ width: 43, height: 13 }} active={true} size={'default'} />
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col className="factories--data__middleSection" span={24}>
                <Row gutter={16}>
                  <Col className="d-none d-lg-block" span={6}>
                    <Skeleton active={true} paragraph={ about_rows } />
                  </Col>
                  <Col xs={24} lg={18}>
                    <Row gutter={16} className="row-cols-3 row-cols-lg-4">
                      <Col className={ `factories--productImageContainer` }>
                        <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                          <Skeleton.Image active={true} className="w-100 h-100 rounded-10" />
                        </div>
                      </Col>

                      <Col className={ `factories--productImageContainer` }>
                        <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                          <Skeleton.Image active={true} className="w-100 h-100 rounded-10" />
                        </div>
                      </Col>

                      <Col className={ `factories--productImageContainer` }>
                        <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                          <Skeleton.Image active={true} className="w-100 h-100 rounded-10" />
                        </div>
                      </Col>

                      <Col className={ `d-none d-lg-block factories--productImageContainer` }>
                        <div className="rounded-10 shadow-y-2 text-center factories--productImage">
                          <Skeleton.Image active={true} className="w-100 h-100 rounded-10" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="d-none d-lg-block factories--data__bottomSection" span={24}>
                <Row gutter={16} className="factories--informationContainer">
                  <Col span={12}>
                    <div className="py-2 px-3 factories--informationItem">
                      <Row>
                        <Col span={24} className="vv-font-size-1-4 text-33 align-self-start">
                          <Skeleton.Input style={{ width: 122, height: 19 }} active={true} size={'default'} />
                        </Col>
                        <Col span={24} className="vv-font-size-1-4 text-33 align-self-end">
                          <Row justify={"space-between"} className="row-cols-3">
                            <Col className="factories--fieldItem">
                              <Row className="factories--fieldRow">
                                <Col span={24} className="vv-font-size-1-5 text-black font-weight-bold">
                                  <Skeleton.Input style={{ width: 70, height: 19 }} active={true} size={'default'} />
                                </Col>
                                <Col span={24} className="vv-font-size-1-4 text-92">
                                  <Skeleton.Input style={{ width: 80, height: 19 }} active={true} size={'default'} />
                                </Col>
                              </Row>
                            </Col>

                            <Col className="factories--fieldItem pl-5">
                              <Row className="factories--fieldRow">
                                <Col span={24} className="vv-font-size-1-5 text-black font-weight-bold">
                                  <Skeleton.Input style={{ width: 100, height: 19 }} active={true} size={'default'} />
                                </Col>
                                <Col span={24} className="vv-font-size-1-4 text-92">
                                  <Skeleton.Input style={{ width: 90, height: 19 }} active={true} size={'default'} />
                                </Col>
                              </Row>
                            </Col>

                            <Col className="factories--fieldItem pl-5">
                              <Row className="factories--fieldRow">
                                <Col span={24} className="vv-font-size-1-5 text-black font-weight-bold">
                                  <Skeleton.Input style={{ width: 100, height: 19 }} active={true} size={'default'} />
                                </Col>
                                <Col span={24} className="vv-font-size-1-4 text-92">
                                  <Skeleton.Input style={{ width: 90, height: 19 }} active={true} size={'default'} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div className="py-2 px-3 factories--informationItem">
                      <Row>
                        <Col span={24} className="vv-font-size-1-4 text-33 align-self-start">
                          <Skeleton.Input style={{ width: 122, height: 19 }} active={true} size={'default'} />
                        </Col>
                        <Col span={24} className="vv-font-size-1-4 text-33 align-self-end">
                          <Row justify={"space-between"} className="row-cols-2">
                            <Col className="factories--fieldItem">
                              <Row className="factories--fieldRow">
                                <Col span={24} className="vv-font-size-1-5 text-black font-weight-bold">
                                  <Skeleton.Input style={{ height: 19 }} active={true} size={'default'} />
                                </Col>
                                <Col span={24} className="vv-font-size-1-4 text-92">
                                  <Skeleton.Input style={{ width: 80, height: 19 }} active={true} size={'default'} />
                                </Col>
                              </Row>
                            </Col>

                            <Col className="factories--fieldItem pl-5">
                              <Row className="factories--fieldRow">
                                <Col span={24} className="vv-font-size-1-5 text-black font-weight-bold">
                                  <Skeleton.Input style={{ width: 150, height: 19 }} active={true} size={'default'} />
                                </Col>
                                <Col span={24} className="vv-font-size-1-4 text-92">
                                  <Skeleton.Input style={{ width: 90, height: 19 }} active={true} size={'default'} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
}

const SkeletonFactoriesShow = (props) => {

  const skeletonNumbers = props.skeltonNumbers;

  let RowsSkeleton = [];
  for (let i = 1; i <= skeletonNumbers; i++) {
    RowsSkeleton.push(<SkeletonGrid {...props} key={i+1} />);
  }
  return <>{RowsSkeleton}</>;
};

export default SkeletonFactoriesShow;