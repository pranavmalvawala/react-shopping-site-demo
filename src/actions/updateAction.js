export default function updateItemDecrement(itemToUpdate) {
  return dispatch => {
    dispatch({
      type: "UPDATE_ITEM_DECREMENT",
      payload: itemToUpdate
    });
  };
}
