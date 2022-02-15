import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import Counter from "./components/Counter";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const alreadyLogged = localStorage.getItem("logged");
    if (alreadyLogged === "1") {
      setIsLoggedIn(true);
      console.log("isLoggedIn useEffect", isLoggedIn);
    }
  }, [isLoggedIn]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("logged", "1");
    setIsLoggedIn(true);
    console.log("isLoggedIn", isLoggedIn);
  };

  const logoutHandler = () => {
    localStorage.removeItem("logged", "1");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      {/* <MainHeader onLogout={logoutHandler} /> */}
      <MainHeader />
      {/* <Counter /> */}
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
