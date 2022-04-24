import {Col, Row, Skeleton} from "antd";
import {useTranslation} from "react-i18next";
import {__} from "../../../../functions/Helper";
import React from "react";
import ImageGallery from "../../../common/ImageGallery";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import {useGetConfig} from "../../../../contexts/config/ConfigContext";

const CompanyInformation = ({details, isLoading}) => {
  
  // get initial config:
  const { config } = useGetConfig();
  
  const { t } = useTranslation();
  
  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }
  
  return (
    <Row>
      <Col span={24} className="companyInformation--container">
        {isLoading ?
          <>
            <Skeleton active={true} paragraph={{ rows: 4 }} />
            <Skeleton active={true} paragraph={{ rows: 7 }} />
            <Skeleton active={true} paragraph={{ rows: 3 }} />
          </> :
          <Row gutter={[0, 50]}>
            <Col span={24} className="--item">
              <Row gutter={[0, 15]}>
                <Col span={24} className="--title">
                  { t(__('Component Overview')) }
                </Col>
                
                <Col span={24} className="--table">
                  <Row gutter={[40, 20]}>
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('company name')) }:</Col>
                        <Col className = "__val">
                          {details?.general?.company}
                        </Col>
                      </Row>
                    </Col>
                    
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('brand')) }:</Col>
                        <Col className = "__val">
                          {details?.general?.brand}
                        </Col>
                      </Row>
                    </Col>
  
                    {/*<Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('full name')) }:</Col>
                        <Col className = "__val">
                          {` ${details?.general?.firstname} ${details?.general?.lastname} `}
                        </Col>
                      </Row>
                    </Col>*/}
                    
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var" >{ t(__('Business Type')) }:</Col>
                        <Col className = "__val --businessTyp" >
                          {details?.general?.business_type?.map((type, i) => {
                            return (
                              <span key={`businessType_${i}`}>{ t(__(type)) }</span>
                            )
                          })}
                        </Col>
                      </Row>
                    </Col>
  
                    <Col>
                      <Row gutter={15}>
                        <Col className="__var">{t(__('email'))}:</Col>
                        <Col className="__val">
                          {details?.general?.email}
                        </Col>
                      </Row>
                    </Col>
  
                    <Col>
                      <Row gutter={15}>
                        <Col className="__var">{t(__('telephone'))}:</Col>
                        <Col className="__val">
                          {details?.general?.phone}
                        </Col>
                      </Row>
                    </Col>
  
                    <Col>
                      <Row gutter={15}>
                        <Col className="__var">{t(__('address'))}:</Col>
                        <Col className="__val">
                          {details?.basic_company_details?.company_operational_address}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
  
            <Col span={24} className="--item">
              <Row gutter={[0, 15]}>
                <Col span={24} className="--title">
                  { t(__('manufacturing_capability')) }
                </Col>
      
                <Col span={24} className="--table">
                  <Row gutter={[40, 20]}>
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('factory_name')) }:</Col>
                        <Col className = "__val">
                          {details?.manufacturing_capability?.factory_name}
                        </Col>
                      </Row>
                    </Col>
  
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('factory_location')) }:</Col>
                        <Col className = "__val">
                          {details?.manufacturing_capability?.factory_location}
                        </Col>
                      </Row>
                    </Col>
  
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('factory_size')) }:</Col>
                        <Col className = "__val">
                          {details?.manufacturing_capability?.factory_size}
                        </Col>
                      </Row>
                    </Col>
  
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('no_of_production_lines')) }:</Col>
                        <Col className = "__val">
                          {details?.manufacturing_capability?.no_of_production_lines}
                        </Col>
                      </Row>
                    </Col>
  
                    {
                      details?.manufacturing_capability?.production_process?.show === "Y" &&
                      (
                        <Col span={24}>
                          <Row gutter={[0, 10]}>
                            <Col span={24} className="--title --side">
                              { t(__('production_process')) }
                            </Col>
  
                            <Col span={24} className="--table">
                              <Row gutter={[40, 20]}>
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('process_name')) }:</Col>
                                    <Col className = "__val">
                                      {details?.manufacturing_capability?.production_process?.process_name}
                                    </Col>
                                  </Row>
                                </Col>
  
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('process_describe')) }:</Col>
                                    <Col className = "__val">
                                      {details?.manufacturing_capability?.production_process?.process_describe}
                                    </Col>
                                  </Row>
                                </Col>
  
                                {details?.manufacturing_capability?.production_process?.process_pictures?.length !==0 &&
                                  <Col span={24} className="--images">
                                    <Row gutter={[0, 15]}>
                                      <Col className = "__var" span={24}>{ t(__('process_pictures')) }:</Col>
                                      <Col className = "__val">
                                        <ImageGallery images={details?.manufacturing_capability?.production_process?.process_pictures} type="profiles" id="production_process_process_pictures" />
                                      </Col>
                                    </Row>
                                  </Col>
                                }
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      )
                    }
  
                    {
                      details?.manufacturing_capability?.annual_production_capacity?.show === "Y" &&
                      (
                        <Col span={24}>
                          <Row gutter={[0, 10]}>
                            <Col span={24} className="--title --side">
                              { t(__('annual_production_capacity')) }
                            </Col>
          
                            <Col span={24} className="--table">
                              <Row gutter={[40, 20]}>
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('production_name')) }:</Col>
                                    <Col className = "__val">
                                      {details?.manufacturing_capability?.annual_production_capacity?.production_name}
                                    </Col>
                                  </Row>
                                </Col>
  
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('units_produced_previous_year')) }:</Col>
                                    <Col className = "__val">
                                      {details?.manufacturing_capability?.annual_production_capacity?.units_produced_previous_year}
                                    </Col>
                                  </Row>
                                </Col>
  
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('highest_ever_annual_output')) }:</Col>
                                    <Col className = "__val">
                                      {details?.manufacturing_capability?.annual_production_capacity?.highest_ever_annual_output}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      )
                    }
                  </Row>
                </Col>
              </Row>
            </Col>
  
            <Col span={24} className="--item">
              <Row gutter={[0, 15]}>
                <Col span={24} className="--title">
                  { t(__('export_capability')) }
                </Col>
      
                <Col span={24} className="--table">
                  <Row gutter={[40, 20]}>
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('accepted_delivery_terms')) }:</Col>
                        <Col className = "__val --businessTyp" >
                          {details?.export_capability?.accepted_delivery_terms?.map((type, i) => {
                            return (
                              <span key={`acceptedDeliveryTerms${i}`}>{ t(__(type)) }</span>
                            )
                          })}
                        </Col>
                      </Row>
                    </Col>
  
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('accepted_payment_currency')) }:</Col>
                        <Col className = "__val --businessTyp" >
                          {details?.export_capability?.accepted_payment_currency?.map((type, i) => {
                            return (
                              <span key={`acceptedPaymentCurrency${i}`}>{ t(__(type)) }</span>
                            )
                          })}
                        </Col>
                      </Row>
                    </Col>
  
                    <Col>
                      <Row gutter={15}>
                        <Col className = "__var">{ t(__('language_spoken')) }:</Col>
                        <Col className = "__val --businessTyp" >
                          {details?.export_capability?.language_spoken?.map((type, i) => {
                            return (
                              <span key={`languageSpoken${i}`}>{ t(__(type)) }</span>
                            )
                          })}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
  
            <Col span={24} className="--item">
              <Row gutter={[0, 15]}>
                <Col span={24} className="--title">
                  { t(__('certificates')) }
                </Col>
      
                <Col span={24} className="--table">
                  <Row gutter={[40, 20]}>
                    {
                      details?.certificates?.certification?.show === "Y" &&
                      (
                        <Col span={24}>
                          <Row gutter={[0, 10]}>
                            <Col span={24} className="--title --side">
                              { t(__('certification')) }
                            </Col>
          
                            <Col span={24} className="--table">
                              <Row gutter={[40, 20]}>
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('certification_type')) }:</Col>
                                    <Col className = "__val">
                                      {details?.certificates?.certification?.certification_type}
                                    </Col>
                                  </Row>
                                </Col>
              
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('certificate_name')) }:</Col>
                                    <Col className = "__val">
                                      {details?.certificates?.certification?.certificate_name}
                                    </Col>
                                  </Row>
                                </Col>
  
                                {details?.certificates?.certification?.certification_images?.length !== 0 &&
                                  <Col span={24} className="--images">
                                    <Row gutter={[0, 15]}>
                                      <Col className = "__var" span={24}>{ t(__('certification_images')) }:</Col>
                                      <Col className = "__val">
                                        <ImageGallery images={details?.certificates?.certification?.certification_images} type="profiles" id="certification_images" />
                                      </Col>
                                    </Row>
                                  </Col>
                                }
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      )
                    }
  
                    {
                      details?.certificates?.honor_and_award_certifications?.show === "Y" &&
                      (
                        <Col span={24}>
                          <Row gutter={[0, 10]}>
                            <Col span={24} className="--title --side">
                              { t(__('honor_and_award_certifications')) }
                            </Col>
          
                            <Col span={24} className="--table">
                              <Row gutter={[40, 20]}>
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('award_name')) }:</Col>
                                    <Col className = "__val">
                                      {details?.certificates?.honor_and_award_certifications?.award_name}
                                    </Col>
                                  </Row>
                                </Col>
  
                                {details?.certificates?.honor_and_award_certifications?.honor_and_award_certifications_images?.length !== 0 &&
                                    <Col span={24} className="--images">
                                      <Row gutter={[0, 15]}>
                                        <Col className = "__var" span={24}>{ t(__('honor_and_award_certifications_images')) }:</Col>
                                        <Col className = "__val">
                                          <ImageGallery images={details?.certificates?.honor_and_award_certifications?.honor_and_award_certifications_images} type="profiles" id="honor_and_award_certifications_images" />
                                        </Col>
                                      </Row>
                                    </Col>
                                }
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      )
                    }
  
                    {
                      details?.certificates?.patents?.show === "Y" &&
                      (
                        <Col span={24}>
                          <Row gutter={[0, 10]}>
                            <Col span={24} className="--title --side">
                              { t(__('patents')) }
                            </Col>
          
                            <Col span={24} className="--table">
                              <Row gutter={[40, 20]}>
                                <Col>
                                  <Row gutter={15}>
                                    <Col className = "__var">{ t(__('patent_name')) }:</Col>
                                    <Col className = "__val">
                                      {details?.certificates?.patents?.patent_name}
                                    </Col>
                                  </Row>
                                </Col>
              
                                {details?.certificates?.patents?.patent_images?.length !== 0 &&
                                  <Col span={24} className="--images">
                                    <Row gutter={[0, 15]}>
                                      <Col className = "__var" span={24}>{ t(__('patent_images')) }:</Col>
                                      <Col className = "__val">
                                        <ImageGallery images={details?.certificates?.patents?.patent_images} type="profiles" id="patent_images" />
                                      </Col>
                                    </Row>
                                  </Col>
                                }
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      )
                    }
                  </Row>
                </Col>
              </Row>
            </Col>
  
            {details?.company_Introduction?.trade_shows?.show === "Y" &&
              <Col span={24} className="--item">
                <Row gutter={[0, 15]}>
                  <Col span={24} className="--title">
                    { t(__('trade_shows')) }
                  </Col>
      
                  <Col span={24} className="--table">
                    <Row gutter={[40, 20]}>
                      <Col>
                        <Row gutter={15}>
                          <Col className = "__var">{ t(__('trade_show_name')) }:</Col>
                          <Col className = "__val">
                            {details?.company_Introduction?.trade_shows?.trade_show_name}
                          </Col>
                        </Row>
                      </Col>
  
                      <Col>
                        <Row gutter={15}>
                          <Col className = "__var">{ t(__('date_attended')) }:</Col>
                          <Col className = "__val">
                            {config.language === 'fa'
                              ? moment.unix(details?.company_Introduction?.trade_shows?.date_attended).format('jMMMM YYYY')
                              : <Moment format="MMM, YYYY" unix locale="en">{details?.company_Introduction?.trade_shows?.date_attended}</Moment>
                            }
                          </Col>
                        </Row>
                      </Col>
  
                      <Col>
                        <Row gutter={15}>
                          <Col className = "__var">{ t(__('host_country_and_region')) }:</Col>
                          <Col className = "__val">
                            {details?.company_Introduction?.trade_shows?.host_country_and_region}
                          </Col>
                        </Row>
                      </Col>
  
                      <Col>
                        <Row gutter={15}>
                          <Col className = "__var">{ t(__('description')) }:</Col>
                          <Col className = "__val">
                            {details?.company_Introduction?.trade_shows?.description}
                          </Col>
                        </Row>
                      </Col>
  
                      {details?.company_Introduction?.trade_shows?.trade_show_photo?.length !==0 &&
                        <Col span={24} className="--images">
                          <Row gutter={[0, 15]}>
                            <Col className = "__var" span={24}>{ t(__('trade_show_photo')) }:</Col>
                            <Col className = "__val">
                              <ImageGallery images={details?.company_Introduction?.trade_shows?.trade_show_photo} type="profiles" id="trade_show_photo" />
                            </Col>
                          </Row>
                        </Col>
                      }
                    </Row>
                  </Col>
                </Row>
              </Col>
            }
          </Row>
        }
      </Col>
    </Row>
  );
};

export default CompanyInformation;
