import { useState, useEffect } from "react";

import "./styles/AddProduct.less";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Input, Row, Tabs, Modal, Skeleton, InputNumber, Select } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { __, SeoGenerator } from "../../../../../utilities/functions/Helper";
import { useGetApiOld } from "../../../../../utilities/functions";
import { CloseOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import axios from "axios";
import ImagesUploader from "../../../../common/ImagesUploader";
import ProductAssignFeatures from "./../components/ProductAssignFeatures";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../contexts/spiner/SpinnerContext";

const UpdateProduct = () => {

  const { TabPane } = Tabs;
  const { Option } = Select;
  const { TextArea } = Input;

  const navigate = useNavigate();

  // get product id from url:
  const { productId } = useParams();

  // user data context state:
  const { user_data } = useGetAuthState();

  const companyId = user_data?.auth?.company_id || 0;

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  const { t } = useTranslation();

  const {isLoading, data} = useGetApiOld(
    "vendor-products-api",
    `product_id=${productId}&company_id=${companyId}`,
    `productData_${productId}`,
    {
      refetchOnWindowFocus: false,
      enabled: !!companyId,
      onSuccess: (data) => {
        if (data === 'not_found') {
          navigate('/dashboard/products/manage');
        }
      }
    }
  );

  const productData = data || {};

  // use ref for update product form:
  const [updateProductFrm] = Form.useForm();

  // state for show category picker:
  const [isCategoryPickerModalVisible, setIsCategoryPickerModalVisible] = useState(false);

  // state for save selected category id for get sub categories from API:
  const [categoryId, setCategoryId] = useState(524);

  // state for save selected category details:
  const [issetCategory, setIssetCategory] = useState({});

  // state for full description:
  const [productDescription, setProductDescription] = useState(null);

  // useEffect for handle selected category (insert selected category id in to issetCategory state):
  useEffect(() => {
    if (productData?.main_category) {
      setIssetCategory({"category": productData?.category, "category_id": productData?.main_category});
    }
  }, [productData?.main_category]);

  // useEffect for set product description state:
  useEffect(() => {
    if (productData?.full_description) {
      setProductDescription( BraftEditor.createEditorState(productData?.full_description) )
    }
  }, [productData?.full_description]);

  // useEffect for handle selected category in modal (insert selected category id in to form field And Reset product_features array item):
  useEffect(()=>{
    updateProductFrm?.setFieldsValue({
      category_ids: [+issetCategory?.category_id],
      product_features : [],
    });
  },[issetCategory?.category_id]);

  // save image name in array state:
  const [imageFileList, setImageFileList] = useState([]);

  // save product images in to imageFileList state:
  useEffect(() => {
    if (productData?.product_images) {
      setImageFileList(productData?.product_images);
    }
  }, [productData?.product_images]);

  // state for save country code:
  const [countryCode, setCountryCode] = useState("");

  // function for handle image upload change:
  const handleImageUploadChange = ({ fileList }) => setImageFileList(fileList);

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
    fmData.append("file", file);
    try {
      const res = await axios.post(
        "https://alaedeen.com/horn/upload-image-api",
        fmData,
        config
      );

      const prevImages = updateProductFrm?.getFieldValue('images') || [];
      updateProductFrm?.setFieldsValue({
        images: [...prevImages, res.data],
      });

      onSuccess("Ok");
      //console.log("server res: ", res);
    }
    catch (err) {
      //console.log("Error: ", err);
      //const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnRemoveImage = file => {
    console.log(file);
  }

  // get categories from API:
  const {isLoading: categoryPickerIsLoading, data: categoryPickerData} = useGetApiOld(
    'picker-categories-api',
    `category_id=${categoryId}`,
    `categoriesPicker_${categoryId}`,
    {
      refetchOnWindowFocus: false
    }
  );
  const categories = categoryPickerData || [];

  // get quantity Units list from API:
  const { data: quantityUnitsData } = useGetApiOld(
    `request-content-api`,
    'variant=quantity_units',
    `quantityUnits`,
    {
      refetchOnWindowFocus: false
    }
  );
  const quantityUnits = quantityUnitsData || [];

  // get country lists from API:
  const { data: countryListsData } = useGetApiOld(
    `country-lists-api`,
    '',
    `countryLists`,
    {
      refetchOnWindowFocus: false
    }
  );
  const countryLists = countryListsData || [];

  // get cities list from API:
  const { isLoading: cityListsIsLoading, data: cityListsData } = useGetApiOld(
    `city-lists-api`,
    `country_code=${countryCode}`,
    `citiesList_${countryCode}`,
    {
      enabled: !!countryCode,
      refetchOnWindowFocus: false
    }
  );
  const cityLists = cityListsData || [];

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

  // state for save page title:
  const [productPageTitle, setProductPageTitle] = useState("");

  // state for save product meta description:
  const [productMetaDescription, setProductMetaDescription] = useState("");

  // function for handle on change BraftEditor
  const descriptionHandleChange = editorState => {
    updateProductFrm?.setFieldsValue({
      full_description: editorState.toHTML()
    });

    setProductDescription(editorState);
  }

  const handleUpdateProductOnFinish = values => {
    values.company_id = user_data?.auth?.company_id;

    // show spinner (spinner context):
    spinnerDispatch(isLoadingAction(true));

    axios.put(`https://alaedeen.com/horn/vendor-products-api/?product_id=${productId}`, { product_data: values })
      .then(() => {
        // hidden spinner (spinner context):
        spinnerDispatch(isLoadingAction(false));
      })
      .then(() => {
        navigate('/dashboard/products');
      });
  }

  if (isLoading || !companyId) {
    return(
      <>
        <SeoGenerator
          title="Dashboard | Products - Update"
        />

        <div className="mt-4 px-5">
          <Skeleton active paragraph={{ rows: 8 }} />
          <Skeleton active paragraph={{ rows: 5 }} />
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      </>
    );
  }
  else {
    return(
      <Row>
        <SeoGenerator
          title={ `Dashboard | Products - ${productData?.product}` }
        />

        <Col span={ 24 }>
          <DashboardContentHeader page={ "edit_product" }/>
        </Col>

        <Col span={ 24 } className="addProduct--content">
          <Form
            className="h-100 addProduct--formContent"
            name="createProduct-form"
            onFinish={ handleUpdateProductOnFinish }
            scrollToFirstError
            form={ updateProductFrm }
            initialValues={productData}
          >
            <Tabs
              defaultActiveKey="general"
              cllassName="addProduct--tab"
              tabBarExtraContent={
                <Button className="bg-primary text-white border-0" htmlType="submit">{ t(__('update')) }</Button>
              }

            >
              <TabPane tab={ t('general') } key="general" forceRender>
                <Row className="productForm--general" justify="center">
                  <Col xs={ 24 } lg={ 21 }>

                    <Form.Item
                      name="product"
                      label={ t('product_name') }
                      rules={ [
                        {
                          required: true,
                          message: t(__('Please input product name')),
                        },
                      ] }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={ [ 'category_ids' ] }
                      label={ t('category') }
                      rules={ [
                        {
                          required: true,
                          message: t(__('Please select category')),
                        },
                      ] }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <Input hidden/>

                      { issetCategory?.category ?
                        <span className="selectedCategory" onClick={ showCategoryPickerModal }>
                          <span className="selectedCategory--title">{ issetCategory?.category }</span>
                          <span className="selectedCategory--edit"><EditOutlined/></span>
                      </span> :
                        <span className="selectedCategory" onClick={ showCategoryPickerModal }>
                          <span className="selectedCategory--title">{ t('select_category') }</span>
                          <span className="selectedCategory--edit"><EditOutlined/></span>
                        </span>
                      }

                      <Modal
                        className="categoriesPicker--Modal"
                        title={ t('select_category') }
                        style={ { top: 10 } }
                        visible={ isCategoryPickerModalVisible }
                        onCancel={ () => closeCategoryPickerModal() }
                        footer={ false }
                      >
                        <Row>
                          { categoryPickerIsLoading ?
                            <Skeleton active paragraph={ { rows: 7 } }/> :
                            <Col span={ 24 }>
                              <Row>

                                {
                                  categories?.parents &&
                                  categories?.parents?.map(parent => {
                                    return (
                                      <Col
                                        span={ 24 }
                                        key={ `CreateProduct_categoryPickerParent_${ parent?.category_id }` }
                                        className="category--item__parent"
                                        onClick={ () => setCategoryId(parent?.parent_id) }
                                      >
                                        <Row justify="space-between">
                                          <Col>
                                            { parent?.category }
                                          </Col>

                                          <Col>
                                            <CloseOutlined/>
                                          </Col>
                                        </Row>
                                      </Col>
                                    )
                                  })
                                }

                                {
                                  categories?.sub_categories &&
                                  <>
                                    <Col span={ 24 } className="text-center category--item__caption">
                                      { t('select_category') }
                                    </Col>
                                    { categories?.sub_categories?.map(category => {

                                      if (category?.subcategories || category?.subcategories?.length) {
                                        return (
                                          <Col
                                            span={ 24 }
                                            key={ `categoryPickerModal_${ category?.category_id }` }
                                            className="category--item"
                                            onClick={ () => setCategoryId(category?.category_id) }
                                          >
                                            { category.category }
                                          </Col>
                                        )
                                      }

                                      return (
                                        <Col
                                          span={ 24 }
                                          key={ `CreateProduct_categoryPickerModal_${ category?.category_id }` }
                                          className="category--item"
                                          onClick={ () => handleSelectCategory(category?.category, category?.category_id) }
                                        >
                                          { category.category }
                                        </Col>
                                      )
                                    }) }
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
                      label={ t('description') }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <div>
                        <BraftEditor
                          language="en"
                          controls={ textEditorControls }
                          className="text-editor"
                          contentStyle={ { height: 300 } }
                          onChange={ descriptionHandleChange }
                          value={productDescription}
                        />
                      </div>
                    </Form.Item>

                    <Form.Item
                      name="images"
                      label={ t(__('product images')) }
                      valuePropName="fileList"
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <Input hidden/>

                      <ImagesUploader
                        handleCustomRequest={ handleUploadImage }
                        handleOnRemove={ handleOnRemoveImage }
                        handleOnChange={ handleImageUploadChange }
                        imageFileList={ imageFileList }
                        uploadBtnText="select image"
                        uploadBtnIcon={ <UploadOutlined/> }
                        customClassName="addProduct--imageUploader"
                        hasUpdate
                      />
                    </Form.Item>

                    <Form.Item
                      name="price"
                      label={ t(__('min price')) }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <InputNumber
                        className="w-30"
                        step="0.0"
                        formatter={ value => `$ ${ value }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                        parser={ value => value.replace(/\$\s?|(,*)/g, '') }
                      />
                    </Form.Item>

                    <Form.Item
                      name="list_price"
                      label={ t(__('max price')) }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <InputNumber
                        className="w-30"
                        step="0.0"
                        formatter={ value => `$ ${ value }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                        parser={ value => value.replace(/\$\s?|(,*)/g, '') }
                      />
                    </Form.Item>

                    <Form.Item
                      name="min_qty"
                      label={ t(__('Minimum order quantity')) }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <InputNumber
                        className="w-30"
                      />
                    </Form.Item>

                    <Form.Item
                      name="max_qty"
                      label={ t(__('Maximum order quantity')) }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <InputNumber
                        className="w-30"
                      />
                    </Form.Item>

                    <Form.Item
                      name="quantity_unit"
                      label={ t(__('Quantity units')) }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <Select
                        placeholder={ t(__('Quantity units')) }
                        className="w-30"
                        allowClear
                        showSearch
                        filterOption={ (input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        { quantityUnits?.request_contents?.map((quantityUnit) => {
                          return (
                            <Option key={ `quantity_units_${ quantityUnit?.key }` }
                                    value={ quantityUnit?.key }>{ quantityUnit?.value }</Option>
                          );
                        }) }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label={ t(__('Location')) }
                      labelCol={ { sm: 24, lg: 5 } }
                      className="addProduct--location"
                    >
                      <Input.Group compact>
                        <Form.Item
                          name={ [ 'location', 'country' ] }
                          className="w-30"
                        >
                          <Select
                            placeholder={ t(__('select one country')) }
                            className="w-100"
                            optionLabelProp="label"
                            allowClear
                            showSearch
                            filterOption={ (input, option) =>
                              option?.children.props?.children[ 1 ]?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                            }
                            onChange={ e => {
                              if (!e) {
                                updateProductFrm?.setFieldsValue({
                                  location: {
                                    city: null
                                  },
                                });
                              } else {
                                setCountryCode(e)
                              }
                            } }
                          >
                            { countryLists?.country_lists?.map((countryList) => {
                              return (
                                <Option key={ `country_lists_${ countryList?.code }` } value={ countryList?.code }
                                        label={ countryList?.country }>
                                  <div className="optionByIcon">
                                    <i
                                      className={ `fi fi-${ countryList.code.toLowerCase() } vv-font-size-1-9` }/>
                                    { countryList?.country }
                                  </div>
                                </Option>
                              );
                            }) }
                          </Select>
                        </Form.Item>

                        { cityListsIsLoading ?
                          <span className="loadingCities">{ t(__('loading cities')) }</span> :
                          <Form.Item
                            name={ [ 'location', 'city' ] }
                            className="w-30"
                          >
                            <Select
                              placeholder={ t(__('city')) }
                              className="w-100"
                              allowClear
                              disabled={ !!!cityLists?.city_lists?.length }
                              showSearch
                              filterOption={ (input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <>
                                { cityLists?.city_lists?.map((cityList) => {
                                  return (
                                    <Option key={ `cityLists_${ cityList?.code }` }
                                            value={ cityList?.code }>{ cityList?.state }</Option>
                                  );
                                }) }
                              </>
                            </Select>
                          </Form.Item>
                        }

                      </Input.Group>
                    </Form.Item>

                    <Form.Item
                      name="manufacturing_country"
                      label={ t(__('manufacturing_country')) }
                      labelCol={ { sm: 24, lg: 5 } }
                    >
                      <Select
                        placeholder={ t(__('select one country')) }
                        className="w-30"
                        optionLabelProp="label"
                        allowClear
                        showSearch
                        filterOption={ (input, option) =>
                          option?.children.props?.children[ 1 ]?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                        }
                      >
                        { countryLists?.country_lists?.map((countryList) => {
                          return (
                            <Option key={ `country_lists_${ countryList?.code }` } value={ countryList?.code }
                                    label={ countryList?.country }>
                              <div className="optionByIcon">
                                <i
                                  className={ `fi fi-${ countryList.code.toLowerCase() } vv-font-size-1-9 country--lists__flagIcon` }/>
                                { countryList?.country }
                              </div>
                            </Option>
                          );
                        }) }
                      </Select>
                    </Form.Item>

                  </Col>
                </Row>
              </TabPane>

              <TabPane tab={ t('seo') } key="seo" forceRender>
                <Row className="productForm--seo" justify="center">
                  <Col xs={ 24 } lg={ 21 }>
                    <Form.Item
                      name="page_title"
                      label={ t('page_title') }
                      labelCol={ { sm: 24, lg: 5 } }
                      tooltip={ t(__('page title tooltip message')) }
                    >
                      <TextArea
                        showCount
                        maxLength={ 60 }
                        onChange={ data => setProductPageTitle(data.target.value.slice(0, 60)) }
                        autoSize
                      />
                    </Form.Item>

                    <Form.Item
                      name="meta_description"
                      label={ t('Meta description') }
                      labelCol={ { sm: 24, lg: 5 } }
                      tooltip={ t(__('Meta description tooltip message')) }
                    >
                      <TextArea
                        placeholder={ t('Meta description') }
                        showCount
                        maxLength={ 160 }
                        onChange={ data => setProductMetaDescription(data.target.value.slice(0, 160)) }
                        autoSize={ { minRows: 3, maxRows: 3 } }
                      />
                    </Form.Item>

                    <Form.Item
                      name="meta_keywords"
                      label={ t('Meta keywords') }
                      labelCol={ { sm: 24, lg: 5 } }
                      tooltip={ t(__('Meta keywords tooltip message')) }
                      extra={ t(__('Meta keywords example')) }
                    >
                      <Input allowClear/>
                    </Form.Item>

                    <Row className="googlePreview--content">
                      <Col span={ 24 } className="googlePreview--caption">
                        { t(__('google preview')) }:
                      </Col>

                      <Col xs={ 24 } lg={ 16 } className="px-4">
                        <Row gutter={ [ 0, 5 ] }>
                          <Col span={ 24 } className="googlePreview--pageTitle">
                            { productPageTitle }
                          </Col>

                          { (productPageTitle || productMetaDescription) &&
                          <Col span={ 24 } className="googlePreview--productUrl">
                            https://Alaedeen.com/product/your-product-url
                          </Col>
                          }

                          <Col span={ 24 } className="googlePreview--metaDescription">
                            { productMetaDescription && `${ productMetaDescription }...` }
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Col>
                </Row>
              </TabPane>

              <TabPane tab={ t('feature') } key="feature" forceRender>
                <Row className="productForm--seo" justify="center">
                  <Col xs={ 24 } lg={ 21 }>
                    <ProductAssignFeatures category_id={ issetCategory?.category_id } featuresData = {productData?.features_data} formRef = {updateProductFrm}/>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Form>
        </Col>
      </Row>
    );
  }
};

export default UpdateProduct;