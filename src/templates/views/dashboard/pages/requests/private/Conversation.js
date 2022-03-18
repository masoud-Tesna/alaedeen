import React, { useEffect, useRef, useState } from "react";
import "../styles/Conversation.less";
import { Button, Col, Empty, Form, Input, Row, Skeleton, Spin } from "antd";
import { __, nl2br, SeoGenerator } from "../../../../../../functions/Helper";
import DashboardContentHeader from "../../../templates/components/DashboardContentHeader";
import { useGetApi } from "../../../../../../functions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAuthState } from "../../../../../../contexts/user/UserContext";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ShowResponsiveImage from "../../../../../common/ShowResponsiveImage";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useGetConfig } from "../../../../../../contexts/config/ConfigContext";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";

const Conversation = () => {

  const { TextArea } = Input;

  // get initial config:
  const { config } = useGetConfig();

  const navigate = useNavigate();

  const { t } = useTranslation();

  // initial setting for Moment (Show date)
  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }

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


  // get Conversation Messages lists from API:
  const { isLoading: messagesListIsLoading, isSuccess: messagesListIsSuccess, data: messagesListData, refetch: messagesListRefetch } = useGetApi(
    `ConversationMessages/${conversationData?.id}`,
    {},
    `private_${requestMode}_conversation_messages_list_${conversationData?.id}`,
    {
      enabled: !!(conversationData?.conversation_id && user?.id),
      refetchInterval: 10000
    }
  );

  const messages = messagesListData?.messages || {},
    messagesParams = messagesListData?.params || {};

  const [messageText, setMessageText] = useState("");
  const [isSpinSend, setIsSpinSend] = useState(false); // state for show spin after send message

  const [sendMessageForm] = Form.useForm();

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

  // function for send message:
  const handleSendMessage = (values) => {
    setIsSpinSend(true); // show spin

    values.conversation_id = conversationData?.conversation_id; // add conversation id
    values.sender = user?.id; // add sender id
    values.receiver = conversationData?.receiver_id; // add receiver id
    values.category = "Message"; // add Message Category
    values.type = "text"; // add Message type

    const params = new URLSearchParams(values);

    axios.post(
      "https://alaedeen.com/horn/api/ConversationMessages",
      params,
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    )
      .then(() => {
        sendMessageForm.resetFields(); // reset send message form
        messagesListRefetch() // re fetch message list
          .then(() => {
            setIsSpinSend(false); // remove spin
          })
          .then(() => {
            messageScrollBottom(); // scroll bottom
          });
      });
  }

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
        title="Dashboard | Conversation"
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
                            receiver_id: conversation?.receiver?.user_id
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
              (
                conversationData?.conversation_id ?
                  <Row>
                    <Col span={24} className="--messages" ref={messageContent}>
                      <Spin
                        spinning={isSpinSend || messagesListIsLoading}
                        tip={ isSpinSend ? `${ t('send_your_message') }...` :  `${ t('loading_conversation') }...`}
                      >
                        <Row gutter={[0, 25]}>
                          {messages.length ?
                            messages?.map(message => {
                              const messageText = nl2br(message?.message);
                              return (
                                <Col
                                  key={`message_${message?.message_id}`}
                                  span={24}
                                  className={`__message ${+(message?.sender?.user_id) === +(user?.id) ? 'send' : 'receive'}`}
                                >
                                  <Row gutter={10} className="messageBody">
                                    <Col flex={ message?.sender?.avatar?.logo_path ? "55px" : "40px" } className="--avatar">
                                      {
                                        message?.sender?.avatar?.logo_path ?
                                          <ShowResponsiveImage
                                            imagePath={ message?.sender?.avatar?.logo_path }
                                            imageFolder='company_logo'
                                            width={60}
                                            height={60}
                                            skeletonWidth="60px"
                                            skeletonHeight="60px"
                                            skeletonRadius="60%"
                                            skeletonSvgWidth="30px"
                                            imageAlt={ message?.sender?.name }
                                            object_id={ message?.sender?.user_id }
                                            object_type={`receiver_logo${message?.sender?.user_id}`}
                                          /> :
                                          <i className="fal fa-user display-4 text-70 d-block" />
                                      }
                                    </Col>

                                    <Col flex="1 1">
                                      <div className="--details">
                                        <Row gutter={[0, 5]}>
                                          <Col span={24} className="--text">
                                            <div dangerouslySetInnerHTML={ { __html: messageText }} />
                                          </Col>

                                          <Col span={24} className="--date">
                                            {config.language === 'fa'
                                              ? moment.unix(message?.sent_at).format('jDD jMMMM jYYYY - HH:mm')
                                              : <Moment format="DD MMM, YYYY - HH:mm" unix locale="en">{message?.sent_at}</Moment>
                                            }
                                          </Col>
                                        </Row>
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                              )
                            }) :
                            <Col span={24}><Empty description={t("no_message")}/></Col>
                          }
                        </Row>
                      </Spin>
                    </Col>

                    <Col span={24} className="--sendMessage">
                      <Form
                        className="h-100 --form"
                        name="sendMessage-form"
                        form={sendMessageForm}
                        onFinish={handleSendMessage}
                      >
                        <Row>
                          <Col flex="1 1" className="__messageInput">
                            <Form.Item
                              name="message"
                              noStyle
                            >
                              <TextArea
                                autoSize={{ minRows: 3, maxRows: 3}}
                                addonAfter=".com"
                                placeholder={ t(__('Type a message')) }
                                bordered={false}
                                allowClear
                                spellCheck={false}
                                onChange={e => setMessageText(e.target.value)}
                              />
                            </Form.Item>
                          </Col>

                          <Col className="__messageSendBtn">
                            <Button type="primary" shape="circle" icon={ <i className="far fa-location-arrow display-4 text-white mr-2 mt-1" /> } htmlType="submit" disabled={!!!messageText} />
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row> :
                  <Empty description={t("no_selected_conversation")}/>
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
                  <Empty description={t("no_requests")}/>
              )
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Conversation;
