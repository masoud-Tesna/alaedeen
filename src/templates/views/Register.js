import { useEffect, useRef, useState } from "react";

// import style file:
import './styles/Register.less';

import { Button, Checkbox, Col, Form, Input, InputNumber, message, Modal, Row, Select, Statistic, Tabs } from "antd";
import { __, fn_deadline, SeoGenerator } from "../../functions/Helper";
import { EditOutlined, EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined, SendOutlined } from "@ant-design/icons";
import googlePic from "../assets/images/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signInAction, useDispatchAuthState, useGetAuthState } from "../../contexts/user/UserContext";

import { signInApi, useGetApiOld, useQueryString } from "../../functions";
import axios from "axios";
import { useGetConfig } from "../../contexts/config/ConfigContext";

// import alaedeen character:
import alaedeenChar from '../assets/images/alaedeen-char.svg';
import { useMutation } from "react-query";
import { isLoadingAction, useSpinnerDispatch } from "../../contexts/spiner/SpinnerContext";

const Register = () => {

  const { TabPane } = Tabs;
  const { Option } = Select;
  const { Countdown } = Statistic;

  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  const navigate = useNavigate();

  //initial state and dispatch for auth context:
  const { user_data } = useGetAuthState();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  // state for set register type (if seller show step bar):
  const [registerType, setRegisterType] = useState("seller");

  // state for show verification modal:
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);

  // state for show loading spinner in verification btn (if clicked and request send to server):
  const [verificationModalConfirmLoading, setVerificationModalConfirmLoading] = useState(false);

  // state for save user email:
  const [userLoginEmail, setUserLoginEmail] = useState("");

  // state for save user password:
  const [userLoginPassword, setUserLoginPassword] = useState("");

  // state for save user phone number:
  const [userLoginPhoneNumber, setUserLoginPhoneNumber] = useState("");

  // state for disable or enable phone number input for edit and update phone number:
  const [userLoginPhoneNumberVisible, setUserLoginPhoneNumberVisible] = useState(true);

  // state for show loading spinner in send new phone number btn (if clicked and request send to server):
  const [userLoginPhoneNumberConfirmLoading, setUserLoginPhoneNumberConfirmLoading] = useState(false);

  // state for show btn To resend the verification code:
  const [resendCode, setResendCode] = useState(false);

  // state for show loading spinner in resend new code btn (if clicked and request send to server):
  const [resendCodeConfirmLoading, setResendCodeConfirmLoading] = useState(false);

  // state for show countdown for resend code (after: 1 Minute):
  const [resendCodeDeadline, setResendCodeDeadline] = useState(0);

  useEffect(() => {
    setResendCodeDeadline(fn_deadline("1.01"))
  }, [resendCode]);

  // ref for handle change phone number input:
  const changePhoneRef = useRef(null);

  // ref for handle verification code input:
  const [verificationForm] = Form.useForm();

  const { AuthDispatch } = useDispatchAuthState();

  // get cities list from API:
  const { data } = useGetApiOld(`city-lists-api`, 'country_code=IR', `citiesList_IR`);

  const { city_lists: cityLists } = data || [];

  useEffect(() => {
    // If you are already logged in:
    if (user_data.auth.user_id) {
      navigate('/');
    }
  }, []);

  // initial for work in URL:
  const query = useQueryString();

  // get Url parameters:
  const referralCode = query.get("ref");

  // create register axios async function:
  async function Register(values) {
    return await axios.post(`https://alaedeen.com/horn/register-api/?lang_code=${config.language}`, { user_data: values });
  }

  // create sign in useMutation:
  const { mutate: signInMutation } = useMutation(signInApi, {
    onSuccess: res => {
      if (res?.auth?.status) {
        AuthDispatch(signInAction(res.auth, res.token));
      }
    }
  });

  // create handle register function:
  const onRegisterFormHandle = values => {
    // show spinner (spinner context):
    spinnerDispatch(isLoadingAction(true));

    if (values.password1 !== values.password2) {
      // hidden spinner (spinner context):
      spinnerDispatch(isLoadingAction(false));

      message.warning({
        content: "رمز های عبور باهم یکسان نیست",
        duration: 4,
        className: 'registerDone--warning',
      })
    }
    else {
      Register(values)
        .then(res => {
          if (!res.data.status && res.data.error === 'email_already_used') {
            // hidden spinner (spinner context):
            spinnerDispatch(isLoadingAction(false));
            message.error({
              content: t(__("Email is already registered in the system")),
              duration: 4,
              className: 'registerDone--warning',
            })
          }

          else {

            if (registerType === 'buyer') {

              const loginData = {
                user_login: values.email,
                password: values.password1,
                language: config.language
              }

              signInMutation(loginData, {
                onSuccess: () => {
                  // hidden spinner (spinner context):
                  spinnerDispatch(isLoadingAction(false));

                  // if register as buyer show register done message. else show Modal for seller...
                  message.success({
                    content: t("register_done_and_login"),
                    duration: 2,
                    className: 'registerDone--message',
                  }).then(() => {
                    navigate('/dashboard');
                  });
                }
              });
            }

            else {

              setUserLoginEmail(values.email); // set user email sate:
              setUserLoginPassword(values.password1); // set user password sate:
              setUserLoginPhoneNumber(values.phone); // set user phone number sate:

              setVerificationModalVisible(true); // show verification modal:

              spinnerDispatch(isLoadingAction(false)); // hide spinner (spinner context):
            }

          }

        });
    }

  }


  // create phone verify axios async function:
  async function VerificationApi(verificationCode, values) {
    return await axios.put(
      `https://alaedeen.com/api/VerificationAccounts.php/?verification_code=${verificationCode}`,
      values
    );
  }

  // create edit phone or resend code axios async function:
  async function editPhoneAndSendCode(params) {
    return await axios.post(
      `https://alaedeen.com/api/VerificationAccounts.php`,
      { ...params }
    );
  }

  // create function for handle change phone number:
  const handleChangeNumber = phone => {
    // show btn loading spinner
    setUserLoginPhoneNumberConfirmLoading(true);
    const params = {
      phone: phone,
      user_email: userLoginEmail,
      type: "edit_number"
    }

    editPhoneAndSendCode(params)
      .then(res => {
        if (res?.data?.status) {

          // add new phone number to state:
          setUserLoginPhoneNumber(phone);

          // if new phone updated and code send...
          message.success({
            content: t('new_number_saved'),
            duration: 2,
            className: 'registerDone--message',
          });

          setUserLoginPhoneNumberConfirmLoading(false);
          setUserLoginPhoneNumberVisible(true);
        }
      })
  }

  const handleResendCode = () => {
    setResendCodeConfirmLoading(true);
    const params = {
      phone: userLoginPhoneNumber,
      user_email: userLoginEmail,
      type: "send_code"
    }

    editPhoneAndSendCode(params)
      .then(res => {
        if (res?.data?.status) {
          // if again code send...
          message.success({
            content: t(__("New code sent")),
            duration: 2,
            className: 'registerDone--message',
          });
          setResendCodeConfirmLoading(false)
          setResendCode(false)
        }
      })
  }

  const handleVerification = () => {
    setVerificationModalConfirmLoading(true);
    verificationForm
      .validateFields()
      .then((values) => {
        const params = {
          user_email: userLoginEmail
        };

        VerificationApi(values?.verification_code, params)
          .then(res => {
            if (res?.data?.verify) {

              message.success({
                content: t(('Your account has been verified')),
                duration: 2,
                className: 'registerDone--message',
              }).then(() => {

                const loginData = {
                  user_login: userLoginEmail,
                  password: userLoginPassword,
                  language: config.language
                }

                signInMutation(loginData, {
                  onSuccess: () => {
                    // hidden spinner (spinner context):
                    setVerificationModalConfirmLoading(false);
                    setVerificationModalVisible(false);

                    // if register as buyer show register done message. else show Modal for seller...
                    message.success({
                      content: t("register_done_and_login"),
                      duration: 2,
                      className: 'registerDone--message',
                    }).then(() => {
                      navigate('/dashboard');
                    });
                  }
                });

              });

            }
            else {
              if (res?.data?.error === "not_match") {
                message.error({
                  content: t("verification_code_not_match"),
                  duration: 4,
                  className: 'registerDone--warning',
                });
                setVerificationModalConfirmLoading(false);
              }
            }
          })
      })
      .catch((info) => {
        setVerificationModalConfirmLoading(false);
      });
  }

  return (
    <Row justify={"center"} className="register--container h-100">
      <SeoGenerator
        title={ t('register') }
        description={ t('alaedeen_description') }
        keywords={ t('alaedeen_keywords') }
      />

      <Col span={24} className="register--topSection">
        <Row>
          <Col span={24} className="text-center logo-char">
            <img src={alaedeenChar} alt=""/>
          </Col>
          <Col span={24} className="text-center logo-text">
            <i className="logo-icon-alaedeen-com" />
          </Col>
          <Col span={24} className="text-center top-msg">
            {t('register_top_msg')}
          </Col>
        </Row>
      </Col>

      <Col xs={24} lg={20} className="register--content bg-white p-5">

        <Modal
          title={ t(__("Enter the verification code")) }
          visible={verificationModalVisible}
          maskClosable={false}
          closable={false}
          className="verificationModal"
          footer={[
            !resendCode ?
            <div className="resendCode--title">
             {t(__("Resend the code after"))} :
            </div> :
            null,
            !resendCode ?
              <Countdown className="resendCode--countdown" value={resendCodeDeadline} onFinish={() => setResendCode(true)} format="mm:ss" /> :
              <div className="resendCode--sendBtn">
                <Button
                  icon={<SendOutlined />}
                  loading={resendCodeConfirmLoading}
                  onClick={handleResendCode}
                >
                  { t("resend_code") }
                </Button>
              </div>
          ,
            <div className="--confirm">
              <Button key="submit" type="primary" onClick={handleVerification} loading={verificationModalConfirmLoading}>
                {t('verification')}
              </Button>
            </div>,
          ]}
        >

          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Row gutter={[0, 10]}>
                <Col span={24} className="text-33 vv-font-size-1-7">
                  {t(__('verification code was sent to the phone number'))}
                </Col>

                <Col span={24}>
                  <Row gutter={10}>
                    <Col span={12} className="phoneNumber">
                      <Input
                        ref={changePhoneRef}
                        disabled = {userLoginPhoneNumberVisible}
                        addonAfter={
                          userLoginPhoneNumberVisible ?
                            <span className="--edit" onClick={() => setUserLoginPhoneNumberVisible(false)}>
                          <EditOutlined />
                        </span> :
                            <span className="--editing" onClick={() => handleChangeNumber(changePhoneRef.current.input.value) }>
                              {userLoginPhoneNumberConfirmLoading ?
                                <LoadingOutlined /> :
                                <SendOutlined />
                              }
                            </span>
                        }
                        defaultValue={userLoginPhoneNumber}
                        className="text-left"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Form
                form={verificationForm}
                name="verification_form"
              >
                <Form.Item
                  name="verification_code"
                  label={t(__('verification_code'))}
                  labelCol={{span: 24}}
                  className="verificationItem"
                  rules={[
                    {
                      required: true,
                      message: t("please_enter_verification_code")
                    },
                  ]}
                >
                  <InputNumber
                    allowClear
                    className="w-40"
                    maxLength={5}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>

        </Modal>

        <Row gutter={{ xs: 0, lg: 32 }}>
          <Col span={24}>
            <Tabs
              className="register-tab__container"
              defaultActiveKey={ registerType }
              centered={true}
              onTabClick={key => setRegisterType(key)}
            >
              <TabPane tab={ t(__('buyer')) } key="buyer">
                <Row gutter={{ xs: 0, lg: 32 }}>
                  <Col xs={24} md={12}>
                    <Form
                      className="h-100 register--formContent"
                      name="register-buyer-form"
                      initialValues={{
                        registrant_type: 'buyer'
                      }}
                      onFinish={onRegisterFormHandle}
                    >
                      <Row>
                        <Col span={24} className="mb-4 mb-lg-0 register--loginContent">
                          <Row className="h-100" align="middle" gutter={[0, 30]}>

                            <Form.Item name="registrant_type" hidden>
                              <Input/>
                            </Form.Item>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fas fa-map-marker-alt text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Row>
                                        <Col className="my-auto vv-font-size-1-9 text-47">
                                          <i className="fi fi-ir vv-font-size-2-2" /> {t(__('iran'))} -
                                        </Col>
                                        <Col flex="1 1">
                                          <Form.Item
                                            name="auth_city"
                                            rules={[
                                              {
                                                required: true,
                                              },
                                            ]}
                                          >
                                            <Select
                                              placeholder={ t(__('select your city')) }
                                              allowClear
                                              showSearch
                                              bordered={false}
                                              filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                              }
                                            >
                                              <>
                                                {cityLists?.map((item) => {
                                                  return (
                                                    <Option key={ `buyer_cityLists_${ item.code }` } value={item.code} >{ item.state }</Option>
                                                  );
                                                })}
                                              </>
                                            </Select>
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fas fa-user-circle text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row gutter={ { xs: 15, md: 30 }}>
                                    <Col span={12}>
                                      <Row className="register--formContent__item" align="middle">
                                        <Col span={24}>
                                          <Form.Item
                                            name="firstname"
                                            rules={[
                                              {
                                                required: true
                                              },
                                            ]}>
                                            <Input
                                              placeholder={ t(__('first name')) }
                                              bordered={false}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col span={12}>
                                      <Row className="register--formContent__item" align="middle">
                                        <Col span={24}>
                                          <Form.Item
                                            name="lastname"
                                            rules={[
                                              {
                                                required: true
                                              },
                                            ]}>
                                            <Input
                                              placeholder={ t(__('last name')) }
                                              bordered={false}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa fa-mobile text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="phone"
                                        rules={[
                                          {
                                            required: true
                                          },
                                        ]}>
                                        <Input
                                          placeholder={ t(__('phone_number')) }
                                          bordered={false}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa fa-envelope text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="email"
                                        rules={[
                                          {
                                            required: true,
                                            type: 'email',
                                          },
                                        ]}>
                                        <Input
                                          placeholder={ t(__('email')) }
                                          bordered={false}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa fa-lock text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="password1"
                                        rules={[
                                          {
                                            required: true,
                                          },
                                        ]}>
                                        <Input.Password
                                          placeholder={ t(__('password')) }
                                          bordered={false}
                                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa fa-lock text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="password2"
                                        rules={[
                                          {
                                            required: true,
                                          },
                                        ]}>
                                        <Input.Password
                                          placeholder={ t(__('Confirm password')) }
                                          bordered={false}
                                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24} className="text-center">
                              <Form.Item
                                className="signIn--signInBtn"
                                valuePropName="checked"
                              >
                                <Button className="bg-primary w-75 text-white border-0 p-0" htmlType="submit">
                                  { t(__('register')) }
                                </Button>
                              </Form.Item>
                            </Col>

                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </Col>

                  <Col xs={24} md={12} className="register--loginExtra">
                    <Row className="register--loginExtra__content">
                      <Col span={24} className="text-bc vv-font-size-1-9 registerWithGoogleTxt">
                        { t(__('Or Sign In with')) }
                      </Col>

                      <Col span={24} className="registerWithGoogleBtn">
                        <div className="shadow-circle rounded-circle mx-auto">
                          <img className="mx-auto" src={googlePic} alt={ t(__('sing_in_whit_google')) }/>
                        </div>
                      </Col>

                      <Col span={24} className="dontHaveAccountContainer">
                        <span className="text-92 vv-font-size-1-9">{ t(__('Already have an account')) }</span>
                        <Link to={ "/sign-in" } className="text-primary-darken mx-2 vv-font-size-1-9 font-weight-600">{ t(__('sign in')) }</Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab={ t(__('seller')) } key="seller">
                <Row gutter={{ xs: 0, lg: 32 }}>
                  <Col xs={24} md={12}>
                    <Form
                      className="h-100 register--formContent"
                      name="register-seller-form"
                      initialValues={{
                        registrant_type: 'seller',
                        ref_code: referralCode
                      }}
                      onFinish={onRegisterFormHandle}
                    >
                      <Row>
                        <Col span={24} className="mb-4 mb-lg-0 register--loginContent">
                          <Row className="h-100" align="middle" gutter={[0, 30]}>

                            <Form.Item name="registrant_type" hidden>
                              <Input/>
                            </Form.Item>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fas fa-map-marker-alt text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Row>
                                        <Col className="my-auto vv-font-size-1-9 text-47">
                                          <i className="fi fi-ir vv-font-size-2-2" /> {t(__('iran'))} -
                                        </Col>
                                        <Col flex="1 1">
                                          <Form.Item
                                            name="auth_city"
                                            rules={[
                                              {
                                                required: true,
                                              },
                                            ]}
                                          >
                                            <Select
                                              placeholder={ t(__('select your city')) }
                                              allowClear
                                              showSearch
                                              bordered={false}
                                              filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                              }
                                            >
                                              <>
                                                {cityLists?.map((item) => {
                                                  return (
                                                    <Option key={ `seller_cityLists_${ item.code }` } value={item.code} >{ item.state }</Option>
                                                  );
                                                })}
                                              </>
                                            </Select>
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fas fa-user-circle text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row gutter={ { xs: 15, md: 30 }}>
                                    <Col span={12}>
                                      <Row className="register--formContent__item" align="middle">
                                        <Col span={24}>
                                          <Form.Item
                                            name="firstname"
                                            rules={[
                                              {
                                                required: true
                                              },
                                            ]}>
                                            <Input
                                              placeholder={ t(__('first name')) }
                                              bordered={false}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col span={12}>
                                      <Row className="register--formContent__item" align="middle">
                                        <Col span={24}>
                                          <Form.Item
                                            name="lastname"
                                            rules={[
                                              {
                                                required: true
                                              },
                                            ]}>
                                            <Input
                                              placeholder={ t(__('last name')) }
                                              bordered={false}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa fa-mobile text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="phone"
                                        rules={[
                                          {
                                            required: true
                                          },
                                        ]}>
                                        <Input
                                          placeholder={ t(__('phone_number')) }
                                          bordered={false}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa fa-envelope text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="email"
                                        rules={[
                                          {
                                            required: true,
                                            type: 'email',
                                          },
                                        ]}>
                                        <Input
                                          placeholder={ t(__('email')) }
                                          bordered={false}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fas fa-building text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="company"
                                        rules={[
                                          {
                                            required: true
                                          },
                                        ]}>
                                        <Input
                                          placeholder={ t(__('Company Name')) }
                                          bordered={false}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fas fa-tag text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="brand"
                                        rules={[
                                          {
                                            required: true
                                          },
                                        ]}>
                                        <Input
                                          placeholder={ t(__('brand Name')) }
                                          bordered={false}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row gutter={[0, 15]}>
                                <Col span={24} className="vv-font-size-2 text-70">
                                  { t(__('Business Type')) }:
                                </Col>
                                <Col span={24}>
                                  <Row className="register--formContent__item for--businessType" align="middle">
                                    <Col span={24}>
                                      <Form.Item name="business_type">
                                        <Checkbox.Group style={{ width: '100%' }} name="business_type">
                                          <Row gutter={[0, 20]}>
                                            <Col span={24}>
                                              <Checkbox value="manufacture"> { t(__('Manufacture')) } </Checkbox>
                                            </Col>
                                            {/*<Col span={24}>
                                                    <Checkbox value="wholesaler"> { t(__('Wholesaler')) } </Checkbox>
                                                  </Col>*/}
                                            <Col span={24}>
                                              <Checkbox value="trading"> { t(__('Trading Company')) } </Checkbox>
                                            </Col>
                                            <Col span={24}>
                                              <Checkbox value="service"> { t(__('Business Service (Transportation, finance, travel, Ads)')) } </Checkbox>
                                            </Col>
                                          </Row>
                                        </Checkbox.Group>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa-regular fa-users text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="ref_code"
                                        >
                                        <Input
                                          placeholder={ t(__('referral_code')) }
                                          bordered={false}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa fa-lock text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="password1"
                                        rules={[
                                          {
                                            required: true,
                                          },
                                        ]}>
                                        <Input.Password
                                          placeholder={ t(__('password')) }
                                          bordered={false}
                                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row className="" align="middle">
                                <Col className="text-center" flex="46px">
                                  <i className="fa fa-lock text-bc vv-font-size-3" />
                                </Col>
                                <Col flex="1 1">
                                  <Row className="register--formContent__item" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        name="password2"
                                        rules={[
                                          {
                                            required: true,
                                          },
                                        ]}>
                                        <Input.Password
                                          placeholder={ t(__('Confirm password')) }
                                          bordered={false}
                                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24}>
                              <Row gutter={[0, 15]}>
                                <Col span={24}>
                                  <Row className="register--formContent__item for--businessType" align="middle">
                                    <Col span={24}>
                                      <Form.Item
                                        className="signIn--rememberMe"
                                        name="accept_rules"
                                        valuePropName="checked"
                                        rules={[
                                          {
                                            required: true,
                                          },
                                        ]}
                                      >
                                        <Checkbox
                                          value="Y"
                                        >
                                          { t(__('I accept the terms of service')) }
                                        </Checkbox>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24} className="text-center">
                              <Form.Item
                                className="signIn--signInBtn"
                                valuePropName="checked"
                              >
                                <Button className="bg-primary w-75 text-white border-0 p-0" htmlType="submit">
                                  { t(__('register')) }
                                </Button>
                              </Form.Item>
                            </Col>

                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </Col>

                  <Col xs={24} md={12} className="register--loginExtra">
                    <Row className="register--loginExtra__content">
                      <Col span={24} className="registerSellerRules">
                        { t('register_seller_rules') }
                      </Col>

                      <Col span={24} className="dontHaveAccountContainer">
                        <span className="text-92 vv-font-size-1-9">{ t(__('Already have an account')) }</span>
                        <Link to={ "/sign-in" } className="text-primary-darken mx-2 vv-font-size-1-9 font-weight-600">{ t(__('sign in')) }</Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Register;
