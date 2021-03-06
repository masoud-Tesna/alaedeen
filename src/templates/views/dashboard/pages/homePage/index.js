import "./styles/Dashboard.less";
import { Col, Row } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { SeoGenerator } from "../../../../../utilities/functions/Helper";
import ShowResponsiveImage from "../../../../common/ShowResponsiveImage";
import React from "react";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { useConfigDispatch, useGetConfig } from "../../../../../contexts/config/ConfigContext";
import { useTranslation } from "react-i18next";
import moment from "moment-jalaali";
import Moment from "react-moment";
import fa from "moment/locale/fa";
import { useNavigate } from "react-router-dom";

const Index = () => {

  moment.updateLocale("fa", fa);
  moment.loadPersian({usePersianDigits: true});
  const { t } = useTranslation();

  // initial state for language:
  const { config } = useGetConfig();
  const navigate = useNavigate();

  const { user_data } = useGetAuthState();

  return (
    <Row>
      <SeoGenerator
        title="Dashboard"
      />

      <Col span={24}>
        <DashboardContentHeader page={"Dashboard"} />
      </Col>

      <Col span={24} className="dashboard--container">
        <Row gutter={[25, 20]}>
          <Col span={24}>
            <Row className="dashboard--item" gutter={[15, 20]}>
              <Col span={24} className="user--details">
                <Row gutter={10}>
                  <Col flex="55px" className="--avatar">
                    { (user_data?.auth?.company_logo && user_data?.auth?.company_logo.length !== 0) ?
                      <ShowResponsiveImage
                        imagePath={ user_data?.auth?.company_logo?.logo_path }
                        imageFolder='company_logo'
                        width={45}
                        height={45}
                        skeletonWidth="45px"
                        skeletonHeight="45px"
                        skeletonRadius="45%"
                        skeletonSvgWidth="30px"
                        imageAlt={ user_data?.auth?.company ? user_data?.auth?.company : ` ${user_data?.auth?.firstname} ${user_data?.auth?.lastname} `}
                        object_id={user_data?.auth?.company_id}
                        object_type={`company_logo_${config.language}`}
                      /> :
                      <i className="fal fa-user display-3 text-70 d-block" />
                    }
                  </Col>

                  <Col flex="1 1" className="--details">
                    { user_data?.auth?.company || `${user_data?.auth?.firstname} ${user_data?.auth?.lastname}` }
                  </Col>
                </Row>
              </Col>

              <Col span={24} className="user--information">
                <Row gutter={[20, 20]} className="--info">
                  {user_data?.auth?.company &&
                    <Col xs={24} lg={8}>
                      <span className="--variable">{t("company")}:</span>
                      <span className="--value">{user_data?.auth?.company}</span>
                    </Col>
                  }

                  {user_data?.auth?.fields[64] &&
                    <Col xs={24} lg={8}>
                      <span className="--variable">{t("brand")}:</span>
                      <span className="--value">{user_data?.auth?.fields[64]}</span>
                    </Col>
                  }

                  <Col xs={24} lg={8}>
                    <span className="--variable">{t("email")}:</span>
                    <span className="--value">{user_data?.auth?.email}</span>
                  </Col>

                  <Col xs={24} lg={8}>
                    <span className="--variable">{t("phone")}:</span>
                    <span className="--value">{user_data?.auth?.phone}</span>
                  </Col>

                  <Col xs={24} lg={8}>
                    <span className="--variable">{t("registration_date")}:</span>
                    <span className="--value">
                      {config.language === 'fa'
                        ? moment.unix(user_data?.auth?.timestamp).format('jDD jMMMM jYYYY | HH:mm')
                        : <Moment format="DD MMM, YYYY | HH:mm" unix locale="en">{user_data?.auth?.timestamp}</Moment>
                      }
                    </span>
                  </Col>

                  <Col xs={24} lg={8}>
                    <span className="--variable">{t("your_id")}:</span>
                    <span className="--value">{user_data?.auth?.user_id}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={8}>
            <Row className="dashboard--item --links cursor-pointer" onClick={() => navigate("products/manage")} justify="center" gutter={15}>
              <Col className="__icon">
                <i className="fa-thin fa-cart-shopping" />
              </Col>

              <Col className="__link">{t("my_product")}</Col>
            </Row>
          </Col>

          <Col span={8}>
            <Row className="dashboard--item --links cursor-pointer" onClick={() => navigate("business-promotion")} justify="center" gutter={15}>
              <Col className="__icon">
                <i className="fa-thin fa-arrow-trend-up ant-menu-item-icon" />
              </Col>

              <Col className="__link">{t("business_promotion")}</Col>
            </Row>
          </Col>

          <Col span={8}>
            <Row className="dashboard--item --links cursor-pointer" onClick={() => navigate("account/settings")} justify="center" gutter={15}>
              <Col className="__icon">
                <i className="fa-thin fa-user" />
              </Col>

              <Col className="__link">{t("account_settings")}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index;
