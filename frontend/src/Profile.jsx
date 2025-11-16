import { useAuth0 } from "@auth0/auth0-react";
import { makeAuthRequest } from "./public/api";
import { useState } from "react";


const Profile = () => {
  const { user, isAuthenticated, isLoading,  getAccessTokenSilently } = useAuth0();
  const [response, setResponse] = useState(null);

  const testProtected = async () => {
    console.log('testing /api/protected');
    const res = await makeAuthRequest(getAccessTokenSilently, "api/protected");
    setResponse(res);
  };

  if (isLoading) return <div>Loading profile...</div>;
  if (!isAuthenticated || !user) return null;

  return (
    <div>
      <button onClick={testProtected}>Test Protected Route</button>
       <pre>
        {response ? JSON.stringify(response, null, 2) : "Click the button to test"}
      </pre>
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

