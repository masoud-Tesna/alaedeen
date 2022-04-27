import "./styles/Invoices.less";
import { useGetApi } from "../../../../../functions";
import { Button, Col, Row, Skeleton, Statistic } from "antd";
import { __, SeoGenerator } from "../../../../../functions/Helper";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import React from "react";
import { useGetConfig } from "../../../../../contexts/config/ConfigContext";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import Status from "../../../../common/Status";

const Invoices = () => {

  // get initial config:
  const { config } = useGetConfig();

  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({ usePersianDigits: true });
  }

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  // get invoices from API:
  const { isLoading, data } = useGetApi(
    `Invoices`,
    {
      company_id: user_data?.auth?.company_id
    },
    `invoices_${user_data?.auth?.company_id}`,
    {
      enabled: !!user_data?.auth?.company_id,
      refetchOnWindowFocus: false
    }
  );

  const invoices = data || {};

  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Invoices"
      />

      <Col span={ 24 }>
        <DashboardContentHeader page={ "invoices" }/>
      </Col>

      <Col span={ 24 } className="invoices--container">
        { isLoading ?
          <Skeleton paragraph={{ rows: 10 }} /> :
          <Row gutter={[0, 20]} className="invoices">
            <Col span={24} className="invoices__table">
              <div>
                <Row className="__head">
                  <Col className="text-center my-auto" span={5}>
                    {t('invoice_code')}
                  </Col>

                  <Col className="text-center my-auto" span={5}>
                    {t('payment_result')}
                  </Col>

                  <Col className="text-center my-auto" span={5}>
                    {t('amount_paid')}
                  </Col>

                  <Col className="text-center my-auto" span={5}>
                    {t('date')}
                  </Col>

                  <Col className="text-center my-auto" span={4}>
                    {t('action')}
                  </Col>
                </Row>

                <Row className="__body">

                  {invoices?.map(invoice => {
                    return (
                      <Col span={24} key={`invoices_${invoice?.order_id}`}>
                        <Row className="__data">
                          <Col span={5} className="text-center my-auto __plan">{ invoice?.order_id }</Col>

                          <Col span={5} className="text-center my-auto __price">
                            <Status type="order" status={invoice?.status} />
                          </Col>

                          <Col span={5} className="text-center my-auto __status">
                            <Statistic value={invoice?.total_price} suffix={t("toman")} />
                          </Col>

                          <Col span={5} className="text-center my-auto __price">
                            <span>
                              {config.language === 'fa'
                                ? moment.unix(invoice?.timestamp).format('jDD jMMMM jYYYY')
                                : <Moment format="DD MMM, YYYY" unix locale="en">{invoice?.timestamp}</Moment>
                              }
                            </span>
                          </Col>

                          <Col span={4} className="text-center my-auto __actions">
                            <Row justify="center" gutter={10}>
                              {invoice?.status === "C" &&
                                <Col>
                                  <Link to={`result/${invoice?.order_id}/?type=${invoice?.type}&status=${invoice?.status}&for=invoice`}>
                                    <Button type="primary" icon={<EyeOutlined />} >
                                      {t('details')}
                                    </Button>
                                  </Link>
                                </Col>
                              }
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    )
                  })}

                </Row>
              </div>
            </Col>
          </Row>
        }
      </Col>
    </Row>
  );
};

export default Invoices;
