import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'; // Assurez-vous que useEffect est bien importé
import SignIn from './pages/SignIn';
import User from './pages/User';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import './css/main.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { getUserProfile } from './redux/actions.jsx'; // Assurez-vous d'importer l'action pour récupérer le profil utilisateur

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifier si un token est stocké dans le localStorage au démarrage de l'application
    const token = localStorage.getItem('authToken');
    if (token) {
      // Si un jeton existe, dispatch l'action pour récupérer le profil utilisateur
      dispatch(getUserProfile());
    }
  }, [dispatch]); // Le useEffect se déclenchera uniquement au premier rendu du composant

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="/userProfile" element={<UserProfile />} /> {/* Route pour la page de profil utilisateur */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
