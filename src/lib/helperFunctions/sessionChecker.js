import { anonymouslySignin, setUserSession } from "@/redux/authSlice";

export const initializeSession = async (dispatch) => {
  // Retrieve and set the session token
  const token = localStorage.getItem("sb-qlryhlvrtlpfbxrlumwm-auth-token");
  if (token) {
    dispatch(setUserSession(token));
  } else {
    await dispatch(anonymouslySignin());
  }
};
