import {Card, Flex, Statistic} from "antd";
import {useParams} from "react-router-dom";
import api from "../../Api";
import {GameWithoutIds as GameType} from "../../interfaces";
import {useCallback, useEffect, useState} from "react";
import Loading from "../../Components/Loading.tsx";
import { Divider, List, Typography } from 'antd';

import moment from "moment";
const { Title, Text } = Typography;

const Game = () => {
    const {id} = useParams();
    const [game, setGame] = useState<GameType | null>(null);
    const [loading, setLoading] = useState(true);

    const getGame = useCallback(async () => {
        if(!id) return;
        const data = (await api.getGame(id)).data as GameType;
        setGame(data);
    }, [id])

    useEffect(() => {
        getGame().then(() => setLoading(false));
    });
    if (loading)
        return (
            <Flex vertical>
                <Loading />
            </Flex>
        )
    if(!game)
        return (
            <Flex vertical>
                <Title level={3}>Game not found</Title>
            </Flex>
        )
    console.log(game);
    const game_statistics = game.game_statistics? game.game_statistics[0] : null;
    const {team_1: team1, team_2: team2, geolocation} = game;
    return (
        <Card title={`${game?.sport.name } - ${game?.competition.name}`} bordered={false}>
        <Flex vertical >
            <Title level={3}>{team1.name} X {team2.name}</Title>
            <Text >{moment(game.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
            <Title level={5}>{geolocation.name}</Title>
            {game_statistics && <Card bordered={false}>

                <Statistic
                    title={game_statistics["bet_reccomendation"] > 0 ? `Bet Reccomendation: ${team1.name}` : `Bet Reccomendation: ${team2.name}`}
                    value={game_statistics["pcm_game"] * 100}
                    precision={2}
                    valueStyle={{color: '#3f8600'}}
                    suffix="%"
                />

            </Card>}
            <Divider/>
            {game_statistics &&
                <><Title level={4}>Statistics</Title>
            <List
                size="small"
                bordered
                dataSource={Object.entries(game_statistics)}
                renderItem={([key, value]) => (
                    <List.Item>
                        <Text strong>{key}</Text> : {value}
                    </List.Item>
                )}
            /></>}
        </Flex>
</Card>
    )
}

export default Game;