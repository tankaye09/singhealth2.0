import React, { Component } from "react";
import { Menu, Icon, Button } from "antd";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class RightMenu extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    let url = "/accountinfo";
    if (user.usertype === "staff") {
      url = "/accountinfostaff";
    }

    return (
      <Menu mode="vertical">
        <Menu.Item key="mail">
          <NavLink onClick={this.onLogoutClick} to="/login">
            Logout
          </NavLink>
        </Menu.Item>
        <Menu.Item key="app">
          <NavLink to={url}>
            {user.name + "  "}
            <UserOutlined />
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}
RightMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(RightMenu);
