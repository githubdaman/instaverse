import { AUTH, LOGOUT } from "../constants/actionTypes.js";
const authReducer = (auth = { authData: null }, action) => {
  switch (action.type) {
    case AUTH: {
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...auth, authData: action?.data };
    }

    case LOGOUT:
      localStorage.clear();
      return { ...auth, authData: null };
    default:
      return { ...auth };
  }
};
export default authReducer;
