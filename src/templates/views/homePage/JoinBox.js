import "./styles/JoinBox.less";
import {Col, Row, Skeleton} from "antd";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useGetAuthState} from "../../../contexts/user/UserContext";
import {If, Then, Else} from "../../../utilities/functions/Helper";

const JoinBox = () => {
  
  const { t } = useTranslation();
  
  const { user_data } = useGetAuthState();
  
  return (
    <Row className="joinBox--container" gutter={[0, 35]}>
      <Col span={24} className="--caption">
        {t("welcome_to_alaedeen")}
      </Col>
      
      <Col span={24}>
        <Row gutter={9} justify="center">
          <If condition={!!user_data?.load}>
            <Then>
              <Col span={12} className="--joinBox __skeleton">
                <Skeleton.Input active size={"small"} />
              </Col>
  
              <Col span={12} className="--loginBox __skeleton">
                <Skeleton.Input active size={"small"} />
              </Col>
            </Then>
            
            <Else>
              <If condition={!!(user_data.auth.user_id)}>
                <Then>
                  <Col span={12} className="--dashboardBox">
                    <Link to="/dashboard">{t("dashboard")}</Link>
                  </Col>
                </Then>
                
                <Else>
                  <Col span={12} className="--joinBox">
                    <Link to="/register">{t("join")}</Link>
                  </Col>
  
                  <Col span={12} className="--loginBox">
                    <Link to="/sign-in">{t("sign_in")}</Link>
                  </Col>
                </Else>
              </If>
            </Else>
          </If>
        </Row>
      </Col>
    </Row>
  );
};

export default JoinBox;
