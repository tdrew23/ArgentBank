import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions"; // Assure-toi d'importer l'action
import { Navigate } from "react-router-dom"; // Importer Navigate pour rediriger


function SignIn() {
  const [email, setEmail] = useState(''); // Définir email ici
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false); // Etat pour gérer la redirection

  
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Effacer les anciennes erreurs
    setError('');

    // Appel de l'action loginUser pour la connexion
    try {
      await dispatch(loginUser(email, password));
      setRedirect(true); // Si la connexion réussie, activer la redirection
    } catch (error) {
      setError("Network error: " + error.message);
    }
  };


  if (redirect) {
    return <Navigate to="/user" />; // Rediriger l'utilisateur vers la page "/user"
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {error && <p>{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default SignIn;
