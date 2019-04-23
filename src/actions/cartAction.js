export default function addToCart(itemData) {
  return dispatch => {
    dispatch({
      type: "ADD_TO_CART",
      payload: itemData
    });
  };
}
