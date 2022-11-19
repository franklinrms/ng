/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

type UserType = {
  username: string;
  balance: number;
};

type PropsUserContext = {
  user: UserType;
  getUser: () => void;
  token: string;
};

const DEFAULT_VALUE = {
  user: { username: "", balance: 0.0 },
  getUser: () => {},
  token: "",
};

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

interface UserProviderProps {
  children: React.ReactNode;
}
function UserContextProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState(DEFAULT_VALUE.user);

  const navigate = useNavigate();
  const goLogin = () => navigate("/login");

  const NGtoken = localStorage.getItem("NGtoken") || "";
  const token = JSON.parse(NGtoken || "");

  const getUser = async () => {
    try {
      const { data } = await api.get("/user", {
        headers: { authorization: token },
      });
      setUser(data);
    } catch (error) {
      goLogin();
    }
  };

  useEffect(() => {
    if (!NGtoken) {
      goLogin();
    } else {
      getUser();
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      getUser,
      token,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export { UserContextProvider };
export default UserContext;
