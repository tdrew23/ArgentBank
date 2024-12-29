import { useSelector } from 'react-redux';

function UserProfile() {
  const { userProfile } = useSelector(state => state.auth); // Récupérer le profil utilisateur

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
