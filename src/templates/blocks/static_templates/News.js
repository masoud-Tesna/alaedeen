// import Style File:
import './styles/News.less';

import Moment from "react-moment";
import moment from "moment-jalaali";

// import ANT Design Components Used:
import { Col, Divider, Row, Skeleton } from "antd";

// import helper functions:
import { __, fn_stripHtml } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import { useGetApiOld } from "../../../functions";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

import fa from "moment/locale/fa";
import TextTruncate from "react-text-truncate";
import { Link } from "react-router-dom";

const News = () => {

  // get initial config:
  const { config } = useGetConfig();

  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }

  const { t } = useTranslation();

  // get news one blog:
  const { isLoading, data } = useGetApiOld("blogs-api", "category_path=news-and-events&items_per_page=1", `newsBlog`);
  const {sub_pages: page} = data || [];

  return (
    <div className="news--container">
      <Row>
        <Col className="d-none d-lg-block news--caption" span={24}>
          <Divider orientation={config.language === 'en' ? 'left' : 'right'} className="dividerText">
            { t(__('news and events')) }
          </Divider>
        </Col>

        <Col className="d-lg-none news--caption" span={24}>
          { t(__('news and events')) }
        </Col>

        <Col span={24}>
          <Row className="bg-white news--item" gutter={[0, {xs: 8, lg: 0}]}>
            <Col xs={24} lg={7} className="news--image">
              {isLoading
                ? <ShowResponsiveImage
                  skeletonWidth="100%"
                  skeletonHeight="370px"
                />
                : <ShowResponsiveImage
                  imagePath={ page?.main_pair?.icon?.image_path }
                  imageFolder='blog'
                  skeletonWidth="100%"
                  skeletonHeight="370px"
                  imageAlt={ page?.page }
                  object_id={ page?.page_id }
                  object_type={`prd`}
                />
              }
            </Col>
            <Col xs={24} lg={17}>
              {isLoading
                ? <Skeleton active paragraph={{ rows: 6 }} />
                :
                  <Row className="news--content" gutter={[0, { xs: 10, lg: 15 }]}>
                    <Col span={24}>
                      <Row justify="space-between">
                        <Col span={17} className="text-33 news--title">
                          {page.page}
                        </Col>
                        <Col span={7} className="text-8b news-date">
                          <i className="fal fa-clock align-middle" />
                          {config.language === 'fa'
                            ? moment.unix(page?.timestamp).format('jDD jMMMM jYYYY')
                            : <Moment format="DD MMM, YYYY" unix locale="en">{page?.timestamp}</Moment>
                          }
                        </Col>
                      </Row>
                    </Col>

                    <Col span={24} className="news--description">
                      <TextTruncate
                        className="text-33"
                        line={4}
                        element="div"
                        truncateText=" …"
                        text={fn_stripHtml(page?.description)}
                        textTruncateChild={<Link className="readMore--link" to={`/blog/${page?.seo_name}`}>{t('blog.read_more')}</Link>}
                      />
                    </Col>
                  </Row>
              }
            </Col>
            {!isLoading &&
              <Link className="news--link" to={`/blog/${page?.seo_name}`} />
            }
          </Row>
        </Col>
      </Row>
    </div>
  );

};

export default News;

