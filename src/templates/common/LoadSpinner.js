// import style file:
import './styles/LoadSpinner.less';
import { Spin } from "antd";

const LoadSpinner = () => {

  return (
    <div className = "overlay">
      <Spin size="large" />
    </div>
  );
};

export default LoadSpinner;