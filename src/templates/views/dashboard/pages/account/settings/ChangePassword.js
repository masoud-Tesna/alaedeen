import { Button, Col, Form, Input, message, Row } from "antd";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../../contexts/spiner/SpinnerContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useGetAuthState } from "../../../../../../contexts/user/UserContext";
import { __ } from "../../../../../../functions/Helper";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";

const ChangePassword = () => {

  const [ changePasswordForm ] = Form.useForm();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  const [incorrectUpdate, setIncorrectUpdate] = useState("");

  // create phone verify axios async function:
  async function changePasswordApi(userId, values) {
    return await axios.put(
      `https://alaedeen.com/api/Account.php/?user_id=${ userId }`,
      values
    );
  }

  const changePasswordOnFinish = values => {

    values.operation = "change_password";

    spinnerDispatch(isLoadingAction(true));

    changePasswordApi(+(user_data?.auth?.user_id), values)
      .then(res => {
        spinnerDispatch(isLoadingAction(false));

        if (res?.data?.status) {
          message.success({
            content: t(__("Your account password has been updated.")),
            duration: 3,
          })
        } else {
          setIncorrectUpdate(res?.data?.error);
        }
      });

  }

  const oldPasswordIncorrectValidateStatus = incorrectUpdate === "old_password_incorrect" && { validateStatus : "error", help : t("old_password_entered_incorrect") },
        confirmPasswordIncorrectValidateStatus = incorrectUpdate === "passwords_not_match" && { validateStatus : "error", help : t("confirm_password_not_match") };

  return (
    <Form
      className="h-100 settings--formContent"
      name="editProfile-form"
      form={changePasswordForm}
      scrollToFirstError
      onFinish={ changePasswordOnFinish }
    >
      <Row className="changePasswordForm" gutter={[0, 5]}>
        <Col span={24}>
          <Row>
            <Col xs={24} md={12} lg={10} xl={9}>
              <Form.Item
                name="old_password"
                label={ t(__('old_password')) }
                labelCol={{sm: 24, lg: 7}}
                rules={ [
                  {
                    required: true,
                    message: t(__("Please input old password")),
                  },
                ] }
                {...oldPasswordIncorrectValidateStatus}
              >
                <Input.Password
                  iconRender={ visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>) }
                  onChange={() => setIncorrectUpdate(prev => prev === "old_password_incorrect" ? "" : prev)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row>
            <Col xs={24} md={12} lg={10} xl={9}>
              <Form.Item
                name="password"
                label={ t(__('new_password')) }
                labelCol={{sm: 24, lg: 7}}
                rules={[
                  {
                    required: true,
                    message: t(__("Please input new password")),
                  },
                ]}
              >
                <Input.Password
                  iconRender={ visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>) }
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row>
            <Col xs={24} md={12} lg={10} xl={9}>
              <Form.Item
                name="confirm_password"
                label={ t(__('confirm_password')) }
                labelCol={{sm: 24, lg: 7}}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t(__("Please confirm new password")),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error(t(__('The two passwords that you entered do not match'))));
                    },
                  }),
                ]}
                {...confirmPasswordIncorrectValidateStatus}
              >
                <Input.Password
                  iconRender={ visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>) }
                  onChange={() => setIncorrectUpdate(prev => prev === "passwords_not_match" ? "" : prev)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row>
            <Col xs={24} md={12} lg={10} xl={9} className="mt-4 text-center">
              <Form.Item
                className="changePassword--btn"
                valuePropName="checked"
              >
                <Button type="primary" htmlType="submit">
                  { t(__('change_password')) }
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePassword;
