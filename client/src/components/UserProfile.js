import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';


function UserProfile() {
  const authContext = useContext(AppContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authContext.user) {
      // Fetch user information from the API and update the state
      setUser(authContext.user);
    }
  }, [authContext.user]);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>This is where you can access you Profile and see your blogs, please sign up using the Register Link at Top!</p>
      )}
    </div>
  );
}

export default UserProfile;
