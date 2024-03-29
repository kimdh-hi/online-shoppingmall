import React from "react";
import { Descriptions, Button } from "antd"; // https://ant.design/components/descriptions/
import { useDispatch } from "react-redux";
import { addToCart } from "../../../_actions/user_actions";

function ProductInfo(props) {
  const dispatch = useDispatch();

  const cartHandler = event => {
    dispatch(addToCart(props.product_info._id));
  };

  return (
    <div>
      <Descriptions title="상세정보" bordered>
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
        <Button
          type="danger"
          shape="round"
          size={"large"}
          onClick={cartHandler}
        >
          장바구니
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
