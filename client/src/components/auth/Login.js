import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div class="login-register-form">
      <Form
        name="normal_login"
        className="login-register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-register-form-button"
          >
            Log in
          </Button>
          Or <Link to="/Register">register now</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

// import { Form, Input, Button, Checkbox } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import React, { Component } from "react";
// import { Link } from "react-router-dom";

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       errors: {},
//     };
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//     console.log(this.state.email);
//   };

//   onFinish = (e) => {
//     e.preventDefault();
//     const userData = {
//       email: this.state.email,
//       password: this.state.password,
//     };
//     console.log(userData);
//   };

//   render() {
//     const { errors } = this.state;
//     return (
//       <div class="login-register-form">
//         <Form
//           name="normal_login"
//           className="login-register-form"
//           initialValues={{ remember: true }}
//           onFinish={this.onFinish}
//         >
//           <Form.Item
//             name="email"
//             onChange={this.onChange}
//             value={this.state.email}
//             error={errors.email}
//             id="email"
//             type="email"
//             rules={[{ required: true, message: "Please input your email!" }]}
//           >
//             <Input
//               prefix={<UserOutlined className="site-form-item-icon" />}
//               placeholder="Email"
//             />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             onChange={this.onChange}
//             value={this.state.password}
//             error={errors.password}
//             id="password"
//             type="password"
//             rules={[{ required: true, message: "Please input your Password!" }]}
//           >
//             <Input
//               prefix={<LockOutlined className="site-form-item-icon" />}
//               type="password"
//               placeholder="Password"
//             />
//           </Form.Item>
//           <Form.Item>
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>

//             <a className="login-form-forgot" href="">
//               Forgot password
//             </a>
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="login-register-form-button"
//             >
//               Log in
//             </Button>
//             Or <Link to="/Register">register now</Link>
//           </Form.Item>
//         </Form>
//       </div>
//     );
//   }
// }

// export default Login;
