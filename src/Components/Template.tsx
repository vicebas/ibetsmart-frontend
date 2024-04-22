import {Outlet} from "react-router-dom";
import React from "react";
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
        <Layout hasSider>
            <Sider
                style={{ overflow: 'auto', color:"white",    height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <Navbar/>
            </Sider>
            <Layout style={{marginLeft:200, padding:0, width:'-webkit-max-content', minHeight:"100vh", background: colorBgContainer}}>
                <Header style={{ padding: 0, background: "#242424", height: 80}} >
                    <h2 style={{ color: "white", textAlign: "center", padding: "0px 0px", borderRadius: borderRadiusLG }}>IBetSmart</h2>
                </Header>
                <Content style={{ margin: '0px 16px 0', overflow: 'initial', color: "#242424", }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
        </CategoryProvider>
    )
}
export default Template;

