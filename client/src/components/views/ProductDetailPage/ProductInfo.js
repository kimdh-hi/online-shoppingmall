import React from "react";
import { Descriptions, Button, Icon } from "antd"; // https://ant.design/components/descriptions/

function ProductInfo(props) {
  return (
    <div>
      <Descriptions title="Product Information" bordered>
        <Descriptions.Item label="Price">
          {props.product_info.price}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">
          {props.product_info.sold}
        </Descriptions.Item>
        <Descriptions.Item label="View">
          {props.product_info.views}
        </Descriptions.Item>
        <Descriptions.Item label="Descriptions">
          {props.product_info.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button type="primary" shape="round" size={"large"}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
