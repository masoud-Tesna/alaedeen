import { useTranslation } from "react-i18next";
import { Tag } from "antd";

const Status = (
  {
    type,
    status
  }
) => {

  const { t } = useTranslation();

  switch (type) {

    case "order" :
      switch (status) {
        case "C" :
          return <Tag color="success">{t("successful")}</Tag>

        case "O" :
          return <Tag color="warning">{t("order_not_completed")}</Tag>

        case "U" :
          return <Tag color="error">{t("unsuccessful")}</Tag>
      }
      break
    default :
      return <span />
  }

};

export default Status;
