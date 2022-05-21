import React, {useState} from "react";
import "../styles/LanguageDropDown.less";
import {Col, Dropdown, Menu, Row, Skeleton} from "antd";
import {useGetApiOld} from "../../../functions";
import {Link} from "react-router-dom";
import {__} from "../../../functions/Helper";
import {DownOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {changeLanguageAction, useConfigDispatch, useGetConfig} from "../../../contexts/config/ConfigContext";
import {isLoadingAction, useSpinnerDispatch} from "../../../contexts/spiner/SpinnerContext";

const LanguageDropDown = () => {
  
  const { t } = useTranslation();
  
  // initial state for language:
  const { config } = useGetConfig();
  const { configDispatch } = useConfigDispatch();
  
  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();
  
  const [dropDownIsActive, setDropDownIsActive] = useState(false);
  
  const languagesList = {
    en : {
      text: "English",
      lang: "en",
      flag: "fi fi-gb fis"
    },
    ar : {
      text: "عربي",
      lang: "ar",
      flag: "fa-solid fa-circle text-2d"
    },
    fa : {
      text: "فارسی",
      lang: "fa",
      flag: "fi fi-ir fis"
    },
    zh : {
      text: "Chinese",
      lang: "zh",
      flag: "fi fi-cn fis"
    },
    ru : {
      text: "Russian",
      lang: "ru",
      flag: "fi fi-ru fis"
    }
  };
  
  // function for change language:
  const handleChangeLanguage = (lang) => {
    if (lang !== config.language) {
      // show spinner (spinner context):
      spinnerDispatch(isLoadingAction(true));
      
      const changeLanguageTimer = setTimeout(() => {
        // change language:
        configDispatch(changeLanguageAction(lang));
  
        setDropDownIsActive(false);
        
        // close top panel menu:
        //closeTopPanelMenuXs();
        
        // hidden spinner (spinner context):
        spinnerDispatch(isLoadingAction(false));
      }, 1000);
      return () => clearTimeout(changeLanguageTimer);
      
    }
  }
  
  const LanguagesContent = () => {
    
    return(
      <Menu
        style={{ minWidth: 250 }}
        triggerSubMenuAction={"click"}
        className="dropDownLanguages--content"
      >
        {Object.values(languagesList)?.map((language) => {
          return(
            <Menu.Item key={ `languages_${language?.text}` } onClick={() => handleChangeLanguage(language?.lang)}>
              <div>
                <i className={ language?.flag } />
                <span>{ language?.text }</span>
              </div>
            </Menu.Item>
          )
        })}
      </Menu>
    );
  };
  
  return (
    <Dropdown
      className="languageDropDown--container"
      overlayClassName="languageDropDown__isOpen"
      overlay={LanguagesContent()}
      trigger={['click']}
      onVisibleChange={setDropDownIsActive}
    >
      <Row gutter={7} className="vv-cursor-pointer" onClick={e => e.preventDefault()}>
        <Col className="--langIcon" flex="18px">
          <i className={ languagesList[config?.language].flag } />
        </Col>
    
        <Col className="--text" flex="1 1">
          {languagesList[config?.language].text}
        </Col>
    
        <Col className="--arrowIcon" flex="13px">
          <DownOutlined rotate={ dropDownIsActive ? 180 : 0} />
        </Col>
      </Row>
    </Dropdown>
  );
};

export default LanguageDropDown;
