const initialState = {
    token: null, // Token d'authentification
    error: null, // Message d'erreur en cas de problème
  };
  
  // Reducer pour l'authentification
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
          error: null,
        };
      case 'LOGIN_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          token: null,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  