export default function clickedItem(itemData) {
  return dispatch => {
    dispatch({
      type: "SHOW_ITEM",
      payload: itemData
    });
  };
}
