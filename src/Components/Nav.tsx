import React from "react"
import { FaUserAlt, FaDoorOpen, FaMoneyCheckAlt} from "react-icons/fa";
import {Menu, MenuProps} from "antd"
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
        style: { color: 'white' },
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
            style={{ width: 256, backgroundColor: 'transparent', color: 'white'}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};

export default Navbar;