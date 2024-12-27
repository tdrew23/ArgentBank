import { useState } from "react";
import { useDispatch } from "react-redux"; // Hook pour utiliser dispatch

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch(); // Hook pour accéder au dispatch Redux

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Effacer les anciennes erreurs
    setError('');

    // Appel de l'action loginUser pour la connexion
    try {
      dispatch(loginUser(username, password)); // Utiliser dispatch pour envoyer l'action
    } catch (error) {
      setError("Network error: " + error.message);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {error && <p>{error}</p>} {/* Affichage du message d'erreur */}
        </form>
      </section>
    </main>
  );
}

export default SignIn;
