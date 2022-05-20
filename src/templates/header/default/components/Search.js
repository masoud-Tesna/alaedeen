import {useCallback, useState} from "react";
import "../styles/Search.less";
import {Col, Row, Select} from "antd";
import {useTranslation} from "react-i18next";

const Search = () => {
  
  const { Option } = Select;
  
  const { t } = useTranslation();
  
  const [searchInput, setSearchInput] = useState("");
  
  const [searchType, setSearchType] = useState("P");
  
  const SearchTypeSelect = () => {
    
    const handleSearchTypeSelect = useCallback(
      type => {
        setSearchType(type)
      },
      [],
    );
    
    return <Select
      defaultValue={searchType}
      className="--searchType"
      dropdownClassName="--searchType__dropDown"
      bordered={false}
      onChange={handleSearchTypeSelect}
      size="large"
    >
      <Option value="P">{t("products")}</Option>
      <Option value="C">{t("suppliers")}</Option>
    </Select>
  };
  
  return (
    <Row className="search--container" justify="center">
      <Col>
        <SearchTypeSelect />
      </Col>
    </Row>
  );
};

export default Search;
