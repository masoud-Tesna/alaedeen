import "./styles/ManufactureInformation.less";
import { Col, Row, Skeleton, Tabs } from "antd";
import { scrollTop, SeoGenerator } from "../../../../../functions/Helper";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { useState } from "react";

//import edit profile and password change component:
import EditProfile from "./settings/EditProfile";
import ChangePassword from "./settings/ChangePassword";

const Settings = () => {

  const { TabPane } = Tabs;

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  // state for save current tab key:
  const [ currentTab, setCurrentTab ] = useState("profile");

  const tabsHandleOnChange = activeTab => {
    setCurrentTab(activeTab);

    if (activeTab !== currentTab) {
      const scrollTopTimer = setTimeout(() => {
        scrollTop();
      }, 100);

      return () => clearTimeout(scrollTopTimer);
    }
  }

  return (
    <Row>

      <SeoGenerator
        title="Dashboard | Account - Settings"
      />

      <Col span={ 24 }>
        <DashboardContentHeader page={ "Account Settings" }/>
      </Col>

      <Col span={24} className="settings--container">
        <Tabs
          activeKey={ currentTab }
          cllassName="manufacturing--tab"
          onChange={ tabsHandleOnChange }
        >
          <TabPane className="profileTab--content" tab={ t("profile") } key="profile">

            {user_data?.load  ?
              <Skeleton active paragraph={{ rows: 10 }} /> :
              <EditProfile />
            }

          </TabPane>

          <TabPane className="passwordTab--content" tab={ t("change_password") } key="password">
            <ChangePassword />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Settings;
