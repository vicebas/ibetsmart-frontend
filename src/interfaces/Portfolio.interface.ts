import {Competition, Sport, Team, Geolocation} from "./Game.interface.ts";
import {id} from "./generic.interface.ts";

export type Portfolio = {
    id?: id,
    name: string,
    teams: Team[] | id[],
    sports : Sport[] | id[],
    competitions : Competition[] | id[],
    geolocations : Geolocation[] | id[],
    gender? : string,
}


