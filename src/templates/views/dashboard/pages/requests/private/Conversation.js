import React, { useEffect, useRef, useState } from "react";
import "../styles/Conversation.less";
import { Col, Empty, Row, Skeleton } from "antd";
import { __, SeoGenerator } from "../../../../../../functions/Helper";
import DashboardContentHeader from "../../../templates/components/DashboardContentHeader";
import { useGetApi } from "../../../../../../functions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAuthState } from "../../../../../../contexts/user/UserContext";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ShowResponsiveImage from "../../../../../common/ShowResponsiveImage";
import { useTranslation } from "react-i18next";
import Chat from "../components/Chat";
import Supply from "../components/Supply";

const Conversation = () => {

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { pathname } = useLocation();

  // get product id from url:
  const { requestId } = useParams();

  // user data context state:
  const { user_data } = useGetAuthState();

  const urlPath = pathname?.split("/").filter(Boolean);

  const requestMode = urlPath[2];

  // state for save user id and type:
  const [user, setUser] = useState({});


  // for set user id and user type
  useEffect(() => {
    if (user_data?.auth?.user_id) {
      setUser(
        {
          id: +(user_data?.auth?.company_id) || user_data?.auth?.user_id,
          type: user_data?.auth?.user_type
        }
      );
    }
  }, [user_data?.auth]);

  // get Conversation lists from API:
  const { isLoading: conversationsIsLoading, data: conversationsData } = useGetApi(
    "Conversations",
    {
      request_id: requestId,
      user_id: user?.id,
      user_type: user?.type,
      request_type: "private",
      request_mode: requestMode
    },
    `private_${requestMode}_requestConversation_${requestId}`,
    {
      enabled: !!(requestId && user?.id),
      refetchOnWindowFocus: false
    }
  );

  const conversations = conversationsData?.conversation_data || {},
    requestData = conversationsData?.request_data || {};

  const [conversationData, setConversationData] = useState({});

  // useEffect for change rayChat style after Mount And unMount Component.
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.querySelector('#raychatBtn')) {
        document.querySelector('#raychatBtn').style.bottom = "77px";
        clearInterval(interval);
      }
    }, 100);
    return () => {
      clearInterval(interval);
      if (document.querySelector('#raychatBtn')) {
        document.querySelector('#raychatBtn').style.bottom = "0";
      }
    };
  }, []);

  const messageContent = useRef(null); // use ref for messages list content

  // Function for handle Scroll To Bottom message
  const messageScrollBottom = () => {
    const domNode = messageContent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  }

  useEffect(() => {
    //Scroll To Bottom message
    if (user_data.auth.length !== 0) {
      messageScrollBottom();
    }
  }, [user_data]);

  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Request Conversation"
      />

      <Col span={ 24 }>
        <DashboardContentHeader
          page={ "request Conversation" }
          extra={requestData?.request}
          hasBtn={!!requestData?.request_id}
          btnData={
            {
              text: "go back",
              handleOnClick: () => navigate(`/dashboard/requests/${urlPath[2]}/${urlPath[3]}`),
              icon:  <ArrowLeftOutlined />
            }
          }
        />
      </Col>

      <Col span={24} className="conversation--container">
        <Row>
          <Col span={8} className="conversation--userList">
            <Row>
              {conversationsIsLoading ?
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
                conversations?.length ? conversations?.map(conversation => {
                  return(
                    <Col
                      key={`conversation__item-${conversation?.id}`}
                      span={24}
                      className={ `__item ${conversationData?.id === conversation?.id ? 'active' : ''}` }
                      onClick={() => {
                        setConversationData(
                          {
                            id: conversation?.id,
                            conversation_id: conversation?.conversation_id,
                            receiver_id: conversation?.receiver?.user_id,
                            sender_id: conversation?.sender?.user_id,
                            isSupply: conversation?.is_supply === "1",
                          }
                        )
                      }}
                    >
                      <Row gutter={10} className="h-100">
                        <Col flex="60px" className="--avatar">
                          {conversation?.receiver?.avatar?.logo_id ?
                            <ShowResponsiveImage
                              imagePath={ conversation?.receiver?.avatar?.logo_path }
                              imageFolder='company_logo'
                              width={60}
                              height={60}
                              skeletonWidth="60px"
                              skeletonHeight="60px"
                              skeletonRadius="60%"
                              skeletonSvgWidth="30px"
                              imageAlt={ conversation?.receiver?.name }
                              object_id={ conversation?.receiver?.user_id }
                              object_type={`receiver_logo${conversation?.receiver?.user_id}`}
                            /> :
                            <i className="fal fa-user display-3 text-70 d-block" />
                          }
                        </Col>

                        <Col flex="1 1" className="--details">
                          {conversation?.receiver?.name}
                        </Col>

                        <Col className="--date">
                          {/*05 Aug, 2021*/}
                        </Col>
                      </Row>
                    </Col>
                  );
                }) : null
              }
            </Row>
          </Col>

          <Col span={16} className="conversation--content">
            {conversations.length ?
              ( /* If there was a conversation: */
                conversationData?.conversation_id ?
                  (
                    conversationData?.isSupply ?
                    ( /* If the supplier has filled in the supply form => Show chat: */
                      <Chat
                      contentRef = {messageContent}
                      conversationData = {conversationData}
                      requestMode = {requestMode}
                      user = {user}
                      messageScrollBottom = {messageScrollBottom}
                    />
                    ) :
                    ( /* If the recipient is the same as the sender of the request, the supply form will be displayed: */
                      (conversationData?.receiver_id === requestData?.request_sender) ?
                        <Supply
                          conversationId = {conversationData?.conversation_id}
                          setConversationData = {setConversationData}
                        /> :
                        <Empty description={t(__("Please wait for supplier response"))}/>
                    )
                  ) :
                  (
                    <Empty description={t("no_selected_conversation")}/>
                  )
              ) :
              (
                conversationsIsLoading ?
                  <Row gutter={[0, 5]} style={{ padding: "30px 2rem 0" }}>
                    <Col span={24} className="text-center">
                      <Skeleton.Input style={{ width: 90, height: 90, borderRadius: 10 }} active={true} size={"small"} />
                    </Col>

                    <Col span={24} className="text-center">
                      <Skeleton.Input style={{ width: 110, height: 20 }} active={true} size={"small"} />
                    </Col>
                  </Row> :
                  <Empty description={t("request_not_found")}/>
              )
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Conversation;
