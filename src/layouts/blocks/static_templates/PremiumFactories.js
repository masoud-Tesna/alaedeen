import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// import Style File:
import './styles/PremiumFactories.less';

// import ANT Design Components Used:
import { Col, Row} from "antd";

// import store icon:
import store_1 from '../../../assets/images/store-icon/1.png';
import store_2 from '../../../assets/images/store-icon/2.png';
import store_3 from '../../../assets/images/store-icon/3.png';

// import Factory Images:
import factoryImage_1 from '../../../assets/images/factoryImages/1.png';
import factoryImage_2 from '../../../assets/images/factoryImages/2.png';
import factoryImage_3 from '../../../assets/images/factoryImages/3.png';

// import Verified
import verifiedIcon from '../../../assets/images/verified.png';

// import another components used:
import TextTruncate from 'react-text-truncate';

// import get language context:
import { useGetLanguageState } from "../../../contexts/language/LanguageContext";


// import custom hook used:
import { useGetFactories, useWindowSize } from '../../../functions';

const FactoriesLogo = ({ logo, alt }) => {

  const { language } = useGetLanguageState();

  if (language === 'en' && logo.en) {
    return (
      <img src={ logo.en } alt={ alt }/>
    );
  }

  if (language === 'fa' && logo.fa) {
    return (
      <img src={ logo.fa } alt={ alt }/>
    );
  }

  return (
    <i className="fal fa-image text-bc display-2" />
  );

}

const FactoriesImages = ({ image_1, image_2, image_3, alt }) => {

  return(
    <div className="d-flex premiumFactories--item__detailImages">
      <div className="premiumFactories--factoryImages__item1">
        <img src={ image_1 && image_1.process_pictures[ 0 ] } alt="factoryImage_1"/>
      </div>
      <Row className="premiumFactories--factoryImages__item_2_3">
        <Col span={24} className="premiumFactories--factoryImages__item2 align-self-start">
          <img src={ image_2 && image_2.process_pictures[ 0 ] } alt="factoryImage_2"/>
        </Col>
        <Col span={24} className="premiumFactories--factoryImages__item3 align-self-end">
          <img src={ image_3 && image_3.process_pictures[ 0 ] } alt="factoryImage_3"/>
        </Col>
      </Row>
    </div>
  );
}

const PremiumFactories = () => {

  const { width } = useWindowSize();

  let factories = [];
  const factory_255 = useGetFactories('company_id=255');
  const factory_255_2 = useGetFactories('company_id=255');
  const factory_264 = useGetFactories('company_id=264');
  if (factory_255.factories[ 0 ] && factory_264.factories[ 0 ] && factory_255_2.factories[ 0 ]) {
    factories = [
      factory_255.factories[ 0 ],
      factory_264.factories[ 0 ],
      factory_255_2.factories[ 0 ]
    ];
  }

  return (
    <div className="premiumFactories--container">
      <Row>
        <Col className="premiumFactories--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 992 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
              Premium OEM Factories
            </Col>
            <Col className="my-auto">
              <Link to="/factories" className={ `${ width >= 992 ? 'vv-font-size-1-8' : 'vv-font-size-1-4' } text-33` } >
                View More <i className={ `far fa-chevron-right ${ width >= 992 ? 'vv-font-size-1-8' : 'vv-font-size-1-4' } ml-3` } />
              </Link>
            </Col>
          </Row>
        </Col>
        <Col className="premiumFactories--content" span={24}>
          <Row className="premiumFactories--items" justify="space-between" gutter={{ xs: 0, sm: 5, md: 5, lg: 8, xl: 10, xxl: 35 }}>
            {width >= 992 ?
              <>
                {factories.map((factory, index) => {

                  const image_1= factory.manufacturing_capability.parents.process.fields[1];
                  const image_2= factory.quality_control.parents.process.fields[1];
                  const image_3= factory.r_and_d_capability.parents.process.fields[1];

                  return (
                    <Col span={8} key={index}>
                      <Link className="d-block h-100" to={ `/factories?factory=${factory.company_id}` }>
                        <div className="premiumFactories--item rounded-10 shadow-y-2 bg-white h-100">
                          <div className="mb-4 d-flex align-items-center premiumFactories--item__detail" style={{ height: '60px' }}>
                            <div className="premiumFactories--item__image">
                              <FactoriesLogo logo={ factory.company_introduction.fields.company_logo } alt={ factory.general.company }/>
                            </div>
                            <div className="w-100 premiumFactories--item__caption">
                              <div className="vv-font-size-1-6 text-black premiumFactories--item__name">
                                <TextTruncate
                                  line={1}
                                  element="span"
                                  truncateText="…"
                                  text={ factory.general.company }
                                />
                              </div>
                              <div className="premiumFactories--item__verified">
                                <img src={ verifiedIcon } alt="Verified"/>
                              </div>
                            </div>
                          </div>

                          <FactoriesImages
                            image_1={image_1}
                            image_2={image_2}
                            image_3={image_3}
                          />

                        </div>
                      </Link>
                    </Col>
                  );
                })}
              </>:

              <>
                <Col span={8}>
                  <Link to="/factories?factory=124">
                    <div className="premiumFactories--item rounded-10 shadow-y-2 bg-white">
                      <div className="mb-4 d-flex align-items-center">
                        <div className="premiumFactories--item__image">
                          <img src={ store_2 } alt="store_2"/>
                        </div>
                        <div className="w-100 premiumFactories--item__caption">
                          <div className="vv-font-size-1-6 text-black premiumFactories--item__name">
                            <TextTruncate
                              line={1}
                              element="span"
                              truncateText="…"
                              text="Farahi carpet company"
                            />
                          </div>
                          <div className="premiumFactories--item__verified">
                            <img src={ verifiedIcon } alt="Verified"/>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="premiumFactories--factoryImages__item1">
                          <img src={ factoryImage_1 } alt="factoryImage_1"/>
                        </div>
                        <Row className="premiumFactories--factoryImages__item_2_3">
                          <Col span={24} className="premiumFactories--factoryImages__item2 align-self-start">
                            <img src={ factoryImage_2 } alt="factoryImage_2"/>
                          </Col>
                          <Col span={24} className="premiumFactories--factoryImages__item3 align-self-end">
                            <img src={ factoryImage_3 } alt="factoryImage_3"/>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Link>
                </Col>

                <Col>
                  <Link to="/factories?factory=124">
                    <div className="premiumFactories--itemXs">
                      <div className="premiumFactories--factoryImages__Xs">
                        <img src={ factoryImage_1 } alt="factoryImage_1"/>
                      </div>
                      <div>
                        <Row>
                          <Col className="text-truncate my-auto" span={18}>Farahi carpet company</Col>
                          <Col className="text-right premiumFactories--factoryIcon__Xs" span={6}>
                            <img src={ store_2 } alt="store_2"/>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Link>
                </Col>

                <Col>
                  <Link to="/factories?factory=127">
                    <div className="premiumFactories--itemXs">
                      <div className="premiumFactories--factoryImages__Xs">
                        <img src={ factoryImage_3 } alt="factoryImage_1"/>
                      </div>
                      <div>
                        <Row>
                          <Col className="text-truncate my-auto" span={18}>Savin carpet company</Col>
                          <Col className="text-right premiumFactories--factoryIcon__Xs" span={6}>
                            <img src={ store_3 } alt="store_3"/>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Link>
                </Col>

                <Col>
                  <Link to="/factories?factory=135">
                    <div className="premiumFactories--itemXs">
                      <div className="premiumFactories--factoryImages__Xs">
                        <img src={ factoryImage_2 } alt="factoryImage_1"/>
                      </div>
                      <div>
                        <Row>
                          <Col className="text-truncate my-auto" span={18}>Aghigh carpet company</Col>
                          <Col className="text-right premiumFactories--factoryIcon__Xs" span={6}>
                            <img src={ store_1 } alt="store_1"/>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Link>
                </Col>
              </>
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PremiumFactories;