import { useState } from "react";
import axios from "axios";

import "./styles/ManufactureInformation.less";

import { Button, Col, Form, Modal, Result, Row, Tabs } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useGetApiOld } from "../../../../../functions";
import { useTranslation } from "react-i18next";
import { __, fn_date_to_timestamp, scrollTop, SeoGenerator } from "../../../../../functions/Helper";
import CompanyDetailsForm from "./manufactureInformation/CompanyDetailsForm";
import ManufacturingCapabilityForm from "./manufactureInformation/ManufacturingCapabilityForm";
import ExportCapabilityForm from "./manufactureInformation/ExportCapabilityForm";
import CertificatesForm from "./manufactureInformation/CertificatesForm";
import CompanyIntroductionForm from "./manufactureInformation/CompanyIntroductionForm";
import SupportForm from "./manufactureInformation/SupportForm";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../contexts/spiner/SpinnerContext";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";

const ManufactureInformation = () => {

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  // Variable for save business type:
  const businessType = user_data?.auth?.business_type || {};

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  // use ref for add product form:
  const [ ManufactureInformation ] = Form.useForm();

  // save image name in array state:
  const [ imageFileList, setImageFileList ] = useState({});

  // state for finish submit form:
  const [ finishFormModalVisible, setFinishFormModalVisible ] = useState(false);

  // function for close finish submit form Modal:
  const handleCloseFinishFormModal = () => setFinishFormModalVisible(false);

  // get data from API:
  const { data: factorySizeData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=24",
    "factorySize",
    {
      refetchOnWindowFocus: false
    }
  );
  const factorySize = factorySizeData || [];

  const { data: unitsData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=31",
    "units",
    {
      refetchOnWindowFocus: false
    }
  );
  const units = unitsData || [];

  const { data: dutiesData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=65",
    "duties",
    {
      refetchOnWindowFocus: false
    }
  );
  const duties = dutiesData || [];

  const { data: totalTransactionsData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=112",
    "total_transactions",
    {
      refetchOnWindowFocus: false
    }
  );
  const totalTransactions = totalTransactionsData || [];

  const { data: acceptedDeliveriesData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=69&order_by=description",
    "acceptedDeliveries",
    {
      refetchOnWindowFocus: false
    }
  );
  
  const acceptedDeliveries = acceptedDeliveriesData || [];

  const { data: paymentCurrenciesData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=70",
    "paymentCurrencies",
    {
      refetchOnWindowFocus: false
    }
  );
  const paymentCurrencies = paymentCurrenciesData || [];

  const { data: languagesSpokenData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=71",
    "languagesSpoken",
    {
      refetchOnWindowFocus: false
    }
  );
  const languagesSpoken = languagesSpokenData || [];

  const { data: certificationTypesData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=73",
    "certificationTypes",
    {
      refetchOnWindowFocus: false
    }
  );
  const certificationTypes = certificationTypesData || [];

  const { data: countryListsData } = useGetApiOld(
    `country-lists-api`,
    '',
    `countryLists`,
    {
      refetchOnWindowFocus: false
    }
  );
  const countryLists = countryListsData || [];

  // get country codes from API:
  const { data: countryCodesData } = useGetApiOld(
    `country-code-api`,
    "",
    `countryCodes`,
    {
      refetchOnWindowFocus: false
    }
  );
  const countryCodes = countryCodesData?.country_code || [];

  // function for upload images:
  const handleUploadImage = async options => {
    const { onSuccess, onError, file, onProgress, inputName } = options;

    let isCloneable = false,
      clone,
      for_logo = false,
      for_agent = false;

    if (options.isCloneable || options.isCloneable === 0) {
      clone = options.isCloneable;
      isCloneable = true;
    }

    if (options.for_logo) for_logo = true;

    if (options.for_agent) for_agent = true;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };

    fmData.append("file", file);
    fmData.append("image_uid", file?.uid);
    fmData.append("company_id", user_data?.auth?.company_id);

    if (for_logo) {
      fmData.append("for_logo", "true");
      fmData.append("logo_lang", inputName);
    } else if (for_agent) {
      fmData.append("for_agent", "true");
      fmData.append("field_id", inputName);
    } else {
      fmData.append("field_id", inputName);
      if (isCloneable) fmData.append("clone", clone);
    }


    try {
      await axios.post(
        "https://alaedeen.com/horn/profile-upload-image-api",
        fmData,
        config
      );

      //console.log(res?.data);

      onSuccess("Ok");
      //console.log("server res: ", res);
    } catch (err) {
      //console.log("Error: ", err);
      //const error = new Error("Some error");
      onError({ err });
    }
  };

  // function for handle image upload change:
  const handleImageUploadChange = ({ fileList }) => setImageFileList({ fileList });

  // function for remove image:
  const handleOnRemoveImage = file => {

    const imageData = {
      image_uid: file?.uid,
      field_id: file?.inputName,
      company_id: user_data?.auth?.company_id
    }

    axios.post(`https://alaedeen.com/horn/profile-remove-image-api`, { ...imageData })
      .then(res => {
        //console.log(res?.data)
      });
  }

  // function for submit form:
  const handleSubmitForm = values => {
    values.company_id = +(user_data?.auth?.company_id);

    // if isset field 90 (sata picker) change format:
    if (values['profile_fields'][90]) {
      values['profile_fields'][90] = fn_date_to_timestamp(values['profile_fields'][90].format('YYYY-MM'));
    }

    // show spinner (spinner context):
    spinnerDispatch(isLoadingAction(true));

    axios.post(`https://alaedeen.com/horn/manufacturer-information-api`, { ...values })
      .then(() => {
        // hidden spinner (spinner context):
        spinnerDispatch(isLoadingAction(false));
      })
      .then(() => {
        setFinishFormModalVisible(true);
      })
  }

  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Account - Manufacture Information"
      />

      <Modal
        visible={ finishFormModalVisible }
        title={ t(__('Information submitted successfully')) }
        footer={ false }
        onCancel={ handleCloseFinishFormModal }
      >
        <Result
          className="finishFormModal--content"
          status="success"
          title={ t('information_submit_msg') }
        />
      </Modal>

      <Col span={ 24 }>
        <DashboardContentHeader page={ "Manufacturing Information" }/>
      </Col>

      <Col id="manufactureInfo--content" span={ 24 } className="manufactureInfo--content">
        <Form
          className="h-100 manufactureInfo--formContent"
          name="ManufactureInformation-form"
          scrollToFirstError
          form={ManufactureInformation}
          onFinish={ handleSubmitForm }
        >
          <Row className="manufactureInfoForm--certificates" justify="center">
            <Col xs={24} lg={22} className="formItems--content">
              <Row gutter={[0, 45]}>
                <Col span={24}>
                  <Row gutter={[0, 30]}>
                    <Col span={24} className="__title">
                      { t(__("Basic Company Details")) }
                    </Col>
                    <Col span={24}>
                      <CompanyDetailsForm />
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={[0, 30]}>
                    <Col span={24} className="__title">
                      { t(__("manufacturing_capability")) }
                    </Col>
                    <Col span={24}>
                      <ManufacturingCapabilityForm
                        formRef={ ManufactureInformation }
                        handleSubmitForm={ handleSubmitForm }
                        handleUploadImage={ handleUploadImage }
                        handleOnRemoveImage={ handleOnRemoveImage }
                        handleImageUploadChange={ handleImageUploadChange }
                        imageFileList={ imageFileList }
                        factorySize={ factorySize }
                        units={ units }
                        totalTransactions={ totalTransactions }
                        businessType={ businessType }
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={[0, 30]}>
                    <Col span={24} className="__title">
                      { t(__("Export Capability")) }
                    </Col>
                    <Col span={24}>
                      <ExportCapabilityForm
                        formRef={ ManufactureInformation }
                        handleSubmitForm={ handleSubmitForm }
                        countryLists={ countryLists }
                        handleUploadImage={ handleUploadImage }
                        handleOnRemoveImage={ handleOnRemoveImage }
                        handleImageUploadChange={ handleImageUploadChange }
                        imageFileList={ imageFileList }
                        countryCodes={ countryCodes }
                        duties={ duties }
                        acceptedDeliveries={ acceptedDeliveries }
                        paymentCurrencies={ paymentCurrencies }
                        languagesSpoken={ languagesSpoken }
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={[0, 30]}>
                    <Col span={24} className="__title">
                      { t(__("certificates")) }
                    </Col>
                    <Col span={24}>
                      <CertificatesForm
                        formRef={ ManufactureInformation }
                        handleSubmitForm={ handleSubmitForm }
                        handleUploadImage={ handleUploadImage }
                        handleOnRemoveImage={ handleOnRemoveImage }
                        handleImageUploadChange={ handleImageUploadChange }
                        imageFileList={ imageFileList }
                        certificationTypes={ certificationTypes }
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={[0, 30]}>
                    <Col span={24} className="__title">
                      { t(__("Company Introduction")) }
                    </Col>
                    <Col span={24}>
                      <CompanyIntroductionForm
                        formRef={ ManufactureInformation }
                        handleSubmitForm={ handleSubmitForm }
                        handleUploadImage={ handleUploadImage }
                        handleOnRemoveImage={ handleOnRemoveImage }
                        handleImageUploadChange={ handleImageUploadChange }
                        imageFileList={ imageFileList }
                        countryLists={ countryLists }
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={[0, 30]}>
                    <Col span={24} className="__title">
                      { t(__("Support")) }
                    </Col>
                    <Col span={24}>
                      <SupportForm
                        formRef={ ManufactureInformation }
                        handleSubmitForm={ handleSubmitForm }
                        handleUploadImage={ handleUploadImage }
                        countryLists={ countryLists }
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col span={24} className="stepChangeCurrent--content">
              <Button type="primary" htmlType="submit">
                { t('submit') }
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ManufactureInformation;
