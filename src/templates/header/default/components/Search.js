import {useState} from "react";
import "../styles/Search.less";
import {Col, Row} from "antd";

const Search = () => {
  
  const [searchInput, setSearchInput] = useState("");
  
  const [searchType, setSearchType] = useState("P");
  
  return (
    <Row className="search--container" justify="center">
      <Col>
        Search
      </Col>
    </Row>
  );
};

export default Search;
