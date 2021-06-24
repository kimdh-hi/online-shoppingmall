import React from "react";
import "./CartCard.css";

function CartCard(props) {
  const rendering = () =>
    props.products &&
    props.products.map((item, key) => (
      <tr key={key}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="product"
            src={renderImage(item.images)}
          />
        </td>
        <td>{item.quantity} 개</td>
        <td>{item.price}</td>
        <td>
          <button>삭제</button>
        </td>
      </tr>
    ));

  const renderImage = images => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>상품 이미지</th>
            <th>상품 수량</th>
            <th>상품 가격</th>
            <th>삭제</th>
          </tr>
        </thead>

        <tbody>{rendering()}</tbody>
      </table>
    </div>
  );
}

export default CartCard;
