import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Recaptcha from "react-recaptcha";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { getStaffKey } from "../../actions/authActions";
import { Form, Input, Button, Layout, Select } from "antd";
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import institutionsData from "../../data/institutions.json";

const { Header, Footer, Sider, Content } = Layout;

// TEST TEAM: for testing change to false
// DEV TEAM: for dev change to true
const recaptchaOn = true;

const institutions = institutionsData;

class Register extends Component {
  constructor() {
    super();
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      isVerified: false,
      name: "",
      email: "",
      password: "",
      password2: "",
      institution: "",
      staffkey: "",
      dbstaffkey: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If loggied in and user navigates to Register page, should redirect them to dashboad
    if (this.props.auth.isAuthenticaed) {
      this.props.history.push("/dashboard"); // Push new entry into history stack, ie redirecting the user to another route
    }
    if (!recaptchaOn) {
      this.setState({
        isVerified: true,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onDropdownChange = (e, { value }) => this.setState({ value });

  onFinish = (values) => {
    if (!this.state.isVerified) {
      alert("Please verify you are human");
    } else {
      window.recaptcha = null;
      getStaffKey((data) => {
        // console.log("data is: ", data);
        this.setState({ ...this.state, dbstaffkey: data });
        // console.log("dbstaffkey is: ", this.state.dbstaffkey);
        if (this.state.staffkey === this.state.dbstaffkey) {
          const newUser = {
            name: values.name,
            email: values.email,
            password: values.password,
            password2: values.password2,
            institution: values.institution,
            usertype: "staff",
          };
          this.props.registerUser(newUser, this.props.history);
        } else {
          alert("Staff Key is incorrect!");
        }
      });
    }
  };

  verifyCallback(response) {
    if (response) {
      this.setState({ isVerified: true });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <Layout>
        <h2>Staff Registration Form</h2>
        <Form
          name="normal_login"
          className="login-register-form"
          title="Register"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
              // className={classnames("", {
              // invalid: errors.name,
              // })}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              // className={classnames("", {
              //   invalid: errors.email,
              // })}
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
              // className={classnames("", {
              //   invalid: errors.password,
              // })}
            />
          </Form.Item>

          <Form.Item
            name="password2"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Passwords do not match!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
              // className={classnames("", {
              // invalid: errors.password2,
              // })}
            />
          </Form.Item>

          <Form.Item
            name="staffkey"
            rules={[
              { required: true, message: "Please input your staff key!" },
            ]}
          >
            <Input
              prefix={<SketchOutlined className="site-form-item-icon" />}
              placeholder="Staff Key"
              onChange={this.onChange}
              value={this.state.staffkey}
              error={errors.staffkey}
              id="staffkey"
              type="staffkey"
              className={classnames("", {
                invalid: errors.key || errors.keyincorrect,
              })}
            />
          </Form.Item>

          <Form.Item
            name="institution"
            rules={[
              {
                required: true,
                message: "Please select an institution!",
              },
            ]}
          >
            <Select
              showSearch
              className="dropdown"
              icon={MailOutlined}
              placeholder="Institution"
              options={institutions}
              onChange={this.onDropdownChange}
              id="institution"
              type="institution"
              value={this.state.institution}
              error={errors.institution}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-register-form-button"
            >
              Register
            </Button>
            Or <Link to="/Login">Login here</Link>
          </Form.Item>
        </Form>
        <Recaptcha
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          render="explicit"
          onloadCallback={console.log("onloadCallback")}
          verifyCallback={this.verifyCallback}
        />
      </Layout>
    );
  }
}
// Props stands for properties and is being used for passing data from one component to another
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// Get state from Redux and map it to props
const mapStateToProps = (state) => ({
  auth: state.auth, // allows us to call this.props.auth
  errors: state.errors, // allows us to call this.props.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
