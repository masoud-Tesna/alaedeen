import { useState } from "react";
import axios from "axios";

import "./styles/StoreInformation.less";

import { Col, Form, Modal, Result, Row, Tabs } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useGetApiOld } from "../../../../../utilities/functions";
import { useTranslation } from "react-i18next";
import { __, scrollTop, SeoGenerator } from "../../../../../utilities/functions/Helper";
import CompanyDetailsForm from "./storeInformation/CompanyDetailsForm";
import ManufacturingCapabilityForm from "./storeInformation/ManufacturingCapabilityForm";
import ExportCapabilityForm from "./storeInformation/ExportCapabilityForm";
import CertificatesForm from "./storeInformation/CertificatesForm";
import CompanyIntroductionForm from "./storeInformation/CompanyIntroductionForm";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../contexts/spiner/SpinnerContext";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";

const StoreInformation = () => {

  const { TabPane } = Tabs;

  const { t } = useTranslation();

  // user data context state:
  const { user_data } = useGetAuthState();

  // Variable for save business type:
  const businessType = user_data?.auth?.business_type || {};

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  // use ref for add product form:
  const [ companyDetailsFrm ] = Form.useForm();
  const [ manufacturingCapabilityFrm ] = Form.useForm();
  const [ exportCapabilityFrm ] = Form.useForm();
  const [ certificatesFrm ] = Form.useForm();
  //const [ companyIntroductionFrm ] = Form.useForm();

  // state for save current tab key:
  const [ currentTab, setCurrentTab ] = useState("1");

  // save image name in array state:
  const [ imageFileList, setImageFileList ] = useState({});

  // state for finish submit form:
  const [ finishFormModalVisible, setFinishFormModalVisible ] = useState(false);

  // function for close finish submit form Modal:
  const handleCloseFinishFormModal = () => setFinishFormModalVisible(false);

  const tabsHandleOnChange = activeTab => {
    setCurrentTab(activeTab);

    if (activeTab !== currentTab) {
      const scrollTopTimer = setTimeout(() => {
        scrollTop();
      }, 100);

      return () => clearTimeout(scrollTopTimer);
    }
  }

  const handleNextTab = () => {
    setCurrentTab(prev => (parseInt(prev) + 1).toString());
    const scrollTopTimer = setTimeout(() => {
      scrollTop();
    }, 100);

    return () => clearTimeout(scrollTopTimer);
  };

  // get data from API:
  const { data: officeSizesData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=8",
    "officeSizes",
    {
      refetchOnWindowFocus: false
    }
  );
  const officeSizes = officeSizesData || [];

  const { data: employeesData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=5",
    "employees",
    {
      refetchOnWindowFocus: false
    }
  );
  const employees = employeesData || [];

  const { data: qualityControlStaffsData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=25",
    "qualityControlStaffs",
    {
      refetchOnWindowFocus: false
    }
  );
  const qualityControlStaffs = qualityControlStaffsData || [];

  const { data: researchesStaffsData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=26",
    "researchesStaffs",
    {
      refetchOnWindowFocus: false
    }
  );
  const researchesStaffs = researchesStaffsData || [];

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
    values.company_id = user_data?.auth?.company_id;


    // show spinner (spinner context):
    spinnerDispatch(isLoadingAction(true));

    axios.post(`https://alaedeen.com/horn/profile-update-api`, { ...values })
      .then(() => {
        // hidden spinner (spinner context):
        spinnerDispatch(isLoadingAction(false));
      })
      .then(() => {
        if (currentTab === 4) {
          setFinishFormModalVisible(true);
        } else {
          handleNextTab();
        }
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
        <Tabs
          activeKey={ currentTab }
          cllassName="manufacturing--tab"
          onChange={ tabsHandleOnChange }
        >
          <TabPane className="manufacturingTab--content" tab={ t(__("Basic Company Details")) } key="1">
            <CompanyDetailsForm
              formRef={ companyDetailsFrm }
              handleSubmitForm={ handleSubmitForm }
              employees={ employees }
              officeSizes={ officeSizes }
            />
          </TabPane>

          <TabPane className="manufacturingTab--content" tab={ t(__("manufacturing_capability")) } key="2">
            <ManufacturingCapabilityForm
              formRef={ manufacturingCapabilityFrm }
              handleSubmitForm={ handleSubmitForm }
              handleUploadImage={ handleUploadImage }
              handleOnRemoveImage={ handleOnRemoveImage }
              handleImageUploadChange={ handleImageUploadChange }
              imageFileList={ imageFileList }
              qualityControlStaffs={ qualityControlStaffs }
              researchesStaffs={ researchesStaffs }
              units={ units }
              totalTransactions={ totalTransactions }
              businessType={ businessType }
            />
          </TabPane>

          <TabPane className="manufacturingTab--content" tab={ t(__("Export Capability")) } key="3">
            <ExportCapabilityForm
              formRef={ exportCapabilityFrm }
              handleSubmitForm={ handleSubmitForm }
              countryLists={ countryLists }
              handleUploadImage={ handleUploadImage }
              handleOnRemoveImage={ handleOnRemoveImage }
              handleImageUploadChange={ handleImageUploadChange }
              imageFileList={ imageFileList }
              countryCodes={ countryCodes }
              duties={ duties }
            />
          </TabPane>

          <TabPane className="manufacturingTab--content" tab={ t(__("certificates")) } key="4">
            <CertificatesForm
              formRef={ certificatesFrm }
              handleSubmitForm={ handleSubmitForm }
            />
          </TabPane>

          {/*<TabPane className="manufacturingTab--content" tab={ t(__("Company Introduction")) } key="5">
            <CompanyIntroductionForm
              formRef={ companyIntroductionFrm }
              handleSubmitForm={ handleSubmitForm }
            />
          </TabPane>*/}
        </Tabs>
      </Col>
    </Row>
  );
};

export default StoreInformation;
