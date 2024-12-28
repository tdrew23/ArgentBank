const initialState = {
  token: null, // Token d'authentification
  userProfile: null, // Données du profil utilisateur
  transactions: [], // Liste des transactions
  error: null, // Message d'erreur en cas de problème
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token, // Sauvegarder le token
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.payload, // Afficher les erreurs de connexion
      };
    case 'LOGOUT':
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
    case 'TRANSACTIONS_SUCCESS':
      return {
        ...state,
        transactions: action.payload, // Sauvegarder les transactions récupérées
      };
    case 'TRANSACTIONS_ERROR':
      return {
        ...state,
        error: action.payload, // Afficher les erreurs liées aux transactions
      };
    default:
      return state;
  }
};

export default authReducer;
