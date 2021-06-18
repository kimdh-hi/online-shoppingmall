import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import { Row, Col } from "antd"; // 반응형

function ProductDetailPage(props) {
  const [Product, setProduct] = useState({});
  const productId = props.match.params.productId;

  useEffect(() => {
    axios
      .get(`/api/product/detail?id=${productId}&type=single`)
      .then(response => {
        if (response.data.success) {
          //          console.log(response.data.product);
          setProduct(response.data.product[0]);
        } else {
          alert("error");
        }
      });
  }, []);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage product_info={Product} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo product_info={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetailPage;
