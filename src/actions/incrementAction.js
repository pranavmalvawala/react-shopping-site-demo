export default function updateItemIncrement(itemToUpdate) {
  return dispatch => {
    dispatch({
      type: "UPDATE_ITEM_INCREMENT",
      payload: itemToUpdate
    });
  };
}
