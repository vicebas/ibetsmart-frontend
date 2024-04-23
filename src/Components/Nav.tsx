import React from "react"
import { FaUserAlt, FaDoorOpen, FaMoneyCheckAlt} from "react-icons/fa";
import { Flex, Menu, MenuProps, Image, Col, Row} from "antd"
import {FaBuildingCircleCheck} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    type?: 'item',
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
        style: { color: '#000040', borderLeft:"0.1em  solid #bbb", boxShadow: "0px 0px 0px 0px"},
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', '/', <FaUserAlt />),
    getItem('Portfolios', '/portfolios', <FaMoneyCheckAlt/>),
    getItem('Bookmarkers', '/bookmarkers', <FaBuildingCircleCheck/>),
    getItem('Logout', '/logout', <FaDoorOpen />),
];

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key as string);
    };

    return (
        <Menu
            onClick={onClick}
            style={{marginBottom:0,border:0, backgroundColor: 'transparent', color: '#000090'}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="horizontal"
            items={items}
        />
    );
};

const Header: React.FC = () => {

  return <Flex vertical>
            <Row style={{borderBottom:"1px solid #999", boxShadow:"1px 0px 0px 0px"}}>
                <Col>
                    <Image src="logo.png" preview={false} alt="logo" height={30}  />
                </Col>
            </Row>
        <Navbar />
    </Flex>
}


export default Header;