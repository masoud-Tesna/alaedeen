import { useParams } from "react-router-dom";

// import style file:
import './styles/Page.less';

// import ant design:
import { Col, Row, Skeleton } from "antd";
import { useGetApiOld } from "../../functions";
import { SeoGenerator } from "../../functions/Helper";
import moment from "moment-jalaali";
import Moment from "react-moment";
import React from "react";
import { useGetConfig } from "../../contexts/config/ConfigContext";

import fa from "moment/locale/fa";


const Page = () => {

  // get initial config:
  const { config } = useGetConfig();

  moment.updateLocale("fa", fa);
  moment.loadPersian({usePersianDigits: true});

  // get page seo name in url:
  const { page: pageSeoName } = useParams();

  // get blog seo name in url:
  const { blog: blogSeoName } = useParams();

  let mode,
      params,
      key;

  if (pageSeoName) {
    mode = "page-api";
    params = `page_seo=${pageSeoName}`;
    key = `page_${pageSeoName}`;
  } else if (blogSeoName) {
    mode = "blogs-api";
    params = `blog_path=${blogSeoName}`;
    key = `page_${blogSeoName}`;
  }

  const { isLoading, data } = useGetApiOld(mode, params, key, { refetchOnWindowFocus: false });
  const page = data || [];

  return (
    <Row className={`page--container`}>
      <SeoGenerator
        title={  page?.page_title || page?.page }
        description={ page?.meta_description }
        keywords={ page?.meta_keywords }
        canonical={ `https://alaedeen.com/page/${page?.seo_name}` }
      />

      <Col span={24} className="bg-white">
        {isLoading &&
          <Skeleton  paragraph={{ rows: 25 }}  active />
        }
        {page?.page &&
          <Row gutter={[0, 35]}>
            {pageSeoName
              ? <Col span={24} className={`page--name`}>
                {page.page}
              </Col>
              : <Col span={24}>
                <Row justify="space-between">
                  <Col span={17} className="text-33 blog--name">
                    {page.page}
                  </Col>
                  <Col className="text-8b blog-date">
                    <i className="fal fa-clock align-middle" />
                    {config.language === 'fa'
                      ? moment.unix(page?.timestamp).format('jDD jMMMM jYYYY')
                      : <Moment format="DD MMM, YYYY" unix locale="en">{page?.timestamp}</Moment>
                    }
                  </Col>
                </Row>
              </Col>
            }


            <Col className="page--content" dangerouslySetInnerHTML={ {__html: page.description} } />
          </Row>
        }

      </Col>
    </Row>
  );
};

export default Page;
