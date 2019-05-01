export default function itemToDelete(itemData) {
  return dispatch => {
    dispatch({
      type: "DELETE_ITEM",
      payload: itemData
    });
  };
}
