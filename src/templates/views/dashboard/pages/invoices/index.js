import "./styles/Invoices.less";
import { useGetApi } from "../../../../../functions";
import { Col, Row, Skeleton } from "antd";
import { __, SeoGenerator } from "../../../../../functions/Helper";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import React from "react";
import { useGetConfig } from "../../../../../contexts/config/ConfigContext";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";

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

  // get request lists from API:
  const { isLoading, data } = useGetApi(
    `Invoices`,
    {
      company_id: user_data?.auth?.company_id
    },
    `invoices_493`,
    {
      enabled: !!user_data?.auth?.company_id,
      refetchOnWindowFocus: false
    }
  );

  const invoices = data || {};

  console.log(invoices)

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
          <Skeleton paragraph={{ rows: 10 }} active={true}/> :
          <Row>
            data
          </Row>
        }
      </Col>
    </Row>
  );
};

export default Invoices;
