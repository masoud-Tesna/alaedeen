import { useEffect, useState } from "react";

import "./styles/ManufactureInformation.less";

import { Col, Form, Row, Steps } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useGetApi, useWindowSize } from "../../../../../functions";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../functions/Helper";
import axios from "axios";
import CompanyDetailsForm from "./manufactureInformation/CompanyDetailsForm";
import ManufacturingCapabilityForm from "./manufactureInformation/ManufacturingCapabilityForm";
import ExportCapabilityForm from "./manufactureInformation/ExportCapabilityForm";
import CertificatesForm from "./manufactureInformation/CertificatesForm";
import CompanyIntroductionForm from "./manufactureInformation/CompanyIntroductionForm";
import SupportForm from "./manufactureInformation/SupportForm";

const ManufactureInformation = () => {

  const { Step } = Steps;

  // get window width
  const { width } = useWindowSize();

  const { t } = useTranslation();

  // use ref for add product form:
  const [companyDetailsFrm] = Form.useForm();
  const [manufacturingCapabilityFrm] = Form.useForm();
  const [exportCapabilityFrm] = Form.useForm();
  const [certificatesFrm] = Form.useForm();
  const [companyIntroductionFrm] = Form.useForm();
  const [supportFrm] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(4);

  // save image name in array state:
  const [imageFileList, setImageFileList] = useState({});

  const stepsHandleOnChange = current => {
    setCurrentStep(current);
  }

  // get data from API:
  const {data: officeSizesData} = useGetApi("get-profile-field-value-api", "field_id=8", "officeSizes");
  const officeSizes = officeSizesData || [];

  const {data: employeesData} = useGetApi("get-profile-field-value-api", "field_id=5", "employees");
  const employees = employeesData || [];

  const {data: factorySizeData} = useGetApi("get-profile-field-value-api", "field_id=24", "factorySize");
  const factorySize = factorySizeData || [];

  const {data: qualityControlStaffsData} = useGetApi("get-profile-field-value-api", "field_id=25", "qualityControlStaffs");
  const qualityControlStaffs = qualityControlStaffsData || [];

  const {data: researchesStaffsData} = useGetApi("get-profile-field-value-api", "field_id=26", "researchesStaffs");
  const researchesStaffs = researchesStaffsData || [];

  const {data: unitsData} = useGetApi("get-profile-field-value-api", "field_id=31", "units");
  const units = unitsData || [];

  const {data: dutiesData} = useGetApi("get-profile-field-value-api", "field_id=65", "duties");
  const duties = dutiesData || [];

  const {data: acceptedDeliveriesData} = useGetApi("get-profile-field-value-api", "field_id=69&order_by=description", "acceptedDeliveries");
  const acceptedDeliveries = acceptedDeliveriesData || [];

  const {data: paymentCurrenciesData} = useGetApi("get-profile-field-value-api", "field_id=70", "paymentCurrencies");
  const paymentCurrencies = paymentCurrenciesData || [];

  const {data: languagesSpokenData} = useGetApi("get-profile-field-value-api", "field_id=71", "languagesSpoken");
  const languagesSpoken = languagesSpokenData || [];

  const {data: certificationTypesData} = useGetApi("get-profile-field-value-api", "field_id=73", "certificationTypes");
  const certificationTypes = certificationTypesData || [];

  const { data: countryListsData } = useGetApi(`country-lists-api`, '', `countryLists`);
  const countryLists = countryListsData || [];

  // get country codes from API:
  const { data: countryCodesData } = useGetApi(`country-code-api`, "", `countryCodes`);
  const countryCodes = countryCodesData?.country_code || [];

  // function for upload images:
  const handleUploadImage = async options => {
    const { onSuccess, onError, file, onProgress, inputName, frmRef } = options;

    let isCloneable = false,
        clone;

    if (options.isCloneable || options.isCloneable === 0) {
      clone = options.isCloneable;
      isCloneable = true;
    }

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("file", file);
    try {
      const res = await axios.post(
        "https://alaedeen.com/horn/upload-image-api",
        fmData,
        config
      );

      const profileFields = frmRef.getFieldValue('profile_fields');

      let prevImages = [];

      if (isCloneable) prevImages = {[clone]: []}

      if (profileFields) {
        if (profileFields[inputName]) {
          prevImages = profileFields[inputName];
        }
      }

      if (isCloneable) {
        frmRef?.setFieldsValue({
          "profile_fields": {
            [inputName]: {
              [clone]: [...prevImages[clone], res.data]
            }
          },
        });
      } else {
        frmRef?.setFieldsValue({
          "profile_fields": {
            [ inputName ]: [ ...prevImages, res.data ]
          },
        });
      }

      //console.log(profileFields)

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
    console.log(file);
  }

  const stepContent = step => {
    switch (step) {
      case 0:
        return (
          <CompanyDetailsForm
            formRef={companyDetailsFrm}
            employees={employees}
            officeSizes={officeSizes}
          />
        );

      case 1:
        return (
          <ManufacturingCapabilityForm
            formRef={manufacturingCapabilityFrm}
            handleUploadImage={handleUploadImage}
            handleOnRemoveImage={handleOnRemoveImage}
            handleImageUploadChange={handleImageUploadChange}
            imageFileList={imageFileList}
            factorySize={factorySize}
            qualityControlStaffs={qualityControlStaffs}
            researchesStaffs={researchesStaffs}
            units={units}
          />
        )

      case 2:
        return (
          <ExportCapabilityForm
            formRef={exportCapabilityFrm}
            countryLists={countryLists}
            handleUploadImage={handleUploadImage}
            handleOnRemoveImage={handleOnRemoveImage}
            handleImageUploadChange={handleImageUploadChange}
            imageFileList={imageFileList}
            countryCodes={countryCodes}
            duties={duties}
            acceptedDeliveries={acceptedDeliveries}
            paymentCurrencies={paymentCurrencies}
            languagesSpoken={languagesSpoken}
          />
        )

      case 3:
        return (
          <CertificatesForm
            formRef={certificatesFrm}
            handleUploadImage={handleUploadImage}
            handleOnRemoveImage={handleOnRemoveImage}
            handleImageUploadChange={handleImageUploadChange}
            imageFileList={imageFileList}
            certificationTypes={certificationTypes}
          />
        )

      case 4:
        return (
          <CompanyIntroductionForm
            formRef={companyIntroductionFrm}
            handleUploadImage={handleUploadImage}
            handleOnRemoveImage={handleOnRemoveImage}
            handleImageUploadChange={handleImageUploadChange}
            imageFileList={imageFileList}
            countryLists={countryLists}
          />
        )

      case 5:
        return (
          <SupportForm
            formRef={supportFrm}
            handleUploadImage={handleUploadImage}
            handleOnRemoveImage={handleOnRemoveImage}
            handleImageUploadChange={handleImageUploadChange}
            imageFileList={imageFileList}
            countryLists={countryLists}
          />
        )
    }
  }

  useEffect(() => {

    // get step caption div:
    let stepCaption = document.getElementById("manufactureInfo--Step__caption") && document.getElementById("manufactureInfo--Step__caption");

    // get step content div:
    const stepContent = document.getElementById("manufactureInfo--Step__content") && document.getElementById("manufactureInfo--Step__content");

    if (stepCaption && stepContent) {
      // get step content width:
      const {width} = stepContent.getBoundingClientRect();

      // set step caption width:
      document.getElementById("manufactureInfo--Step__caption").style.width = `calc(${width}px + 45px)`;
    }

  }, [width])

  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"Manufacturing Information"} />
      </Col>

      <Col id="manufactureInfo--content" span={24} className="manufactureInfo--content">
        <Row>
          <Col id="manufactureInfo--Step__caption" span={24} className="manufactureInfo--Step__caption">
            <Steps
              current={currentStep}
              progressDot
              onChange={stepsHandleOnChange}
            >
              <Step key="company_details"  description={ t(__('Basic Company Details')) } />

              <Step key="manufacturing_capability" description={ t(__('Manufacturing Capability')) } />

              <Step key="export_capability" description={ t(__('Export Capability')) } />

              <Step key="certificates" description={ t(__('certificates')) } />

              <Step key="company_introduction" description={ t(__('Company Introduction')) } />

              <Step key="Support" description={ t(__('Support')) } />
            </Steps>
          </Col>

          <Col id="manufactureInfo--Step__content" span={24} className="manufactureInfo--Step__content">

            {stepContent(currentStep)}

          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ManufactureInformation;
