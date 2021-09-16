import { Fragment } from 'react';

// import style file:
import './styles/FeaturesGrid.less';
import {Col, Row} from "antd";
import {useTranslation} from "react-i18next";
import {__} from "../../../../functions/Helper";

const FeaturesGrid = (props) => {

    const { t } = useTranslation();

    const { features } = props;

    return (
        <Row className="row-cols-4" gutter={[7, 15]}>
            {(features && features?.length !== 0) && Object.entries(features).slice(0, 6).map(([key, feature]) => {
                return (
                    <Fragment key={`features_${key}`}>
                        <Col className="features--variant">
                            { t(__(feature?.description)) } { feature?.suffix && `(${feature?.suffix})` }
                        </Col>

                        <Col className="features--value">
                            { feature?.value && t(__(feature?.value)) }

                            { feature?.value_int && parseFloat(feature?.value_int).toFixed(0) }

                            { (feature?.variants && feature?.variants?.length !== 0) &&
                                Object.entries(feature?.variants).map(([key, variant]) => {
                                    return (
                                        <span key={`features_variants_${key}`}>
                                            { t(__(variant?.variant)) }
                                        </span>
                                    );
                                })
                            }
                        </Col>
                    </Fragment>
                );
            })}
        </Row>
    );
};

export default FeaturesGrid;