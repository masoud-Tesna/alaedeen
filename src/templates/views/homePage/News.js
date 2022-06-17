import "./styles/News.less";
import {Col, Row, Skeleton} from "antd";
import {useGetConfig} from "../../../contexts/config/ConfigContext";
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import {useTranslation} from "react-i18next";
import {useGetApiOld} from "../../../utilities/functions";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import TextTruncate from "react-text-truncate";
import {fn_stripHtml} from "../../../utilities/functions/Helper";
import {Link} from "react-router-dom";

const News = () => {
  
  // get initial config:
  const { config } = useGetConfig();
  
  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }
  
  const { t } = useTranslation();
  
  // get news one blog:
  const { isLoading, data } = useGetApiOld(
    "blogs-api",
    "category_path=news-and-events&items_per_page=1",
    `newsBlog`,
    {
      refetchOnWindowFocus: false
    }
  );
  const {sub_pages: page} = data || {};
  
  return (
    <Row className="news--container" gutter={[0, 24]}>
      <Col span={24} className="--caption">
        {t("news_and_events")}
      </Col>
      
      <Col span={24} className="--item">
        <Row gutter={[0, {xs: 8, lg: 0}]}>
          <Col xs={24} lg={7} className="__image">
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
              ? <Skeleton active paragraph={{ rows: 7 }} />
              :
              <Row className="__content" gutter={[0, { xs: 10, lg: 15 }]}>
                <Col span={24}>
                  <Row justify="space-between">
                    <Col span={17} className="__title">
                      {page.page}
                    </Col>
                    
                    <Col span={7} className="__date">
                      <i className="fal fa-clock align-middle" />
                      {config.language === 'fa'
                        ? moment.unix(page?.timestamp).format('jDD jMMMM jYYYY')
                        : <Moment format="DD MMM, YYYY" unix locale="en">{page?.timestamp}</Moment>
                      }
                    </Col>
                  </Row>
                </Col>
          
                <Col span={24} className="__description">
                  <TextTruncate
                    line={4}
                    element="div"
                    truncateText=" …"
                    text={fn_stripHtml(page?.description)}
                    textTruncateChild={
                      <Link className="__readMoreLink" to={`/blog/${page?.seo_name}`}>{t('blog.read_more')}</Link>
                    }
                  />
                </Col>
              </Row>
            }
          </Col>
          
          {!isLoading &&
            <Link className="__link" to={`/blog/${page?.seo_name}`} />
          }
        </Row>
      </Col>
    </Row>
  );
};

export default News;
