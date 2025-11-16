import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  // const {user} = useAuth0();
  //  console.log("Current user", user);
  const { isAuthenticated, isLoading, error,user } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("Auth State:", {
  isAuthenticated,
  isLoading,
  user
  });
  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>You’re logged in</h2>
          <Profile />
          <LogoutButton />
        </>
      ) : (
        <>
          <p>Please sign in to continue</p>
          <LoginButton />
        </>
      )}
    </div>
  );

}


export default App;


