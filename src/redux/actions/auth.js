import axios from "axios";
import { actionTypes } from "./actionTypes";

export const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("localId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const onSuccess = (idToken, localId) => ({
  type: actionTypes.SUCCESSFUL_SINGUP,
  idToken: idToken,
  localId: localId,
});

const onError = (error) => ({
  type: actionTypes.AUTH_ERROR,
  errorMessage: error.response.data.error.message,
});

const getAuthDataFromLocalStorage = () => {
  const idToken = localStorage.getItem("idToken");
  const localId = localStorage.getItem("localId");
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  return { idToken, localId, expirationDate };
};

export const checkAuthOnReload = () => {
  return (dispatch) => {
    let { idToken, localId, expirationDate } = getAuthDataFromLocalStorage();
    let dateHasExpired = expirationDate < new Date();
    if (!idToken || dateHasExpired) {
      dispatch(logout());
    } else {
      dispatch(onSuccess(idToken, localId));
      const expirationTime =
        (expirationDate.getTime() - new Date().getTime()) / 1000;
      dispatch(checkAuthTimeout(expirationTime));
    }
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    const key = "AIzaSyAw7SE-rUpkB5kAf0bVba7uzjOFem6UtQs";
    let url = isSignUp
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

    axios
      .post(url, { email, password, returnSecureToken: true })
      .then((res) => {
        dispatch(onSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
        localStorage.setItem("idToken", res.data.idToken);
        localStorage.setItem("localId", res.data.localId);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        dispatch(onError(error));
      });
  };
};
