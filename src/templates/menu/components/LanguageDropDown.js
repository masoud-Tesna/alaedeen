// import react hooks:
import {useState} from "react";

// import antd components:
import {Col, Dropdown, Menu, Row} from "antd";

// import antd icons:
import {DownOutlined} from "@ant-design/icons";

// import language context and loading context:
import {changeLanguageAction, useConfigDispatch, useGetConfig} from "../../../contexts/config/ConfigContext";
import {isLoadingAction, useSpinnerDispatch} from "../../../contexts/spiner/SpinnerContext";

// import styled components:
import styled from "styled-components";
import rtl from "styled-components-rtl";

// import styles:
import "../styles/LanguageDropDown.less";
import {changeLanguage} from "../../../utilities/functions";

const LanguageIcon = styled(Col)`
  i {
    ${rtl`
      margin-left: 8px;
  `};
  }
`;

const languagesList = {
  en : {
    text: "English",
    lang: "en",
    flag: "fi fi-gb fis"
  },
  ar : {
    text: "عربي",
    lang: "ar",
    flag: "fa-solid fa-circle"
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

const LanguagesContent = (onChangeLanguage) => {
  
  return(
    <Menu
      style={{ minWidth: 250 }}
      triggerSubMenuAction={"click"}
      className="dropDownLanguages--content"
    >
      {Object.values(languagesList)?.map((language) => {
        return(
          <Menu.Item key={ `languages_${language?.text}` } onClick={() => onChangeLanguage(language?.lang)}>
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

const LanguageDropDown = () => {
  
  // initial state for language:
  const { config } = useGetConfig();
  const { configDispatch } = useConfigDispatch();
  
  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();
  
  const [dropDownIsActive, setDropDownIsActive] = useState(false);
  
  // function for change language:
  const handleChangeLanguage = (lang) => {
    if (lang !== config.language) {
      // show spinner (spinner context):
      spinnerDispatch(isLoadingAction(true));
      
      // close dropdown:
      setDropDownIsActive(false);
  
      // call change language function:
      changeLanguage(lang)
        .then(() => {
          configDispatch(changeLanguageAction(lang));
        }) // call change language dispatch
        .then(() => {
          spinnerDispatch(isLoadingAction(false));
        }); // hide spinner (spinner context)
    }
  }
  
  return (
    <Dropdown
      className="languageDropDown--container"
      overlayClassName="languageDropDown__isOpen"
      overlay={LanguagesContent(handleChangeLanguage)}
      trigger={['click']}
      onVisibleChange={setDropDownIsActive}
    >
      <Row gutter={7} className="vv-cursor-pointer">
        <LanguageIcon className="--langIcon">
          <i className={ languagesList[config?.language].flag } />
        </LanguageIcon>
    
        <Col className="--text">
          {languagesList[config?.language].text}
        </Col>
    
        <Col className="--arrowIcon">
          <DownOutlined rotate={ dropDownIsActive ? 180 : 0} />
        </Col>
      </Row>
    </Dropdown>
  );
};

export default LanguageDropDown;
