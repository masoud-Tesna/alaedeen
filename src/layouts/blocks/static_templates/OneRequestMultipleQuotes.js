import { useState } from "react";

// import style file:
import './styles/OneRequestMultipleQuotes.less';

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

import { useGetApi } from '../../../functions';

// import ant design:
import { Col, Row, Form, Input, Button, Select, InputNumber} from "antd";

import OneRequestMultipleQuotesModal from "./OneRequestMultipleQuotesModal";

const { Option } = Select;

const OneRequestMultipleQuotes = () => {

  const { t } = useTranslation();

  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);

  const [productNameBefore, setProductNameBefore] = useState('');
  const [quantityBefore, setQuantityBefore] = useState('');
  const [pieceBefore, setPieceBefore] = useState('');

  const showRequestModal = () => {
    setIsRequestModalVisible(true);
  };


  const { items } = useGetApi('request-content-api', 'variant=quantity_units', 'request_contents', false);

  return (
    <div className="px-4 border border-secondary-2 border-w-5 rounded-lg h-100 oneRequest--container">

      <div className="h-100 oneRequest--formContent">
        <Row className="h-100" align="middle">
          <Col span={24}>
            <div className="font-weight-bold vv-font-size-2-2 text-black oneRequest--formContent__caption">{ t(__('One Request Multiple Quotes')) }</div>
          </Col>

          <Col className="mt-2" span={24}>
            <Form.Item
              className="oneRequest--formContent__searchInput"
              name="product_name_before">
              <Input
                placeholder={ t(__('What are you looking for...')) }
                onChange={e => setProductNameBefore(e.target.value)} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  className="oneRequest--formContent__quantity"
                  name="quantity_before">
                  <InputNumber
                    placeholder={ t(__('Quantity')) }
                    min={1}
                    onChange={e => setQuantityBefore(e)}/>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  className="oneRequest--formContent__piece"
                  name="piece_before">
                  <Select
                    placeholder={ t(__('Piece/Pieces')) }
                    onChange={e => setPieceBefore(e)}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <>
                      {items.map((item, index) => {
                        return (
                          <Option key={(index + 2) * 4} value={item.key} >{ item.value }</Option>
                        );
                      })}
                    </>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col className="text-center mt-2" span={24}>
            <Form.Item className="oneRequest--formContent__btn">
              <Button className="border border-secondary-2 rounded-3 bg-secondary-2 text-white vv-font-size-1 font-weight-500 p-0" size="large" onClick={showRequestModal}>
                { t(__('Request a Quote')) }
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>

      <OneRequestMultipleQuotesModal
        isRequestModalVisible = {isRequestModalVisible}
        setIsRequestModalVisible = {setIsRequestModalVisible}
        productNameBefore = {productNameBefore}
        quantityBefore = {quantityBefore}
        pieceBefore = {pieceBefore}
      />
    </div>
  );
};

export { OneRequestMultipleQuotes };