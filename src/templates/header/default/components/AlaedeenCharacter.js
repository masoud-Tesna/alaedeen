import "../styles/AlaedeenCharacter.less";
// import alaedeen character:
import alaedeenChar from '../../../assets/images/alaedeen-char.png';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const AlaedeenCharacter = () => {
  
  const { t } = useTranslation();
  
  return (
    <div className="alaedeenCharacter--container">
      <div className="--character">
        <img src={alaedeenChar} alt="Alaedeen.com"/>
      </div>
      
      <div className="--extra pl-2">
        <div className="__address">
          <i className="logo-icon-alaedeen-com" />
        </div>
        <div className="__slug">
          { t('alaedeen_slug_section') }
        </div>
      </div>
      
      <Link to={"/"} className="--link" />
    </div>
  );
};

export default AlaedeenCharacter;
