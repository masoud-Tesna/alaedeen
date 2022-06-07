import "../styles/Extra.less";
import {Col, Row, Skeleton, Space} from "antd";
import {RightOutlined} from "@ant-design/icons";
import React from "react";
import {useTranslation} from "react-i18next";
import {useGetApiOld} from "../../../../utilities/functions";
import TextTruncate from "react-text-truncate";
import {fn_stripHtml} from "../../../../utilities/functions/Helper";
import {Link} from "react-router-dom";

const Extra = () => {
  
  const { t } = useTranslation();
  
  const { isLoading: alaedeenAboutIsLoading, data: alaedeenAboutUsData } = useGetApiOld("page-api", "page_seo=alaedeen-about-us", "page_alaedeen-about-us", { refetchOnWindowFocus: false });
  const alaedeenAboutUs = alaedeenAboutUsData || [];
  
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
    <Row className="extra--container" justify="space-between">
      <Col className="--aboutUs" span={8}>
        
        {
          alaedeenAboutIsLoading ?
            <Skeleton paragraph={{rows: 4}} />:
            (
              !!alaedeenAboutUs.description &&
              <>
                <div className="__caption">
                  {t("alaedeen_about_us")}
                </div>
  
                <div className="__text">
                  <TextTruncate
                    line={3}
                    element="div"
                    truncateText=" …"
                    text={ fn_stripHtml(alaedeenAboutUs.description) }
                  />
                </div>
  
                <div className="__more">
                  <Link to="/page/alaedeen-about-us">
                    {t("more")} <RightOutlined />
                  </Link>
                </div>
              </>
            )
        }
        
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
