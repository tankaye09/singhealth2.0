// import { Form, Input, Button, Checkbox } from "antd";
// import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
// import React, { Component } from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//   };

//   return (
//     <div class="login-register-form">
//       <Form
//         name="normal_register"
//         className="login-register-form"
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//       >
//         <Form.Item
//           name="name"
//           rules={[{ required: true, message: "Please input your Name!" }]}
//         >
//           <Input
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Name"
//           />
//         </Form.Item>
//         <Form.Item
//           name="email"
//           rules={[{ required: true, message: "Please input your Email!" }]}
//         >
//           <Input
//             prefix={<MailOutlined className="site-form-item-icon" />}
//             placeholder="Email"
//           />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please input your Password!" }]}
//         >
//           <Input
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Item>
//         <Form.Item
//           name="password2"
//           dependencies={["password"]}
//           hasFeedback
//           rules={[
//             { required: true, message: "Passwords do not match!" },
//             ({ getFieldValue }) => ({
//               validator(_, value) {
//                 if (!value || getFieldValue("password") === value) {
//                   return Promise.resolve();
//                 }

//                 return Promise.reject(
//                   new Error("The two passwords that you entered do not match!")
//                 );
//               },
//             }),
//           ]}
//         >
//           <Input
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type="password"
//             placeholder="Confirm Password"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-register-form-button"
//           >
//             Register
//           </Button>
//           Or <Link to="/Login">Login here</Link>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Register;

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If loggied in and user navigates to Register page, should redirect them to dashboad
    if (this.props.auth.isAuthenticaed) {
      this.props.history.push("/dashboard");
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
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
