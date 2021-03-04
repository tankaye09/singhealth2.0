import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div class="login-register-form">
      <Form
        name="normal_register"
        className="login-register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
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
    </div>
  );
};

export default Register;
