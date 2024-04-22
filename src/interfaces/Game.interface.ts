import {id, primitive} from "./generic.interface.ts";
import {Bookmarker} from "./Bookmarker.interface.ts";

type Sport = {
    id: id;
    name: string;
    slug: string;
};

type Competition = {
    id: id;
    name: string;
    sport: Sport;
};

type Geolocation = {
    id: id;
    name: string;
};



type GamesBookmarkers = {
    id: id;
    bookmarker: Bookmarker;
    team_1_odd: number;
    team_2_odd: number;
    draw_odd: number;
};

type Team = {
    id: id;
    name: string;
    sport: Sport;
};

type GameStatistics = {[key:string] : primitive };

type Game = {
    id: id;
    team_1: Team;
    team_2: Team;
    date: string;
    sport: Sport | id;
    gender: string;
    competition: Competition | id;
    geolocation: Geolocation | id;
    processed: boolean;
    statistics: GameStatistics; // Replace 'any' with the actual type if available
    game_statistics?: GameStatistics[];
};

export type {Sport, Competition, Geolocation, GamesBookmarkers, Team, GameStatistics, Game}