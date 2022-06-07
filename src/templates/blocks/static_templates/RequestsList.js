import { useState, Fragment } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

// import style file:
import './styles/RequestsList.less';

// import ant design:
import { Col, Row, Skeleton, Modal } from "antd";

// import helper functions:
import { __ } from '../../../utilities/functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetApiOld, useWindowSize } from "../../../utilities/functions";

// import Moment for show date:
import Moment from 'react-moment';

const RequestSkeleton = () => {
  return (
    <div className="d-inline requestsList--item__content">
      <Row className="p-3 bg-white rounded-lg requestsList--item">
        <Col span={12} className="text-left text-black vv-font-size-1-9 my-auto">
          <Skeleton.Input style={{ width: 100, height: 15 }} active size={"small"} />
        </Col>
        <Col span={12} className="text-right text-primary vv-font-size-1-5 my-auto">
          <Skeleton.Input style={{ width: 100, height: 15 }} active size={"small"} />
        </Col>
        <Col span={24} className="text-70 vv-font-size-1-5 requestsList--item__buyerLooking text-center">
          <Skeleton.Input style={{ width: 200, height: 19 }} active size={"small"} />
        </Col>
        <Col span={24} className="mt-3 px-2 pb-1 border-bottom border-8b">
          <Row justify="space-between">
            <Col>
              <Skeleton.Input style={{ width: 122, height: 17 }} active size={"small"} />
            </Col>
            <Col className="align-self-end">
              <Skeleton.Avatar style={{ height: 17 }} active size={"small"} shape={'square'} />
            </Col>
          </Row>
        </Col>
        <Col span={24} className="vv-font-size-1-7 text-center mt-2 requestsList--item__contact text-center">
          <Skeleton.Input style={{ width: 100, height: 20 }} active size={"small"} />
        </Col>
      </Row>
    </div>
  );
}

const RequestsList = () => {

  const { width } = useWindowSize();

  const { t } = useTranslation();

  // get request lists from API:
  const { isLoading, data } = useGetApiOld(
    `request-list-api`,
    'items_per_page=5&status=C',
    `requestLists`
  );
  const requestLists = data || [];

  const [isRequestModal, setIsRequestModal] = useState([]);

  const showRequestModal = (requestId) => {
    setIsRequestModal(prevState => {
      return {
        ...prevState,
        [requestId]: true
      }
    });
  }

  const handleRequestModalClose = (requestId) => {
    setIsRequestModal(prevState => {
      return {
        ...prevState,
        [requestId]: false
      }
    });
  }

  let requestRowsSkeleton = [];
  for (let i = 1; i <= 5; i++) {
    requestRowsSkeleton.push(<RequestSkeleton key={i} />);
  }

  return (
    <div className="h-100 requestsList--container">
      <Row className="rounded-lg h-100 requestsList--content py-4 py-lg-0" align="middle">
        <Col className="px-4 mb-3 mb-lg-0" span={24}>
          <div className="font-weight-bold vv-font-size-2-2 text-black requestsList--caption">{ t(__('Request for Quotation')) }</div>
        </Col>
        <Col className="px-2 requestsList--items" span={24}>
          <ScrollContainer className="text-select-none d-flex requestsList--scrollContainer">

            {isLoading ?
              <>
                { requestRowsSkeleton }
              </> :
              <>
                {requestLists?.request_lists?.map(requestList => {
                  let timestamp = requestList?.timestamp;

                  return (
                    <Fragment key={ `requestLists_${ requestList?.request_id }` }>
                      <div className="d-inline requestsList--item__content" onClick={() => { showRequestModal(requestList?.request_id) }}>
                        <Row className="p-3 bg-white rounded-lg requestsList--item">
                          <Col span={24}>
                            <Row className="requestsList--item__first">
                              <Col span={12} className="text-black vv-font-size-1-9 my-auto requestsList--item__firstOne">
                                { requestList?.product_name }
                              </Col>
                              <Col span={12} className="text-primary vv-font-size-1-5 my-auto requestsList--item__firstTow">
                                <Moment format="DD MMM, YYYY" unix>{timestamp}</Moment>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={24} className="text-70 vv-font-size-1-5 requestsList--item__buyerLooking">
                            { t(__('Buyer is looking for')) } '{ requestList?.product_name }'.
                          </Col>
                          <Col span={24} className="mt-3 px-2 pb-1 border-bottom border-8b">
                            <Row justify="space-between requestsList--item__location">
                              <Col>
                                <i className="fal fa-map-marker-alt text-primary vv-font-size-1-9 mr-2" />
                                <span className="text-47 vv-font-size-1-6">{ `${requestList?.auth_country}, ${requestList?.auth_city}` }</span>
                              </Col>
                              <Col className="align-self-end">
                                <i className={ `fi fi-${requestList?.country_code} vv-font-size-1-9` } />
                              </Col>
                            </Row>
                          </Col>
                          <Col span={24} className="vv-font-size-1-7 text-center mt-2 cursor-pointer requestsList--item__contact">
                            { t(__('Show all details')) }
                          </Col>
                        </Row>
                      </div>
                      <Modal
                        title={ requestList?.product_name }
                        style={{ top: width < 992 && 10 }}
                        visible={isRequestModal[requestList?.request_id] || false}
                        onCancel={() => { handleRequestModalClose(requestList?.request_id) }}
                        footer={false}
                      >
                        <Row className="row-cols-1 row-cols-md-2 requestsList--item__modal" gutter={[width >= 992 ? 16 : 0, 30]}>
                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('request name')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { requestList?.product_name }
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('Applicant name')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { requestList?.auth_name }
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('location')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { `${requestList?.auth_country}, ${requestList?.auth_city}` }
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('quantity')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { `${requestList?.quantity} ${requestList?.quantity_unit}` }
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('order_value')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { `${requestList?.order_value} ${requestList?.currency}` }
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('requirement_urgency')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { requestList?.requirement_urgency }
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('supp_location')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { requestList?.supp_location }
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('requirement_frequency')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { requestList?.regular_type ? requestList?.regular_type : requestList?.requirement_frequency }
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={width >= 992 ? 16 : 0}>
                              <Col span={12} className="text-92 requestsList--modal__variable">
                                { t(__('description')) }:
                              </Col>
                              <Col span={12} className="text-47 requestsList--modal__value">
                                { requestList?.description }
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Modal>
                    </Fragment>
                  );
                })}
              </>
            }

          </ScrollContainer>
        </Col>
      </Row>
    </div>
  );
};

export default RequestsList;