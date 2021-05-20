// import style file:
import './styles/LoadSpinner.less';

const LoadSpinner = (props) => {

  const { spinner } = props;
  const { spinnerColor } = props;

  return (
    <div className = "overlay">
      {spinner === 'default' ?
        <div className = "spinner" style={{ border: `5px solid ${spinnerColor || '#F20604'}` }} /> :
        <>
          { spinner }
        </>
      }

    </div>
  );
};

export default LoadSpinner;