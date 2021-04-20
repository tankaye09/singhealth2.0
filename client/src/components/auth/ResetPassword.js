import React, { Component } from "react";
import { Layout, Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import store from "../../store";

import Recaptcha from "react-recaptcha";
import { resetPassword } from "../../actions/authActions";
import { GET_MESSAGE } from "../../actions/types";

const { Header, Footer, Sider, Content } = Layout;

// TEST TEAM: for testing change to false
// DEV TEAM: for dev change to true
const recaptchaOn = false;

class ResetPassword extends Component {
  constructor() {
    super();
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      isVerified: false,
      email: "",
    };
  }

  componentDidMount() {
    if (!recaptchaOn) {
      this.setState({
        isVerified: true,
      });
    }
  }

  recaptchaLoaded() {
    console.log("captcha loaded");
  }

  verifyCallback(response) {
    if (response) {
      this.setState({ isVerified: true });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onFinish = (values) => {
    console.log(values);
    if (!this.state.isVerified) {
      alert("Please verify you are human");
    } else {
      const userData = {
        email: values.email,
      };
      this.props.resetPassword(userData);
    }
  };

  render() {
    return (
      <Layout>
        <h2>Welcome to SingHealth Audit</h2>
        <p>
          A new password will be sent to your email address if your email
          address is valid
        </p>
        <Content>
          <Form
            onFinish={this.onFinish}
            name="normal_login"
            className="login-register-form"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                placeholder="Email"
                onChange={this.onChange}
                value={this.state.email}
                id="email"
                type="email"
              />
            </Form.Item>

            <Form.Item>
              <Button
                id="reset-button"
                type="primary"
                htmlType="submit"
                className="login-register-form-button"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
          <Recaptcha
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            render="explicit"
            onloadCallback={console.log("onloadCallback")}
            verifyCallback={this.verifyCallback}
          />
        </Content>
      </Layout>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { resetPassword })(ResetPassword);
