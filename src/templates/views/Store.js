import {Col, Row} from "antd";
import {SeoGenerator} from "../../functions/Helper";
import {useNavigate, useParams} from "react-router-dom";
import {useGetApi} from "../../functions";
import {useGetConfig} from "../../contexts/config/ConfigContext";
import StoreDetails from "./store/StoreDetails";
import {useEffect} from "react";

const Store = () => {
  
  // get product path from url:
  const { company: companySeoName } = useParams();
  
  // get initial config:
  const { config } = useGetConfig();
  
  // get invoices from API:
  const { isLoading, data } = useGetApi(
    `20/Stores`,
    {
      company_seo_name: companySeoName
    },
    `storeDetails_${companySeoName}`,
    {
      enabled: !!companySeoName,
      refetchOnWindowFocus: false
    }
  );
  
  const store = data || {};
  
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [companySeoName]);
  
  return (
    <Row>
      <SeoGenerator
        title={  companySeoName }
        description={ store?.company_Introduction?.detailed_company_introduction?.slice(0, 152)+'...' }
        canonical={ `https://alaedeen.com/store/${companySeoName}` }
        ogImage={store?.company_Introduction?.logo[config?.language] || ""}
      />
      
      <Col span={24} className="store--container">
        <StoreDetails store={store} isLoading={isLoading} />
      </Col>
    </Row>
  );
};

export default Store;
