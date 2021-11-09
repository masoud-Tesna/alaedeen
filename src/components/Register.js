import { useState } from "react";

// import style file:
import './styles/Register.less';

import { message, Button, Checkbox, Col, Form, Input, Row, Select, Tabs } from "antd";
import { __ } from "../functions/Helper";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import googlePic from "../assets/images/google.png";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../contexts/user/UserContext";

import { useGetApi } from "../functions";
import axios from "axios";
import LoaderSpinner from "../layouts/blocks/static_templates/LoadSpinner";
import { useGetConfig } from "../contexts/config/ConfigContext";
import { Helmet } from "react-helmet";

const Register = () => {

  const { TabPane } = Tabs;
  const { Option } = Select;

  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  const history = useHistory();

  //initial state and dispatch for auth context:
  const { user_data } = useGetAuthState();

  const [registerIsLoading, setRegisterIsLoading] = useState(false);

  // get cities list from API:
  const { data : { city_lists: cityLists } } = useGetApi(`city-lists-api`, 'country_code=IR', `citiesList_IR`);

  if (user_data.auth.user_id) {
    history.push('/');
  }

  async function Register(values) {
    return await axios.post(`https://alaedeen.com/horn/register-api/?lang_code=${config.language}`, { user_data: values });
  }

  const onRegisterFormHandle = values => {
    // enable loading spinner:
    setRegisterIsLoading(true);

    if (values.password1 !== values.password2) {
      // disable loading spinner:
      setRegisterIsLoading(false);

      message.warning({
        content: t(__('passwords is not equal')),
        duration: 4,
        className: 'registerDone--warning',
      })
    } else {

      Register(values)
        .then(res => {
          // disable loading spinner:
          setRegisterIsLoading(false);

          if (res.data.register) {
            message.success({
              content: t(__('complete_register_msg')),
              duration: 4,
              className: 'registerDone--message',
            }).then(() => {
              history.push('/sign-in');
            })
          }
        });

    }

  }

  return (
    <Row justify={"center"} className="register--container h-100">

      <Helmet>
        <title>{ `Alaedeen.com - ${ t(__('register')) }` }</title>
        <meta name="description" content={ t('alaedeen_description') } />
        <meta name="keywords" content={ t('alaedeen_keywords') } />
      </Helmet>

      { registerIsLoading && <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/> }

      <Col xs={24} lg={15} className="register--content bg-white p-5">
        <Row gutter={{ xs: 0, lg: 32 }}>
          <Col xs={24} md={12}>
            <Tabs
              className="register-tab__container"
              defaultActiveKey="1"
              centered={true}
            >
              <TabPane tab={ t(__('buyer')) } key="1">
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
              <TabPane tab={ t(__('seller')) } key="2">
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
                                        <Col span={24}>
                                          <Checkbox value="wholesaler"> { t(__('Wholesaler')) } </Checkbox>
                                        </Col>
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
      </Col>
    </Row>
  );
};

export default Register;
