import React, { useEffect, useState } from "react";
import { FaCode, FaShekelSign } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Filters/CheckBox";
import { countries } from "./Filters/Data";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0); // 0번째 이미지부터
  const [Limit, setLimit] = useState(8); // 8개 이미지를 로드
  const [ProductsLength, setProductsLength] = useState(0);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    requestProducts(body);
  }, []);

  const viewMoreHandler = () => {
    let newLimit = Limit + 4; // 한 줄 (4개)씩 더보기
    setLimit(newLimit);

    let body = {
      skip: Skip,
      limit: newLimit,
    };

    requestProducts(body);
  };

  const requestProducts = body => {
    axios.post("/api/product/products", body).then(response => {
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(response.data.productsLength);
        setProductsLength(response.data.productsLength);
      } else {
        alert("error occurred by loading products.");
      }
    });
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>Products</h2>
      </div>

      <CheckBox list={countries} />

      <Row gutter={[16, 16]}>{renderCards}</Row>
      <br />

      {ProductsLength >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={viewMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
