const reducer = (id, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_ID":
      return action.payload;
    default:
      return null;
  }
};
export default reducer;
