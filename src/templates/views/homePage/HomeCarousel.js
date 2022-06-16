import "./styles/HomeCarousel.less";
import {Carousel, Col, Row} from "antd";
import {useTheme} from "styled-components";
import SvgIcon from "../../common/SvgIcon";

const HomeCarousel = () => {
  
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
      <span
        className={className}
        onClick={onClick}
      >
        {direction === "ltr" ? <SvgIcon icon="angle-right"/> : <SvgIcon icon="angle-left"/>}
      </span>
    )
  }
  
  const PrevArrow = props => {
    const { className, onClick } = props
    return (
      <span
        className={className}
        onClick={onClick}
      >
        {direction === "ltr" ? <SvgIcon icon="angle-left" /> : <SvgIcon icon="angle-right" />}
      </span>
    )
  }
  
  const {dir: direction} = useTheme();
  
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
