import { useState } from "react";

// import style file:
import './styles/Register.less';

import { message, Button, Checkbox, Col, Form, Input, Row, Select, Tabs, Steps, Result, Space, Radio } from "antd";
import { __, SeoGenerator } from "../../functions/Helper";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import googlePic from "../assets/images/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  signInAction,
  useDispatchAuthState,
  useGetAuthState
} from "../../contexts/user/UserContext";

import { signInApi, useGetApi, useWindowSize } from "../../functions";
import axios from "axios";
import LoaderSpinner from "../common/LoadSpinner";
import { useGetConfig } from "../../contexts/config/ConfigContext";

// import alaedeen character:
import alaedeenChar from '../assets/images/alaedeen-char.svg';
import bronzePlanImg from '../assets/images/bronze-plan.png';
import goldPlanImg from '../assets/images/gold-plan.png';
import silverPlanImg from '../assets/images/silver-plan.png';
import { useMutation } from "react-query";
import { signInLoadingFalseAction } from "../../contexts/user/UserActionCreators";

const Register = () => {

  const { TabPane } = Tabs;
  const { Option } = Select;
  const { Step } = Steps;

  // get initial config:
  const { config } = useGetConfig();

  // get window width
  const { width } = useWindowSize();

  const { t } = useTranslation();

  const navigate = useNavigate();

  //initial state and dispatch for auth context:
  const { user_data } = useGetAuthState();

  const [registerIsLoading, setRegisterIsLoading] = useState(false);

  // state for set register type (if seller show step bar):
  const [registerType, setRegisterType] = useState("seller");

  const [currentStep, setCurrentStep] = useState(user_data?.auth?.user_id ? 1 : 0);
  //const [currentStep, setCurrentStep] = useState(1);

  const [isSignedIn, setIsSignedIn] = useState(false);

  const { AuthDispatch } = useDispatchAuthState();

  // get cities list from API:
  const { data } = useGetApi(`city-lists-api`, 'country_code=IR', `citiesList_IR`);

  const { city_lists: cityLists } = data || [];

  if (user_data.auth.user_id && registerType === 'buyer') {
    navigate('/');
  }


  async function Register(values) {
    return await axios.post(`https://alaedeen.com/horn/register-api/?lang_code=${config.language}`, { user_data: values });
  }

  async function PayingApi({ paying_plan }) {
    return await axios.post(`https://alaedeen.com/horn/register-api/?lang_code=${config.language}`, { mode: 'paying', plan: paying_plan, user_id: user_data?.auth?.user_id });
  }

  const { mutate } = useMutation(signInApi, {
    onSuccess: res => {
      if (res?.auth?.status) {
        AuthDispatch(signInAction(res.auth, res.token));
      }
    }
  });

  const onRegisterFormHandle = values => {
    // enable loading spinner:
    setRegisterIsLoading(true);

    if (values.password1 !== values.password2) {
      // disable loading spinner:
      setRegisterIsLoading(false);

      message.warning({
        content: "رمز های عبور باهم یکسان نیست",
        duration: 4,
        className: 'registerDone--warning',
      })
    }
    else {
      Register(values)
        .then(res => {
          // disable loading spinner:
          //setRegisterIsLoading(false);

          if (!res.data.status && res.data.error === 'email_already_used') {
            setRegisterIsLoading(false);
            message.error({
              content: "ایمیل قبلا در سیستم ثبت شده است",
              duration: 4,
              className: 'registerDone--warning',
            })
          }
          else {

            const loginData = {
              user_login: values.email,
              password: values.password1,
              language: config.language
            }

            mutate(loginData, {
              onSuccess: res => {
                setRegisterIsLoading(false);
                message.success({
                  content: "ثبت نام شما با موفقیت انجام شد.",
                  duration: 2,
                  className: 'registerDone--message',
                }).then(() => {
                  (registerType === 'buyer' || width < 992) ?
                    navigate('/') :
                    setCurrentStep(1);
                });
                setIsSignedIn(true);
              }
            });

          }

        });
    }

  }

  const payingStepHandleNextClick = value => {
    // enable loading spinner:
    setRegisterIsLoading(true);

    PayingApi(value)
      .then(res => {
        if (res?.data?.isset_plan) {
          setRegisterIsLoading(false);
        }
      })
      .then(() => {
        message.success({
          content: "ذخیره شد",
          duration: 1,
          className: 'registerDone--message',
        }).then(() => {
          setCurrentStep(prev => prev + 1);
        })
      })


    //setCurrentStep(prev => prev + 1)
  }

  return (
    <Row justify={"center"} className="register--container h-100">
      <SeoGenerator
        title={ t('register') }
        description={ t('alaedeen_description') }
        keywords={ t('alaedeen_keywords') }
      />

      { registerIsLoading && <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/> }

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
        <Row gutter={{ xs: 0, lg: 32 }}>

          {registerType === 'seller' ?
            width >= 992 ?
              <>
                <Col span={24} className="sellerRegisterStep">
                  <Steps current={currentStep} progressDot >
                    <Step key="register"  description={ t(__('Initial registration')) } />

                    <Step key="manufacturer_form" description={ t(__('Registration of manufacturer information')) } />

                    <Step key="paying" description={ t(__('Paying subscription fee')) } />

                    <Step key="Review" description={ t(__('Review by the support team')) } />

                    <Step key="publish_exhibition" description={ t(__('Publishing online exhibition')) } />
                  </Steps>
                </Col>

                <Col span={24} className="steps-content">

                  {currentStep === 0 ?
                    <Row gutter={{ xs: 0, lg: 32 }}>
                      {isSignedIn ?
                        <Col span={24} className="text-center successFull-Register">
                          <Result
                            status="success"
                            title={ t(__("Registration Successful")) }
                            subTitle={ t(__("You're Now Logged in")) }
                          />
                        </Col> :
                        <>
                          <Col xs={24} md={12}>
                            <Tabs
                              className="register-tab__container"
                              defaultActiveKey="seller"
                              centered={true}
                              onTabClick={key => setRegisterType(key)}
                            >
                              <TabPane tab={ t(__('buyer')) } key="buyer" />
                              <TabPane tab={ t(__('seller')) } key="seller">
                                <Form
                                  className="h-100 register--formContent"
                                  name="register-seller-form"
                                  initialValues={{
                                    registrant_type: 'seller'
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
                                                      <i className="flag-icon flag-icon-ir vv-font-size-2-2" /> {t(__('iran'))} -
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
                                                                <Option key={ `cityLists_${ item.code }` } value={item.code} >{ item.state }</Option>
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
                                                          <Checkbox value="trading_company"> { t(__('Trading Company')) } </Checkbox>
                                                        </Col>
                                                        <Col span={24}>
                                                          <Checkbox value="business_type_business_service"> { t(__('Business Service (Transportation, finance, travel, Ads)')) } </Checkbox>
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
                              </TabPane>
                            </Tabs>
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
                        </>
                      }
                    </Row> :
                    currentStep === 1 ?
                      <Row>
                        <Col span={24} className="text-center manufactureFormSection">
                          <a href="https://alaedeen.com/horn/profile-settings/" className="text-33" target="_blank">
                            تکمیل اطلاعات تولید کننده از طریق ادیت پروفایل&nbsp;<i className="fas fa-link" />
                          </a>
                        </Col>
                        <Col span={24} className="mt-5 text-center">
                          <Space size="large">
                            <Button className="border border-primary text-33 p-0 nextStep" size="large" onClick={() => setCurrentStep(prev => prev + 1)}>بعدی</Button>
                          </Space>
                        </Col>
                      </Row> :
                      currentStep === 2 ?
                        <Row>
                          <Col span={24} className="payingSubscriptionSection">
                            <Form
                              className="h-100 paying--formContent"
                              name="paying-form"
                              onFinish={payingStepHandleNextClick}
                            >
                              <Row gutter={[0, 12]}>
                                <Col span={24} className="text-33 payingSubscriptionSection--title">
                                  تعرفه های اشتراک
                                </Col>
                                <Form.Item name="paying_plan" rules={[{ required: true, message: 'لطفاً بسته‌ی مناسب کسب و کار خود را انتخاب کنید' }]}>
                                  <Col span={24} className="payingSubscriptionSection--payList mt-4 pt-3">

                                    <Radio.Group>
                                      <Row gutter={25}>

                                        <Col span={8}>
                                          <Row gutter={[0, 5]}>
                                            <Col span={24} className="mb-4 text-center">
                                                <Radio value="bronze" name="bronze">بسته برنزی</Radio>
                                            </Col>
                                            <Col span={24} className="payingSubscriptionSection--payList__img">
                                              <img src={bronzePlanImg} alt=""/>
                                            </Col>
                                            <Col span={24} className="text-center payingSubscriptionSection--payList__txt">
                                              مناسب کسب و کارهای کوچک
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              اشتراک شش ماهه
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              تعداد ثبت محصول 10 عدد
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              پشتیبان جهت مذاکره با تجار (محاسبه هزینه مشاوره بصورت ساعتی)
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt" style={{ marginTop: 41 }}>
                                              هزینه ثابت: مبلغ 695 هزار تومان
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              هزینه ماهانه: مبلغ 99 هزار تومان
                                            </Col>
                                          </Row>
                                        </Col>

                                        <Col span={8}>
                                          <Row gutter={[0, 5]}>
                                            <Col span={24} className="mb-4 text-center">
                                              <Radio value="silver" name="silver">بسته نقره ای</Radio>
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__img">
                                              <img src={silverPlanImg} alt=""/>
                                            </Col>
                                            <Col span={24} className="text-center payingSubscriptionSection--payList__txt">
                                              مناسب کسب و کارهای متوسط
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              اشتراک یک ساله
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              تعداد ثبت محصول 30 عدد
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              اختصاصی سازی صفحه ی نمایشگاهی
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              پشتیبان جهت مذاکره با تجار (محاسبه هزینه مشاوره بصورت ساعتی)
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt mt-4">
                                              هزینه ثابت: مبلغ 995 هزار تومان
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              هزینه ماهانه: مبلغ 299 هزار تومان
                                            </Col>
                                          </Row>
                                        </Col>

                                        <Col span={8}>
                                          <Row gutter={[0, 5]}>
                                            <Col span={24} className="mb-4 text-center">
                                              <Radio value="gold" name="gold">بسته طلایی</Radio>
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__img">
                                              <img src={goldPlanImg} alt=""/>
                                            </Col>
                                            <Col span={24} className="text-center payingSubscriptionSection--payList__txt">
                                              مناسب کسب و کارهای بزرگ
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              اشتراک نامحدود
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              تعداد ثبت محصول 100 عدد
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              اختصاصی سازی صفحه ی نمایشگاهی
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              پشتیبان جهت مذاکره با تجار (رایگان)
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              درج لینک وب سایت شما
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt mt-4">
                                              هزینه ثابت: مبلغ 1495 هزار تومان
                                            </Col>

                                            <Col span={24} className="payingSubscriptionSection--payList__txt">
                                              هزینه ماهانه: مبلغ 499 هزار تومان
                                            </Col>
                                          </Row>
                                        </Col>

                                      </Row>
                                    </Radio.Group>

                                </Col>

                                </Form.Item>

                                <Col span={24} className="mt-3 text-center">
                                  <Space size="large">

                                    <Button className="border border-primary text-33 p-0 nextStep" size="large" htmlType="submit">
                                      بعدی
                                    </Button>

                                    <Button className="border border-primary text-33 p-0 prevStep" size="large" onClick={() => setCurrentStep(prev => prev - 1)}>قبلی</Button>
                                  </Space>
                                </Col>


                                <Col span={24} className="payingSubscriptionSection--payList">
                                  <Row gutter={[0, 7]}>
                                    <Col span={24} className="payingSubscriptionSection--payList__txt">
                                      پس از انتخاب بسته مورد نظر دکمه‌ی "بعدی" را بزنید.
                                    </Col>

                                    <Col span={24} className="payingSubscriptionSection--payList__txt">
                                      پس از بررسی اطلاعات از سوی کارشناس، ادامه فرایند پرداخت و ثبت در بخش تیکت به شما اطلاع داده میشود.
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Form>
                          </Col>
                        </Row> :
                        currentStep === 3 ?
                          <Row>
                            <Col span={24} className="supporterReviewSection text-center">
                              <Row gutter={[0, 12]}>
                                <Col span={24} className="text-33 supporterReviewSection--title mb-7">
                                  { t(__('Review by the support team')) }
                                </Col>
                              </Row>
                            </Col>

                            <Col span={24} className="mt-5 text-center">
                              <Space size="large">
                                <Button className="border border-primary text-33 p-0 nextStep" size="large" onClick={() => setCurrentStep(prev => prev + 1)}>بعدی</Button>

                                <Button className="border border-primary text-33 p-0 prevStep" size="large" onClick={() => setCurrentStep(prev => prev - 1)}>قبلی</Button>
                              </Space>
                            </Col>
                          </Row> :
                          currentStep === 4 &&
                          <Row>
                            <Col span={24} className="supporterReviewSection text-center">
                              <Row gutter={[0, 12]}>
                                <Col span={24} className="text-33 supporterReviewSection--title mb-7">
                                  { t('check_exhibition_pub_stat') }
                                </Col>

                                <Col span={24} className="mt-5 text-center">
                                  <a href="https://alaedeen.com/horn/profile-settings/" className="text-33" target="_blank">
                                    <i className="fas fa-link" />&nbsp;  مدیریت پروفایل
                                  </a>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                  }

                </Col>
              </>:
              <>
                {isSignedIn ?
                  <Col span={24} className="text-center successFull-Register">
                    <Result
                      status="success"
                      title={ t(__("Registration Successful")) }
                      subTitle={ t(__("You're Now Logged in")) }
                    />
                  </Col> :
                  <Row gutter={{ xs: 0, lg: 32 }}>
                    <Col xs={24} md={12}>
                      <Tabs
                        className="register-tab__container"
                        defaultActiveKey="seller"
                        centered={true}
                        onTabClick={key => setRegisterType(key)}
                      >
                        <TabPane tab={ t(__('buyer')) } key="buyer" />
                        <TabPane tab={ t(__('seller')) } key="seller">
                          <Form
                            className="h-100 register--formContent"
                            name="register-seller-form"
                            initialValues={{
                              registrant_type: 'seller'
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
                                                <i className="flag-icon flag-icon-ir vv-font-size-2-2" /> {t(__('iran'))} -
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
                                                          <Option key={ `cityLists_${ item.code }` } value={item.code} >{ item.state }</Option>
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
                                                    <Checkbox value="trading_company"> { t(__('Trading Company')) } </Checkbox>
                                                  </Col>
                                                  <Col span={24}>
                                                    <Checkbox value="business_type_business_service"> { t(__('Business Service (Transportation, finance, travel, Ads)')) } </Checkbox>
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
                        </TabPane>
                      </Tabs>
                    </Col>

                    <Col xs={24} md={12} className="register--loginExtra">
                      <Row className="register--loginExtra__content">
                        <Col span={24} className="registerSellerRules">
                          { t('register_seller_rules') }
                        </Col>

                        <Col span={24} className="dontHaveAccountContainer">
                          <span className="text-92">{ t(__('Already have an account')) }</span>
                          <Link to={ "/sign-in" } className="text-primary-darken mx-2 font-weight-600">{ t(__('sign in')) }</Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                }
              </> :

            <>
              {/* if buyer Tab Active */}
              <Col xs={24} md={12}>
                <Tabs
                  className="register-tab__container"
                  defaultActiveKey="buyer"
                  centered={true}
                  onTabClick={key => setRegisterType(key)}
                >
                  <TabPane tab={ t(__('buyer')) } key="buyer">
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
                                          <i className="flag-icon flag-icon-ir vv-font-size-2-2" /> {t(__('iran'))} -
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
                                                    <Option key={ `cityLists_${ item.code }` } value={item.code} >{ item.state }</Option>
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
                  </TabPane>
                  <TabPane tab={ t(__('seller')) } key="seller" />
                </Tabs>
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
            </>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default Register;
