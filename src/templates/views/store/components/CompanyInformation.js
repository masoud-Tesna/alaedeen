import {Col, Row, Skeleton} from "antd";

const CompanyInformation = ({details, isLoading}) => {
  return (
    <Row>
      <Col span={24} className="companyInformation--container">
        {!isLoading ?
          <>
            <Skeleton active={true} paragraph={{ rows: 4 }} />
            <Skeleton active={true} paragraph={{ rows: 7 }} />
            <Skeleton active={true} paragraph={{ rows: 3 }} />
          </> :
          <Row>
            test
          </Row>
        }
      </Col>
    </Row>
  );
};

export default CompanyInformation;
