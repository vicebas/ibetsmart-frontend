import {useCallback, useEffect, useState} from "react";
import {Geolocation, Portfolio as PortfolioType, Team} from "../../interfaces/";
import {Game as GameType, Sport as SportType, Competition as CompetitionType} from "../../interfaces/";
import api from "../../Api";
import {useParams, Link} from "react-router-dom";
import Loading from "../../Components/Loading.tsx";
import {Button, List} from "antd";
import {Tag} from "antd";

import moment from 'moment';

const GameCard = ({game}: { game: GameType }) => {
    const sport = (game.sport as SportType).name ? (game.sport as SportType).name : game.sport;
    const team1 = game.team_1.name;
    const team2 = game.team_2.name;
    const competition = (game.competition as CompetitionType).name ? (game.competition as CompetitionType).name  : game.competition;
    const geolocation = (game.geolocation as Geolocation).name ? (game.geolocation as Geolocation).name : game.geolocation;
    const body = `${team1} x ${team2}`;
    return (<List.Item>
            <List.Item.Meta
                title={
                    <Link to={`/game/${game.id}`}>{body} - {`${sport}: ${competition}`} - {geolocation.toString()}</Link>}
                description={moment(game.date).format('MMMM Do YYYY, h:mm:ss a')}
            />
        </List.Item>)
}

const Portfolio = () => {
    const {id} = useParams();
    const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState<GameType[]>([]);

    const getPortfolio = useCallback(async () => {
        if(!id) return;
        const data = (await api.getPortfolio(id)).data as PortfolioType;
        setPortfolio(data);
    }, [id])
    const getPortfolioGames = useCallback(async () => {
        if(!id) return;

        const data = (await api.getPortfolioGames(id)).data as GameType[];
        const sorted = data.sort((g1, g2) => {
            const g1_stat = g1.game_statistics?.pop();
            const g2_stat = g2.game_statistics?.pop();
            if(!g1_stat) return -1;
            if(!g2_stat) return 1;
            return g1_stat.pcm_game - g2_stat.pcm_game;
        });
        setGames(sorted);
    },[id])
    useEffect(() => {
        async function fetchData() {
            await getPortfolio();
            await getPortfolioGames();
            setLoading(false);
        }

        fetchData();
    }, [getPortfolioGames, getPortfolio]);

    if (loading) {
        return <Loading/>
    }
    console.log(portfolio, games)
    return (
        <div>
            <h1>{portfolio?.name}</h1>
            <Button>Sign Portfolio</Button>
            {!!portfolio?.sports.length && (
                <h3>Sports: <Tag>{portfolio?.sports.map(sport => (sport as SportType).name ? (sport as SportType).name : sport).join(", ")}</Tag>
                </h3>
            )}
            {!!portfolio?.teams.length && (
                <h3>Teams: <Tag>{portfolio?.teams.map(team => (team as Team).name ? (team as Team).name : team).join(", ")}</Tag>
                </h3>
            )}
            {!!portfolio?.competitions.length && (
                <h3>Competitions: <Tag>{portfolio?.competitions.map(competition => (competition as CompetitionType).name ? (competition as CompetitionType).name : competition).join(", ")}</Tag>
                </h3>
            )}
            {!!portfolio?.geolocations.length && (
                <h3>Geolocations: <Tag>{portfolio?.geolocations.map(geolocation => (geolocation as CompetitionType).name ? (geolocation as CompetitionType).name : geolocation).join(", ")}</Tag>
                </h3>
            )}
            <h2>Games</h2>
            <List gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {games.map((game, key) => (
                        <GameCard key={key} game={game}/>
                ))}
            </List>
        </div>
    )
}

export default Portfolio;