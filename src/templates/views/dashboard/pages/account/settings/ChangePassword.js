import { Button, Col, Form, Input, Row } from "antd";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../../contexts/spiner/SpinnerContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useGetAuthState } from "../../../../../../contexts/user/UserContext";
import { __ } from "../../../../../../functions/Helper";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const ChangePassword = () => {

  const [ changePasswordForm ] = Form.useForm();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  // create phone verify axios async function:
  async function changePasswordApi(userId, values) {
    return await axios.put(
      `https://alaedeen.com/api/Account.php/?user_id=${ userId }`,
      values
    );
  }

  const changePasswordOnFinish = values => {

    values.operation = "change_password";

    console.log(values)

    //spinnerDispatch(isLoadingAction(true));

    changePasswordApi(+(user_data?.auth?.user_id), values)
      .then(res => {
        if (res?.data[0] === "update_done") spinnerDispatch(isLoadingAction(false));
      });

  }

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
