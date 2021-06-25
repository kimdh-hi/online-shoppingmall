import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import CartCard from "./CartCard";
import { Empty } from "antd";

function CartPage(props) {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);
  const [EmptyFlag, setEmptyFlag] = useState(true); // 장바구니가 빈 경우 True

  useEffect(() => {
    let cartItemsId = [];

    if (
      props.user.userData &&
      props.user.userData.cart &&
      props.user.userData.cart.length > 0
    ) {
      props.user.userData.cart.forEach(item => {
        cartItemsId.push(item.id);
      });

      dispatch(getCartItems(cartItemsId, props.user.userData.cart)).then(
        response => {
          calculateTotalAmouts(response.payload);
          setEmptyFlag(false); //
        }
      );
    }
    // 처음 useEffect가 실행되는 시점에 props.user.userData는 비어있는 상태
    // 때문에 위 조건을 만족하지 못해 dispatch가 실행되지 않는다.
    // props.user.userData가 변경될 때 useEffect를 다시 수행하도록 설정
  }, [props.user.userData]);

  let calculateTotalAmouts = cartDetail => {
    let total = 0;
    cartDetail.map((item, idx) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
  };

  let removeFromCart = productId => {
    dispatch(removeCartItem(productId)).then(response => {
      if (response.payload.cart.length <= 0) {
        setEmptyFlag(true);
      } else {
        setEmptyFlag(false);
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>장바구니</h1>

      <div>
        <CartCard
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />
      </div>

      {!EmptyFlag ? ( // 장바구니에 상품이 있는 경우
        <div style={{ marginTop: "3rem" }}>
          <h2>총 가격: ${Total}</h2>
        </div>
      ) : (
        // 장바구니에 상품이 없는 경우
        <Empty
          description={"장바구니에 담긴 상품이 없습니다."}
          style={{ marginTop: "3rem" }}
        />
      )}
    </div>
  );
}

export default CartPage;
