import React, { useEffect, useState } from "react";
import { FaCode, FaShekelSign } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Filters/CheckBox";
import RadioBox from "./Filters/RadioBox";
import SearchItem from "./Filters/SearchItem";
import { countries, price } from "./Filters/Data";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0); // 0번째 이미지부터
  const [Limit, setLimit] = useState(8); // 8개 이미지를 로드
  const [ProductsLength, setProductsLength] = useState(0);
  const [Filters, setFilters] = useState({
    countries: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

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

  const showNewFilteringResult = filters => {
    let body = {
      skip: 0,
      limit: 8,
      filters: filters,
    };

    setSkip(body.skip);
    setLimit(body.limit);

    requestProducts(body);
  };

  const handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  // filters: checkbox에서 체크된 항목의 ID 값 (Data.js - Data)
  // type: countriy와 price 두 개 필터를 구분
  const handleFilters = (filters, type) => {
    const newFilters = { ...Filters };
    newFilters[type] = filters;

    if (type === "price") {
      const handledPrice = handlePrice(filters);
      newFilters[type] = handledPrice;
    }

    showNewFilteringResult(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = newSearchTerm => {
    setSearchTerm(newSearchTerm);

    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    requestProducts(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>Products</h2>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={countries}
            handleFilters={filters => handleFilters(filters, "countries")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={filters => handleFilters(filters, "price")}
          />
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchItem refreshFunction={updateSearchTerm} />
      </div>
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
