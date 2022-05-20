import {useCallback, useMemo, useRef, useState} from "react";
import "../styles/Search.less";
import {AutoComplete, Col, Divider, Form, Input, Row, Select, Skeleton} from "antd";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {__} from "../../../../functions/Helper";
import {useGetApi} from "../../../../functions";

const Search = (callback, deps) => {
  
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
            <AutoComplete
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
            >
              <Input
                placeholder={ t(__('What are you looking for...')) }
                suffix={<i className="far fa-search vv-font-size-2" />}
                onChange = {e => setSearchInput(e.target.value)}
                onPressEnter={e => setSearchInput(e.target.value)}
                bordered={false}
              />
            </AutoComplete>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Search;
