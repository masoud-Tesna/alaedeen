import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//import style:
import './styles/ContactUs.less';

import { Button, Col, Form, Input, Row, Skeleton } from "antd";
import { useGetApiOld, useWindowSize } from "../../functions";
import { SeoGenerator } from "../../functions/Helper";
import { useTranslation } from "react-i18next";
import { useGetConfig } from "../../contexts/config/ConfigContext";

const ContactUs = () => {

  // get initial config:
  const { config } = useGetConfig();

  const location = useLocation();

  const { t } = useTranslation();

  // get window width
  const { width } = useWindowSize();

  const { isLoading, data } = useGetApiOld(
    "page-api",
    "page_seo=alaedeen-contact-us",
    "page_alaedeen-contact-us",
    {
      refetchOnWindowFocus: false
    }
  );
  const page = data || [];

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [location?.pathname]);

  return (
    <Row className="contactUs--container" gutter={[0, 90]}>
      <SeoGenerator
        title={  page?.page_title || page?.page }
        description={ page?.meta_description }
        keywords={ page?.meta_keywords }
        canonical={ `https://alaedeen.com/page/${page?.seo_name}` }
      />

      <Col span={24} className="contactUs--section">
        <Row gutter={[0, 35]}>
          <Col span={24} className="title">
            {t('contact_us')}
          </Col>
          <Col span={24} className="contactUs--content">
            <Row gutter={[{xs:0, lg:12}, {xs: 35, lg:0}]}>
              <Col xs={24} lg={12} className="my-auto">
                <Row gutter={[0, 30]}>
                  <Col span={24}>
                    <span className="variable">{t('address')}:</span>
                    <span className="value">
                      {t('contact_us_alaedeen_address')}
                    </span>
                  </Col>
                  <Col span={24}>
                    <span className="variable">{t('telephone')}:</span>
                    <span className="value">
                      <a href="tel:+982177874366">00982177874366</a>
                    </span>
                  </Col>
                  <Col span={24}>
                    <span className="variable">{t('whatsapp')}:</span>
                    <span className="value">
                      <a href="whatsapp://send?abid=+989912322188&text=">00989912322188</a>
                    </span>
                  </Col>
                  <Col span={24}>
                    <span className="variable">{t('email')}:</span>
                    <span className="value">
                      <a href="mailto:info@alaedeen.com">info@alaedeen.com</a>
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} lg={12} className="contactUs--map">
                <iframe
                  title="google map"
                  id="alaedeen-address-google-map"
                  src={ `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2099.9821020427257!2d51.53655996785196!3d35.73568767633283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7dd5870ed623270d!2zMzXCsDQ0JzExLjQiTiA1McKwMzInMDguOCJF!5e0!3m2!1sfa!2s!4v1640693061162!5m2!1s${config.language}!2s` }
                  width="90%"
                  height="250"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  allowFullScreen=""
                  loading="lazy"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={24} className="comment--section bg-white">
        <Row gutter={[0, 20]}>
          <Col span={24} className="title">
            {t('submit_comments')}
          </Col>

          {isLoading &&
            <>
              <Col span={24}>
                <Skeleton  paragraph={{ rows: width >= 992 ? 2 : 9 }}  active />
              </Col>

              <Col span={24}>
                <Row gutter={[10, 10]} justify="space-around">
                  <Col xs={24} lg={11}>
                    <Row gutter={[0, 20]}>
                      <Col xs={24} lg={15}>
                        <Skeleton.Input style={{ width: `calc(${width >= 992 ? 19.9 : 75}vw)`, height: 35, borderRadius: "1.2rem" }} active size={"small"} />
                      </Col>

                      <Col xs={24} lg={15}>
                        <Skeleton.Input style={{ width: `calc(${width >= 992 ? 19.9 : 75}vw)`, height: 35, borderRadius: "1.2rem" }} active size={"small"} />
                      </Col>

                      <Col xs={24} lg={15}>
                        <Skeleton.Input style={{ width: `calc(${width >= 992 ? 19.9 : 75}vw)`, height: 35, borderRadius: "1.2rem" }} active size={"small"} />
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24} lg={11} style={{ paddingTop: width >= 992 ? 0 : 10 }}>
                    <Row gutter={[0, 20]}>
                      <Col span={15}>
                        <Skeleton.Input style={{ width: `calc(${width >= 992 ? 19.9 : 75}vw)`, height: 35, borderRadius: "1.2rem" }} active size={"small"} />
                      </Col>

                      <Col span={20} className="form-item-comment">
                        <Skeleton.Input style={{ width: `calc(${width >= 992 ? 25.24 : 80}vw)`, height: 90, borderRadius: "1.2rem" }} active size={"small"} />
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24} className="text-center" style={{ paddingTop: 10 }}>
                    <Skeleton.Input style={{ width: `calc(${width >= 992 ? 10.28 : 30}vw)`, height: 42, borderRadius: 3 }} active size={"small"} />
                  </Col>
                </Row>
              </Col>
            </>
          }
          {page?.page_id &&
            <>
              <Col span={24} className="comment--description" dangerouslySetInnerHTML={ {__html: page.description} } />

              <Col span={24} className="comment--form">
                <Form
                  name="submit-comment-form"
                  onFinish={e => console.log(e)}
                >
                  <Row gutter={[10, 10]}>
                    <Col xs={24} lg={9} className="form--items">
                      <Row gutter={[0, 20]}>
                        <Col xs={24} lg={20}>
                          <Form.Item
                            name="fullName"
                            rules={[
                              {
                                required: true
                              },
                            ]}>
                            <Input
                              placeholder={ t("first_name_and_last_name") }
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} lg={20}>
                          <Form.Item
                            name="phone"
                            rules={[
                              {
                                required: true
                              },
                            ]}>
                            <Input
                              placeholder={ t("phone_number") }
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} lg={20}>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                type: 'email',
                              },
                            ]}>
                            <Input
                              placeholder={ t("email") }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={24} lg={9} className="form--items">
                      <Row gutter={[0, 20]}>
                        <Col xs={24} lg={20}>
                          <Form.Item
                            name="subject"
                            rules={[
                              {
                                required: true
                              },
                            ]}>
                            <Input
                              placeholder={ t("subject") }
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} lg={24} className="form-item-comment">
                          <Form.Item
                            name="comment"
                            rules={[
                              {
                                required: true,
                                min: 20
                              },
                            ]}>
                            <Input.TextArea
                              placeholder={ t("type_your_comment") }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={18} className="form--items">
                      <Form.Item
                        className="comment--submit"
                        valuePropName="checked"
                      >
                        <Button className="bg-primary text-white border-0 p-0" htmlType="submit">
                          { t("send") }
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default ContactUs;
