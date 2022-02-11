import "./styles/ProductsLimitStat.less";

import { Progress, Skeleton } from "antd";
import { useTranslation } from "react-i18next";

const ProductsLimitStat = (
  {
    productsLimitStat = {},
    isLoading = true,
    isFetching = true,
    className = ""
  }
) => {

  const { t } = useTranslation();

  let productCount = 0,
      showProgress = false;

  if (productsLimitStat?.total || productsLimitStat?.remaining) {
    productCount = +(productsLimitStat?.total) - +(productsLimitStat?.remaining);
    showProgress = true;
  }

  const expDifference = () => {
    return (productCount / productsLimitStat?.total * 100).toFixed(0)
  }


  return (
    (isLoading || isFetching) ?
      <Skeleton.Input style={{ width: "calc(.5 * 50vw + 50%)", height: 10, verticalAlign: "middle" }} active={true} size={"small"} /> :
      (showProgress) &&
        <div className={`productsLimitStat--progress ${className}`}>
          <Progress
            type="line"
            percent={expDifference()}
            status = { expDifference() >= 100 ? "exception": "success" }
            strokeColor={ expDifference() >= 100 ? "#f5f5f5": "#52c41a" }
            format={() => `${ productsLimitStat?.remaining } ${t("product_left")}` }
          />
      </div>
  );
};

export default ProductsLimitStat;
