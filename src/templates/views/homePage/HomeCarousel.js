// import style:
import "./styles/HomeCarousel.less";

// import antd components
import {Carousel, Col, Row} from "antd";

// import styled components:
import {useTheme} from "styled-components";

// import svg icon component:
import SvgIcon from "../../common/SvgIcon";

const HomeCarousel = () => {
  
  const {dir: direction} = useTheme();
  
  const contentStyle = {
    display: "block",
    height: '451px',
    color: '#fff',
    lineHeight: '451px',
    textAlign: 'center',
    background: '#364d79',
  };
  
  const NextArrow = props => {
    const { className, onClick } = props
    return (
      <div
        className={className}
        onClick={onClick}
      >
        {
          direction === "ltr" ?
          <SvgIcon icon="angle-right" style={{marginRight: "-2px"}}/> :
          <SvgIcon icon="angle-left" style={{marginLeft: "-2px"}}/>
        }
      </div>
    )
  }
  
  const PrevArrow = props => {
    const { className, onClick } = props
    return (
      <div
        className={className}
        onClick={onClick}
      >
        {
          direction === "ltr" ?
            <SvgIcon icon="angle-left" style={{marginLeft: "-2px"}} /> :
            <SvgIcon icon="angle-right" style={{marginRight: "-2px"}} />
        }
      </div>
    )
  }
  
  return (
    <Row className="homeCarousel--container">
      <Col span={24}>
        <Carousel
          autoplay
          arrows
          draggable
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          <div>
            <span style={contentStyle}>1</span>
          </div>
          <div>
            <span style={contentStyle}>2</span>
          </div>
          <div>
            <span style={contentStyle}>3</span>
          </div>
          <div>
            <span style={contentStyle}>4</span>
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default HomeCarousel;
