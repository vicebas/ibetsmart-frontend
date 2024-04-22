import React, { createContext, useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react';
import { toast } from "react-toastify";
import api from "../Api";
import { AxiosError, AxiosResponse } from "axios";
import {User} from "../interfaces/User.interface.ts";


type LoginData = {
    email: string;
    password: string;
}

type SignupData = {
    name: string;
    email: string;
    password: string;
}

type ContextType = {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    handleLogin: (data: LoginData) => void;
    handleSignup: (data: SignupData) => void;
    logout: () => void;
    updateUser: (data: User) => void;
}

const defaultContext: ContextType = {
    user: null,
    loading: true,
    isAuthenticated: false,
    handleLogin: () => {},
    handleSignup: () => {},
    logout: () => {},
    updateUser: () => {}
}

const UserContext = createContext(defaultContext);

type UserProviderProps = {
    children: React.ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }
        api.getCurrentUser().then((response: AxiosResponse) => {
            setUser(response.data);
            setIsAuthenticated(true);
            setLoading(false);
        }).catch((error: AxiosError) => {
            console.error(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const handleLogin = (data: LoginData) => {
        api.login(data).then((response: AxiosResponse) => {
            setUser(response.data);
            console.log(response.data);
            setIsAuthenticated(true);
            localStorage.setItem('token', response.data.access);
            api.getCurrentUser().then((response: AxiosResponse) => {
                setUser(response.data);
            })
            navigate('/');
        }).catch((error: AxiosError) => {
            if(error.response?.status === 401) {
                toast('Invalid credentials', {type: 'error'})
            }

            console.error(error);
        });
    }

    const handleSignup = (data: SignupData) => {
        api.register(data).then((response: AxiosResponse) => {
            console.log(response.data);
            navigate('/login');

        }).catch((error: AxiosError) => {
            if(error.response?.status === 400){
                // @ts-expect-error I dont know why AxiosError is return response as unknown
                if(error.response?.data['error']) {
                    // @ts-expect-error I dont know why AxiosError is return response as unknown
                    toast(error.response.data['error'], {type: 'error'})
                }
            }
        });
    }

    const updateUser = (data: User) => {
        console.log(data);
        toast('Pending Implementation', {type: 'error'})
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    }

    return (
        <UserContext.Provider value={{
            user,
            loading,
            isAuthenticated,
            handleLogin,
            handleSignup,
            logout,
            updateUser
        }}>
            {loading && <Spinner/>}
            {!loading && children}
        </UserContext.Provider>
    );
}

export default UserContext;