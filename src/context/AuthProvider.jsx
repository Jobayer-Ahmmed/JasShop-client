import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

export const Context = createContext();

const AuthProvider = ({ children }) => {
  const [newUser, setNewUser] = useState();
  const [loading, setLoading] = useState(true);
  const [cartAddCount, setCartAddCount] = useState(0);
  const [cartArray, setCartArray] = useState([]);


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const cartAddition = () => {
    setCartAddCount(cartAddCount + 1);
  };






  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (myCurrentUser) => {
      setLoading(false);
      setNewUser(myCurrentUser);
    });
    return () => unSubscribe();
  }, []);

  const contextData = {
    newUser,
    login,
    logOut,
    createUser,
    loading,
    cartAddition,
    cartAddCount,
    cartArray,

  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};

export default AuthProvider;
