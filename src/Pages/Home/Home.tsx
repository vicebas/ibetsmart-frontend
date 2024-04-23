import { Card, Col, Divider, Flex, Row, Statistic } from 'antd';
import { Portfolio as PortfolioType, GameWithoutIds as  GameType,} from '../../interfaces';
import React, { useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { PortfolioContext } from '../../context/PortfolioContext';
import { Link } from 'react-router-dom';
type PortfolioCardProps = {
    portfolio: PortfolioType,
    games: GameType[]
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({portfolio, games}) => {
    return (
        <Link to={`/subscribed/${portfolio.id}`}>
        <Card title={portfolio.name} bordered={false} style={{ width: 300 }}>
                <div>
                    <Title level={4}>Games</Title>
                    <Row>
                        <Col span={12}>
                            <Statistic title="Total" value={games?.length ?? 0} />
                        </Col>
                        
                    </Row>
                </div>
      </Card>
      </Link>
    )
}

const Home = () => {
    const [portfolios, setPortfolios] = useState<PortfolioType[]>([]);
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState<Record<string, GameType[]>>({});

    const {getPortfolios, getGames} = React.useContext(PortfolioContext);

    const fetchPortfolios = async () => {
        const data = await getPortfolios();
        setPortfolios(data);
        await Promise.all(data.map(async (portfolio) => {
            if(portfolio.id){
                const games = await getGames(portfolio.id.toString());
                //@ts-expect-error i dont know what is happening here
                setGames({...games, [portfolio.id.toString()]: games});
            }
        }))
    }

    useEffect(() => {
        fetchPortfolios().finally(() => setLoading(false));
    }, []);

    if(loading)
        return (
            <Card>
                <Card loading={loading} />
            </Card>
        )
    const portfolio_games = portfolios.filter(portfolio =>games[portfolio.id]?.length > 0);
    return (
    <Flex vertical style={{ padding: "0px 40px" }}>
      <Title level={2}>Portfolios</Title>
      <Divider />
      <Title level={3}>With Games this week</Title>

      <Row>
          {portfolio_games.map((portfolio) => (
            <Col span={8}>
                <PortfolioCard key={portfolio.id} portfolio={portfolio} games={games[portfolio.id]} />
            </Col>
          ))}
        </Row>
        <Title level={3}>Without Games this week</Title>
        {portfolios.filter(portfolio => portfolio_games.filter(p => p.id === portfolio.id).length===0).map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} games={games[portfolio.id]} />
        ))}
    </Flex>
    );
}

export default Home;