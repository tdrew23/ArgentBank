import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importer useDispatch et useSelector
import { getUserProfile, updateUserProfile } from '../redux/actions'; // Importer les actions getUserProfile et updateUserProfile
import { logoutUser } from '../redux/actions'; // Importer l'action logout
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { getTransactions } from '../redux/actions'; // Importer l'action pour récupérer les transactions


function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, error, token } = useSelector((state) => state.auth); // Accéder à userProfile depuis Redux
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(''); // Seulement pour username
  

  // Vérifier si un utilisateur est authentifié
  useEffect(() => {
    if (!token) {
      navigate('/'); // Si pas de token, rediriger vers la page de connexion
    } else {
      dispatch(getUserProfile()); // Récupérer le profil de l'utilisateur au montage du composant
    }
  }, [dispatch, token, navigate]);

  // Gérer la déconnexion
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // Rediriger vers la page de connexion après déconnexion
  };

  // Sauvegarder les changements du username
  const handleSave = () => {
    // Appeler l'action pour envoyer les données au backend
    dispatch(updateUserProfile(tempUsername)); // Envoie le nouveau username
    setIsEditing(false); // Fermer le mode édition
  };

  // Annuler les modifications
  const handleCancel = () => {
    setTempUsername(userProfile?.userName || ''); // Remettre l'ancien username
    setIsEditing(false); // Fermer le mode édition
  };

  if (error) {
    return <p>{error}</p>; // Affichage de l'erreur si le profil n'a pas pu être récupéré
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userProfile?.userName || 'User'}!</h1>
        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {isEditing && (
        <div className="user-info-form">
          <label className="user-info-label">
            User name:
            <input
              className="user-info-input"
              type="text"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
            />
          </label>
          <div className="user-info-buttons">
            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      {/* Informations sur les comptes */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x3448)</h3>
          <p className="account-amount">$48,098.43</p>
          <p className="account-amount-description">Available balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      
    </main>
  );
}

export default User;
