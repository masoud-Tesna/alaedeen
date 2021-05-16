import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// import Styles For TopPanelWhitBackIcon:
import './styles.less';

// Ant Design Import:
import { Row, Col } from 'antd';


const TopPanelWhitBackIcon = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  const [scrolled, setScrolled] = useState(false);

  const [widthPage, setWidthPage] = useState();

  const handleScroll = () => {
    const offsetY = window.scrollY;

    if (widthPage <= 576) { // if WidthPage state value <= 576 change condition for scroll and set class name
      if(offsetY > 150 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }
    else if (widthPage >= 577) { // if WidthPage state value >= 577 change condition for scroll and set class name
      if(offsetY > 30 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }
    else if (widthPage >= 769) { // if WidthPage state value >= 769 change condition for scroll and set class name
      if(offsetY > 30 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); //if Scroll Page Run handleScroll function

    window.addEventListener('load', () => { setWidthPage(window.innerWidth);}); //if Load Page Update widthPage State Value
    window.addEventListener('resize', () => { setWidthPage(window.innerWidth);}); //if Resize Page Update widthPage State Value
  })

  let x=[''];
  if(scrolled){
    x.push('scrolled');
  }

  return (
    <Row className={ `bg-top-panel topPanel--container TopPanelWhitBackIcon ${x.join(" ")}` }>
      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={24}>
          <Col className="d-lg-none my-auto vv-cursor-pointer topPanel--col__logoXS" onClick={() => { goBack() }}>
            <i className="far fa-long-arrow-left text-white display-4" />
          </Col>
          <Col className="d-lg-none my-auto text-white vv-font-size-2 font-weight-bold font-italic topPanel--col__titleXS">
            Premium OEM Factories
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TopPanelWhitBackIcon;