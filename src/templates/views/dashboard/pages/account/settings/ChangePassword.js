import { Col, Form, Row } from "antd";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../../contexts/spiner/SpinnerContext";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ChangePassword = () => {

  const [ editProfileForm ] = Form.useForm();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  const { t } = useTranslation();

  // create phone verify axios async function:
  async function changePasswordApi(userId, values) {
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
    <Row>
      <Col>
        PasswordChange
      </Col>
    </Row>
  );
};

export default ChangePassword;
