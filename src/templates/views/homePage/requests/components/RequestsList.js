// import react hooks:
import {memo} from "react";

// import styles:
import "../../styles/RequestsList.less";
import "keen-slider/keen-slider.min.css"

// import antd components:
import {Col, Row} from "antd";

// import styled components:
import styled from "styled-components";
import rtl from "styled-components-rtl";

// import slider hooks:
import { useKeenSlider } from "keen-slider/react"

// import translations functions:
import {useTranslation} from "react-i18next";

// import utilities functions:
import {__} from "../../../../../utilities/functions/Helper";

// import svg icons:
import SvgIcon from "../../../../common/SvgIcon";

const ArrowIcon = styled(Col)`
  .--svgIcon {
    ${rtl`
      margin-left: 16px;
    `};
  }
`;

const RequestItem = styled(Col)`
  ${rtl`
    padding-left: 16px;
  `}
`;

const DateLocation = styled(Col)`
  ${rtl`
    padding-right: 16px;
  `}
`;

const RequestsList = () => {
  
  const { t, i18n: {dir} } = useTranslation();
  
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      vertical: true,
      defaultAnimation: {
        duration: 3000
      },
      slides: {
        perView: 2,
        spacing: 0,
      },
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )
  
  return (
    <Row className="requestsList--container">
      <Col span={24} className="--caption">
        {t(__("Request for Quotation"))}
      </Col>
      
      <Col span={24} className="--caption __medium">
        {t(__("Global Sourcing Marketplace"))}
      </Col>
  
      <Col span={24} className="--caption __small">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
      </Col>
      
      <Col span={24} className="--listItems">
        <Row ref={sliderRef} className="keen-slider" style={{ height: 170 }}>
          <RequestItem span={24} className="keen-slider__slide  --item">
            <Row gutter={[0, 16]}>
              <Col span={24} className="--details">
                <Row gutter={16} justify="space-between">
                  <Col sm={13} xxl={14}>
                    <Row gutter={[0, 8]}>
                      <Col span={24} className="--requestName">
                        Practical Note Book
                      </Col>
                      
                      <Col span={24} className="--lookingFor">
                        Buyer is looking for practical note boo
                      </Col>
                    </Row>
                  </Col>
                  
                  <Col sm={11} xxl={10}>
                    <Row>
                      <DateLocation className="--dateAndLocation">
                        <Row gutter={[0, 16]}>
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--calendarIcon">
                                <SvgIcon icon="calendar" color="#E3A921" width={16} height={16} />
                              </Col>
                              
                              <Col className="--date">
                                10 May, 2022
                              </Col>
                            </Row>
                          </Col>
  
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--countryIcon">
                                <i className="fi fi-gb fis" />
                              </Col>
      
                              <Col className="--location">
                                Madrid, Spain
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </DateLocation>
                      
                      <ArrowIcon className="--arrowIcon">
                        <SvgIcon icon={dir() === "rtl" ? "arrow-left" : "arrow-right"} type="bold" color="#185E91" width={24} height={24} />
                      </ArrowIcon>
                    </Row>
                  </Col>
                </Row>
              </Col>
              
              <Col span={24} className="--border">
                <div />
              </Col>
            </Row>
          </RequestItem>
  
          <RequestItem span={24} className="keen-slider__slide  --item">
            <Row gutter={[0, 16]}>
              <Col span={24} className="--details">
                <Row gutter={16} justify="space-between">
                  <Col sm={13} xxl={14}>
                    <Row gutter={[0, 8]}>
                      <Col span={24} className="--requestName">
                        Practical Note Book
                      </Col>
              
                      <Col span={24} className="--lookingFor">
                        Buyer is looking for practical note boo
                      </Col>
                    </Row>
                  </Col>
          
                  <Col sm={11} xxl={10}>
                    <Row>
                      <DateLocation className="--dateAndLocation">
                        <Row gutter={[0, 16]}>
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--calendarIcon">
                                <SvgIcon icon="calendar" color="#E3A921" width={16} height={16} />
                              </Col>
                      
                              <Col className="--date">
                                10 May, 2022
                              </Col>
                            </Row>
                          </Col>
                  
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--countryIcon">
                                <i className="fi fi-gb fis" />
                              </Col>
                      
                              <Col className="--location">
                                Madrid, Spain
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </DateLocation>
              
                      <ArrowIcon className="--arrowIcon">
                        <SvgIcon icon={dir() === "rtl" ? "arrow-left" : "arrow-right"} type="bold" color="#185E91" width={24} height={24}/>
                      </ArrowIcon>
                    </Row>
                  </Col>
                </Row>
              </Col>
      
              <Col span={24} className="--border">
                <div />
              </Col>
            </Row>
          </RequestItem>
  
          <RequestItem span={24} className="keen-slider__slide  --item">
            <Row gutter={[0, 16]}>
              <Col span={24} className="--details">
                <Row gutter={16} justify="space-between">
                  <Col sm={13} xxl={14}>
                    <Row gutter={[0, 8]}>
                      <Col span={24} className="--requestName">
                        Practical Note Book
                      </Col>
              
                      <Col span={24} className="--lookingFor">
                        Buyer is looking for practical note boo
                      </Col>
                    </Row>
                  </Col>
          
                  <Col sm={11} xxl={10}>
                    <Row>
                      <DateLocation className="--dateAndLocation">
                        <Row gutter={[0, 16]}>
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--calendarIcon">
                                <SvgIcon icon="calendar" color="#E3A921" width={16} height={16} />
                              </Col>
                      
                              <Col className="--date">
                                10 May, 2022
                              </Col>
                            </Row>
                          </Col>
                  
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--countryIcon">
                                <i className="fi fi-gb fis" />
                              </Col>
                      
                              <Col className="--location">
                                Madrid, Spain
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </DateLocation>
              
                      <ArrowIcon className="--arrowIcon">
                        <SvgIcon icon={dir() === "rtl" ? "arrow-left" : "arrow-right"} type="bold" color="#185E91" width={24} height={24} />
                      </ArrowIcon>
                    </Row>
                  </Col>
                </Row>
              </Col>
      
              <Col span={24} className="--border">
                <div />
              </Col>
            </Row>
          </RequestItem>
  
          <RequestItem span={24} className="keen-slider__slide  --item">
            <Row gutter={[0, 16]}>
              <Col span={24} className="--details">
                <Row gutter={16} justify="space-between">
                  <Col sm={13} xxl={14}>
                    <Row gutter={[0, 8]}>
                      <Col span={24} className="--requestName">
                        Practical Note Book
                      </Col>
              
                      <Col span={24} className="--lookingFor">
                        Buyer is looking for practical note boo
                      </Col>
                    </Row>
                  </Col>
          
                  <Col sm={11} xxl={10}>
                    <Row>
                      <DateLocation className="--dateAndLocation">
                        <Row gutter={[0, 16]}>
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--calendarIcon">
                                <SvgIcon icon="calendar" color="#E3A921" width={16} height={16} />
                              </Col>
                      
                              <Col className="--date">
                                10 May, 2022
                              </Col>
                            </Row>
                          </Col>
                  
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--countryIcon">
                                <i className="fi fi-gb fis" />
                              </Col>
                      
                              <Col className="--location">
                                Madrid, Spain
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </DateLocation>
              
                      <ArrowIcon className="--arrowIcon">
                        <SvgIcon icon={dir() === "rtl" ? "arrow-left" : "arrow-right"} type="bold" color="#185E91" width={24} height={24} />
                      </ArrowIcon>
                    </Row>
                  </Col>
                </Row>
              </Col>
      
              <Col span={24} className="--border">
                <div />
              </Col>
            </Row>
          </RequestItem>
  
          <RequestItem span={24} className="keen-slider__slide  --item">
            <Row gutter={[0, 16]}>
              <Col span={24} className="--details">
                <Row gutter={16} justify="space-between">
                  <Col sm={13} xxl={14}>
                    <Row gutter={[0, 8]}>
                      <Col span={24} className="--requestName">
                        Practical Note Book
                      </Col>
              
                      <Col span={24} className="--lookingFor">
                        Buyer is looking for practical note boo
                      </Col>
                    </Row>
                  </Col>
          
                  <Col sm={11} xxl={10}>
                    <Row>
                      <DateLocation className="--dateAndLocation">
                        <Row gutter={[0, 16]}>
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--calendarIcon">
                                <SvgIcon icon="calendar" color="#E3A921" width={16} height={16} />
                              </Col>
                      
                              <Col className="--date">
                                10 May, 2022
                              </Col>
                            </Row>
                          </Col>
                  
                          <Col span={24}>
                            <Row gutter={10}>
                              <Col className="--countryIcon">
                                <i className="fi fi-gb fis" />
                              </Col>
                      
                              <Col className="--location">
                                Madrid, Spain
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </DateLocation>
              
                      <ArrowIcon className="--arrowIcon">
                        <SvgIcon icon={dir() === "rtl" ? "arrow-left" : "arrow-right"} type="bold" color="#185E91" width={24} height={24} />
                      </ArrowIcon>
                    </Row>
                  </Col>
                </Row>
              </Col>
      
              <Col span={24} className="--border">
                <div />
              </Col>
            </Row>
          </RequestItem>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(RequestsList);
