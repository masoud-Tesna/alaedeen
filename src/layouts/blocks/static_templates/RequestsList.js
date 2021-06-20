import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

// import style file:
import './styles/RequestsList.less';

// import ant design:
import { Col, Row, Skeleton } from "antd";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetApi } from "../../../functions";

// ikport Moment for show date:
import Moment from 'react-moment';

const RequestSkeleton = () => {
  return (
    <div className="d-inline requestsList--item__content">
      <Row className="p-3 bg-white rounded-lg requestsList--item">
        <Col span={12} className="text-left text-black vv-font-size-1-9 my-auto">
          <Skeleton.Input style={{ width: 100, height: 15 }} active={true} size={"small"} />
        </Col>
        <Col span={12} className="text-right text-primary vv-font-size-1-5 my-auto">
          <Skeleton.Input style={{ width: 100, height: 15 }} active={true} size={"small"} />
        </Col>
        <Col span={24} className="text-70 vv-font-size-1-5 requestsList--item__buyerLooking text-center">
          <Skeleton.Input style={{ width: 200, height: 19 }} active={true} size={"small"} />
        </Col>
        <Col span={24} className="mt-3 px-2 pb-1 border-bottom border-8b">
          <Row justify="space-between">
            <Col>
              <Skeleton.Input style={{ width: 122, height: 17 }} active={true} size={"small"} />
            </Col>
            <Col className="align-self-end">
              <Skeleton.Avatar style={{ height: 17 }} active={true} size={"small"} shape={'square'} />
            </Col>
          </Row>
        </Col>
        <Col span={24} className="vv-font-size-1-7 text-center mt-2 requestsList--item__contact text-center">
          <Skeleton.Input style={{ width: 100, height: 20 }} active={true} size={"small"} />
        </Col>
      </Row>
    </div>
  );
}

const RequestsList = () => {

  const { t } = useTranslation();

  const requestLists = useGetApi('request-list-api', `items_per_page=5&status=C`, 'request_lists');

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

            {requestLists.load ?
              <>
                { requestRowsSkeleton }
              </> :
              <>
                {requestLists.items[0] ?
                  <>
                    {requestLists.items[0].map(requestList => {
                      let timestamp = requestList.timestamp;

                      return (
                        <div key={ requestList.request_id } className="d-inline requestsList--item__content">
                          <Row className="p-3 bg-white rounded-lg requestsList--item">
                            <Col span={24}>
                              <Row className="requestsList--item__first">
                                <Col span={12} className="text-black vv-font-size-1-9 my-auto requestsList--item__firstOne">
                                  { requestList.product_name }
                                </Col>
                                <Col span={12} className="text-primary vv-font-size-1-5 my-auto requestsList--item__firstTow">
                                  <Moment format="DD MMM, YYYY" unix>{timestamp}</Moment>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={24} className="text-70 vv-font-size-1-5 requestsList--item__buyerLooking">
                              { t(__('Buyer is looking for')) } '{ requestList.product_name }'.
                            </Col>
                            <Col span={24} className="mt-3 px-2 pb-1 border-bottom border-8b">
                              <Row justify="space-between requestsList--item__location">
                                <Col>
                                  <i className="fal fa-map-marker-alt text-primary vv-font-size-1-9 mr-2" />
                                  <span className="text-47 vv-font-size-1-6">{ `${requestList.auth_country}, ${requestList.auth_city}` }</span>
                                </Col>
                                <Col className="align-self-end">
                                  <i className={ `flag-icon flag-icon-${requestList.country_code} vv-font-size-1-9` } />
                                </Col>
                              </Row>
                            </Col>
                            <Col span={24} className="vv-font-size-1-7 text-center mt-2 cursor-pointer requestsList--item__contact">
                              { t(__('Contact Buyer Now')) }
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </> :
                  <>

                  </>
                }
              </>
            }

          </ScrollContainer>
        </Col>
      </Row>
    </div>
  );
};

export default RequestsList;