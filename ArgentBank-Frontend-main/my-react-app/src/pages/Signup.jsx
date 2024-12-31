import { useState } from "react";
import { useDispatch } from "react-redux"; // Importer useDispatch pour envoyer l'action
import { signupUser } from "../redux/actions"; // Importer l'action signupUser
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function Signup() {
  const { userProfile, error, token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch(); // Hook pour envoyer l'action
  const navigate = useNavigate();

  useEffect(() => {
      if (!token) {
        navigate('/'); // Si pas de token, rediriger vers la page de connexion
      } })


    // Gérer la déconnexion
    const handleLogout = () => {
      dispatch(logoutUser());
      navigate('/'); // Rediriger vers la page de connexion après déconnexion
    };

  // Gérer l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Vérifier que tous les champs sont remplis
    if (!email || !password || !firstName || !lastName || !userName) {
      setError("All fields are required");
      return;
    }

    // Appeler l'action d'inscription
    dispatch(signupUser(email, password, firstName, lastName, userName));
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
