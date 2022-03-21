import { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select, Skeleton } from "antd";
import { __ } from "../../../../../../functions/Helper";
import { useTranslation } from "react-i18next";
import { useGetApiOld } from "../../../../../../functions";
import { useGetAuthState } from "../../../../../../contexts/user/UserContext";
import axios from "axios";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../../contexts/spiner/SpinnerContext";

const EditProfile = () => {

  const { Option } = Select;

  const [ editProfileForm ] = Form.useForm();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  const userType = user_data?.auth?.user_type;

  // state for save country code:
  const [countryCode, setCountryCode] = useState(user_data?.auth?.fields[60]);

  // get country lists from API:
  const { isLoading: countryListsIsLoading, data: countryListsData } = useGetApiOld(`country-lists-api`, '', `countryLists`, {
    refetchOnWindowFocus: false
  });
  const countryLists = countryListsData || [];

  // get cities list from API:
  const { isLoading: stateListsIsLoading, data: stateListsData } = useGetApiOld(`city-lists-api`, `country_code=${countryCode}`, `statesList_${countryCode}`, {
    enabled: !!countryCode,
    refetchOnWindowFocus: false
  });
  const stateLists = stateListsData || [];

  // create phone verify axios async function:
  async function UpdateProfileApi(userId, values) {
    return await axios.put(
      `https://alaedeen.com/api/Account.php/?user_id=${ userId }`,
      values
    );
  }

  const editProfileOnFinish = values => {

    values.user_type = userType;

    if (userType === "V") {
      values.fields[65] = values?.fields[65].join(",");
    }

    spinnerDispatch(isLoadingAction(true));

    UpdateProfileApi(+(user_data?.auth?.user_id), values)
      .then(res => {
        if (res?.data[0] === "update_done") spinnerDispatch(isLoadingAction(false));
      });

  }

  return (
    <Form
      className="h-100 editProfile--formContent"
      name="editProfile-form"
      form={editProfileForm}
      scrollToFirstError
      initialValues={
        {
          country: user_data?.auth?.country,
          state: user_data?.auth?.state,
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
            <Col xs={24} md={12} lg={10} xl={9}>
              {countryListsIsLoading ?
                <Row gutter={5}>
                  <Col xs={24} lg={5}></Col>
                  <Col xs={24} lg={19}>
                    <Skeleton.Input active={true} />
                  </Col>
                </Row> :
                <Form.Item
                  name={["fields", "60"]}
                  label={ t(__('country')) }
                  labelCol={{sm: 24, lg: 5}}
                >
                  <Select
                    placeholder={ t(__('select one country')) }
                    className="w-100"
                    optionLabelProp="label"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option?.children.props?.children[1]?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                    }
                    onChange={e => {
                      if (!e) {
                        editProfileForm?.setFieldsValue({
                          fields: {
                            61: null
                          },
                        });
                      } else {
                        editProfileForm?.setFieldsValue({
                          fields: {
                            61: null
                          },
                        });
                        setCountryCode(e)
                      }
                    }}
                  >
                    {countryLists?.country_lists?.map((countryList) => {
                      return (
                        <Option key={ `country_lists_${ countryList?.code }` } value={countryList?.code} label={ countryList?.country }>
                          <div className="optionByIcon">
                            <i className={ `fi fi-${ countryList.code.toLowerCase() } vv-font-size-1-9` } />
                            { countryList?.country }
                          </div>
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              }
            </Col>

            <Col xs={24} md={12} lg={10} xl={9}>
              {stateListsIsLoading ?
                <Row gutter={5}>
                  <Col xs={24} lg={5}></Col>
                  <Col xs={24} lg={19}>
                    <Skeleton.Input active={true} />
                  </Col>
                </Row> :
                <Form.Item
                  name={["fields", "61"]}
                  label={ t(__('state')) }
                  labelCol={{sm: 24, lg: 5}}
                >
                  <Select
                    placeholder={ t(__('province_or_state')) }
                    className="w-100"
                    allowClear
                    disabled={!!!stateLists?.city_lists?.length}
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <>
                      {stateLists?.city_lists?.map((state) => {
                        return (
                          <Option key={ `stateLists_${ state?.code }` } value={state?.code} >{ state?.state }</Option>
                        );
                      })}
                    </>
                  </Select>
                </Form.Item>
              }
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row justify="center" gutter={20}>
            <Col xs={24} md={12} lg={10} xl={9}>
              <Form.Item
                name="firstname"
                label={ t(__('first_name')) }
                labelCol={{sm: 24, lg: 5}}
              >
                <Input
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={10} xl={9}>
              <Form.Item
                name="lastname"
                label={ t(__('last_name')) }
                labelCol={{sm: 24, lg: 5}}
              >
                <Input
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row justify="center" gutter={20}>
            <Col xs={24} md={12} lg={10} xl={9}>
              <Form.Item
                name="phone"
                label={ t(__('phone_number')) }
                labelCol={{sm: 24, lg: 5}}
              >
                <Input
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={10} xl={9}>
              <Form.Item
                name="email"
                label={ t(__('email')) }
                labelCol={{sm: 24, lg: 5}}
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
                <Col xs={24} md={12} lg={10} xl={9}>
                  <Form.Item
                    name="company"
                    label={ t(__('company_name')) }
                    labelCol={{sm: 24, lg: 5}}
                  >
                    <Input
                      allowClear
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={10} xl={9}>
                  <Form.Item
                    name={["fields", "64"]}
                    label={ t(__('brand_name')) }
                    labelCol={{sm: 24, lg: 5}}
                  >
                    <Input
                      allowClear
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row justify="center" gutter={20}>
                <Col xs={24} md={12} lg={10} xl={9}>
                  <Form.Item
                    name={["fields", "65"]}
                    label={ t(__('business_type')) }
                    labelCol={{sm: 24, lg: 5}}
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

                <Col xs={24} md={12} lg={10} xl={9} />
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
