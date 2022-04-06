import { Button, Col, Empty, Form, Input, Row, Spin } from "antd";
import { __, nl2br } from "../../../../../../functions/Helper";
import ShowResponsiveImage from "../../../../../common/ShowResponsiveImage";
import moment from "moment-jalaali";
import Moment from "react-moment";
import fa from "moment/locale/fa";
import React, { useState } from "react";
import { useGetApi } from "../../../../../../functions";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useGetConfig } from "../../../../../../contexts/config/ConfigContext";


const Chat = (
  {
    contentRef,
    conversationData,
    requestMode,
    user,
    messageScrollBottom
  }
) => {

  const { TextArea } = Input;

  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  // initial setting for Moment (Show date)
  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }

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

  return (
    <Row>
      <Col span={24} className="--messages" ref={contentRef}>
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
    </Row>
  );
};

export default Chat;
