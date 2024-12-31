

const initialState = {
  token: localStorage.getItem('authToken') || null, // Récupérer le token depuis localStorage si disponible
  userProfile: null, // Données du profil utilisateur
  error: null, // Message d'erreur en cas de problème
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // Sauvegarder le token dans localStorage et dans l'état
      localStorage.setItem('authToken', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.payload, // Afficher les erreurs de connexion
      };
    case 'LOGOUT':
      // Supprimer le token du localStorage et réinitialiser l'état
      localStorage.removeItem('authToken');
      return {
        ...state,
        token: null, // Retirer le token lors de la déconnexion
        userProfile: null,
        transactions: [], // Effacer les transactions à la déconnexion
        error: null,
      };
    case 'PROFILE_SUCCESS':
      return {
        ...state,
        userProfile: action.payload, // Sauvegarder le profil utilisateur
      };
    case 'PROFILE_ERROR':
      return {
        ...state,
        error: action.payload, // Afficher les erreurs liées au profil
      };
    default:
      return state;
  }
};

export default authReducer;
