import React, { ReactDOM, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerTenant } from "../../actions/authActions";
import { Form, Input, Button, Message, Select, message } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import institutionsData from "../../data/institutions.json";
import tenantData from "../../data/tenantTypes.json";

// TODO: this should be taken from db
const institutions = institutionsData;
const tenantTypes = tenantData;

class CreateTenant extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "",
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

  // TODO send email to tenant with login details

  onFinish = (values) => {
    const newUser = {
      name: values.name,
      type: values.type,
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
          label="Tenant Name"
          name="name"
          rules={[
            {
              required: true,
              type: "string",
              message: "Please input a valid Name!",
            },
          ]}
        >
          <Input
            placeholder="Tenant Name"
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="name"
            type="name"
            // className={classnames("", {
            //   invalid: errors.email,
            // })}
          />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please select F&B or non-F&B!",
            },
          ]}
        >
          <Select
            className="dropdown"
            placeholder="F&B or Non-F&B"
            options={tenantTypes}
            onChange={this.onDropdownChange}
            id="type"
            type="type"
            value={this.state.type}
            error={errors.type}
          />
        </Form.Item>

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
CreateTenant.propTypes = {
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
  withRouter(CreateTenant)
);
