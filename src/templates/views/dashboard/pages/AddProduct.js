import "./styles/AddProduct.less";
import { Button, Col, Form, Input, Row, Tabs, Modal, Skeleton, Upload } from "antd";
import DashboardContentHeader from "../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { __, fn_get_base64 } from "../../../../functions/Helper";
import { useGetApi } from "../../../../functions";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useGetConfig } from "../../../../contexts/config/ConfigContext";
import { CloseOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import axios from "axios";
import ImagesUploader from "../../../common/ImagesUploader";

const AddProduct = () => {

  const { TabPane } = Tabs;

  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  // state for show category picker:
  const [isCategoryPickerModalVisible, setIsCategoryPickerModalVisible] = useState(false);

  // state for save selected category id for get sub categories from API:
  const [categoryId, setCategoryId] = useState(524);

  // state for save selected category details:
  const [issetCategory, setIssetCategory] = useState({});

  // save image name in array state:
  const [imageFileList, setImageFileList] = useState({});

  // function for handle image upload change:
  const handleImageUploadChange = ({ fileList }) => setImageFileList({ fileList });

  // function for upload images:
  const handleUploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("image", file);
    try {
      const res = await axios.post(
        "https://alaedeen.com/horn/upload-image-product-api",
        fmData,
        config
      );

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnRemoveImage = file => {
    console.log(file);
  }

  // get categories from API:
  const {isLoading: categoryPickerIsLoading, data} = useGetApi('picker-categories-api', `category_id=${categoryId}`, `categoriesPicker_${categoryId}`);
  const categories = data || [];

  // function for show category picker modal:
  const showCategoryPickerModal = () => {
    setIsCategoryPickerModalVisible(true);
  };

  // function for close category picker modal:
  const closeCategoryPickerModal = () => {
    setIsCategoryPickerModalVisible(false);

    setCategoryId(524);
  };

  // function for handle select category in modal:
  const handleSelectCategory = (category, category_id) => {
    setIssetCategory({"category": category, "category_id": category_id});

    setIsCategoryPickerModalVisible(false);

    setCategoryId(524);
  }

  // state for get scroll:
  const [scrolled, setScrolled] = useState("");

  // function for handle scroll:
  const handleScroll = () => {
    if (window.scrollY > 25) {
      setScrolled("scrolled");
    } else {
      setScrolled("");
    }
  };

  // useEffect for handle scroll:
  useLayoutEffect(() => {

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // render tab bar for add new DIV before tab bar:
  const renderTabBar = (props, DefaultTabBar) => (
    <div className={scrolled}>
      <DefaultTabBar {...props} className="tabBatForScrolled" />
    </div>
  );

  // use ref for add product form:
  const productForm = useRef(null);

  // useEffect for handle selected category in modal (insert selected category id in to form field):
  useEffect(()=>{
    productForm?.current?.setFieldsValue({
      category: issetCategory?.category_id,
    })
  },[issetCategory?.category_id]);

  // controls toolbar show in text editor:
  const textEditorControls = [
    'undo',
    'redo',
    'separator',
    'font-size',
    'line-height',
    'separator',
    'bold',
    'italic',
    'underline',
    'separator',
    'emoji',
    'separator',
    'text-align',
    'separator',
    'headings',
    'list-ul',
    'list-ol',
    'blockquote',
    'separator',
    'hr',
    'separator',
    'media',
    'separator',
    'clear'
  ];


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
          ref={productForm}
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
                    <Input allowClear/>
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
                  >
                    <Input hidden/>

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

                  <Form.Item
                    name="full_description"
                    label={t('description')}
                  >
                    <BraftEditor
                      language="en"
                      controls={textEditorControls}
                      placeholder={t('Description')}
                      className="text-editor"
                      contentStyle={{height: 300}}
                      onChange={(editorState) => {
                        productForm?.current?.setFieldsValue({
                          full_description: editorState.toHTML(),
                        })
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="upload"
                    label="product images"
                    valuePropName="fileList"
                  >
                    <ImagesUploader
                      handleCustomRequest={handleUploadImage}
                      handleOnRemove={handleOnRemoveImage}
                      handleOnChange={handleImageUploadChange}
                      imageFileList={imageFileList}
                      uploadBtnText="select image"
                      uploadBtnIcon={<UploadOutlined />}
                      customClassName="addProduct--imageUploader"
                    />
                  </Form.Item>
                </Col>
              </Row>
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
