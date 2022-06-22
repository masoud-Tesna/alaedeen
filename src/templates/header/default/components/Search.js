// react hooks:
import {memo, useCallback, useRef, useState} from "react";

// extra hooks:
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {__} from "../../../../utilities/functions/Helper";
import {useGetApi} from "../../../../utilities/functions";
import styled from "styled-components";
import rtl from "styled-components-rtl";

// antd components:
import {AutoComplete, Col, Input, Row, Select, Skeleton} from "antd";

// SvgIcon:
import SvgIcon from "../../../common/SvgIcon";

// style:
import "../styles/Search.less";

// create styled component (SearchInput):
const SearchInput = styled(AutoComplete)`
    ${rtl`
      border-left: 1px solid #CED4DA;
    `};
  `;

const Search = () => {
  
  const { Option } = Select;
  
  const { t } = useTranslation();
  
  const [searchInput, setSearchInput] = useState("");
  
  const [searchType, setSearchType] = useState("P");
  
  const searchContainerRef = useRef(null);
  
  const {
    data,
    isLoading
  } = useGetApi(
    "Search",
    {
      "search_type": searchType,
      "q": searchInput,
    },
    `search_${searchType}_${searchInput}`,
    {
      enabled: !!(searchInput.length > 3),
      refetchOnWindowFocus: false
    }
  );
  
  const results = data || [];
  
  const searchResult = results?.map(result => ({
    value: searchType === "P" ? result?.product_id : result?.company_id,
    label: (
      <div
        key={searchType === "P" ? result?.product_id : result?.company_id}
        className="text-truncate search--result__item"
      >
        {searchType === "P" ?
          <Link to={`/product/${result?.seo_name}`}>{result?.product}</Link> :
          (
            result?.store_type === "A" ?
              <a href={`https://store.alaedeen.com/?store_id=${result?.company_id}`}>{result?.company} ({result?.brand})</a> :
              <Link to={`/store/${result?.link}`}>{result?.company} ({result?.brand})</Link>
          )
        }
      </div>
    ),
  }));
  
  const notFoundContent = () => {
    
    if (searchInput?.length <= 3 && !isLoading) {
      return (
        <div className="search--status">{t(__("Please enter more than 3 words!"))}</div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="search--status" style={{ width: "80%" }}>
          <Skeleton active paragraph={{ rows: 6, width: "50%" }} />
        </div>
      )
    }
    
    return (
      <div className="search--status">{t(__("Not Found!"))}</div>
    )
  }
  
  const SearchTypeSelect = () => {
    return <Select
      defaultValue={searchType}
      className="--searchType"
      dropdownClassName="--searchType__dropDown"
      bordered={false}
      onChange={(e) => {
        setSearchType(e);
        setSearchInput("");
      }}
      getPopupContainer={trigger => trigger.parentNode}
    >
      <Option value="P">{t("products")}</Option>
      <Option value="C">{t("suppliers")}</Option>
    </Select>
  };
  
  const changeSearchContainerStyle = useCallback(type => {
    const searchContainer = searchContainerRef?.current;
    
    switch (type) {
      case true :
        searchContainer.children[0].style.borderColor = "#2D8327";
        break;
      case false :
        searchContainer.children[0].style.borderColor = "#CED4DA";
        break;
    }
  }, []);
  
  return (
    <Row className="search--container" justify="center" ref={searchContainerRef}>
      <Col>
        <Row>
          <Col>
            <SearchTypeSelect />
          </Col>
  
          <Col flex="1 1" style={{ margin: "auto 0", lineHeight: "25px" }}>
            <SearchInput
              style={{
                width: "100%",
              }}
              options={searchResult}
              notFoundContent={notFoundContent()}
              dropdownClassName="search--result"
              className="--searchInput"
              value={searchInput}
              onClick={() => changeSearchContainerStyle(true)}
              onBlur={() => changeSearchContainerStyle(false)}
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Input
                placeholder={ t(__('What are you looking for...')) }
                suffix={<SvgIcon icon="search" color="#2D8327" width={20} height={20} /> }
                onChange = {e => setSearchInput(e.target.value)}
                onPressEnter={e => setSearchInput(e.target.value)}
                bordered={false}
              />
            </SearchInput>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Search);
