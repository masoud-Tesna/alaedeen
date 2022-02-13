import { useState } from "react";

import "./styles/ImagesUploader.less";

import { useTranslation } from "react-i18next";
import { __, fn_get_base64 } from "../../functions/Helper";
import { Image, Modal, Upload } from "antd";

const ImagesUploader = (
  {
    handleCustomRequest,
    handleOnRemove,
    handleOnChange,
    imageFileList,
    uploadBtnText,
    uploadBtnIcon,
    customClassName,
    hasUpdate = false,
  }
) => {
  const { t } = useTranslation();

  // state for open preview image modal:
  const [previewImageModalVisible, setPreviewImageModalVisible] = useState(false);

  // state for image url or base64 code (for show in preview modal):
  const [previewImage, setPreviewImage] = useState("");

  // state for image name (for show in preview modal):
  const [previewImageTitle, setPreviewImageTitle] = useState("");

  // function for close Image Preview Modal:
  const handleClosePreviewImageModal = () => setPreviewImageModalVisible(false);

  // function for handle Image Preview:
  const handleImagePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await fn_get_base64(file.originFileObj);
    }

    // set image url or base64:
    setPreviewImage (file.url || file.preview);

    // set image title:
    setPreviewImageTitle (file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

    // and then show modal for preview image:
    setPreviewImageModalVisible (true);
  };

  // upload button component:
  const imageUploadButton = (
    <div className="uploadBtn">
      {uploadBtnIcon}
      <div style={{ marginTop: 8 }}>{t(__(uploadBtnText))}</div>
    </div>
  );

  let fileListProp = {};

  if (hasUpdate) {
    fileListProp = {
      fileList: imageFileList
    }
  }

    return (
      <div className={`imageUploader--container ${customClassName}`}>
        <Upload
          accept="image/*"
          customRequest={handleCustomRequest}
          onRemove={handleOnRemove}
          listType="picture-card"
          {...fileListProp}
          onPreview={handleImagePreview}
          onChange={handleOnChange}
        >
          {imageUploadButton}
        </Upload>

        <Modal
          visible={previewImageModalVisible}
          title={previewImageTitle}
          footer={null}
          onCancel={handleClosePreviewImageModal}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  };

  export default ImagesUploader;
