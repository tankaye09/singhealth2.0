import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import RightMenuLoggedIn from "./RightMenuLoggedIn";
import { Drawer, Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Logo from "SingHealthLogo.png";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      current: "mail",
      visible: false,
    };
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let rightMenu;
    if (this.props.auth.isAuthenticated) {
      rightMenu = <RightMenuLoggedIn />;
    } else {
      rightMenu = <RightMenu />;
    }
    return (
      <nav className="menuBar">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/7/78/SingHealth_Logo.png"
            className="img-partners"
            alt="SingHealth"
          />
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">{rightMenu}</div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Navbar);
