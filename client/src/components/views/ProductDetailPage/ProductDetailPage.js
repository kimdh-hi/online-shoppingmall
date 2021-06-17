import React, { useEffect } from "react";
import axios from "axios";

function ProductDetailPage(props) {
  const productId = props.match.params.productId;

  useEffect(() => {
    axios
      .get(`/api/product/detail?id=${productId}&type=single`)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.product);
        } else {
          alert("error");
        }
      });
  }, []);

  return <div></div>;
}

export default ProductDetailPage;
