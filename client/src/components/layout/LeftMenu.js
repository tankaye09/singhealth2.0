import React, { Component } from "react";
import { Menu, Icon, Dropdown, Button } from "antd";
import { NavLink } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const CreateAuditMenu = (
  <Menu>
    <Menu.Item key="fbchecklist">
      <NavLink to="/checklist">FB Audit List</NavLink>
    </Menu.Item>

    <Menu.Item key="nonfbchecklist">
      <NavLink to="/ChecklistNonFB">Non-FB Audit List</NavLink>
    </Menu.Item>

  </Menu>
)

class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">

        <Menu.Item key="audits">
          <NavLink to="/auditlist">Audits</NavLink>
        </Menu.Item>


        <SubMenu key="sub1" title={<span>Create Audit</span>}>
        <Menu.Item key="fbchecklist">
      <NavLink to="/checklistFB">FB Audit List</NavLink>
    </Menu.Item>
    <Menu.Item key="nonfbchecklist">
      <NavLink to="/checklistNonFB">Non-FB Audit List</NavLink>
    </Menu.Item>
          </SubMenu>


        <Menu.Item key="directory">
          <NavLink to="/directory">Directory</NavLink>
        </Menu.Item>

      </Menu>
    );
  }
}
export default LeftMenu;



