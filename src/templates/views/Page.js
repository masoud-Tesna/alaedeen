import { useParams } from "react-router-dom";

// import style file:
import './styles/Page.less';

// import ant design:
import { Col, Row, Skeleton } from "antd";
import { useGetApi } from "../../functions";
import { SeoGenerator } from "../../functions/Helper";

const Page = () => {
  let { page: pageSeoName } = useParams();

  const { isLoading, data } = useGetApi(`page-api`, `page_seo=${pageSeoName}`, `storePage_${pageSeoName}`);
  const page = data || [];

  return (
    <Row className={`page--container`}>
      <SeoGenerator
        title={  page?.page_title || page?.page }
        description={ page?.meta_description }
        keywords={ page?.meta_keywords }
        canonical={ `https://alaedeen.com/page/${page?.seo_name}` }
      />

      <Col span={24}>
        {isLoading &&
          <Skeleton  paragraph={{ rows: 25 }}  active />
        }
        {page?.page &&
          <>
            <Row>
              <Col span={24} className={`page--name text-center`}>
                {page.page}
              </Col>
              <Col className="page--content" dangerouslySetInnerHTML={ {__html: page.description} } />
            </Row>
          </>
        }

      </Col>
    </Row>
  );
};

export default Page;
