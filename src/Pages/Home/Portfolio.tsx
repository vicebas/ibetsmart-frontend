import {
  Tag,
  List,
  Statistic,
  Card,
  Row,
  Col,
  Divider,
  Flex,
  InputNumber,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PortfolioContext } from "../../context/PortfolioContext";
import {
  Portfolio as PortfolioType,
  BettableGame as GameType,
  GamesBookmarkers,
} from "../../interfaces";
import Loading from "../../Components/Loading";
import { id } from "../../interfaces/generic.interface";
import Title from "antd/es/typography/Title";
import moment from "moment";

const BookmarkerItem = ({
  game_bookmarker,
  bet_reccomendation,
}: {
  game_bookmarker: GamesBookmarkers;
  bet_reccomendation: number;
}) => {
  const { bookmarker, team_1_odd, team_2_odd } = game_bookmarker;
  const odd = bet_reccomendation > 0 ? team_1_odd : team_2_odd;
  return (
    <List.Item>
      <List.Item.Meta title={bookmarker.name} description={odd} />
    </List.Item>
  );
};

const GameCard = ({
  game,
  budget,
  isBudget,
}: {
  game: GameType;
  budget: number;
  isBudget: boolean;
}) => {
  const { team_1, team_2, date, competition, geolocation, sport } = game;
  const baseValue = isBudget ? budget : 100;
  const game_statistic = game.game_statistics[0];
  let bookmarkers = game.my_bookmarkers.length
    ? game.my_bookmarkers
    : game.game_bookmarkers;
  bookmarkers = bookmarkers.sort((a, b) => {
    const odd_a =
      game_statistic.bet_reccomendation > 0 ? a.team_1_odd : a.team_2_odd;
    const odd_b =
      game_statistic.bet_reccomendation > 0 ? b.team_1_odd : b.team_2_odd;
    return odd_b - odd_a;
  });
  return (
    <List.Item>
      <Card
        title={`${team_1.name} vs ${team_2.name}`}
        styles={{
          body: {
            paddingTop: 0,
          },
        }}
      >
        <p>
          {returnName(sport)} - {returnName(competition)}
          <br />
          {returnName(geolocation)}
          <br />
          {moment(date).format("DD/MM/YYYY HH:mm")}
        </p>
        <Title level={5}>
          Bet on{" "}
          {game_statistic.bet_reccomendation > 0 ? team_1.name : team_2.name}
        </Title>
        <Row>
          <Col span={16}>
            <Statistic
              title={"Prediction Confidence Margin"}
              value={game_statistic.pcm_game * 100}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              suffix="%"
            />
          </Col>
          <Col>
            <Statistic
              title="Bet Value"
              value={baseValue * game.bet_value}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={isBudget ? "$" : ""}
              suffix={isBudget ? "" : "%"}
            />
          </Col>
        </Row>
        <Divider />
        {game.my_bookmarkers.length > 0 && <span>Your Bookmarkers</span>}

        {game.my_bookmarkers.length === 0 && <span>Any Bookmarkers</span>}
        <List
          size="small"
          grid={{ gutter: 16, column: 3 }}
          dataSource={bookmarkers}
          renderItem={(item) => (
            <BookmarkerItem
              game_bookmarker={item}
              bet_reccomendation={game_statistic.bet_reccomendation}
            />
          )}
        />
      </Card>
    </List.Item>
  );
};

const returnName = (obj: { name: string } | id) => {
  if (typeof obj === "object") {
    return obj.name;
  }
  return obj;
};

const PortfolioCategories = ({ portfolio }: { portfolio: PortfolioType }) => {
  const { sports, geolocations, competitions, teams } = portfolio;

  const categories = [];
  if (sports.length > 0) {
    categories.push(sports.map((s) => <Tag color="blue">{returnName(s)}</Tag>));
  }
  if (geolocations.length > 0) {
    categories.push(
      geolocations.map((g) => <Tag color="red">{returnName(g)}</Tag>),
    );
  }
  if (competitions.length > 0) {
    categories.push(
      competitions.map((c) => <Tag color="green">{returnName(c)}</Tag>),
    );
  }
  if (teams.length > 0) {
    categories.push(
      teams.map((t) => <Tag color="purple">{returnName(t)}</Tag>),
    );
  }

  return <p>{categories}</p>;
};

const BudgetCard = ({
  budget,
  setBudget,
  checkBudget,
  setCheckBudget,
}: {
  budget: number;
  setBudget: (budget: number) => void;
  checkBudget: boolean;
  setCheckBudget: (checkBudget: boolean) => void;
}) => {
  return (
    <Card type="inner" style={{ padding: 0, maxWidth: 300 }}>
      <Row>
        <Col span={12}>
          <Title level={5} style={{ marginTop: 0 }}>
            Budget
          </Title>
        </Col>
        <Col span={12}>
          <Switch
            checked={checkBudget}
            onChange={(checked) => setCheckBudget(checked)}
          />
        </Col>
      </Row>
      <InputNumber
        addonBefore="$"
        defaultValue={budget}
        onChange={(value) => setBudget(value as number)}
        disabled={!checkBudget}
        controls
      />
    </Card>
  );
};

const Portfolio = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
  }
  const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
  const [budget, setBudget] = useState<number>(100);
  const [checkBudget, setCheckBudget] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<GameType[]>([]);
  const { getPortfolio } = React.useContext(PortfolioContext);

  useEffect(() => {
    async function fetchData() {
      if(!id) return;
      const portfolio = await getPortfolio(id);
      setPortfolio(portfolio.portfolio);
      setGames(portfolio.games);
      setLoading(false);
    }

    fetchData();
  }, [getPortfolio]);

  if (loading) {
    return <Loading />;
  }
  const totalBetValue = games.reduce((acc, game) => {
    return acc + game.bet_value;
  }, 0);
  return (
    <Flex vertical style={{ padding: "0px 40px" }}>
      <Title level={3}>{portfolio?.name}</Title>
      <PortfolioCategories portfolio={portfolio!} />
      <Flex gap={10}>
        <BudgetCard
          budget={budget}
          setBudget={setBudget}
          checkBudget={checkBudget}
          setCheckBudget={setCheckBudget}
        />
        {checkBudget && (
          <Card>
            <Statistic
              title="Total Bet"
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={"$"}
              value={totalBetValue * budget}
            />
          </Card>
        )}
      </Flex>
      <Divider />

      <Row gutter={16}>
        {games.map((game, key) => (
          <Col span={8}>
            <GameCard
              key={key}
              game={game}
              budget={budget}
              isBudget={checkBudget}
            />
            <Divider />
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default Portfolio;
