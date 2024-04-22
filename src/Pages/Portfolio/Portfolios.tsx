import {useContext, useEffect, useState} from "react";
import api from "../../Api";
import {Portfolio} from "../../interfaces";
import Loading from "../../Components/Loading.tsx";
import {Card, Col, Divider, Tag, Row} from "antd";
import {Link} from "react-router-dom";

const Portfolios = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);

    const getPortfolios = async () => {
        const data = (await api.getPortfolios()).data as Portfolio[];
        setPortfolios(data);
        setLoading(false);
    }

    useEffect(() => {
        getPortfolios();
    }, [])

    if(loading){
        return <Loading />
    }
    return (
        <div>
            <h1>Portfolios</h1>
            <Link to="/portfolios/new">Create new Portfolio</Link>
            <Row gutter={[24,32]}>
                {portfolios.map(portfolio => (
                    <>
                    <Col span={8}>
                        <Card size="small" title={portfolio.name} extra={<Link to={`/portfolios/${portfolio.id}`} >More</Link>} style={{ width: 300 }}>
                            <p>{portfolio.sports.length>0 &&
                                // @ts-ignore
                                <span> Sports: {portfolio.sports.map((sport) => <Tag>{(sport as Sport).name? (sport as Sport).name: sport}</Tag>)}</span>
                            }</p>
                            <p>{portfolio.teams.length>0 &&
                               <span> Teams: {portfolio.teams.map((team) => <Tag>{(team as Team).name? (team as Team).name: team}</Tag>)}</span>
                            }</p>
                            <p>{portfolio.competitions.length>0 &&
                                <span> Competitions: {portfolio.competitions.map((competition) => <Tag>{(competition as Competition).name? (competition as Competition).name: competition}</Tag>)}</span>
                            }</p>
                            <p>{portfolio.geolocations.length>0 &&
                                <span> Geolocations: {portfolio.geolocations.map((geolocation) => <Tag>{(geolocation as Geolocation).name? (geolocation as Geolocation).name: geolocation}</Tag>)}</span>
                            }</p>

                        </Card>
                    </Col>
                    </>
                ))}
            </Row>

        </div>
    )
}

export default Portfolios;