const selectReducer = (
  state = {
    id: "",
    name: "",
    info: "",
    color: "",
    price: "",
    count: 1
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
        price: action.payload.price,
        count: 1
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
