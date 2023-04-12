import React, { useContext, useEffect, useState } from 'react';
// Import your authentication context here

function UserProfile() {
  const authContext = useContext(/* Your authentication context */);
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
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
