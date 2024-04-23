import { PortfolioProvider } from "../../context/PortfolioContext"
import MyPortfolios  from "./Home"
import Portfolio from "./Portfolio"

const Home = () => {
    return (
        <PortfolioProvider>
            <MyPortfolios/>
        </PortfolioProvider>
    )
}

const PortfolioPage = () => {
    return (
        <PortfolioProvider>
            <Portfolio/>
        </PortfolioProvider>
    )
}
export default Home;
export {PortfolioPage};