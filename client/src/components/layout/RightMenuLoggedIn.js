import React, { Component } from "react";
import { Menu, Icon, Button } from "antd";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class RightMenu extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;

    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Button onClick={this.onLogoutClick} type="text">
            Logout
          </Button>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="">Name of user</a>
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
