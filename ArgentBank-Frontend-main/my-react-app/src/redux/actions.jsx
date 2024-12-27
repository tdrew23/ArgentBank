// Action pour la connexion utilisateur
export const loginUser = (username, password) => async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
  
        // Sauvegarder le token dans le localStorage
        localStorage.setItem('authToken', token);
  
        // Déclencher l'action avec les informations de l'utilisateur
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
        window.location.href = '/user'; // Rediriger vers la page utilisateur après succès
      } else {
        const errorData = await response.json();
        dispatch({ type: 'LOGIN_ERROR', payload: errorData.message || "Invalid credentials" });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: "Network error: " + error.message });
    }
  };
  
  // Action pour la déconnexion
  export const logoutUser = () => {
    localStorage.removeItem('authToken');
    return { type: 'LOGOUT' };
  };
  