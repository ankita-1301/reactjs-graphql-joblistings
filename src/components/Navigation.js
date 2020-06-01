import React from "react";
import "../styles.css";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

const Navigation = props => {
  return (
    <Menu theme="dark" mode="horizontal" className="nav-menu" selectedKeys={[]}>
      <Menu.Item key="1">
        <NavLink to={`/`} />
        HOME
      </Menu.Item>
    </Menu>
  );
};
export default Navigation;
