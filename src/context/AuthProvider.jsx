import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import {
  getLocalstorageData,
  removeLocalstorageData,
} from "../localstorage/localstorage";
import useAxios from "../hooks/useAxios/useAxios";

export const Context = createContext();

const AuthProvider = ({ children }) => {
  const [newUser, setNewUser] = useState();
  const [loading, setLoading] = useState(true);
  const [cartAddCount, setCartAddCount] = useState(0);
  const [cartArray, setCartArray] = useState([]);
  const rootAxios = useAxios();
  const localData = getLocalstorageData();

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

  const postLocalDataInDB = (email) => {
    console.log(email);


    localData?.forEach((obj) => {
      const id = obj.cartId;
      obj.email = email
      delete obj.cartId;
      delete obj.available_number;
      delete obj.feedback;
      delete obj.piece;
      delete obj._id;

      rootAxios
        .post(`/cart?email=${email}`, obj)
        .then(() => {
          console.log(id);
          removeLocalstorageData(id);
          cartAddition();
        })
        .catch((error) => console.error("Error:", error));
    });
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
    postLocalDataInDB,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};

export default AuthProvider;
