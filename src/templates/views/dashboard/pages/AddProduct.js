import "./styles/AddProduct.less";
import { Button, Cascader, Col, Form, Input, Row, Tabs, Modal, Skeleton } from "antd";
import DashboardContentHeader from "../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../functions/Helper";
import { useGetApi } from "../../../../functions";
import React, { useLayoutEffect, useState } from "react";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { StickyContainer, Sticky } from 'react-sticky';

const AddProduct = () => {

  const { TabPane } = Tabs;

  const { t } = useTranslation();

  const [isCategoryPickerModalVisible, setIsCategoryPickerModalVisible] = useState(false);

  const [categoryId, setCategoryId] = useState(524);

  const [issetCategory, setIssetCategory] = useState({});

  const {isLoading: categoryPickerIsLoading, data} = useGetApi('picker-categories-api', `category_id=${categoryId}`, `categoriesPicker_${categoryId}`);

  const categories = data || [];

  const showCategoryPickerModal = () => {
    setIsCategoryPickerModalVisible(true);
  };

  const closeCategoryPickerModal = () => {
    setIsCategoryPickerModalVisible(false);

    setCategoryId(524);
  };

  const handleSelectCategory = (category, category_id) => {
    setIssetCategory({"category": category, "category_id": category_id});

    setIsCategoryPickerModalVisible(false);

    setCategoryId(524);
  }

  const [scrolled, setScrolled] = useState("");

  const handleScroll = () => {
    if (window.scrollY > 25) {
      setScrolled("scrolled");
    } else {
      setScrolled("");
    }
  };

  useLayoutEffect(() => {

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const renderTabBar = (props, DefaultTabBar) => (
    <div className={scrolled}>
      <DefaultTabBar {...props} className="tabBatForScrolled" />
    </div>
  );

  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"create new product"} />
      </Col>

      <Col span={24} className="addProduct--content">
        <Form
          className="h-100 addProduct--formContent"
          name="add-product-form"
          onFinish={value => console.log(value)}
          scrollToFirstError
        >
          <Tabs
            defaultActiveKey="general"
            cllassName="addProduct--tab"
            tabBarExtraContent={<Button className="bg-primary text-white border-0" htmlType="submit">{t(__('create'))}</Button>}
            renderTabBar={renderTabBar}
          >
            <TabPane tab={t('general')} key="general">
              <Row className="productForm--general" justify="center">
                <Col xs={24} lg={19}>
                  <Form.Item
                    name="product"
                    label={t('product_name')}
                    rules={[
                      {
                        required: true,
                        message: t(__('Please input product name')),
                      },
                    ]}
                  >
                    <Input style={{ width: "75%" }} allowClear/>
                  </Form.Item>

                  <Form.Item
                    name="category"
                    label={t('category')}
                    rules={[
                      {
                        required: true,
                        message: t(__('Please select category')),
                      },
                    ]}
                    initialValue={issetCategory?.category ? issetCategory?.category : null}
                  >
                    <Input hidden />

                    {issetCategory?.category ?
                      <span className="selectedCategory" onClick={showCategoryPickerModal}>
                          <span className="selectedCategory--title">{issetCategory?.category}</span>
                          <span className="selectedCategory--edit"><EditOutlined /></span>
                        </span> :
                      <span className="selectedCategory" onClick={showCategoryPickerModal}>
                          <span className="selectedCategory--title">{t('select_category')}</span>
                          <span className="selectedCategory--edit"><EditOutlined /></span>
                        </span>
                    }

                    <Modal
                      className="categoriesPicker--Modal"
                      title={t('select_category')}
                      style={{ top: 10 }}
                      visible={isCategoryPickerModalVisible}
                      onCancel={() => closeCategoryPickerModal()}
                      footer={false}
                    >
                      <Row>
                        {categoryPickerIsLoading ?
                          <Skeleton active={true} paragraph={{ rows: 7 }} /> :
                          <Col span={24}>
                            <Row>

                              {
                                categories?.parents &&
                                categories?.parents?.map(parent => {
                                  return (
                                    <Col
                                      span={24}
                                      key={`categoryPickerParent_${parent?.category_id}`}
                                      className="category--item__parent"
                                      onClick={() => setCategoryId(parent?.parent_id)}
                                    >
                                      <Row justify="space-between">
                                        <Col>
                                          {parent?.category}
                                        </Col>

                                        <Col>
                                          <CloseOutlined />
                                        </Col>
                                      </Row>
                                    </Col>
                                  )
                                })
                              }

                              {
                                categories?.sub_categories &&
                                <>
                                  <Col span={24} className="text-center category--item__caption">
                                    {t('select_category')}
                                  </Col>
                                  { categories?.sub_categories?.map(category => {

                                    if (category?.subcategories || category?.subcategories?.length) {
                                      return (
                                        <Col
                                          span={24}
                                          key={`categoryPickerModal_${category?.category_id}`}
                                          className="category--item"
                                          onClick={() => setCategoryId(category?.category_id)}
                                        >
                                          {category.category}
                                        </Col>
                                      )
                                    }

                                    return (
                                      <Col
                                        span={24}
                                        key={`categoryPickerModal_${category?.category_id}`}
                                        className="category--item"
                                        onClick={() => handleSelectCategory(category?.category, category?.category_id)}
                                      >
                                        {category.category}
                                      </Col>
                                    )
                                  })}
                                </>
                              }
                            </Row>
                          </Col>
                        }
                      </Row>
                    </Modal>
                  </Form.Item>
                </Col>
              </Row>

              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dignissimos, dolor id incidunt, laborum magnam natus non obcaecati odio quidem quisquam rem repellendus reprehenderit saepe totam! Adipisci, amet animi cumque dignissimos eos esse impedit, incidunt inventore iusto laborum libero nostrum nulla quia similique voluptates? Accusantium aliquid distinctio, earum ex exercitationem inventore iure, magni modi molestiae mollitia provident quas reiciendis sint temporibus velit! Ab beatae consequuntur, dolor doloremque error harum mollitia nemo, non numquam possimus quo rem repudiandae sequi vel velit. Eligendi est nesciunt nulla voluptates! Amet deserunt dolorum illum iusto quas. Corporis delectus eos fugiat harum laudantium maiores nam necessitatibus, odio, officia optio placeat porro quisquam quod sint, sit sunt suscipit tempora unde voluptate voluptatibus. Aliquam assumenda autem cumque delectus deleniti earum, eligendi eveniet fugit itaque iusto magni nam nihil, nisi quas ratione repudiandae soluta suscipit, tempora tempore unde ut vero voluptates voluptatum? Animi aperiam aspernatur assumenda consequuntur, cumque distinctio dolorem dolores error eum fugiat id incidunt ipsam minima nemo neque provident quaerat repudiandae saepe, sit unde velit voluptatibus, voluptatum? Adipisci aspernatur commodi cumque distinctio dolor dolores ducimus ea eaque eos error fugiat, id itaque iusto laudantium molestiae nam natus nesciunt nulla officia porro quas ratione sequi similique temporibus velit veritatis vitae. A alias beatae cum doloribus ea earum enim error, eveniet facere, in laborum nulla perferendis quaerat quam quas quos, rerum sapiente tempora temporibus ullam vero vitae voluptatibus. Accusantium adipisci alias dolorem ducimus eligendi error esse eveniet fugiat hic impedit inventore ipsa molestias praesentium quae quisquam quod tempore tenetur, vitae voluptas voluptates. Beatae, commodi, distinctio dolore dolores enim excepturi explicabo harum, laboriosam obcaecati quasi quisquam repellat ullam veritatis. Aliquam at consectetur explicabo maiores, nihil ullam. Consectetur facere incidunt, laborum officia quia quos sequi similique! Ab eveniet itaque nisi, quod sequi veritatis! A aspernatur consectetur expedita id maxime odit totam.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque dolore et illum ipsam possimus quaerat, voluptatum? Eaque earum, quo. Accusantium facere iste optio rem saepe! Aut, deserunt ea fuga iure maxime rem? Ad aliquid autem consectetur cumque debitis deleniti labore magnam, maiores maxime natus non perspiciatis placeat possimus quos reprehenderit sapiente similique velit. Est eum explicabo minus tempora? Aliquid, aspernatur at dignissimos dolorum eaque enim esse excepturi illum inventore, laudantium libero modi mollitia nemo nisi perferendis quia, quos repellendus sequi tempora temporibus vel vero voluptas? Aliquid dolorem, eaque fuga fugiat id impedit nihil perferendis possimus praesentium rem sed sequi vero? A amet aspernatur aut corporis culpa deleniti dolores, ducimus earum eligendi eum impedit ipsum iste, labore perferendis repudiandae similique tempore totam velit voluptatem voluptatibus. Aspernatur assumenda culpa ducimus impedit in incidunt inventore neque nostrum officia omnis perspiciatis, ullam? Inventore nisi nobis vero voluptatibus. Aliquid dolor explicabo natus placeat sequi tempore, voluptatum. Assumenda autem culpa delectus nam! Aliquam aperiam architecto asperiores beatae cum cumque debitis dolore earum eius esse excepturi facere fugiat fugit hic id, illum in ipsa libero magni maxime molestias obcaecati odio pariatur provident quasi, quibusdam reiciendis repellendus repudiandae sint, suscipit tempora tempore veniam voluptatem. Consectetur distinctio ex excepturi illum ipsum numquam, perferendis quos reiciendis totam voluptate? Deserunt eaque laudantium perferendis sequi vel, voluptates? Consequuntur dolores, eius, eligendi eos eum iusto magni nesciunt nihil nulla officia pariatur quam quisquam quo quod rem repellendus, reprehenderit suscipit tenetur velit vitae! Assumenda dolore eaque laudantium magni molestias nam quas qui voluptas voluptate voluptates. Amet animi, blanditiis impedit iure, magni minima natus officia quas ut, vel velit voluptates! Ad asperiores at cumque dolor doloribus, eaque excepturi ipsa, magnam modi non obcaecati possimus quod, repellendus temporibus tenetur. Aliquam aut cupiditate distinctio, dolores doloribus est hic illo ipsum laudantium nemo nihil nostrum quam similique!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto culpa debitis, dolor doloribus excepturi incidunt libero, maxime nam natus nobis odit pariatur repellendus, unde voluptatem! Dicta eum eveniet, expedita fugit laudantium libero minus nostrum optio quae quod quos rem sed sint. Ab accusamus accusantium adipisci aliquam blanditiis culpa delectus dolor dolores eligendi eos facere, harum id illum iste itaque libero magni maxime modi mollitia nam obcaecati officia omnis possimus quae quam quis sapiente velit, veniam voluptas voluptates. Adipisci aspernatur autem beatae consectetur deserunt dignissimos doloremque doloribus ducimus, eligendi esse ex natus neque odio omnis provident quas quibusdam quidem reiciendis rem sint temporibus unde vitae? Aliquam aliquid amet asperiores at debitis deleniti dignissimos doloremque esse eveniet fugit harum illum libero, maxime nemo nostrum obcaecati odio omnis perspiciatis possimus, quisquam quod ratione reprehenderit, totam veritatis vero voluptas voluptatibus voluptatum. Consequatur ducimus minima velit! A ab adipisci alias aliquid culpa delectus ducimus error, ex hic incidunt iusto laboriosam magnam maxime, nam nihil, nisi non nulla porro praesentium rem repellat repellendus reprehenderit repudiandae sint sunt tempore totam. Aliquid asperiores autem consequatur cumque delectus deleniti dolor eius eligendi esse facere incidunt labore magnam maxime nam nihil porro, quaerat quam quo reiciendis saepe sed similique vitae voluptatem! Expedita, iste, sequi. Accusantium consequuntur debitis distinctio esse molestias nam non officia, placeat praesentium quam recusandae repellendus rerum saepe sint tenetur! Accusantium ad aut, culpa enim est eum ex explicabo fuga in ipsam labore maiores neque officia sint, sit temporibus veritatis. A consectetur corporis, cum deserunt earum enim eos impedit, iusto necessitatibus nisi nobis nulla officiis perferendis provident quibusdam quis quo quod rerum sequi, vero. Accusamus aliquam cum ea earum, explicabo facere hic ipsum minima modi, nam natus necessitatibus officiis pariatur quidem ratione soluta vero. Ad aut ducimus facilis fugiat molestiae necessitatibus nostrum perferendis rerum, sunt vero. Amet, at, cupiditate dicta doloremque est excepturi expedita, harum nam nihil nisi nostrum quas saepe totam? Deleniti ea eveniet exercitationem laborum nisi? Explicabo fugiat laboriosam obcaecati quis voluptates. Commodi consectetur, deleniti dignissimos dolorum eaque eius eum expedita explicabo fugit libero, officiis pariatur perspiciatis quam quas recusandae sapiente sed similique voluptate! Ab accusamus adipisci animi aspernatur beatae consectetur delectus deleniti, deserunt dignissimos dolor dolore doloribus eius error ex facere incidunt labore molestiae mollitia nisi nulla odio perferendis perspiciatis quas quis, quisquam reiciendis sed temporibus veritatis voluptate voluptates. Adipisci aliquid aspernatur assumenda at autem, consequatur dignissimos dolores eius enim in iste iure minima omnis placeat porro possimus quae quis reiciendis sapiente sed similique ullam voluptate! Ab ad deleniti dolores, expedita ipsum officiis perferendis quod reiciendis saepe. Accusamus asperiores aspernatur consectetur dignissimos doloremque dolores eaque enim, et ex facere illum impedit, ipsam laborum laudantium magnam molestiae nemo nobis numquam perferendis quae quod ratione rem repudiandae similique sunt tenetur unde veritatis! Dignissimos eius est inventore itaque, maiores nobis perferendis quasi ratione repudiandae, sed, sit tempore voluptatem. Ab accusantium deserunt dolor, doloremque doloribus error exercitationem inventore ipsa itaque laboriosam magni nulla perferendis praesentium quae quas quasi qui quo recusandae temporibus ut. Alias distinctio dolorem, iure laboriosam nam officiis sed similique voluptatibus. Amet aperiam assumenda at atque autem beatae blanditiis consequatur cupiditate dicta distinctio est eum eveniet ex harum ipsa ipsam laboriosam laborum maiores modi molestiae molestias nobis odio officiis porro praesentium quae quasi, quibusdam reiciendis repellendus sapiente sequi totam vitae voluptates! Ad dolore dolorem ipsa labore laudantium minima molestiae natus non odit officiis quod rerum vero, voluptatum. Libero modi non possimus suscipit! Adipisci deleniti, ducimus est iusto laborum laudantium nihil odio officia perferendis praesentium reiciendis tempora unde? Aut culpa dicta doloremque eligendi exercitationem illo impedit iste itaque nisi odio, ratione, repellendus, totam. Commodi earum eius eveniet natus, nostrum quo unde! Adipisci doloremque, eum facere iure nemo provident tenetur ut vero voluptates? Facilis ipsa nisi officia quo! Exercitationem praesentium quam tenetur. Hic, laudantium libero. Illum iure nesciunt quidem sint totam vero, voluptates! Doloribus nisi quae quibusdam quis quod recusandae sequi. Atque iusto laudantium nisi, nulla officiis repellat vitae voluptas? Cupiditate fugiat incidunt ipsum magni molestias necessitatibus omnis? Aperiam asperiores commodi eum harum, laudantium modi mollitia non odit pariatur provident quia quis, quisquam veritatis? Atque delectus deserunt in incidunt, labore laborum natus quae reiciendis veritatis. Dolorem, esse ex hic labore minima molestiae quis quisquam reprehenderit. Beatae delectus deserunt ea ipsum laboriosam maiores omnis perferendis quis. Amet aperiam at commodi consequuntur cumque debitis deserunt dignissimos dolor ea, eveniet explicabo facilis fugit incidunt ipsum iste itaque iure magnam molestias nisi optio praesentium ratione rem. Ad distinctio doloribus excepturi exercitationem facilis labore magni maxime, molestiae pariatur quia ratione temporibus velit voluptatum? Accusamus adipisci autem, consequuntur corporis cum debitis dignissimos dolor dolore dolores ducimus eius eos exercitationem fuga fugit inventore ipsum iure laboriosam molestias natus odio pariatur porro quam reiciendis, reprehenderit rerum temporibus velit, voluptates! Ab laudantium molestiae, nesciunt nisi non sapiente suscipit tempora! Aperiam architecto blanditiis consequatur debitis deserunt doloremque eum laudantium maxime, nobis, nulla, numquam possimus reprehenderit soluta ullam voluptates? Accusamus, aliquam architecto cum ipsam nobis rerum. Consectetur ea eius eos eveniet facilis itaque iure minima mollitia, neque officiis optio perspiciatis possimus provident quae sit veniam voluptatem, voluptatibus. Cum eaque, est expedita, id iusto minus omnis qui quis sed temporibus velit voluptatum. Animi at odit vitae. A adipisci aliquam, aliquid architecto asperiores blanditiis consequuntur culpa cum dolore earum error esse expedita explicabo illo laudantium necessitatibus nihil nostrum nulla obcaecati, odit officia optio pariatur quaerat quam qui quia ratione, sapiente sequi suscipit tempore temporibus tenetur ut voluptates? Deserunt hic natus temporibus.
            </TabPane>

            <TabPane tab={t('seo')} key="seo">
              Content of Tab Pane 2
            </TabPane>

            <TabPane tab={t('feature')} key="feature">
              Content of Tab Pane 3
            </TabPane>

            <TabPane tab={t('tags')} key="tags">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Form>
      </Col>
    </Row>
  );
};

export default AddProduct;
