import "../styles/Lists.less";
import {Col, Row, Skeleton, Space} from "antd";
import {useGetApiOld} from "../../../../functions";
import {__} from "../../../../functions/Helper";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {useGetConfig} from "../../../../contexts/config/ConfigContext";

const Lists = () => {
  
  const { t } = useTranslation();
  
  const { config } = useGetConfig();
  
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
  
  const ListContent = (
    {
      caption = "",
      isLoading = true,
      type= "P",
      links = []
    }
  ) => {
    
    let instagramLink = "https://instagram.com/hornb2b";
    
    switch (config.language) {
      case "fa" :
        instagramLink = "https://instagram.com/hornb2b.ir";
        break;
      case "ar" :
        instagramLink = "https://instagram.com/horn.ar";
        break;
    }
    
    return (
      <Row gutter={[0, 8]}>
        <Col className="__caption" span={24}>
          { t(__(caption)) }
        </Col>
    
        {isLoading &&
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
        }
    
        {type === "P" ?
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
            links?.slice(0, 6)?.map(link => {
              return (
                <Col key={`footerCategories_${link?.category_id}`} className="__linkItem" span={24}>
                  {/*link: /categories/${category?.seo_name}*/}
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
        }
      </Row>
    )
  }
  
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
          
          <Col span={8} className="--items">
            <ListContent
              caption="Social"
              isLoading={false}
              type="S"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Lists;
