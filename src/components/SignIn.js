// import style file:
import './styles/SignIn.less';

import { useHistory  } from "react-router-dom";


// import Design:
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from "@ant-design/icons";

// import helper functions:
import { __ } from "../functions/Helper";
import { useTranslation } from "react-i18next";

// import google pic:
import googlePic from '../assets/images/google.png';

// import language context:
import { signInAction, useGetAuthState, useDispatchAuthState, signIn, checkSignInLoadingAction, checkRememberAction } from '../contexts/user/UserContext';

import { useGetLanguageState } from "../contexts/language/LanguageContext";
import { useEffect } from "react";

const SignIn = () => {

  // initial state for language:
  const { language } = useGetLanguageState();

  const history = useHistory();

  const { t } = useTranslation();

  //initial state and dispatch for auth context:
  const { user_data } = useGetAuthState();
  const { AuthDispatch } = useDispatchAuthState();

  if (user_data.auth.user_id) {
    history.push('/');
  }

  const onFinish = values => {
    AuthDispatch(checkSignInLoadingAction());
    signIn(values.user_login, values.password, language)
      .then(res => {
        if (values.remember_me) {
          AuthDispatch(signInAction(res.data.auth, values.user_login, values.password, false));
          AuthDispatch(checkRememberAction(values.user_login, values.password));
        }else {
          AuthDispatch(signInAction(res.data.auth, values.user_login, values.password));
        }
      })
      .then(() => {
        history.push('/');
      })

  }

  useEffect(() => {
    document.getElementById("siteLayoutContent").classList.add("siteLayoutContent__signIn--page");
    return(() => {
      document.getElementById("siteLayoutContent").classList.remove("siteLayoutContent__signIn--page");
    })
  }, [])

  return (
    <Row justify={"center"} className="signIn--container h-100">
      <Col xs={24} lg={12} className="signIn--content bg-white p-5">
        <Form
          className="h-100 signIn--formContent"
          name="request-form"
          onFinish={onFinish}
        >
          <Row gutter={{ xs: 0, lg: 32 }}>
            <Col xs={24} lg={12} className="mb-4 mb-lg-0 signIn--loginContent">
              <Row className="h-100" align="middle">
                <Col span={24}>
                  <Form.Item
                    name="user_login"
                    className="signIn--formContent__userLogin"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                      },
                    ]}>
                    <Input
                      placeholder={ t(__('E-mail address')) }
                      bordered={false}
                      prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="password"
                    className="signIn--formContent__password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}>
                    <Input.Password
                      placeholder={ t(__('password')) }
                      bordered={false}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Row justify={"space-between"}>
                    <Col>
                      <Form.Item
                        className="signIn--rememberMe"
                        name="remember_me"
                        valuePropName="checked"
                      >
                        <Checkbox
                          value="yes"
                        >
                          { t(__('remember_me')) }
                        </Checkbox>
                      </Form.Item>
                    </Col>

                    <Col>
                      <Form.Item
                        className="signIn--forgotPassword"
                        name="remember_me"
                        valuePropName="checked"
                      >
                        <a href="https://hornb2b.com/horn/index.php?dispatch=auth.recover_password" className="text-92 vv-font-size-1-2">{ t(__('Forgot Password')) } ?</a>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Form.Item
                    className="signIn--signInBtn"
                    valuePropName="checked"
                  >
                    <Button className="bg-primary w-100 text-white border-0 p-0" htmlType="submit">
                      { t(__('Sign in')) }
                    </Button>
                  </Form.Item>
                </Col>

              </Row>
            </Col>

            <Col xs={24} lg={12} className="signIn--loginExtra">
              <Row className="h-100">
                <Col span={24} className="text-bc vv-font-size-1-4 signInWithGoogleTxt">
                  { t(__('Or Sign In with')) }
                </Col>

                <Col span={24} className="signInWithGoogleBtn">
                  <div className="shadow-circle rounded-circle mx-auto">
                    <img className="mx-auto" src={googlePic} alt={ t(__('sing_in_whit_google')) }/>
                  </div>
                </Col>

                <Col span={24} className="dontHaveAccountContainer">
                  <span className="text-92 vv-font-size-1-6">{ t(__('Don\'t have an account')) } ?</span>
                  <a href="https://hornb2b.com/horn/register/" className="text-primary-darken mx-2 vv-font-size-1-8 font-weight-600">{ t(__('Join Free')) }</a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export { SignIn };