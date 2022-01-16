import { useState } from "react";

import "./styles/ImagesUploader.less";

import { useTranslation } from "react-i18next";
import { __, fn_get_base64 } from "../../functions/Helper";
import { Upload } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const ImageUploader = (
  {
    formRef,
    inputName,
    uploadBtnText,
    uploadBtnIcon,
    customClassName
  }
) => {
  const { t } = useTranslation();

  // state for loading:
  const [isLoading, setIsLoading] = useState(false);

  // state for save image url:
  const [imageUrl, setImageUrl] = useState("");

  // function for handle Image Preview:
  const handleImagePreview = async file => {
    return await fn_get_base64(file);
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setIsLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      handleImagePreview(info?.file?.originFileObj)
        .then(imageUrl => {
          setImageUrl(imageUrl);
          setIsLoading(false)
        });
    }
  };

  // function for upload images:
  const handleUploadImage = async options => {
    const { onSuccess, onError, file, onProgress, inputName, frmRef } = options;

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

      frmRef?.setFieldsValue({
        [inputName]: res.data,
      });

      onSuccess("Ok");
      //console.log("server res: ", res);
    } catch (err) {
      //console.log("Error: ", err);
      //const error = new Error("Some error");
      onError({ err });
    }
  };

  // upload button component:
  const imageUploadButton = (
    <div className="uploadBtn">
      {isLoading ? <LoadingOutlined /> : uploadBtnIcon}
      <div style={{ marginTop: 8 }}>{t(__(uploadBtnText))}</div>
    </div>
  );

  return (
    <div className={`imageUploader--container ${customClassName}`}>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={options => handleUploadImage({
          ...options,
          inputName : inputName,
          frmRef: formRef
        })}
        onChange={handleChange}
      >
        {(imageUrl && !isLoading) ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : imageUploadButton}
      </Upload>
    </div>
  );
};

export default ImageUploader;
