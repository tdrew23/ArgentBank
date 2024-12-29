import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../redux/actions';
import { logoutUser } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accéder aux données depuis Redux
  const { userProfile, error, token } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('');

  // Vérifier si un utilisateur est authentifié
  useEffect(() => {
    if (!token) {
      navigate('/'); // Si pas de token, rediriger vers la page de connexion
    } else {
      dispatch(getUserProfile()); // Récupérer le profil de l'utilisateur au montage du composant
    }
  }, [dispatch, token, navigate]);

  // Vérification si l'utilisateur est connecté et que le profil est bien chargé
  if (!userProfile) {
    return <p>Loading user profile...</p>; // Afficher un message de chargement si le profil est absent
  }

  // Gérer la déconnexion
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // Rediriger vers la page de connexion après déconnexion
  };

  // Sauvegarder les changements du username
  const handleSave = () => {
    dispatch(updateUserProfile(tempUsername)); // Envoie du nouveau username au backend
    setIsEditing(false); // Fermer le mode édition
  };

  // Annuler les modifications
  const handleCancel = () => {
    setTempUsername(userProfile?.userName || ''); // Remettre l'ancien username
    setIsEditing(false); // Fermer le mode édition
  };

  // Gérer les erreurs
  if (error) {
    return <p>{error}</p>; // Afficher une erreur si elle existe
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userProfile?.userName || 'User'}!</h1>
        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
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
          <label>
          First name: {userProfile?.firstName}
        </label>
        
        <label>
          Last name: {userProfile?.lastName}
        </label>
          <div className="user-info-buttons">
            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      {/* Informations sur les comptes */}
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      {/* Affichage des transactions */}
      {/* <section className="transactions">
        <h2>Recent Transactions</h2>
        {userProfile?.transactions && userProfile.transactions.length > 0 ? (
          userProfile.transactions.map((transaction) => (
            <div className="transaction" key={transaction.transactionId}>
              <p>Date: {transaction.date}</p>
              <p>Description: {transaction.description}</p>
              <p>Amount: ${transaction.amount}</p>
              <p>Balance: ${transaction.balance}</p>
              <p>Category: {transaction.category}</p>
              <button>Edit</button> {/* Bouton pour modifier la transaction */}
            {/* </div> */}
          {/* ))
        ) : (
          <p>No transactions found.</p>
        )}
      </section> */} 
    </main>
  );
}

export default User;
