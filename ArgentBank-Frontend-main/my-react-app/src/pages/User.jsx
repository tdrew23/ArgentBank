import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Utiliser useSelector pour accéder à l'état

function User() {
  const dispatch = useDispatch();
  const { token, error } = useSelector(state => state.auth); // Accéder à l'état du store

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [tempFirstName, setTempFirstName] = useState('');
  const [tempLastName, setTempLastName] = useState('');

  // Vérifier si un utilisateur est authentifié
  useEffect(() => {
    if (!token) {
      window.location.href = '/'; // Si pas de token, rediriger vers la page de connexion
    }
  }, [token]);

  // Logique de déconnexion
  const handleLogout = () => {
    dispatch(logoutUser()); // Déclencher l'action de déconnexion
    window.location.href = '/'; // Rediriger vers la page de connexion
  };

  // Fonction pour sauvegarder les changements
  const handleSave = () => {
    // Sauvegarder les informations de l'utilisateur après modification
    setIsEditing(false); // Fermer le mode édition
  };

  // Fonction pour annuler les modifications
  const handleCancel = () => {
    setTempUsername('Ben_hg'); // Remettre les valeurs originales
    setTempFirstName('Ben');
    setTempLastName('Hong');
    setIsEditing(false); // Fermer le mode édition
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />{tempUsername || 'User'}!
        </h1>
        <button className="edit-button" onClick={() => { setIsEditing(true); }}>
          Edit Name
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
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
          <label className="user-info-label">
            First name:
            <input
              className="user-info-input"
              type="text"
              value={tempFirstName}
              onChange={(e) => setTempFirstName(e.target.value)}
            />
          </label>
          <label className="user-info-label">
            Last name:
            <input
              className="user-info-input"
              type="text"
              value={tempLastName}
              onChange={(e) => setTempLastName(e.target.value)}
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
