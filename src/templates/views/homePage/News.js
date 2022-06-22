// import Link from react router:
import {Link} from "react-router-dom";

// import style:
import "./styles/News.less";

// import antd components:
import {Col, Row, Skeleton} from "antd";

// import styled components:
import styled from "styled-components";
import rtl from "styled-components-rtl";

// import user context:
import {useGetConfig} from "../../../contexts/config/ConfigContext";

// import moment:
import Moment from "react-moment";
import moment from "moment-jalaali";
import fa from "moment/locale/fa";

// import text truncate:
import TextTruncate from "react-text-truncate";

// import translation hook:
import {useTranslation} from "react-i18next";

// import utilities function:
import {useGetApiOld} from "../../../utilities/functions";
import {fn_stripHtml} from "../../../utilities/functions/Helper";

// import show responsive image:
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

const DateIcon = styled.i`
  ${rtl`
    padding-right: 6px;
  `};
`;

const NewsImage = ({ isLoading = false, image, imageAlt, imageId }) => {
  if (isLoading) {
    return (
      <ShowResponsiveImage
        skeletonWidth="100%"
        skeletonHeight="370px"
      />
    );
  }
  
  return (
    <ShowResponsiveImage
      imagePath={ image }
      imageFolder='blog'
      skeletonWidth="100%"
      skeletonHeight="370px"
      imageAlt={ imageAlt }
      object_id={ imageId }
      object_type={`prd`}
    />
  );
}

const NewsDescription = ({description, link}) => {
  
  const { t } = useTranslation();
  
  return (
    <Col span={24} className="__description">
      <TextTruncate
        line={4}
        element="div"
        truncateText=" …"
        text={fn_stripHtml(description)}
        textTruncateChild={
          <Link className="__readMoreLink" to={`/blog/${link}`}>{t('blog.read_more')}</Link>
        }
      />
    </Col>
  );
}

const NewsDate = ({timestamp}) => {
  // get initial config:
  const { config } = useGetConfig();
  
  if (config.language !== 'en') {
    moment.updateLocale("fa", fa);
    moment.loadPersian({usePersianDigits: true});
  }
  
  return (
    <Col span={7} className="__date">
      <DateIcon className="fal fa-clock align-middle" />
      {config.language === 'fa'
        ? moment.unix(timestamp).format('jDD jMMMM jYYYY')
        : <Moment format="DD MMM, YYYY" unix locale="en">{timestamp}</Moment>
      }
    </Col>
  );
}

const NewsContent = ({ isLoading = false, title, timestamp, description, link }) => {
  if (isLoading) return <Skeleton active paragraph={{ rows: 7 }} />
  
  return (
    <Row className="__content" gutter={[0, { xs: 10, lg: 15 }]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col span={17} className="__title">
            {title}
          </Col>
  
          <NewsDate
            timestamp={timestamp}
          />
        </Row>
      </Col>
      
      <NewsDescription
        description={description}
        link={link}
      />
    </Row>
  );
}

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
            <NewsImage
              isLoading={isLoading}
              image={page?.main_pair?.icon?.image_path}
              imageAlt={page?.page}
              imageId={page?.page_id}
            />
          </Col>
          
          <Col xs={24} lg={17}>
            <NewsContent
              isLoading={isLoading}
              title={page?.page}
              timestamp={page?.timestamp}
              description={page?.description}
              link={page?.seo_name}
            />
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
