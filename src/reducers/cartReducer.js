const cartReducer = (
  state = {
    arr: []
  },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      function checkForIdInArray(arr, key) {
        const found = arr.some(item => item.id === key);
        const objIndex = arr.findIndex(obj => obj.id === key);
        if (!found) {
          return {
            ...state,
            arr: [...state.arr, action.payload]
          };
        } else {
          return (
            console.log("increased--->", arr[objIndex]),
            (arr[objIndex].count = action.payload.count + 1),
            console.log("entry", action.payload.count),
            {
              ...state,
              arr: [...state.arr]
            }
          );
        }
      }
      return checkForIdInArray(state.arr, action.payload.id);

    case "DELETE_ITEM":
      const idOfItem = action.payload.id;
      const filteredArray = state.arr.filter(item => item.id !== idOfItem);
      return {
        ...state,
        arr: filteredArray
      };

    case "REMOVE_ALL":
      console.log("reducer-->remove", action.payload);
      return {
        ...state,
        arr: []
      };

    case "UPDATE_ITEM_DECREMENT":
      console.log("update--reducer--", action.payload);
      console.log(state.arr);
      const objIndex = state.arr.findIndex(obj => obj.id === action.payload.id);
      state.arr[objIndex].count = action.payload.count - 1;
      return state;

    case "UPDATE_ITEM_INCREMENT":
      console.log("update-reducer-increment", action.payload);
      console.log(state.arr);
      const foundObjIndex = state.arr.findIndex(
        obj => obj.id === action.payload.id
      );
      state.arr[foundObjIndex].count = action.payload.count + 1;
      return state;

    default:
      return state;
  }
};

export default cartReducer;
