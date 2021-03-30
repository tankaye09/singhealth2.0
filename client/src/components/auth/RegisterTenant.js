import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerTenant } from "../../actions/authActions";
import classnames from "classnames";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

// TODO: this should be taken from db
const institutions = [
  { label: "CGH", value: "CGH" },
  { label: "SGH", value: "SGH" },
  { label: "KKH", value: "KKH" },
];

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      address: "",
      institution: "",
      auditor: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If loggied in and user navigates to Register page, should redirect them to dashboad
    if (this.props.auth.isAuthenticaed) {
      this.props.history.push("/dashboard"); // Push new entry into history stack, ie redirecting the user to another route
    }
  }

  componentWillReceiveProps(nextProps) {
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

  // TODO send email to tenant with login details

  onFinish = (values) => {
    const newUser = {
      email: values.email,
      address: values.address,
      institution: values.institution,
      auditor: values.auditor,
    };
    console.log(newUser);
    this.props.registerTenant(newUser, this.props.history);
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    const layout = {
      labelCol: { span: 3 },
    };

    return (
      <Form
        {...layout}
        name="normal_login"
        className="login-register-form"
        onFinish={this.onFinish}
        initialValues={{
          auditor: user.name,
        }}
      >
        <h1>Create a Tenant Account</h1>

        {/* No name, replace with id for annonymity */}

        <Form.Item
          label="Email"
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
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              type: "string",
              message: "Please input a valid Address!",
            },
          ]}
        >
          <Input
            placeholder="Address"
            onChange={this.onChange}
            value={this.state.address}
            error={errors.address}
            id="address"
            type="address"
            // className={classnames("", {
            //   invalid: errors.email,
            // })}
          />
        </Form.Item>

        <Form.Item
          label="Institution"
          name="institution"
          rules={[
            {
              required: true,
              message: "Please select an institution!",
            },
          ]}
        >
          <Select
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

        <Form.Item
          label="Auditor"
          name="auditor"
          rules={[{ required: true, message: "Please input name of Auditor!" }]}
        >
          <Input
            placeholder="Auditor"
            onChange={this.onChange}
            value={this.state.auditor}
            error={errors.auditor}
            id="auditor"
            type="auditor"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-register-form-button"
          >
            Create Tenant
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
// Props stands for properties and is being used for passing data from one component to another
Register.propTypes = {
  registerTenant: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// Get state from Redux and map it to props
const mapStateToProps = (state) => ({
  auth: state.auth, // allows us to call this.props.auth
  errors: state.errors, // allows us to call this.props.errors
});

export default connect(mapStateToProps, { registerTenant })(
  withRouter(Register)
);
