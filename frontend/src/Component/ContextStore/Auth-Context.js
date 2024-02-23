import React from "react";



const AuthContext = React.createContext({

  isToken: '',
  isLoggedIn: false,
  logIn: () => { },
  logOut: () => { },
})

export default AuthContext;
