import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // Pour accéder au store Redux
import { logoutUser } from '../redux/actions'; // L'action de déconnexion
import logo from '../images/argentBankLogo.webp';

function Navbar() {
  const dispatch = useDispatch();
  const { userProfile, token } = useSelector(state => state.auth); // Récupérer l'état de l'utilisateur depuis Redux
  
  // Fonction de gestion de la déconnexion
  const handleLogout = () => {
    dispatch(logoutUser()); // Déclencher l'action de déconnexion
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to='/'>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {/* Si l'utilisateur est connecté */}
        {token ? (
          <>
         
            <Link className="main-nav-item" to="/user">
              {userProfile?.userName} 
              <i className="fa fa-user-circle"></i>
            </Link>
            <Link className="main-nav-item" to="/userProfile">
            <i className="fa-solid fa-gear"></i>
            </Link>
            <Link className="main-nav-item" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          // Si l'utilisateur n'est pas connecté
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
