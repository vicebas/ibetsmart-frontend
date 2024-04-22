import React, {createContext, useEffect, useState, FC, useCallback} from "react";
import { Spinner } from '@chakra-ui/react';
import api from "../Api";
import {Competition, Sport, Team, Geolocation} from "../interfaces";


type CategoryContextProps = {
    children: React.ReactNode;
}

type CategoriesState = {
    getSports: (forceReload?: boolean) => Promise<Sport[]>;
    getTeams: (forceReload?: boolean) => Promise<Team[]>;
    getCompetitions: (forceReload?: boolean) => Promise<Competition[]>;
    getGeolocations: (forceReload?: boolean) => Promise<Geolocation[]>;
    getTeamsPerSport: (sport: string, forceReload?: boolean) => Promise<Team[]>;
    getCompetitionsPerSport: (sport: string, forceReload?: boolean) => Promise<Competition[]>;
}

export const CategoryContext = createContext<CategoriesState >({
    getSports: async () => [],
    getTeams: async () => [],
    getCompetitions: async () => [],
    getGeolocations: async () => [],
    getTeamsPerSport: async () => [],
    getCompetitionsPerSport: async () => [],
});

export const CategoryProvider: FC<CategoryContextProps> = ({ children }) => {
    const [sports, setSports] = useState<Sport[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [geolocations, setGeolocations] = useState<Geolocation[]>([]);
    const [teamsPerSport, setTeamsPerSport] = useState<Record<string, Team[]>>({});
    const [competitionsPerSport, setCompetitionsPerSport] = useState<Record<string, Competition[]>>({});
    const [loading, setLoading] = useState(false);

     
    const getSports = useCallback(async (forceReload : boolean = false) => {
        if (sports.length === 0 || forceReload) {
            const data = (await api.getSports()).data as Sport[];
            setSports(data);
            return data;
        }
        return sports;
    },[] )
    const getTeams = useCallback(async (forceReload : boolean = false) => {
        if (teams.length === 0 || forceReload) {
            const data = (await api.getTeams()).data as Team[];
            setTeams(data);

            return data;
        }
        return teams;
    }, [])

    const getCompetitions = useCallback(async (forceReload : boolean = false) => {
        if (competitions.length === 0 || forceReload) {
            const data = (await api.getCompetitions()).data as Competition[];
            setCompetitions(data);
            return data;
        }
        return competitions;
    },[])

    const getGeolocations = useCallback(async (forceReload : boolean = false) => {
        if (geolocations.length === 0 || forceReload) {
            const data = (await api.getGeolocations()).data as Geolocation[];
            setGeolocations(data);
            return data;
        }
        return geolocations;
    }, [])

    const getTeamsPerSport = async (sport: string, forceReload : boolean = false) => {

        if(teamsPerSport[sport] && !forceReload) {
            return teamsPerSport[sport];
        }
        const data = await getTeams(forceReload);
        const sports = await getSports(forceReload);
        const teamsPerSportLocal: Record<string, Team[]> = {}
        sports.forEach(sport => {
            teamsPerSportLocal[sport.slug] = data.filter(team => team.sport.slug === sport.slug);
        })
        setTeamsPerSport(teamsPerSport);
        return teamsPerSportLocal[sport];
    }

    const getCompetitionsPerSport = async (sport: string, forceReload : boolean = false) => {
        if(competitionsPerSport[sport] && !forceReload) {
            return competitionsPerSport[sport];
        }
        const data = await getCompetitions(forceReload);
        const sports = await getSports(forceReload);
        const competitionsPerSportLocal: Record<string, Competition[]> = {}
        sports.forEach(sport => {
            competitionsPerSportLocal[sport.slug] = data.filter(competition => competition.sport.slug === sport.slug);
        })
        setCompetitionsPerSport(competitionsPerSportLocal);
        return competitionsPerSport[sport];
    }

    useEffect(() => {
       const loadData =  async () => {
           await getSports(false);
           await getTeams(false);
           await getCompetitions(false);
           await  getGeolocations(false);
        }
        loadData().finally(() => setLoading(false))

    }, [getCompetitions, getGeolocations, getSports, getTeams]);

    return (
        <CategoryContext.Provider value={{ getSports, getTeams, getCompetitions, getGeolocations, getTeamsPerSport, getCompetitionsPerSport }}>
            {loading && <Spinner />}
            {!loading && children}
        </CategoryContext.Provider>
    )
}