import {useEffect, useState} from "react";
import {Portfolio as PortfolioType} from "../../interfaces/";
import {Game as GameType, Sport as SportType, Competition as CompetitionType} from "../../interfaces/";
import api from "../../Api";
import {useParams} from "react-router-dom";
import Loading from "../../Components/Loading.tsx";
import Meta from "antd/es/card/Meta";
import {Card, Col, Divider, Grid, Row, Statistic} from "antd";
import {Tag, Table} from "antd";

import moment from 'moment';

const GameCard = ({game}: { game: GameType }) => {
    const sport = (game.sport as SportType).name ? (game.sport as SportType).name : game.sport;
    const team1 = game.team_1.name;
    const team2 = game.team_2.name;
    const competition = (game.competition as CompetitionType).name ? game.competition.name : game.competition;
    const geolocation = (game.geolocation as CompetitionType).name ? game.geolocation.name : game.geolocation;
    const body = `${team1} x ${team2}`;
    const game_statistics = game.game_statistics[0]
    return <><Card title={`${sport}: ${competition}`}>
        <Meta title={body} description={`${geolocation} - ${moment(game.date).format('MMMM Do YYYY, h:mm:ss a')}`}/>
        <Divider/>
        <Row>
            <Col span={12}>
            <Card bordered={false}>

                {game_statistics && <Statistic
                    title={game_statistics["bet_reccomendation"] > 0 ? `Bet Reccomendation: ${team1}` : `Bet Reccomendation: ${team2}`}
                    value={parseFloat(game_statistics["pcm_game"]) * 100}
                    precision={2}
                    valueStyle={{color: '#3f8600'}}
                    suffix="%"
                />}
            </Card>
            </Col><Col span={12}>
            <Card bordered={false}>

                {game_statistics && <Statistic
                    title={game_statistics["bet_reccomendation"] > 0 ? `Bet Reccomendation: ${team1}` : `Bet Reccomendation: ${team2}`}
                    value={parseFloat(game_statistics["pcm_game"]) * 100}
                    precision={2}
                    valueStyle={{color: '#3f8600'}}
                    suffix="%"
                />}
            </Card>
        </Col>
        </Row>

    </Card></>;
}

const Portfolio = () => {
    const {id} = useParams();
    const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState<GameType[]>([]);

    const getPortfolio = async () => {
        const data = (await api.getPortfolio(id)).data as PortfolioType;
        setPortfolio(data);
    }
    const getPortfolioGames = async () => {
        const data = (await api.getPortfolioGames(id)).data as GameType[];
        setGames(data);
    }
    useEffect(() => {
        async function fetchData() {
            await getPortfolio();
            await getPortfolioGames();
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <Loading/>
    }

    return (
        <div>
            <h1>{portfolio?.name}</h1>
            {!!portfolio?.sports.length && (
                <h3>Sports: <Tag>{portfolio?.sports.map(sport => (sport as SportType).name ? (sport as SportType).name : sport).join(", ")}</Tag>
                </h3>
            )}
            {!!portfolio?.teams.length && (
                <h3>Teams: <Tag>{portfolio?.teams.map(team => (team as SportType).name ? (team as SportType).name : team).join(", ")}</Tag>
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
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {games.map((game, key) => (
                    <Col span={12}>
                        <GameCard game={game}/>
                        <Divider/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Portfolio;