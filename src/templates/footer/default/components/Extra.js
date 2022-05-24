import "../styles/Extra.less";
import {Col, Row, Space} from "antd";
import {RightOutlined} from "@ant-design/icons";
import React from "react";

const Extra = () => {
  
  const viewTrust = (type) => {
    if (type === "zibal") {
      window.open(
        'https://gateway.zibal.ir/trustMe/alaedeen.com',
        null,
        'width=450, height=600, scrollbars=no, resizable=no'
      );
    }
  }
  
  return (
    <Row className="extra--container" justify="space-between" align="middle">
      <Col className="--aboutUs" span={8}>
        <div className="__caption">
          Alaedeen Online Store
        </div>
        
        <div className="__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur dolor eum, expedita incidunt, iusto labore maxime modi nemo nihil odio quod, sequi temporibus voluptate.
        </div>
        
        <div className="__more">
          More <RightOutlined />
        </div>
      </Col>
      
      <Col className="--eNamads">
        <Space size={16}>
          <div onClick={() => viewTrust("eNamad")} className="__namad">
            <a
              referrerPolicy="origin"
              target="_blank"
              rel="nofollow"
              href="https://trustseal.enamad.ir/?id=249644&amp;code=rN4kSWtSgD84AymRm1Py"
            >
              <img
                referrerPolicy="origin"
                src="https://Trustseal.eNamad.ir/logo.aspx?id=249644&Code=rN4kSWtSgD84AymRm1Py"
                id="rN4kSWtSgD84AymRm1Py"
               alt="eNamad"
              />
            </a>
          </div>
  
          <div onClick={() => viewTrust("zibal")} className="__namad">
            <span>
              <img  className="eNamad--img" src="https://zibal.ir/trust/assets/1.png" border="0" alt="پرداخت آنلاین زیبال" />
            </span>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default Extra;
