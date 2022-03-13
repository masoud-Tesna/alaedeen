// import style file:
import './styles/LoadSpinner.less';
import { Spin } from "antd";

const LoadSpinner = ({ tip }) => {

  return (
    <div className = "overlay">
      <Spin tip={ tip } size="large" />
    </div>
  );
};

export default LoadSpinner;