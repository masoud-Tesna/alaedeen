import { useEffect, useState } from "react";
import "./styles/Result.less";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { Col, Row, Statistic } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import React from "react";
import { useGetApi, useQueryString } from "../../../../../functions";
import { CheckCircleTwoTone, WarningTwoTone } from "@ant-design/icons";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import { useGetConfig } from "../../../../../contexts/config/ConfigContext";

const Result = () => {

  // get initial config:
  const { config } = useGetConfig();

  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  // initial for work in URL:
  const query = useQueryString();

  // get Url parameters:
  const orderType = query.get("type");
  const orderId = query.get("order_id");
  const paymentStatus = query.get("status");
  const paymentStatusMsg = query.get("status_msg");

  const [getOrderData, setGetOrderData] = useState(false);

  // if pay status Complete get order data:
  useEffect(() => {
    if (paymentStatus === "C") setGetOrderData(true);
  }, [paymentStatus]);

  const {isLoading, data} = useGetApi("order-data-api", `order_id=${orderId}&order_type=${orderType}&company_id=${user_data?.auth?.company_id}`, `orderData_${orderId}_${orderType}`, {
    enabled: getOrderData,
    refetchOnWindowFocus: false
  });

  const order = data || {};

  const orderDataShow = (lists, type) => {
    const tax = order?.total_plans_price * (9 / 100);
    switch (type) {
      case "P" :
        return (
          <Row gutter={[0, 20]} className="chosen--plans">
            <Col span={24} className="chosen--plans__table">
              <div>
                <Row className="__head">
                  <Col className="text-center my-auto" span={8}>
                    {t('plan')}
                  </Col>
                  <Col className="text-center my-auto" span={4}>
                    {t('price')}
                  </Col>
                  <Col className="text-center my-auto" span={4}>
                    {t('discount')}
                  </Col>
                  <Col className="text-center my-auto" span={4}>
                    {t('discount_price')}
                  </Col>
                  <Col className="text-center my-auto" span={4}>
                    {t('amount_including_discount')}
                  </Col>
                </Row>

                <Row className="__body">
                  {lists?.map(list => {
                    return (
                      <Col span={24} key={`chosenPlan_${list?.plan_id}`}>
                        <Row className="__data">
                          <Col span={8} className="text-center my-auto __plan">{ list?.plan }</Col>

                          <Col span={4} className="text-center my-auto __price">
                            <Statistic value={list?.price} />
                          </Col>

                          <Col span={4} className="text-center my-auto __price">
                            <Statistic value={0} prefix="%" />
                          </Col>

                          <Col span={4} className="text-center my-auto __price">
                            <Statistic value={0} />
                          </Col>

                          <Col span={4} className="text-center my-auto __price">
                            <Statistic value={list?.price} />
                          </Col>
                        </Row>
                      </Col>
                    )
                  })}

                  <Col span={24}>
                    <Row className="__data --total">
                      <Col span={8} className="text-center my-auto __plan">{ t("total") }</Col>

                      <Col span={4} className="text-center my-auto __price">
                        <Statistic value={order?.total_plans_price} />
                      </Col>

                      <Col span={4} className="text-center my-auto __price">
                        <Statistic value={0} prefix="%" />
                      </Col>

                      <Col span={4} className="text-center my-auto __price">
                        <Statistic value={0} />
                      </Col>

                      <Col span={4} className="text-center my-auto __price">
                        <Statistic value={order?.total_plans_price} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col span={24} className="chosen--plans__table mt-5">
              <div>
                <Row className="__body">
                  <Col span={24}>
                    <Row className="__data" justify="space-between">
                      <Col className="my-auto __tax">
                        {t('total_price')} :
                      </Col>

                      <Col className="my-auto __taxPrice">
                        <Statistic value={order?.total_plans_price} />
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Row className="__data" justify="space-between">
                      <Col className="my-auto __tax">
                        {t('tax')} (%9) :
                      </Col>

                      <Col className="my-auto __taxPrice">
                        <Statistic value={tax} />
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Row className="__data" justify="space-between">
                      <Col className="my-auto __tax">
                        {t('amount_paid')} :
                      </Col>

                      <Col className="my-auto __taxPrice">
                        <Statistic value={order?.total_price / 10} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        );
        break;
    }
  }


  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"payment result"}/>
      </Col>

      <Col span={24} className="paymentResult--container">
        <Row gutter={[0, 80]}>
          <Col span={24} className="paymentResult text-center">
            {paymentStatus === "C" ?
              <span style={{ color: "#3ba949" }}>
                <CheckCircleTwoTone twoToneColor="#3ba949"/> { t('payment_was_successful') }
              </span> :
              paymentStatus === "U" &&
              <span style={{ color: "#a61d24" }}>
                <WarningTwoTone twoToneColor="#a61d24" /> { t('payment_unsuccessful') }
              </span>
            }

          </Col>

          {isLoading ?
            <>Loading...</> :
            order?.order_id &&
              <Col span={24} className="invoice">
                <Row gutter={[0, 20]}>
                  <Col span={24} className="__caption">
                    {t("invoice")} :
                  </Col>

                  <Col span={24} className="orderDetails">
                    <Row gutter={[0, 15]}>
                      <Col span={24}>
                        <Row gutter={15}>
                          <Col xs={24} md={5} lg={4} className="__variable">
                            <span>{t("Payment_result")}</span>
                          </Col>
                          <Col xs={24} md={19} lg={20} className="__value my-auto">
                            <span>
                              {t("successful")}
                            </span>
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={15}>
                          <Col xs={24} md={5} lg={4} className="__variable">
                            <span>{t("order_code")}</span>
                          </Col>
                          <Col xs={24} md={19} lg={20} className="__value my-auto">
                            <span>{order?.order_code}</span>
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={15}>
                          <Col xs={24} md={5} lg={4} className="__variable">
                            <span>{t("date")}</span>
                          </Col>
                          <Col xs={24} md={19} lg={20} className="__value my-auto">
                            <span>
                              {config.language === 'fa'
                                ? moment.unix(order?.timestamp).format('jDD jMMMM jYYYY')
                                : <Moment format="DD MMM, YYYY" unix locale="en">{order?.timestamp}</Moment>
                              }
                            </span>
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={15}>
                          <Col xs={24} md={5} lg={4} className="__variable my-auto">
                            <span>{t("amount_paid")}</span>
                          </Col>
                          <Col xs={24} md={19} lg={20} className="__value my-auto">
                            <Statistic value={order?.total_price} suffix={t("rial")} />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24} className="orderData">
                    {order?.data && orderDataShow(order?.data, orderType)}
                  </Col>
                </Row>
              </Col>
          }

          {paymentStatus === "U" &&
            <Col span={24} className="unsuccessful">
              <Row gutter={[0, 16]}>
                <Col span={24} className="__item --caption text-center">
                  {t("payment_failed_please_try_again")}
                </Col>

                <Col span={24} className="__item --msg text-center">
                  <span>{t("cause_of_error")} : </span>
                  <span>{t(paymentStatusMsg)}</span>
                </Col>
              </Row>
            </Col>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default Result;