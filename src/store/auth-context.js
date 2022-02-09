import React from "react";

// AuthContext is an object who can contain a component
const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
