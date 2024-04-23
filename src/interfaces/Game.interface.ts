import {id} from "./generic.interface.ts";
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

type GameStatistics = {
    game: number;
    number_of_bookmarkers: number;

    // odds team 1
    odds_highest_team_1: number;
    odds_mean_team_1: number;
    odds_median_team_1: number;
    odds_std_away_team_1: number;
    odds_se_team_1: number;
    odds_norm_se_team_1: number;
    implied_probability_simple_team_1: number;

    // odds team 2
    odds_highest_team_2: number;
    odds_mean_team_2: number;
    odds_median_team_2: number;
    odds_std_away_team_2: number;
    odds_se_team_2: number;
    odds_norm_se_team_2: number;
    implied_probability_simple_team_2: number;

    implied_probabilities_summed: number;

    implied_probability_totaliser_basis_team_1: number;
    implied_probability_totaliser_basis_team_2: number;

    // Prediction Confidence Margin
    pcm_home: number;
    pcm_away: number;
    pcm_game: number;
    nce_game: number;
    bet_reccomendation: number;
}

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