import { actionTypes } from "./../actions/actionTypes";

const initialState = {
  localId: null,
  idToken: null,
  errorMessage: null,
  isLoading: false,
};

const authLogout = (state, action) => {
  return {
    ...state,
    idToken: null,
    localId: null,
  };
};

const successfulSingUp = (state, action) => {
  return {
    ...state,
    localId: action.localId,
    idToken: action.idToken,
    errorMessage: null,
  };
};

const authError = (state, action) => {
  return {
    ...state,
    errorMessage: action.errorMessage,
  };
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESSFUL_SINGUP:
      return successfulSingUp(state, action);
    case actionTypes.AUTH_ERROR:
      return authError(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default auth;
