import { Fragment } from 'react';

// import style file:
import './styles/FeaturesGrid.less';
import {Col, Row} from "antd";

const FeaturesGrid = (props) => {

    const { features } = props;

    return (
        <Row className="row-cols-2" gutter={[16, 30]}>
            {(features && features?.length !== 0) && Object.entries(features).slice(0, 6).map(([key, feature]) => {
                return (
                    <Fragment key={`features_${key}`}>
                        <Col className="features--variant">
                            { feature?.description } { feature?.suffix && `(${feature?.suffix})` }
                        </Col>

                        <Col className="features--value">
                            { feature?.value && feature?.value }
                        </Col>
                    </Fragment>
                );
            })}
        </Row>
    );
};

export default FeaturesGrid;