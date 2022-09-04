import { createContext, useState } from "react";
import { api } from "../api/api";

interface UserProviderProps {
  children: React.ReactNode
};

interface UserInterface {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  profileImage: string;
  handleProfileImage: (value: string) => void;
  login: (email: string, pwd: string) => void;
};

export const UserContext = createContext({} as UserInterface);

export function UserContextProvider({ children }: UserProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const handleProfileImage = (value: string) => {
    setProfileImage(value);
  };

  const login = (email: string, pwd: string) => {
    api.post(`/users/login`, {
      email,
      password: pwd
    }).then((response) => {
      console.log(response.data)
      setIsAuthenticated(true);
      setProfileImage(response.data.profile_image);
    })
  }

  return (
    <UserContext.Provider
      value={{
        isAuthenticated, 
        setAuthenticated,
        profileImage, 
        handleProfileImage,
        login
      }}>
      {children}
    </UserContext.Provider >
  )
};