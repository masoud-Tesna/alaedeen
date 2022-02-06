import { useState } from "react";

// import style file:
import './styles/Register.less';

import {
  message,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tabs,
  Modal
} from "antd";
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

import { signInApi, useGetApi } from "../../functions";
import axios from "axios";
import { useGetConfig } from "../../contexts/config/ConfigContext";

// import alaedeen character:
import alaedeenChar from '../assets/images/alaedeen-char.svg';
import { useMutation } from "react-query";
import { isLoadingAction, useSpinnerDispatch } from "../../contexts/spiner/SpinnerContext";

const Register = () => {

  const { TabPane } = Tabs;
  const { Option } = Select;

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

  const [isSignedInModal, setIsSignedInModal] = useState(false);

  const { AuthDispatch } = useDispatchAuthState();

  // get cities list from API:
  const { data } = useGetApi(`city-lists-api`, 'country_code=IR', `citiesList_IR`);

  const { city_lists: cityLists } = data || [];

  // if signed in and register type = buyer => redirect to home page:
  if (user_data.auth.user_id && registerType === 'buyer') {
    navigate('/');
  }

  async function Register(values) {
    return await axios.post(`https://alaedeen.com/horn/register-api/?lang_code=${config.language}`, { user_data: values });
  }

  const { mutate } = useMutation(signInApi, {
    onSuccess: res => {
      if (res?.auth?.status) {
        AuthDispatch(signInAction(res.auth, res.token));
      }
    }
  });

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
              onSuccess: () => {
                // hidden spinner (spinner context):
                spinnerDispatch(isLoadingAction(false));

                // if register as buyer show register done message. else show Modal for seller...
                registerType === 'buyer' ?
                  message.success({
                    content: "ثبت نام شما با موفقیت انجام شد.",
                    duration: 2,
                    className: 'registerDone--message',
                  }).then(() => {
                    navigate('/');
                  }) :
                  setIsSignedInModal(true);
              }
            });

          }

        });
    }

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
          title={ t(__("Registration Successful")) }
          visible={isSignedInModal}
          okText = 'الان ثبت میکنم'
          cancelText = 'بعدا'
          onCancel={() => navigate("/")}
          onOk={() => navigate('/dashboard/account/manufacturer-information')}
          maskClosable={false}
        >
          <p className="text-33 vv-font-size-1-7">
            اطلاعات  بیشتری برای جلب اعتماد مشتری و کسب درآمد ارائه دهید
            این اطلاعات در نمایه شرکت شما نمایش داده میشود.
          </p>
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
