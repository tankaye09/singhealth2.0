import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Recaptcha from "react-recaptcha";

import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// HAZEL: for testing change to true
const recaptchaOn = false;

class Login extends Component {
  constructor() {
    super();
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      isVerified: false,
      email: "",
      password: "",
      usertypebool: false,
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.usertype === "staff") {
        this.props.history.push("/auditlist");
      } else if (this.props.auth.user.usertype === "tenant") {
        this.props.history.push("/tenant");
      }
    }
    if (!recaptchaOn) {
      this.setState({
        isVerified: true,
      });
    }
  }
  // might be deprecated
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (this.props.auth.user.usertype === "staff") {
        this.props.history.push("/auditlist"); // push staff to auditlist when they login
      } else if (this.props.auth.user.usertype === "tenant") {
        this.props.history.push("/tenant");
      }
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onCheckboxChange = (e) => {
    this.setState({ usertypebool: !this.state.usertypebool });
  };

  onFinish = (values) => {
    // console.log(values);
    // Process checkbox boolean to usertype string
    if (!this.state.isVerified) {
      alert("Please verify you are human");
    } else {
      window.recaptcha = null;
      var { usertype } = "";
      if (this.state.usertypebool) {
        usertype = "staff";
      } else {
        usertype = "tenant";
      }
      const userData = {
        email: values.email,
        password: values.password,
        usertype: usertype,
      };
      console.log(values);

      this.props.loginUser(userData, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    }
  };

  recaptchaLoaded() {
    console.log("captcha loaded");
  }

  verifyCallback(response) {
    if (response) {
      this.setState({ isVerified: true });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Form
          onFinish={this.onFinish}
          name="normal_login"
          className="login-register-form"
        >
          <h2>Welcome to SingHealth Audit</h2>
          <p>Enter your email and password to log in </p>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound,
              })}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect,
              })}
            />
          </Form.Item>

          <Form.Item name="usertypebool">
            <Checkbox
              onChange={this.onCheckboxChange}
              value={this.state.usertypebool}
              error={errors.usertypebool}
              id="usertypebool"
            >
              Singhealth Staff Member?
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              id="login-button"
              type="primary"
              htmlType="submit"
              className="login-register-form-button"
            >
              Log in
            </Button>
            New staff member? <Link to="/Register">Register here!</Link>
          </Form.Item>
        </Form>
        <Recaptcha
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          render="explicit"
          onloadCallback={console.log("onloadCallback")}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
