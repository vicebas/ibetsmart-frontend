import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {LoginData, SignupData} from "../interfaces/User.interface.ts";
import {Portfolio} from "../interfaces";

const BASE_URL =  import.meta.env.VITE_BASE_URL ?? 'https://backendibet.gamaliel.dev/api';
//const BASE_URL = 'https://backendibet.gamaliel.dev/api';

console.log(BASE_URL);

const api = axios.create({
    baseURL: BASE_URL,// replace with your API base URL
    headers: {
        'Content-Type': 'application/json'
    }
});


const login = (data: LoginData ) => api.post('/signin/', data);

const register = (data: SignupData) => api.post('/signup/', data);

const refreshToken = () => api.post('/token/refresh/', {refresh: localStorage.getItem('refresh')});

const getPrivateApi = () => {
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        }
    })
    instance.interceptors.response.use((response: AxiosResponse) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                const originalRequest = error.config as AxiosRequestConfig;

                return refreshToken().then((response) => {
                    localStorage.setItem('token', response.data.access);
                    if(originalRequest?.headers?.Authorization) {
                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                    }
                    return axios(originalRequest);
                }).catch(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    window.location.href = '/login';
                });
            }
            return Promise.reject(error);
        });
    return instance;
}
const getGames = () => getPrivateApi().get('/games/');

const getBookmarkers = () => getPrivateApi().get('/bookmarkers/')

const updateBookmarker = (bookmarkerId :string , active: boolean) => getPrivateApi().post(`/bookmarker/${bookmarkerId}/activate`, {active})

const getCurrentUser = () => getPrivateApi().get('/user/');

const getSports = () => getPrivateApi().get('/sports/')

const getCompetitions = (sport: string|undefined = undefined) => {
    const params = sport ? {sport} : {}
    return getPrivateApi().get('/competitions', {params})
}

const getTeams = (sport: string|undefined = undefined) =>{
    const params = sport ? {sport} : {}
    return getPrivateApi().get('/teams', {params})
}

const getGeolocations = () => getPrivateApi().get('/geolocations/')

const getPortfolios = () => getPrivateApi().get('/portfolio/')

const getPortfolio = (id: string) => getPrivateApi().get(`/portfolio/${id}/`)

const getPortfolioGames = (id: string) => getPrivateApi().get(`/portfolio/${id}/games`)


const createPortfolio = (data: Portfolio) => getPrivateApi().post('/portfolio/', data)



export default {login, register, getGames, getBookmarkers,
                updateBookmarker, getCurrentUser, getSports,
                 getCompetitions, getTeams, getGeolocations,
                 getPortfolios, getPortfolio, createPortfolio, getPortfolioGames};