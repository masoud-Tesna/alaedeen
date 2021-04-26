import React from 'react';

// import style file:
import './styles/ProductsMultiColumnVertical.less';

const ProductsMultiColumnVertical = ({ productSlice, detailIcon = 'default' }) => {
  return (
    <>{ productSlice } - { detailIcon }</>
  );
};

export default ProductsMultiColumnVertical;