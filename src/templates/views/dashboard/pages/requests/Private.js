import "./styles/index.less";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { Col, Empty, Row, Skeleton } from "antd";
import { useGetApiOld } from "../../../../../functions";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import React, { useState } from "react";
import { useGetConfig } from "../../../../../contexts/config/ConfigContext";
import { useTranslation } from "react-i18next";
import { __, SeoGenerator } from "../../../../../functions/Helper";
import { CommentOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Private = () => {

  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  const navigate = useNavigate();

  // user data context state:
  const { user_data } = useGetAuthState();

  const companyId = user_data?.auth?.company_id || 0;

  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }

  const [selectedRequest, setSelectedRequest] = useState({});

  // get request lists from API:
  const { isLoading, data } = useGetApiOld(`request-list-api`, `company_id=${companyId}`, `requestLists_${companyId}`, {enabled: !!companyId});
  const requestLists = data?.request_lists || [];

  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Requests - Private"
      />
      <Col span={ 24 }>
        <DashboardContentHeader
          page={ "Private requests" }
          hasBtn={!!selectedRequest?.request_id}
          btnData={
            {
              text: "conversation",
              handleOnClick: () => navigate(selectedRequest?.request_id),
              icon:  <CommentOutlined />
            }
          }
        />
      </Col>

      <Col span={24} className="requests--container">
        <Row>
          <Col span={8} className="requests--list">
            <Row className="requests">
              {isLoading ?
                new Array(6).fill("", 0, 6).map((p, i) => {
                  return(
                    <Col key={`RequestsLoading_${i}`} span={24} className="__item">
                      <Row className="h-100">
                        <Col flex="1 1" className="--details">
                          <Skeleton.Input style={{ width: `calc(20vw - ${(i + 1) * Math.floor(Math.random() * 17) + 5}px)`, height: 22 }} active={true} size={"small"} />
                        </Col>

                        <Col className="--date">
                          <Skeleton.Input style={{ width: "6rem", height: 22 }} active={true} size={"small"} />
                        </Col>

                      </Row>
                    </Col>
                  )
                }) :
                requestLists?.map(request => {
                  return (
                    <Col
                      key={request?.request_id}
                      span={24}
                      className={ `__item ${(selectedRequest?.request_id && (selectedRequest.request_id === request?.request_id)) ? 'active' : ''}` }
                      onClick={() => setSelectedRequest(request)}
                    >
                      <Row gutter={[0, 5]} className="h-100">
                        <Col span={24} className="--details">
                          <div className="topSection">
                            <span className="--product">{request?.product_name}</span>
                          </div>
                        </Col>

                        <Col span={24} className="extra">
                          <Row gutter={10}>
                            <Col flex="1 1" className="--details">
                              <div className="buttonSection">
                                <span className="--name">{request?.auth_name}</span>
                                {request?.auth_company ?
                                  <> - <span className="--company">{request?.auth_company}</span></> :
                                  <></>
                                }
                              </div>
                            </Col>

                            <Col className="--date">
                              {config.language === 'fa'
                                ? moment.unix(request?.timestamp).format('jDD jMMMM jYYYY')
                                : <Moment format="DD MMM, YYYY" unix locale="en">{request?.timestamp}</Moment>
                              }
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  )
                })
              }
            </Row>
          </Col>

          <Col span={16} className="requests--selected">
            { selectedRequest?.request_id ?
              <Row className="row-cols-1" gutter={[0, 30]}>
                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('request name')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { selectedRequest?.product_name }
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('Applicant name')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { selectedRequest?.auth_name }
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('location')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { `${selectedRequest?.auth_country}, ${selectedRequest?.auth_city}` }
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('quantity')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { `${selectedRequest?.quantity} ${selectedRequest?.quantity_unit}` }
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('order_value')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { `${selectedRequest?.order_value} ${selectedRequest?.currency}` }
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('requirement_urgency')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { selectedRequest?.requirement_urgency }
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('supp_location')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { selectedRequest?.supp_location }
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('requirement_frequency')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { selectedRequest?.regular_type ? selectedRequest?.regular_type : selectedRequest?.requirement_frequency }
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={16}>
                    <Col span={12} className="--variable text-47">
                      { t(__('description')) }:
                    </Col>
                    <Col span={12} className="--value text-92">
                      { selectedRequest?.description }
                    </Col>
                  </Row>
                </Col>
              </Row> :
              <Empty description={t("no_selected_request")}/>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Private;
