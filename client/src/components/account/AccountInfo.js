import React, { Component } from "react";
import { Typography, Input, Button, Layout, Row, Col, Card, Form } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { display } from "../../actions/auditActions.js";
import { setSelectedTenant, getTenant } from "../../actions/tenantActions";
import { changePassword } from "../../actions/authActions";
import { connect } from "react-redux";
import store from "../../store.js";
import PropTypes from "prop-types";

const { Title } = Typography;

const gridStyleLeft = {
  width: "50%",
  textAlign: "Left",
};

const gridStyleRight = {
  width: "50%",
  textAlign: "Right",
};

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenantId: "",
      updateId: "",
      tenantLocation: "",
      auditor: "",
      errors: {},
      oldPass: "",
      rePass: "",
      newPass: "",
    };
  }

  componentDidMount() {
    console.log("Mounted: ", store.getState().auth.user.id);
    getTenant((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].userId === store.getState().auth.user.id) {
          this.setState(
            {
              tenantId: data[i]._id,
              tenantLocation: data[i].address,
              auditor: data[i].auditor,
              updateId: data[i].userId,
            },
            console.log(data[i]._id)
          );
        }
      }
    });
  }

  onChangeOld = (values) => {
    console.log(this.state);
    this.setState({
      oldPass: values.nativeEvent.explicitOriginalTarget.value,
    });
  };

  onChangeRe = (values) => {
    console.log(this.state);
    this.setState({
      rePass: values.nativeEvent.explicitOriginalTarget.value,
    });
  };

  onChangeNew = (values) => {
    console.log(this.state);
    this.setState({
      newPass: values.nativeEvent.explicitOriginalTarget.value,
    });
  };

  changePass = () => {
    console.log(this.state);
    if (this.state.newPass == this.state.rePass) {
      this.props.changePassword({
        oldPass: this.state.oldPass,
        rePass: this.state.rePass,
        newPass: this.state.newPass,
        updateId: this.state.updateId,
      });
    } else {
      console.log("Password Mismatch");
    }
  };

  renderRow = (stateRow) => {
    if (stateRow !== "") {
      return true;
    }
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state.errors;

    return (
      <Layout>
        <Card>
          <Row>
            <Col span={12}>
              <ul className="ul">
                <div
                  style={{ "text-align": "left", clear: "both", width: "100%" }}
                >
                  {this.renderRow(user.name) ? "Tenant Name: " : ""}
                </div>
              </ul>
            </Col>
            <Col span={12}>
              {" "}
              <ul className="ul">
                <div className="info">
                  <b>{user.name}</b>
                </div>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ul className="ul">
                <div
                  style={{ "text-align": "left", clear: "both", width: "100%" }}
                >
                  {this.renderRow(user.id) ? "Tenant ID: " : ""}
                </div>
              </ul>
            </Col>
            <Col span={12}>
              <ul className="ul">
                <div className="idInfo">
                  <b>{user.id}</b>
                </div>
              </ul>
            </Col>
          </Row>
          <Row justify={"center"} align={"middle"}>
            <Col span={12}>
              <ul className="ul">
                <div
                  style={{ "text-align": "left", clear: "both", width: "100%" }}
                >
                  {this.renderRow(this.state.auditor) ? "Auditor: " : ""}
                </div>
              </ul>
            </Col>
            <Col span={12}>
              <ul className="ul">
                <div
                  style={{
                    "text-align": "right",
                    clear: "both",
                    width: "100%",
                  }}
                >
                  <b>{this.state.auditor}</b>
                </div>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ul className="ul">
                <div
                  style={{ "text-align": "left", clear: "both", width: "100%" }}
                >
                  {this.renderRow(this.state.tenantLocation)
                    ? "Tenant Location: "
                    : ""}
                </div>
              </ul>
            </Col>
            <Col span={12}>
              <ul className="ul">
                <div
                  style={{
                    "text-align": "right",
                    clear: "both",
                    width: "100%",
                  }}
                >
                  <b>{this.state.tenantLocation}</b>
                </div>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ul className="ul">
                <div
                  style={{ "text-align": "left", clear: "both", width: "100%" }}
                >
                  {this.renderRow(user.institution) ? "Institution: " : ""}
                </div>
              </ul>
            </Col>
            <Col span={12}>
              <ul className="ul">
                <div
                  style={{
                    "text-align": "right",
                    clear: "both",
                    width: "100%",
                  }}
                >
                  <b>{user.institution}</b>
                </div>
              </ul>
            </Col>
          </Row>
        </Card>
        <Card size="small" style={{ "background-color": "#F0F2F5" }}>
          <Form
            className="addComment"
            layout="vertical"
            size="small"
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              name="changePassword"
              label={<b>Change Password</b>}
            ></Form.Item>
            <Form.Item
              name="oldpassword"
              rules={[
                { required: true, message: "Please input your Old Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Old Password"
                onChange={this.onChangeOld}
                // value={this.state.password}
                // error={errors.password}
                id="oldpassword"
                type="password"
                // className={classnames("", {
                //     // invalid: errors.password || errors.passwordincorrect,
                // })}
              />
            </Form.Item>
            <Form.Item
              name="newpassword"
              rules={[
                { required: true, message: "Please input your New Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="New Password"
                onChange={this.onChangeNew}
                value={this.state.password}
                // error={errors.password}
                id="newpassword"
                type="password"
                // className={classnames("", {
                //     // invalid: errors.password || errors.passwordincorrect,
                // })}
              />
            </Form.Item>
            <Form.Item
              name="repassword"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Re-type Password"
                onChange={this.onChangeRe}
                // value={this.state.password}
                // error={errors.password}
                id="repassword"
                type="password"
                // className={classnames("", {
                //     // invalid: errors.password || errors.passwordincorrect,
                // })}
              />
            </Form.Item>
            <Form.Item>
              <Button className="view-audit-buttons" onClick={this.changePass}>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
    );
  }
}

AccountInfo.propTypes = {
  setSelectedTenant: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  userID: state.auth.user.id,
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  setSelectedTenant,
  getTenant,
  display,
  changePassword,
})(AccountInfo);
