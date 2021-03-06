import * as api from "./api";

export const SIGN_IN = "SIGN_IN";
export const REGISTER = "REGISTER";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const {
        data: { result, token },
      } = await api.signin({ email, password });

      dispatch({ type: SIGN_IN, payload: { ...result, token } });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      await api.register({ name, email, password });
      alert("You are now registered.");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

export const logout = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const authReducer = (
  state = JSON.parse(localStorage.getItem("profile")),
  { type, payload }
) => {
  switch (type) {
    case SIGN_IN:
      localStorage.setItem("profile", JSON.stringify(payload));
      return payload;

    case LOGOUT:
      localStorage.clear();
      return null;
    default:
      return state;
  }
};
