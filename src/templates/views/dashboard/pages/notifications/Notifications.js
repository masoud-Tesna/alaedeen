import React, { useEffect, useState } from "react";
import "./styles/Notifications.less";
import {Alert, Col, Row, Skeleton} from "antd";
import {SeoGenerator} from "../../../../../functions/Helper";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import {useGetApi} from "../../../../../functions";
import {useGetConfig} from "../../../../../contexts/config/ConfigContext";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import {useTranslation} from "react-i18next";
import {useGetAuthState} from "../../../../../contexts/user/UserContext";
import VisibilitySensor from 'react-visibility-sensor';
import axios from "axios";

import alaedeenChar from '../../../../assets/images/alaedeen-char.png';

const Notification = (props) => {
  
  const [visibility, setVisibility] = useState(false);
  
  const [canUpdate, setCanUpdate] = useState(false);
  
  const {notificationId, isPrivate} = props;
  
  const seenAt = props?.seenAt !== "0";
  
  useEffect(() => {
    if (visibility) setCanUpdate(true);
  }, [visibility]);
  
  useEffect(() => {
  
    if (isPrivate && canUpdate && !seenAt) {
      axios.post(
        `https://alaedeen.com/horn/api/Notifications`,
        {
          notification_id: notificationId,
          mode: "seen"
        },
        {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      )
        .then(res => {
          if (res?.data === "seen") setCanUpdate(false);
        })
    }
    
  }, [canUpdate, isPrivate]);
  
  return (
    <VisibilitySensor
      partialVisibility
      onChange={isVisible => setVisibility(isVisible)}
    >
      {props.children}
    </VisibilitySensor>
  )
  
}

const Notifications = () => {
  
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
    `Notifications/${user_data?.auth?.company_id}`,
    "",
    `Notifications_${user_data?.auth?.company_id}`,
    {
      enabled: !!user_data?.auth?.company_id
    }
  );
  
  const notifications = data?.notifications || {};
  const params = data?.params || {};
  
  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Notifications"
      />
      
      <Col span={24}>
        <DashboardContentHeader page={"Notifications"}/>
      </Col>
      
      <Col span={24} className="notifications--container">
        
        <Row gutter={[0, 20]}>
          {isLoading ?
            (
              new Array(5).fill("", 0, 5).map((__, i) => {
                return(
                  <Col xs={24} key={`isLoading_notification_${i + 1}`}>
                    <Skeleton.Input className="--loading" active={true} />
                  </Col>
                )
              })
            ):
            (
              notifications?.map((notification, i) => {
                
                const isPrivate = !!notification?.company;
                
                return(
                  <Col span={24} key={`notification_${notification?.notification_id}`}>
                    <Notification notificationId = {notification?.notification_id} isPrivate = {isPrivate} seenAt = {notification?.seen_at}>
                      <Alert
                        showIcon
                        icon={<img src={alaedeenChar} alt=""/>}
                        description={
                          <Row gutter={[0, 0]}>
                            <Col span={24} className="--description" dangerouslySetInnerHTML={{__html: notification?.message}} />
                            
                            <Col span={42} className="--dateTime">
                              <span className="__caption">
                                {t("received_at")}:
                              </span>
                              
                              <span className="__date">
                                {config.language !== 'en'
                                  ? moment.unix(notification?.created_at).format('jDD jMMMM jYYYY | HH:mm')
                                  : <Moment format="DD MMM, YYYY | HH:mm" unix locale="en">{notification?.created_at}</Moment>
                                }
                              </span>
                            </Col>
                          </Row>
                        }
                        type="success"
                      />
                    </Notification>
                  </Col>
                );
              })
            )
          }
        </Row>
        
      </Col>
    </Row>
  );
};

export default Notifications;
