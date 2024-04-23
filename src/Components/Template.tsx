import {Outlet} from "react-router-dom";
import Navbar from "./Nav.tsx";
import { Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import { CategoryProvider } from "../context/CategoryContext.tsx";
import Sider from "antd/es/layout/Sider";


const colorBgContainer = '#f0f2f5';
const borderRadiusLG = '16px';
const Template = () => {
    return (
        <CategoryProvider>
        <Layout style={{height:"-webkit-fill-available"}}>
            <Header  style={{backgroundColor: "#f0f0f0", position: 'sticky', zIndex: 100,
          top: 0, height:"fit-content", padding:0, borderBottom: "1px solid #666"}}><Navbar/></Header>
            <Layout style={{ padding:0,margin:0, width:'-webkit-fill-available', minHeight:"-webkit-fill-available", background: colorBgContainer}}>

                <Content style={{ margin: '0px', overflow: 'initial',background:"#ccc",  color: "#242424", }}>

                    <Outlet />
                </Content>
            </Layout>
        </Layout>
        </CategoryProvider>
    )
}
export default Template;

