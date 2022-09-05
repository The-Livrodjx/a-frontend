import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";

interface UserProviderProps {
  children: React.ReactNode
};

interface UserInterface {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  profileImage: string;
  username: string;
  handleProfileImage: (value: string) => void;
  login: (email: string, pwd: string) => void;
  createUser: (body: CreateUser) => void;
  logout: () => void;
};

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export const UserContext = createContext({} as UserInterface);

export default function UserContextProvider({ children }: UserProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [authToken, setAuthToken] = useState("");

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const handleProfileImage = (value: string) => {
    setProfileImage(value);
  };

  const createUser = (body: CreateUser) => {
    return new Promise((resolve) => {
      api.post('/users/create', body)
        .then(response => {
          let data = response.data;
          setIsAuthenticated(true);
          setUsername(data.username);
          setAuthToken(data.token);
          localStorage.setItem('token', data.token);
          delete data.token;
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch((err) => {
          setIsAuthenticated(false);
          resolve({
            error: err.response.data.msg
          });
        });
    });
  };

  const login = (email: string, pwd: string) => {
    return new Promise((resolve) => {
      api.post(`/users/login`, {
        email,
        password: pwd
      }).then((response) => {
        console.log(response.data)
        let data = response.data;
        setIsAuthenticated(true);
        setProfileImage(data.profile_image);
        setUsername(data.username);
        setAuthToken(data.token);
        localStorage.setItem('token', data.token);
        delete data.token;
        localStorage.setItem('user', JSON.stringify(data));
        resolve(true);
      }).catch(_ => {
        setIsAuthenticated(false);
        resolve(false);
      })
    })
  };

  const logout = () => {
    setIsAuthenticated(false);
    setProfileImage("");
    setAuthToken("");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    api.get('/users/jwt', httpOptions)
      .then(response => {
        let user = JSON.parse(localStorage.getItem('user') || "{}");
        if (user) {
          setProfileImage(user.profile_image);
          setUsername(user.username);
        };
        setIsAuthenticated(response.data);
      });
  }, [])

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        profileImage,
        username,
        handleProfileImage,
        login,
        logout,
        createUser
      }}>
      {children}
    </UserContext.Provider >
  )
};