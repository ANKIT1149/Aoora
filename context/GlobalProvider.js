import { useContext, useEffect, createContext, useState } from "react";
import { getCurrentUser } from "../lib/Appwrite";

const Globalcontext = createContext();

export const useGlobalcontext = () => useContext(Globalcontext);

const GlobalProvider = ({ children }) => {
  const [isLoggedin, setIsloggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsloggedin(true);
          setUser(res);
        } else {
          setIsloggedin(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Globalcontext.Provider
      value={{ isLoading, setIsloggedin, isLoggedin, user, setUser }}
    >
      {children}
    </Globalcontext.Provider>
  );
};

export default GlobalProvider;