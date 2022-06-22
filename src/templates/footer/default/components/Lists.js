// Link from react router
import {Link} from "react-router-dom";

// style:
import "../styles/Lists.less";

// antd components:
import {Col, Row, Skeleton, Space} from "antd";

// utilities functions:
import {useGetApiOld} from "../../../../utilities/functions";
import {__, Else, If, Then} from "../../../../utilities/functions/Helper";

// translation hook:
import {useTranslation} from "react-i18next";

// config context:
import {useGetConfig} from "../../../../contexts/config/ConfigContext";

const SocialList = () => {
  const { config } = useGetConfig();
  
  let instagramLink = "https://instagram.com/hornb2b";
  
  if (config.language === "fa") instagramLink = "https://instagram.com/hornb2b.ir";
  else if (config.language === "ar") instagramLink = "https://instagram.com/horn.ar";
  
  return (
    <Col span={24} className="__linkItem --social">
      <Space size={32}>
        <div className="footer--bottomSection-socialLink facebook">
          <a href="#">
            <i className="fab fa-facebook-f" />
          </a>
        </div>
      
        <div className="footer--bottomSection-socialLink instagram">
          <a href={instagramLink} target="_blank" rel="noreferrer">
            <i className="fab fa-instagram" />
          </a>
        </div>
      
        <div className="footer--bottomSection-socialLink twitter">
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
        </div>
      
        <div className="footer--bottomSection-socialLink youtube">
          <a href="#">
            <i className="fab fa-youtube" />
          </a>
        </div>
      </Space>
    </Col>
  );
}

const ListContent = (
  {
    caption = "",
    isLoading = true,
    type= "P",
    links = []
  }
) => {
  const { t } = useTranslation();
  
  return (
    <Row gutter={[0, 8]}>
      <Col className="__caption" span={24}>
        { t(__(caption)) }
      </Col>
      
      <If condition={isLoading}>
        <Then>
          <Col span={24} className="text-47">
            <Skeleton.Input style={{ width: "calc(.5 * 31vw + 50%)", height: "3vh" }} active size={"small"} />
          </Col>
          <Col span={24} className="text-47">
            <Skeleton.Input style={{ width: "calc(.5 * 37vw + 50%)", height: "3vh" }} active size={"small"} />
          </Col>
          <Col span={24} className="text-47">
            <Skeleton.Input style={{ width: "calc(.5 * 20vw + 50%)", height: "3vh" }} active size={"small"} />
          </Col>
          <Col span={24} className="text-47">
            <Skeleton.Input style={{ width: "calc(.5 * 35vw + 50%)", height: "3vh" }} active size={"small"} />
          </Col>
        </Then>
      </If>
      
      {/*{isLoading &&
        <>
          <Col span={24} className="text-47">
            <Skeleton.Input style={{ width: "calc(.5 * 31vw + 50%)", height: "3vh" }} active size={"small"} />
          </Col>
          <Col span={24} className="text-47">
            <Skeleton.Input style={{ width: "calc(.5 * 37vw + 50%)", height: "3vh" }} active size={"small"} />
          </Col>
          <Col span={24} className="text-47">
            <Skeleton.Input style={{ width: "calc(.5 * 20vw + 50%)", height: "3vh" }} active size={"small"} />
          </Col>
          <Col span={24} className="text-47">
            <Skeleton.Input style={{ width: "calc(.5 * 35vw + 50%)", height: "3vh" }} active size={"small"} />
          </Col>
        </>
      }*/}
      
      <If condition={type === "P"}>
        <Then>
          {
            links?.map(link => {
              return(
                <Col key={`footerPage_${link.page_id}`} className="__linkItem" span={24}>
                  <Link to= {`/page/${link.seo_name}`} className={(!link?.description && link?.page_id !== "30") ? 'link--disable': ''}>
                    { link.page}
                  </Link>
                </Col>
              );
            })
          }
        </Then>
      </If>
      
      <If condition={type === "C"}>
        <Then>
          {
            links?.slice(0, 4)?.map(link => {
              return (
                <Col key={`footerCategories_${link?.category_id}`} className="__linkItem" span={24}>
                  {/*link: /categories/${category?.seo_name}*/}
                  <Link to={ `/categories/${link?.seo_name}` } className={link?.p_count === 0 ? 'link--disable': ''}>
                    { link.category }
                  </Link>
                </Col>
              );
            })
          }
        </Then>
      </If>
      
      <If condition={type === "S"}>
        <Then>
          <SocialList />
        </Then>
      </If>
      
      {/*{type === "P" ?
        links?.map(link => {
          return(
            <Col key={`footerPage_${link.page_id}`} className="__linkItem" span={24}>
              <Link to= {`/page/${link.seo_name}`} className={(!link?.description && link?.page_id !== "30") ? 'link--disable': ''}>
                { link.page}
              </Link>
            </Col>
          );
        }) :
        type === "C" ?
          links?.slice(0, 4)?.map(link => {
            return (
              <Col key={`footerCategories_${link?.category_id}`} className="__linkItem" span={24}>
                link: /categories/${category?.seo_name}
                <Link to={ `/categories/${link?.seo_name}` } className={link?.p_count === 0 ? 'link--disable': ''}>
                  { link.category }
                </Link>
              </Col>
            );
          }) :
          <Col span={24} className="__linkItem --social">
            <Space size={32}>
              <div className="footer--bottomSection-socialLink facebook">
                <a href="#" className="">
                  <i className="fab fa-facebook-f" />
                </a>
              </div>
              
              <div className="footer--bottomSection-socialLink instagram">
                <a className="" href={instagramLink} target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram" />
                </a>
              </div>
              
              <div className="footer--bottomSection-socialLink twitter">
                <a href="#" className="">
                  <i className="fab fa-twitter" />
                </a>
              </div>
              
              <div className="footer--bottomSection-socialLink youtube">
                <a href="#" className="">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </Space>
          </Col>
      }*/}
    </Row>
  )
}

const Lists = () => {
  
  // get categories from API:
  const { isLoading: categoriesIsLoading, data: categories_data } = useGetApiOld(
    `home-categories-api`,
    '',
    `allCategories`,
    {
      refetchOnWindowFocus: false
    }
  );
  const { categories } = categories_data || [];
  
  // get footer pages:
  const { isLoading: pagesIsLoading, data: pages_data } = useGetApiOld(
    `footer-pages-api`,
    "store_id=440",
    `footerPage`,
    {
      refetchOnWindowFocus: false
    }
  );
  
  const pages = pages_data || [];
  
  return (
    <Row className="lists--container" >
      <Col span={24}>
        <Row gutter={56}>
          <Col span={8} className="--items">
            <ListContent
              caption="Tips and Help"
              isLoading={pagesIsLoading}
              links={pages}
            />
          </Col>
  
          <Col span={8} className="--items">
            <ListContent
              caption="Explore"
              isLoading={categoriesIsLoading}
              links={categories}
              type="C"
            />
          </Col>
          
          {/*<Col span={8} className="--items">
            <ListContent
              caption="Social"
              isLoading={false}
              type="S"
            />
          </Col>*/}
        </Row>
      </Col>
    </Row>
  );
};

export default Lists;
