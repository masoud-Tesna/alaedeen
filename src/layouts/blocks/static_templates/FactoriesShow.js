import React, { useEffect, useState } from "react";

// import Style File:
import './styles/FactoriesShow.less';

// import language context:
import { useGetLanguageState } from "../../../contexts/language/LanguageContext";

// import ANT Design Components Used:
import { Button, Col, Row, Space, Image } from "antd";
import { CommentOutlined } from "@ant-design/icons";

// import Custom hooks:
import { useGetFactories, useQuery, useWindowSize } from "../../../functions";

// import Verified
import verifiedIcon from "../../../assets/images/verified.png";

// import Another Package used:
import TextTruncate from "react-text-truncate";

// import Skeleton used:
import SkeletonFactoriesShow from "./SkeletonFactoriesShow";

// import Show responsive image:
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

const FactoriesLogo = ({ logo, imageAlt }) => {

  const { language } = useGetLanguageState();

  if (language === 'en' && logo.en) {
    return (
      <img src={ logo.en } alt={ imageAlt }/>
    );
  }

  if (language === 'fa' && logo.fa) {
    return (
      <img src={ logo.fa } alt={ imageAlt }/>
    );
  }

  return (
    <i className="fal fa-image text-bc display-2" />
  );

}

const ShowMainMarket = ({ mainMarkets }) => {

  const length = mainMarkets.length;
  return (
    <Space>
      {mainMarkets.map((mainMarket, i) => {
        return (
          <>
            { i <= 3 &&
            <span key={i}>
              { mainMarket.country }
            </span>
            }
          </>
        );
      })}
      { length > 3 && '...' }
    </Space>
  );
}

const FieldValues = ({ fieldValues, width }) => {

  if (width >= 991) { // For Desktop:
    return (
      <>
        {fieldValues.map((fieldValue, i) => {
          return (
            <Col className="factories--fieldItem" key={i}>
              <Row className="factories--fieldRow">
                <Col span={24} className="vv-font-size-1-5 text-black font-weight-bold">
                  { fieldValue.field_id === 75 ?
                    <ShowMainMarket mainMarkets={fieldValue.value} /> :
                    <>{fieldValue.value}</>
                  }
                </Col>
                <Col span={24} className="vv-font-size-1-4 text-92">{fieldValue.caption}</Col>
              </Row>
            </Col>
          );
        })}
      </>
    );
  }else { // For Mobile:
    return (
      <>
        {fieldValues.slice(0,2).map((fieldValue, i) => {
          return (
            <Col span={12} className="factories--fieldItem" key={i}>
              <Row className="factories--fieldRow h-100">
                <Col span={24} className="vv-font-size-1-2 text-black font-weight-bold align-self-start">{fieldValue.value}</Col>
                <Col span={24} className="vv-font-size-1-2 text-92 align-self-end">{fieldValue.caption}</Col>
              </Row>
            </Col>
          );
        })}
      </>
    );
  }
}

const GroupFields = ({ groupFields, width }) => {

  if (groupFields) {

    if (width >= 991) { // For Desktop:
      return (
        <>
          {groupFields.map((groupField) => {
            return (
              <Col span={12} key = { groupField.group_id }>
                <div className="py-2 px-3 factories--informationItem">
                  <Row>
                    <Col span={24} className="vv-font-size-1-4 text-33 factories--informationItem__caption">{groupField.caption}:</Col>
                    <Col span={24} className="vv-font-size-1-4 text-33 factories--informationItem__details">
                      <Row justify={"space-between"}>
                        <FieldValues fieldValues = { groupField.values } width={width}/>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </>
      );
    }
    else { // For Mobile:
      return (
        <>
          {groupFields.slice(0,1).map((groupField) => {
            return (
              <Col flex="1 1" key = { groupField.group_id }>
                <div className="factories--informationItem">
                  <Row>
                    <Col span={24} className="vv-font-size-1-4 text-33">
                      <Row justify={"space-between"}>
                        <FieldValues fieldValues = { groupField.values } width={width} />
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </>
      );
    }
  }
}

const FactoryProduct = ({ products }) => {
  const { width } = useWindowSize();
  const imageWidth = width >= 992? 157.733 : 98;
  const imageHeight = width >= 992? 157.733 : 98;
  return(
    <>
      {products.map((product, i) => {
        return (
          <Col className={ `${ i === 3 && 'd-none d-lg-block' } factories--productImageContainer` } key={product.product_id}>
            <div className="rounded-10 shadow-y-2 text-center factories--productImage">

              {product.main_pair ?
                <ShowResponsiveImage imagePath={ product.main_pair.detailed.image_path } imageFolder='detailed' width={imageWidth} height={imageHeight} imageAlt={ product.product }/> :
                <Image
                  width={imageWidth}
                  height={imageHeight}
                  preview={false}
                  src="error"
                  fallback="data:image/png;base64,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"
                />
              }
            </div>
          </Col>
        );
      })}
    </>
  );
}

const FactoriesShow = () => {

  const { t } = useTranslation();

  const factory_param_id = useQuery().get('factory');
  const [factoryDataInParam, setFactoryDataInParam] = useState([]);

  const { factories, load } = useGetFactories();

  const { width } = useWindowSize();

  useEffect(() => {
    if (factory_param_id) {
      if (factories && factories.length) {
        const i = factories.findIndex(factoryData => factoryData.company_id == factory_param_id);
        setFactoryDataInParam([ factories[ i ] ]);
        factories.splice(i, 1);
      }
    }
  }, [factory_param_id, factories]);

  return (
    <>

      { load ?
        <SkeletonFactoriesShow
          skeleton = {true}
          skeltonNumbers = {3}
        /> :
        <>
          {factoryDataInParam && factory_param_id &&
          <>
            {factoryDataInParam.map((factory) => {

              let groupFields_1 = [];
              let groupFields_2 = [];
              let factoryFields = [];

              if (factory) {
                groupFields_1[ 'group_id' ] = factory.company_id * 2;
                groupFields_1[ 'caption' ] = 'Production capability';
                groupFields_1[ 'values' ] = [
                  {
                    'field_id': 68,
                    'caption': 'Total employees',
                    'value': factory.basic_company_details.fields.total_no_employees
                  },
                  {
                    'field_id': 69,
                    'caption': 'Factory size',
                    'value': factory.basic_company_details.fields.office_size
                  },
                  {
                    'field_id': 70,
                    'caption': 'R&D employees',
                    'value': factory.manufacturing_capability.fields.no_of_r_and_d_staff
                  }
                ];

                groupFields_2[ 'group_id' ] = factory.company_id * 4;
                groupFields_2[ 'caption' ] = 'Export Capability';
                groupFields_2[ 'values' ] = [
                  {
                    'field_id': 75,
                    'caption': 'Main Markets',
                    'value': factory.export_capability.fields.main_markets_and_distribution
                  },
                  {
                    'field_id': 78,
                    'caption': 'Export rate',
                    'value': factory.export_capability.fields.export_rate
                  }
                ];

                factoryFields = [
                  groupFields_1,
                  groupFields_2
                ];
              }

              return (
                <Col span={24} key = { factory.company_id } className="bg-white rounded-10 p-3 border border-70 factories--item byParam">
                  <Row gutter={16} className="h-100">
                    <Col flex='400px' className="d-none d-lg-block h-100 factories--imageContainer">

                      {factory.images[0] ?
                        <ShowResponsiveImage imagePath={ factory.images[0] } imageFolder='profiles' width={400} height={313} imageAlt={ factory.general.company }/> :
                        <Image
                          width={400}
                          height={313}
                          preview={false}
                          src="error"
                          fallback="data:image/png;base64,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"
                        />
                      }
                    </Col>
                    <Col flex="1 1" className="factories--dataContainer">
                      <Row gutter={[0,8]}>
                        <Col className="factories--data__topSection" span={24}>
                          <Row className="d-none d-lg-flex" justify={"space-between"}>
                            <Col>
                              <Row gutter={16}>
                                <Col className="factories--iconContainer">
                                  <FactoriesLogo logo={ factory.company_introduction.fields.company_logo } imageAlt={ factory.general.company }/>
                                </Col>
                                <Col className="">
                                  <Row className="h-100">
                                    <Col span={24} className="vv-font-size-1-6 text-black font-weight-600">
                                      { factory.general.company }
                                    </Col>
                                    <Col span={24} className="mt-2">
                                      <img src={ verifiedIcon } alt="verified"/>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                            <Col className="text-right factories--btnContainer">
                              <Space size={"middle"}>
                                <Button type="primary" icon={<CommentOutlined className="vv-font-size-1-7" />} className="p-0 bg-primary-darken border-primary-darken factories--btn__chat" size={"large"}>{ t(__('Chat Now')) }</Button>
                                <Button icon={<i className="far fa-address-book vv-font-size-1-7" />} className="p-0 bg-transparent text-primary-darken border-0 factories--btn__contacts" size={"large"}>{ t(__('Contacts')) }</Button>
                              </Space>
                            </Col>
                          </Row>

                          <Row className="d-flex d-lg-none">
                            <Col flex='69px' className="factories--iconContainer">
                              <FactoriesLogo logo={ factory.company_introduction.fields.company_logo } imageAlt={ factory.general.company }/>
                            </Col>
                            <Col flex="1 1" className="">
                              <Row gutter={[0, 5]}>
                                <Col className="" span={24}>
                                  <Row justify={"space-between"}>
                                    <Col className="vv-font-size-1-4 text-black font-weight-600">
                                      { factory.general.company }
                                    </Col>
                                    <Col className="factories--btnContainer">
                                      <Button type="primary" icon={<CommentOutlined className="vv-font-size-1-7" />} className="p-0 bg-primary-darken border-primary-darken factories--btn__chat" size={"large"}>{ t(__('Chat')) }</Button>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col className="" span={24}>
                                  <Row>
                                    <Col flex='47px' className="">
                                      <img src={ verifiedIcon } alt="verified"/>
                                    </Col>
                                    <GroupFields groupFields = { factoryFields } width={width} />
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>

                        <Col className="factories--data__middleSection" span={24}>
                          <Row gutter={16}>
                            <Col className="d-none d-lg-block" span={6}>
                              <TextTruncate
                                className="vv-font-size-1-6 font-weight-600"
                                line={6}
                                element="span"
                                truncateText=" …"
                                text={`About Us: ${factory.company_introduction.fields.detailed_company_introduction}`}
                              />
                            </Col>
                            <Col xs={24} lg={18}>
                              <Row gutter={16} className="row-cols-3 row-cols-lg-4">
                                <FactoryProduct products={factory.products} />
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col className="d-none d-lg-block factories--data__bottomSection" span={24}>
                          <Row gutter={16} className="factories--informationContainer">
                            <GroupFields groupFields = { factoryFields } width={width} />
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              );
            })}
          </>
          }

          {factories.map((factory) => {

            let groupFields_1 = [];
            let groupFields_2 = [];
            let factoryFields = [];

            if (factory) {
              groupFields_1[ 'group_id' ] = factory.company_id * 2;
              groupFields_1[ 'caption' ] = 'Production capability';
              groupFields_1[ 'values' ] = [
                {
                  'field_id': 68,
                  'caption': 'Total employees',
                  'value': factory.basic_company_details.fields.total_no_employees
                },
                {
                  'field_id': 69,
                  'caption': 'Factory size',
                  'value': factory.basic_company_details.fields.office_size
                },
                {
                  'field_id': 70,
                  'caption': 'R&D employees',
                  'value': factory.manufacturing_capability.fields.no_of_r_and_d_staff
                }
              ];

              groupFields_2[ 'group_id' ] = factory.company_id * 4;
              groupFields_2[ 'caption' ] = 'Export Capability';
              groupFields_2[ 'values' ] = [
                {
                  'field_id': 75,
                  'caption': 'Main Markets',
                  'value': factory.export_capability.fields.main_markets_and_distribution
                },
                {
                  'field_id': 78,
                  'caption': 'Export rate',
                  'value': factory.export_capability.fields.export_rate
                }
              ];

              factoryFields = [
                groupFields_1,
                groupFields_2
              ];
            }

            return (
              <Col span={24} key = { factory.company_id } className="bg-white rounded-10 p-3 border border-70 factories--item">
                <Row gutter={16} className="h-100">
                  <Col flex='400px' className="d-none d-lg-block h-100 factories--imageContainer">
                    {factory.images ?
                      <ShowResponsiveImage imagePath={ factory.images[0] } imageFolder='profiles' width={400} height={313} imageAlt={ factory.general.company }/> :
                      <Image
                        width={400}
                        height={313}
                        preview={false}
                        src="error"
                        fallback="data:image/png;base64,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"
                      />
                    }
                  </Col>
                  <Col flex="1 1" className="factories--dataContainer">
                    <Row gutter={[0,8]}>
                      <Col className="factories--data__topSection" span={24}>
                        <Row className="d-none d-lg-flex" justify={"space-between"}>
                          <Col>
                            <Row gutter={16}>
                              <Col className="factories--iconContainer">
                                <FactoriesLogo logo={ factory.company_introduction.fields.company_logo } imageAlt={ factory.general.company }/>
                              </Col>
                              <Col className="">
                                <Row className="h-100">
                                  <Col span={24} className="vv-font-size-1-6 text-black font-weight-600">
                                    { factory.general.company }
                                  </Col>
                                  <Col span={24} className="mt-2">
                                    <img src={ verifiedIcon } alt="verified"/>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                          <Col className="text-right factories--btnContainer">
                            <Space size={"middle"}>
                              <Button type="primary" icon={<CommentOutlined className="vv-font-size-1-7" />} className="p-0 bg-primary-darken border-primary-darken factories--btn__chat" size={"large"}>{ t(__('Chat Now')) }</Button>
                              <Button icon={<i className="far fa-address-book vv-font-size-1-7" />} className="p-0 bg-transparent text-primary-darken border-0 factories--btn__contacts" size={"large"}>{ t(__('Contacts')) }</Button>
                            </Space>
                          </Col>
                        </Row>

                        <Row className="d-flex d-lg-none">
                          <Col flex='69px' className="factories--iconContainer">
                            <FactoriesLogo logo={ factory.company_introduction.fields.company_logo } imageAlt={ factory.general.company }/>
                          </Col>
                          <Col flex="1 1" className="">
                            <Row gutter={[0, 5]}>
                              <Col className="" span={24}>
                                <Row justify={"space-between"}>
                                  <Col className="vv-font-size-1-4 text-black font-weight-600">
                                    { factory.general.company }
                                  </Col>
                                  <Col className="factories--btnContainer">
                                    <Button type="primary" icon={<CommentOutlined className="vv-font-size-1-7" />} className="p-0 bg-primary-darken border-primary-darken factories--btn__chat" size={"large"}>{ t(__('Chat')) }</Button>
                                  </Col>
                                </Row>
                              </Col>
                              <Col className="" span={24}>
                                <Row>
                                  <Col flex='47px' className="">
                                    <img src={ verifiedIcon } alt="verified"/>
                                  </Col>
                                  <GroupFields groupFields = { factoryFields } width={width} />
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>

                      <Col className="factories--data__middleSection" span={24}>
                        <Row gutter={16}>
                          <Col className="d-none d-lg-block" span={6}>
                            <TextTruncate
                              className="vv-font-size-1-6 font-weight-600"
                              line={6}
                              element="span"
                              truncateText=" …"
                              text={`About Us: ${factory.company_introduction.fields.detailed_company_introduction}`}
                            />
                          </Col>
                          <Col xs={24} lg={18}>
                            <Row gutter={16} className="row-cols-3 row-cols-lg-4">
                              <FactoryProduct products={factory.products} />
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col className="d-none d-lg-block factories--data__bottomSection" span={24}>
                        <Row gutter={16} className="factories--informationContainer">
                          <GroupFields groupFields = { factoryFields } width={width} />
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            );
          })}
        </>
      }

    </>
  );
};

export default FactoriesShow;