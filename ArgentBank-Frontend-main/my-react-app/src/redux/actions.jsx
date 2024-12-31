

// Action pour la connexion utilisateur
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.body.token;

      console.log('Response data:', data); // Affiche toute la réponse pour voir la structure

      console.log('Token received:', token); // Vérifier la valeur du token


      // Sauvegarder le token dans le localStorage
      localStorage.setItem('authToken', token);
      console.log(localStorage)

      // Déclencher l'action avec le token
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token },
      });



    } else {
      const errorData = await response.json();
      dispatch({
        type: 'LOGIN_ERROR',
        payload: errorData.message || "Invalid credentials",
      });
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: "Network error: " + error.message,
    });
  }
};


// Action pour inscrire un nouvel utilisateur
export const signupUser = (email, password, firstName, lastName, userName) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName, userName }), // Payload pour l'inscription
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User successfully signed up", data); // Afficher la réponse de l'API

      // Déclencher l'action de succès (par exemple, redirection ou affichage d'un message de succès)
      dispatch({
        type: 'SIGNUP_SUCCESS',
        payload: data, // Les données reçues après l'inscription
      });

      // Vous pouvez rediriger vers la page de connexion ou la page d'accueil, selon votre logique
      window.location.href = '/sign-in'; // Exemple de redirection
    } else {
      const errorData = await response.json();
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: errorData.message || "Signup failed", // Afficher un message d'erreur si l'inscription échoue
      });
    }
  } catch (error) {
    dispatch({
      type: 'SIGNUP_ERROR',
      payload: "Network error: " + error.message, // Afficher un message d'erreur en cas de problème réseau
    });
  }
};


// Action pour récupérer le profil de l'utilisateur
export const getUserProfile = () => async (dispatch) => {
  const token = localStorage.getItem('authToken'); // Récupérer le token depuis localStorage

  if (!token) {
    return dispatch({
      type: 'PROFILE_ERROR',
      payload: 'Token is missing',
    });
  }

  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: 'PROFILE_SUCCESS',
        payload: data.body, // Mettre à jour avec les données du profil
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: 'PROFILE_ERROR',
        payload: errorData.message || "Failed to fetch profile",
      });
    }
  } catch (error) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: "Network error: " + error.message,
    });
  }
};

// Action pour mettre à jour le profil utilisateur (uniquement le username)
export const updateUserProfile = (username) => async (dispatch) => {
  const token = localStorage.getItem('authToken'); // Récupérer le token depuis localStorage

  if (!token) {
    return dispatch({
      type: 'PROFILE_ERROR',
      payload: 'Token is missing',
    });
  }

  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username }), // Envoyer uniquement le nouveau username
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: 'PROFILE_SUCCESS',
        payload: data.body, // Mettre à jour le profil avec les nouvelles données
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: 'PROFILE_ERROR',
        payload: errorData.message || "Failed to update profile",
      });
    }
  } catch (error) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: "Network error: " + error.message,
    });
  }
};




// Action pour la déconnexion
export const logoutUser = () => {
  localStorage.removeItem('authToken'); // Retirer le token du localStorage
  return { type: 'LOGOUT' }; // Déclencher l'action de déconnexion
};



