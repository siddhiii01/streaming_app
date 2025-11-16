import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading profile...</div>;
  if (!isAuthenticated || !user) return null;

  return (
    <div>
      <img
        src={user.picture}
        alt={user.name}
        onError={(e) => (e.target.src = defaultAvatar)}
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

// default avatar 
const defaultAvatar =
  "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=User";


export default Profile;

