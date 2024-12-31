import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  useEffect } from 'react';



function UserProfile() {
  const { userProfile, token } = useSelector(state => state.auth); // Récupérer le profil utilisateur

  const navigate = useNavigate();

  
    // Vérifier si un utilisateur est authentifié
    useEffect(() => {
      if (!token) {
        navigate('/'); // Si pas de token, rediriger vers la page de connexion
      } 
      
    }, [ token, navigate]);


  return (
    <div className="user-profile">
      <h2>{userProfile?.userName}'s Profile</h2>
      <p><strong>First Name:</strong> {userProfile?.firstName}</p>
      <p><strong>Last Name:</strong> {userProfile?.lastName}</p>
      <p><strong>email:</strong> {userProfile?.email}</p>
      <p><strong>password:</strong> {userProfile?.password}</p>
      <p><strong>username:</strong> {userProfile?.userName}</p>


      {/* Afficher d'autres informations pertinentes */}
    </div>
  );
}

export default UserProfile;
