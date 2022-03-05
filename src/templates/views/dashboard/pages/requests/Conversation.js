import React, { useEffect, useRef, useState } from "react";
import "./styles/Conversation.less";
import { Button, Col, Empty, Form, Input, Row, Skeleton, Spin } from "antd";
import { __, nl2br, SeoGenerator } from "../../../../../functions/Helper";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useGetApi } from "../../../../../functions";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ShowResponsiveImage from "../../../../common/ShowResponsiveImage";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useGetConfig } from "../../../../../contexts/config/ConfigContext";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";

const Conversation = () => {

  const { TextArea } = Input;

  // get initial config:
  const { config } = useGetConfig();

  const navigate = useNavigate();

  const { t } = useTranslation();

  // get product id from url:
  const { requestId } = useParams();

  // user data context state:
  const { user_data } = useGetAuthState();

  // state for save user id and type:
  const [user, setUser] = useState({});

  // for set user id and user type
  useEffect(() => {
    if (user_data?.auth?.user_id) {
      if (user_data?.auth?.user_type === 'V') {
        setUser(
          {
            id: user_data?.auth?.company_id,
            type: 'V'
          }
        );
      } else if (user_data?.auth?.user_type === 'C') {
        setUser(
          {
            id: user_data?.auth?.user_id,
            type: 'C'
          }
        );
      }
    }
  }, [user_data?.auth]);

  // initial setting for Moment (Show date)
  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }

  // get Conversation lists from API:
  const { isLoading: conversationsIsLoading, data: conversationsData } = useGetApi(
    `Conversations/${requestId}`,
    {
      user_id: user?.id,
      user_type: user?.type
    },
    `requestConversation_${requestId}`,
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
    `ConversationMessages/${conversationData?.conversation_id}`,
    {},
    `conversation_messages_list_${conversationData?.conversation_id}`,
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
            messageScrollBottom(); // scroll bottom
          });
      })
      .then(() => {
        setIsSpinSend(false); // remove spin
      })
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
  }, [messagesListIsSuccess, user_data, messages.length]);

  // if loading conversation list show loading
  if (conversationsIsLoading && conversations?.length === 0) {
    return <Skeleton active={true} paragraph={{rows: 10}} />
  }

  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Requests - Public"
      />

      <Col span={ 24 }>
        <DashboardContentHeader
          page={ "request Conversation" }
          extra={requestData?.request}
          hasBtn={!!requestData?.request_id}
          btnData={
            {
              text: "go back",
              handleOnClick: () => navigate(`/dashboard/requests/${requestData?.request_type}`),
              icon:  <ArrowLeftOutlined />
            }
          }
        />
      </Col>

      <Col span={24} className="conversation--container">
        <Row>
          <Col span={8} className="conversation--userList">
            <Row>
              {conversations?.length ? conversations?.map(conversation => {
                return(
                  <Col
                    key={`convesation__item-${conversation?.conversation_id}`}
                    span={24}
                    className={ `__item ${conversationData?.conversation_id === conversation?.conversation_id ? 'active' : ''}` }
                    onClick={() => {
                      setConversationData(
                        {
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
                        05 Aug, 2021
                      </Col>
                    </Row>
                  </Col>
                );
              }) : null}
            </Row>
          </Col>

          <Col span={16} className="conversation--content">
            { conversationData?.conversation_id ?
              <Row>
                <Col span={24} className="--messages" ref={messageContent}>
                  <Spin spinning={isSpinSend || messagesListIsLoading} tip={ `${ t('send_your_message') }...` }>
                    <Row gutter={[0, 25]}>
                      {messages.length ?
                        messages?.map(message => {
                          const messageText = nl2br(message?.message);
                          return (
                            <Col
                              key={`message_${message?.message_id}`}
                              span={24}
                              className={`__message ${message?.sender?.user_id === user?.id ? 'send' : 'receive'}`}
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
                            placeholder={ t(__('Type a massage')) }
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
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Conversation;
