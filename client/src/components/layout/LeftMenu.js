import React, { Component } from "react";
import { Menu, Icon, Dropdown, Button } from "antd";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
);

class StaffLeftMenu extends Component {
  render() {
    return (
      <Menu mode="vertical">
        <Menu.Item key="audits">
          <NavLink to="/auditlist">Audits</NavLink>
        </Menu.Item>

        {/* <SubMenu key="sub1" title={<span>Create Audit</span>}>
          <Menu.Item key="fbchecklist">
            <NavLink to="/checklistFB">FB Audit List</NavLink>
          </Menu.Item>
          <Menu.Item key="nonfbchecklist">
            <NavLink to="/checklistNonFB">Non-FB Audit List</NavLink>
          </Menu.Item>
        </SubMenu> */}

        <Menu.Item key="createtenant">
          <NavLink to="/createtenant">Create Tenant</NavLink>
        </Menu.Item>

        <Menu.Item key="directory">
          <NavLink to="/directory">Directory</NavLink>
        </Menu.Item>

        <Menu.Item key="viewaudit">
          <NavLink to="/viewaudit">View Audit</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

class TenantLeftMenu extends Component {
  render() {
    return (
      <Menu mode="vertical">
        <Menu.Item key="tenanthome">
          <NavLink to="/tenant">Tenant Home</NavLink>
        </Menu.Item>

        <Menu.Item key="editaudit">
          <NavLink to="/tenant/editaudit">Edit Audit</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

class LeftMenu extends Component {
  render() {
    if (this.props.auth.user.usertype === "staff") {
      return <StaffLeftMenu />;
    } else if (this.props.auth.user.usertype === "tenant") {
      return <TenantLeftMenu />;
    } else return <div></div>;
  }
}

LeftMenu.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(LeftMenu);
