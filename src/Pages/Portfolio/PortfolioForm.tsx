import {useContext, useEffect, useState} from "react";
import {CategoryContext} from "../../context/CategoryContext.tsx";
import {Competition, Sport, Team, Geolocation, Portfolio as PortfolioType} from "../../interfaces";

import {Button, Checkbox, Form, FormProps, Input, Select} from 'antd';
import Loading from "../../Components/Loading.tsx";
import api from "../../Api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";



const PortfolioForm = () => {
    const {
        getSports,
        getTeams,
        getCompetitions,
        getGeolocations
    } = useContext(CategoryContext)
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [sports, setSports] = useState<Sport[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [geolocations, setGeolocations] = useState<Geolocation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const sports = await getSports();
            const teams = await getTeams();
            const competitions = await getCompetitions();
            const geolocations = await getGeolocations();
            setSports(sports);
            setTeams(teams);
            setCompetitions(competitions);
            setGeolocations(geolocations);
            setLoading(false);
        }
        fetchData();
    }, [getCompetitions, getGeolocations, getSports, getTeams]);




    if (loading)
        return <Loading />

    const onFinish: FormProps<PortfolioType>['onFinish'] = (values) => {
        const portfolio:PortfolioType = {
            sports: values.sports || [],
            teams: values.teams || [],
            competitions: values.competitions || [],
            geolocations: values.geolocations || [],
            name: values.name,
        }

        api.createPortfolio(portfolio).then(() =>  {
            toast("Portfolio created successfully")
            navigate('/portfolios')
        });
    };

    return (
        <Form
            onFinish={onFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the portfolio name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Sports"
                name="sports"
                rules={[{ required: true, message: 'Please select sports!' }]}
            >
                <Select mode={"multiple"} >
                    {sports.map(sport => <Select.Option value={sport.id}>{sport.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                label="Teams"
                name="teams"
                rules={[{ required: false, message: 'Please select teams!' }]}
            >
                <Select  mode={"multiple"}>
                    {teams.map(team => <Select.Option value={team.id}>{team.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                label="Competitions"
                name="competitions"
                rules={[{ required: false, message: 'Please select competitions!' }]}
            >
                <Select mode={"multiple"}>
                    {competitions.map(competition => <Select.Option value={competition.id}>{competition.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                label="Geolocations"
                name="geolocations"
                rules={[{ required: false, message: 'Please select geolocations!' }]}
            >
                <Select mode={"multiple"}>
                    {geolocations.map(geolocation => <Select.Option value={geolocation.id}>{geolocation.name}</Select.Option>)}
                </Select>
            </Form.Item>

            <Form.Item
                label="Genders"
                name="gender"
                rules={[{ required: false, message: 'Please select Gender!' }]}
            >

                <Checkbox.Group
                    options={['Masculine', 'Feminine', 'Mixed']}
                    defaultValue={[]}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        )
}

export default PortfolioForm;