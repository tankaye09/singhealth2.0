import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="viewAudits">
          <NavLink to="/audits">Audits</NavLink>
        </Menu.Item>
        <Menu.Item key="create" >
          <NavLink to="/checklist">Create Audit</NavLink>
        </Menu.Item>
        <Menu.Item key="directory">
          <NavLink to="/directory">Directory</NavLink>
        </Menu.Item>
        <Menu.Item key="createTenant">
          <NavLink to="/createTenant">Create Tenant</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
