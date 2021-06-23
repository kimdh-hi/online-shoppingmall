import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import CartCard from "./CartCard";

function CartPage(props) {
  const dispatch = useDispatch();

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

      dispatch(getCartItems(cartItemsId, props.user.userData.cart));
    }
    // 처음 useEffect가 실행되는 시점에 props.user.userData는 비어있는 상태
    // 때문에 위 조건을 만족하지 못해 dispatch가 실행되지 않는다.
    // props.user.userData가 변경될 때 useEffect를 다시 수행하도록 설정
  }, [props.user.userData]);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>장바구니</h1>
      <CartCard
        products={props.user.cartDetail && props.user.cartDetail.product}
      />
    </div>
  );
}

export default CartPage;
