import React, { useEffect } from "react";
import {
  Portfolio as PortfolioType,
  BettableGame as GameType,
} from "../interfaces";
import api from "../Api";
import Loading from "../Components/Loading";

type PortfolioStateType = {
  getPortfolios: (forceReload?: boolean) => Promise<PortfolioType[]>;
  getGames: (portfolioId: string, forceReload?: boolean) => Promise<GameType[]>;
  getPortfolio: (
    portfolioId: string,
  ) => Promise<{ portfolio: PortfolioType; games: GameType[] }>;
};

type PortfolioProviderProps = {
  children: React.ReactNode;
};

const initialState: PortfolioStateType = {
  getPortfolios: async () => [],
  getGames: async () => [],
getPortfolio: async () => ({ portfolio: {} as PortfolioType, games: [] }),
};

const PortfolioContext = React.createContext<PortfolioStateType>(initialState);

const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [portfolios, setPortfolios] = React.useState<PortfolioType[]>([]);
  const [games, setGames] = React.useState<Record<string, GameType[]>>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const getPortfolios = async (forceReload: boolean = false) => {
    if (forceReload || portfolios.length === 0) {
      const data = (await api.getSubscribed()).data as PortfolioType[];
      setPortfolios(data);
      return data;
    }
    return portfolios;
  };

  const getGames = async (
    portfolioId: string,
    forceReload: boolean = false,
  ) => {
    if (forceReload || !games[portfolioId]) {
      const data = (await api.getPortfolioBets(portfolioId)).data as GameType[];
      setGames({ ...games, [portfolioId]: data });
      return data;
    }
    return games[portfolioId];
  };
  const getPortfolio = async (portfolioId: string) => {
    const portfolio = (await api.getPortfolio(portfolioId)).data as PortfolioType;
    const games = await getGames(portfolioId);
    return { portfolio, games };
  }
  useEffect(() => {
    getPortfolios()
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [getPortfolios]);
  return (
    <PortfolioContext.Provider
      value={{
        getPortfolios,
        getGames,
        getPortfolio,
      }}
    >
      {loading && <Loading />}
      {error && <div>{error}</div>}
      {!loading && children}
    </PortfolioContext.Provider>
  );
};

export { PortfolioProvider, PortfolioContext };
