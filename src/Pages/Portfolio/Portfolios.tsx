import { useEffect, useState } from "react";
import api from "../../Api";
import {
  Competition,
  Portfolio,
  Team,
  Geolocation,
  Sport,
} from "../../interfaces";
import Loading from "../../Components/Loading.tsx";
import {
  Card,
  Col,
  Tag,
  Row,
  List,
  Divider,
  Flex,
  Typography,
  Checkbox,
  CheckboxProps,
} from "antd";
import { Link } from "react-router-dom";
import { BookFilled, CheckCircleTwoTone } from "@ant-design/icons";

const { Title } = Typography;

const PortfolioItem = ({ portfolio }: { portfolio: Portfolio }) => {
  const [checked, setChecked] = useState(portfolio.userData ?? false);
  const [loading, setLoading] = useState(false);
  const label = checked ? "Sign|ed" : "Sign";

  if (!portfolio || !portfolio.id) return null;

  const onChange: CheckboxProps["onChange"] = (e) => {
    if (!portfolio || !portfolio.id) return;
    setLoading(true);
    api.subscribePortfolio(portfolio.id.toString()).then(() => {
      setChecked(true);
      setLoading(false);
    });
  };

  const CheckBox = checked ? (
    <CheckCircleTwoTone twoToneColor="#52c41a" />
  ) : (
    <Checkbox checked={checked} disabled={loading} onChange={onChange}>
      {label}
    </Checkbox>
  );

  return (
      <List.Item
        style={{ border: "1px solid #ccc" }}
        key={portfolio.id}
        actions={[CheckBox]}
      >
        <List.Item.Meta
          avatar={<BookFilled />}
          title={portfolio.name}
          description={
            <div>
              <p>
                {portfolio.sports.length > 0 && (
                  <span>
                    {" "}
                    Sports:{" "}
                    {portfolio.sports.map((sport) => (
                      <Tag>{(sport as Sport).name ?? sport.toString}</Tag>
                    ))}
                  </span>
                )}
              </p>
              <p>
                {portfolio.teams.length > 0 && (
                  <span>
                    {" "}
                    Teams:{" "}
                    {portfolio.teams.map((team) => (
                      <Tag>
                        {(team as Team).name
                          ? (team as Team).name
                          : team.toString()}
                      </Tag>
                    ))}
                  </span>
                )}
              </p>
              <p>
                {portfolio.competitions.length > 0 && (
                  <span>
                    {" "}
                    Competitions:{" "}
                    {portfolio.competitions.map((competition) => (
                      <Tag>
                        {(competition as Competition).name
                          ? (competition as Competition).name
                          : competition.toString()}
                      </Tag>
                    ))}
                  </span>
                )}
              </p>
              <p>
                {portfolio.geolocations.length > 0 && (
                  <span>
                    {" "}
                    Geolocations:{" "}
                    {portfolio.geolocations.map((geolocation) => (
                      <Tag>
                        {(geolocation as Geolocation).name
                          ? (geolocation as Geolocation).name
                          : geolocation.toString()}
                      </Tag>
                    ))}
                  </span>
                )}
              </p>
            </div>
          }
        />
      </List.Item>
  );
};

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const getPortfolios = async () => {
    const data = (await api.getPortfolios()).data as Portfolio[];
    setPortfolios(data);
    setLoading(false);
  };

  useEffect(() => {
    getPortfolios();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Flex vertical style={{ padding: "0px 40px" }}>
      <Title level={2}>Portfolios</Title>
      <Divider />
      <Card style={{ margin: "0 40px" }}>
        <List size="small" style={{ padding: "" }}>
          {portfolios.map((portfolio) => (
            <PortfolioItem key={portfolio.id} portfolio={portfolio} />
          ))}
        </List>
      </Card>
    </Flex>
  );
};

export default Portfolios;
