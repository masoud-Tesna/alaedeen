import "./styles/ManufactureInformation.less";
import { Col, Row, Skeleton, Tabs } from "antd";
import { __, scrollTop, SeoGenerator } from "../../../../../functions/Helper";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { useSpinnerDispatch } from "../../../../../contexts/spiner/SpinnerContext";
import { useState } from "react";

//import edit profile components for customer and vendor:
import EditProfile from "./editProfile/EditProfile";

import { useGetApiOld } from "../../../../../functions";

const Settings = () => {

  const { TabPane } = Tabs;

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  const userType = user_data?.auth?.user_type;

  // get country lists from API:
  const { isLoading: countryListsIsLoading, data: countryListsData } = useGetApiOld(`country-lists-api`, '', `countryLists`, {
    refetchOnWindowFocus: false
  });
  const countryLists = countryListsData || [];

  const countryCode = "ir";

  // get cities list from API:
  const { isLoading: stateListsIsLoading, data: stateListsData } = useGetApiOld(`city-lists-api`, `country_code=${countryCode}`, `statesList_${countryCode}`, {
    enabled: !!countryCode,
    refetchOnWindowFocus: false
  });
  const stateLists = stateListsData || [];

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

            {(user_data?.load || countryListsIsLoading || stateListsIsLoading) ?
              <Skeleton active={true} paragraph={{ rows: 10 }} /> :
              <EditProfile
                userType={userType}
                countryLists={countryLists}
                stateLists={stateLists}
              />
            }

          </TabPane>

          <TabPane className="passwordTab--content" tab={ t("password_change") } key="password">
            Password change
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Settings;
