import { useEffect, useState } from "react";
import "./styles/Invoices.less";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { Col, Row, Skeleton, Statistic } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import React from "react";
import { useGetApi, useGetApiOld, useQueryString } from "../../../../../functions";
import {
  CheckCircleTwoTone,
  ExclamationCircleOutlined,
  ExclamationCircleTwoTone,
  WarningTwoTone
} from "@ant-design/icons";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import { useGetConfig } from "../../../../../contexts/config/ConfigContext";
import { fn_after_discount, fn_discount, SeoGenerator } from "../../../../../functions/Helper";
import { useParams } from "react-router-dom";

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
  const {orderId} = useParams();
  const orderType = query.get("type");
  const detailsFor = query.get("for");
  const paymentStatus = query.get("status");
  const paymentStatusMsg = query.get("status_msg");

  const [getOrderData, setGetOrderData] = useState(false);

  const [hasAffiliateDiscount, setHasAffiliateDiscount] = useState(false);
  const [planDiscount, setPlanDiscount] = useState(0);

  useEffect(() => {
    if (user_data?.auth?.plan_discount !== "0") {
      setHasAffiliateDiscount(true);
      setPlanDiscount(+(user_data?.auth?.plan_discount));
    }
  }, [user_data?.auth?.plan_discount]);

  // if pay status Complete get order data:
  useEffect(() => {
    if (paymentStatus === "C") setGetOrderData(true);
  }, [paymentStatus]);

  // get request lists from API:
  const { isLoading, data } = useGetApi(
    `Invoices/${orderId}`,
    {
      order_type: orderType,
      company_id: user_data?.auth?.company_id
    },
    `invoice_${orderId}`,
    {
      enabled: !!user_data?.auth?.company_id,
      refetchOnWindowFocus: false
    }
  );

  const order = data || {};
  const orderDataShow = (lists, type) => {
    let tax = 0,
      totalPrice = 0;
    if (setHasAffiliateDiscount) {
      totalPrice = fn_discount(+(order?.prices_after_discount), +planDiscount);
      tax = fn_after_discount(totalPrice, 9);
    } else {
      totalPrice = order?.prices_after_discount;
      tax = fn_after_discount(+(order?.prices_after_discount), 9);
    }

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
                    {t('discount_amount')}
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
                            <Statistic value={list?.price_before_discount} />
                          </Col>

                          <Col span={4} className="text-center my-auto __price">
                            { list?.discount ?
                              <Statistic
                                value={ list?.discount } prefix={ config?.language === "en" ? "%" : "" }
                                suffix={ config?.language !== "en" ? "%" : "" }
                              /> :
                              list?.discount
                            }
                          </Col>

                          <Col span={4} className="text-center my-auto __price">
                            <Statistic value={list?.discount_price} />
                          </Col>

                          <Col span={4} className="text-center my-auto __price">
                            <Statistic value={list?.price_after_discount} />
                          </Col>
                        </Row>
                      </Col>
                    )
                  })}

                  <Col span={24}>
                    <Row className="__data --total">
                      <Col span={8} className="text-center my-auto __plan">{ t("total") }</Col>

                      <Col span={4} className="text-center my-auto __price">
                        <Statistic value={order?.prices_before_discount} />
                      </Col>

                      <Col span={4} className="text-center my-auto __price">
                        { order?.discounts ?
                          <Statistic
                            value={ order?.discounts } prefix={ config?.language === "en" ? "%" : "" }
                            suffix={ config?.language !== "en" ? "%" : "" }
                          /> :
                          order?.discounts
                        }
                      </Col>

                      <Col span={4} className="text-center my-auto __price">
                        <Statistic value={order?.discounts_price} />
                      </Col>

                      <Col span={4} className="text-center my-auto __price">
                        <Statistic value={order?.prices_after_discount} />
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
                        {t('total_amounts')} :
                      </Col>

                      <Col className="my-auto __taxPrice">
                        <Statistic value={order?.prices_after_discount} />
                      </Col>
                    </Row>
                  </Col>

                  {hasAffiliateDiscount &&
                    <Col span={24}>
                      <Row className="__data" justify="space-between">
                        <Col className="my-auto __tax">
                          { config?.language === "en" ?
                            `${ t('discount') } (%${ planDiscount }) :` :
                            `${ t('discount') } (${ planDiscount }%) :`
                          }
                        </Col>

                        <Col className="my-auto __taxPrice">
                          <Statistic value={totalPrice} />
                        </Col>
                      </Row>
                    </Col>
                  }

                  <Col span={24}>
                    <Row className="__data" justify="space-between">
                      <Col className="my-auto __tax">
                        { config?.language === "en" ?
                          `${ t('tax') } (%9) :` :
                          `${ t('tax') } (9%) :`
                        }
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
      <SeoGenerator
        title="Dashboard | invoice - detail"
      />

      <Col span={24}>
        <DashboardContentHeader page={"invoice detail"}/>
      </Col>

      <Col span={24} className="paymentResult--container">
        <Row gutter={[0, 80]}>
          <Col span={24} className="paymentResult text-center">
            {paymentStatus === "C" ?
              <span style={{ color: "#3ba949" }}>
                <CheckCircleTwoTone twoToneColor="#3ba949"/> { t('payment_was_successful') }
              </span> :
              paymentStatus === "U" ?
                <span style={{ color: "#a61d24" }}>
                  <WarningTwoTone twoToneColor="#a61d24" /> { t('payment_unsuccessful') }
                </span> :
              paymentStatus === "O" &&
              <span style={{ color: "#d89614" }}>
                <ExclamationCircleTwoTone twoToneColor="#d89614" /> { t('order_not_completed') }
              </span>
            }

          </Col>

          {isLoading ?
            <Skeleton paragraph={{ rows: 10 }} active/> :
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
                            <span>{t("payment_result")}</span>
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
                            <span>{order?.order_id}</span>
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
                            <Statistic value={+(order?.total_price)} suffix={t("toman")} />
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

          {(paymentStatus === "U" && detailsFor !== "invoice") &&
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
