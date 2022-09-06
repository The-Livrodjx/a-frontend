import  Router  from "next/router";
import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";

interface UserProviderProps {
  children: React.ReactNode
};

interface UserInterface {
  isAuthenticated: boolean;
  profileModalOpen: boolean;
  setAuthenticated: (value: boolean) => void;
  handleProfileModal: (value: boolean) => void;
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
  const [email, setEmail] = useState('')
  const [authToken, setAuthToken] = useState("");
  const [ 
    profileModalOpen, 
    setProfileModalOpen 
  ] = useState(false);

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const handleProfileImage = (value: string) => {
    const token = localStorage.getItem('token');
    
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    api.post(`/users/changeAvatar`, {
      email: email,
      profile_image: value
    }, httpOptions)
    .then(() => {
      setProfileImage(value);
      setProfileModalOpen(false);
    })
    .catch(err => {
      if(err.response.data && 
        err.response.data.statusCode === 401) 
          setProfileModalOpen(false); logout();
      Router.push('/')
    })
  };

  const handleProfileModal = (value: boolean) => {
    setProfileModalOpen(value);
  };

  const createUser = (body: CreateUser) => {
    return new Promise((resolve) => {
      api.post('/users/create', body)
        .then(response => {
          let data = response.data;
          setIsAuthenticated(true);
          setUsername(data.username);
          setEmail(data.email)
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
        let data = response.data;
        setIsAuthenticated(true);
        setProfileImage(data.profile_image);
        setEmail(data.email);
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
    setEmail("");
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
          setEmail(user.email);
        };
        setIsAuthenticated(response.data);
      });
  }, [])

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        profileModalOpen,
        setAuthenticated,
        profileImage,
        username,
        handleProfileImage,
        login,
        logout,
        createUser,
        handleProfileModal
      }}>
      {children}
    </UserContext.Provider >
  )
};