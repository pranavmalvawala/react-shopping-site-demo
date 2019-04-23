const selectReducer = (
  state = {
    id: "",
    name: "",
    info: "",
    color: "",
    price: ""
  },
  action
) => {
  switch (action.type) {
    case "SHOW_ITEM":
      state = {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        info: action.payload.info,
        color: action.payload.color,
        price: action.payload.price
      };
      break;
    default:
      state = {
        ...state
      };
  }
  return state;
};

export default selectReducer;
