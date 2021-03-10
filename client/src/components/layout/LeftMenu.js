import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <NavLink to="/auditlist">Audits</NavLink>
        </Menu.Item>
        <Menu.Item key="mail">
          <NavLink to="/checklist">Create Audit</NavLink>
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="">Directory</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
