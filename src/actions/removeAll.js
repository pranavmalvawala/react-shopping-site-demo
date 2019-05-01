export default function removeAll(itemArray) {
  return dispatch => {
    dispatch({
      type: "REMOVE_ALL",
      payload: itemArray
    });
  };
}
