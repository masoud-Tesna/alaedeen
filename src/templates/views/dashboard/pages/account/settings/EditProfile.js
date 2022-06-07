import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import { __ } from "../../../../../../utilities/functions/Helper";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../../contexts/user/UserContext";
import axios from "axios";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../../contexts/spiner/SpinnerContext";

const EditProfile = () => {

  const [ editProfileForm ] = Form.useForm();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  const userType = user_data?.auth?.user_type;

  // create phone verify axios async function:
  async function updateProfileApi(userId, values) {
    return await axios.put(
      `https://alaedeen.com/api/Account.php/?user_id=${ userId }`,
      values
    );
  }

  const editProfileOnFinish = values => {

    values.user_type = userType;
    values.operation = "edit_profile";

    if (userType === "V") {
      values.fields[65] = values?.fields[65].join(",");
    }

    spinnerDispatch(isLoadingAction(true));

    updateProfileApi(+(user_data?.auth?.user_id), values)
      .then(res => {
        spinnerDispatch(isLoadingAction(false));

        if (res?.data?.status) {
          message.success({
            content: t(__("Your account has been updated")),
            duration: 3,
          })
        }
      });

  }

  return (
    <Form
      className="h-100 settings--formContent"
      name="editProfile-form"
      form={editProfileForm}
      scrollToFirstError
      initialValues={
        {
          firstname: user_data?.auth?.firstname,
          lastname: user_data?.auth?.lastname,
          phone: user_data?.auth?.phone,
          email: user_data?.auth?.email,
          company: user_data?.auth?.company,
          fields: {
            60: user_data?.auth?.fields[60],
            61: user_data?.auth?.fields[61],
            64: user_data?.auth?.fields[64],
            65: user_data?.auth?.fields[65]?.split(",")
          },
        }
      }
      onFinish={ editProfileOnFinish }
    >
      <Row className="editProfileForm" justify="center" gutter={[0, 5]}>
        <Col span={24}>
          <Row justify="center" gutter={20}>
            <Col xs={24} md={12} lg={10}>
              <Form.Item
                name={["fields", "60"]}
                label={ t(__('country')) }
                labelCol={{sm: 24, lg: 7}}
              >
                {user_data?.auth?.country}
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={10}>
              <Form.Item
                name={["fields", "61"]}
                label={ t(__('state')) }
                labelCol={{sm: 24, lg: 7}}
              >
                {user_data?.auth?.state}
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row justify="center" gutter={20}>
            <Col xs={24} md={12} lg={10}>
              <Form.Item
                name="firstname"
                label={ t(__('first_name')) }
                labelCol={{sm: 24, lg: 7}}
              >
                {user_data?.auth?.firstname}
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={10}>
              <Form.Item
                name="lastname"
                label={ t(__('last_name')) }
                labelCol={{sm: 24, lg: 7}}
              >
                {user_data?.auth?.lastname}
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row justify="center" gutter={20}>
            <Col xs={24} md={12} lg={10}>
              <Form.Item
                name="phone"
                label={ t(__('phone_number')) }
                labelCol={{sm: 24, lg: 7}}
              >
                <Input
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={10}>
              <Form.Item
                name="email"
                label={ t(__('email')) }
                labelCol={{sm: 24, lg: 7}}
              >
                <Input
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        {userType === "V" &&
          <>
            <Col span={24}>
              <Row justify="center" gutter={20}>
                <Col xs={24} md={12} lg={10}>
                  <Form.Item
                    name="company"
                    label={ t(__('company_name')) }
                    labelCol={{sm: 24, lg: 7}}
                  >
                    {user_data?.auth?.company}
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={10}>
                  <Form.Item
                    name={["fields", "64"]}
                    label={ t(__('brand_name')) }
                    labelCol={{sm: 24, lg: 7}}
                  >
                    {user_data?.auth?.fields[64]}
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row justify="center" gutter={20}>
                <Col xs={24} md={12} lg={10}>
                  <Form.Item
                    name={["fields", "65"]}
                    label={ t(__('business_type')) }
                    labelCol={{sm: 24, lg: 7}}
                  >
                    <Checkbox.Group>
                      <Row gutter={ [ 0, 20 ] }>
                        <Col span={ 24 }>
                          <Checkbox value="manufacture"> { t(__('Manufacture')) } </Checkbox>
                        </Col>
                        {/*<Col span={24}>
                      <Checkbox value="wholesaler"> { t(__('Wholesaler')) } </Checkbox>
                    </Col>*/}
                        <Col span={ 24 }>
                          <Checkbox value="trading"> { t(__('Trading Company')) } </Checkbox>
                        </Col>
                        <Col span={ 24 }>
                          <Checkbox value="service"> { t(__('Business Service (Transportation, finance, travel, Ads)')) } </Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={10} />
              </Row>
            </Col>
          </>
        }

        <Col span={24}>
          <Row className="mt-4" justify="center" gutter={20}>
            <Col span={24} className="text-center">
              <Form.Item
                className="updateProfile--btn"
                valuePropName="checked"
              >
                <Button type="primary" htmlType="submit">
                  { t(__('update')) }
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default EditProfile;
