// const initialState = {
//   cartItems: {
//     name: "",
//     color: "",
//     price: "",
//     info: "",
//     id: ""
//   }
// };

const cartReducer = (
  state = {
    arr: []
  },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        arr: [...state.arr, action.payload]
        // cartItems: {
        //   ...state.cartItems,
        //   [action.payload.id]: action.payload
        // }
      };
    default:
      return state;
  }
};

export default cartReducer;
