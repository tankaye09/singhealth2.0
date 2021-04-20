import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import {
    Table,
    Typography,
    Input,
    Space,
    Button,
    Layout,
    Row,
    Col,
    Card,
    Progress,
    Form,
    Divider,
} from "antd";
import classnames from "classnames";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { display } from "../../actions/auditActions.js";
import { setSelectedTenant, getTenant } from "../../actions/tenantActions";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import store from "../../store.js";
import PropTypes from "prop-types";
import moment from "moment";

const { Title } = Typography;
const { TextArea } = Input;

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenantId: "",
            tenantLocation: "",
            auditor: "",
            errors: {},
        };
    }

    componentDidMount() {
        console.log("Mounted: ", store.getState().auth.user.id);
        getTenant((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].userId === store.getState().auth.user.id) {
                    this.setState(
                        { tenantId: data[i]._id, tenantLocation: data[i].address, auditor: data[i].auditor },
                        console.log(data[i]._id),
                    );
                }
            }
        });
    }

    render() {
        const { user } = this.props.auth;
        const { errors } = this.state.errors;

        return (
            <Layout>
                <Card>
                    <Row>
                        <Col span={15} style={{ display: "block" }}>
                            <div
                                style={{ "text-align": "left", clear: "both", width: "100%" }}
                            >
                                Tenant ID: {user.id}
                            </div>
                            <div className="name">
                                <b>{this.state.tenantID}</b>
                            </div>
                            <div
                                style={{ "text-align": "left", clear: "both", width: "100%" }}
                            >
                                Auditor:
              </div>
                            <div className="name">
                                <b>{this.state.auditor}</b>
                            </div>
                            <div
                                style={{ "text-align": "left", clear: "both", width: "100%" }}
                            >
                                Tenant Location:
              </div>
                            <div className="name">
                                <b>
                                    {this.state.tenantLocation}
                                </b>
                            </div>
                            <div
                                style={{ "text-align": "left", clear: "both", width: "100%" }}
                            >
                                Institution:
              </div>
                            <div className="name">
                                <b>
                                    {user.institution}
                                </b>
                            </div>
                        </Col>
                        <Col span={9}>
                            <Title>
                                Hello {user.name.split(" ")[0]}!
                            </Title>
                        </Col>
                    </Row>
                </Card>
                <Card size="small" style={{ "background-color": "#F0F2F5" }}>
                    <Form
                        className="addComment"
                        onChange={this.newComment}
                        layout="vertical"
                        size="small"
                        initialValues={{
                            remember: false,
                        }}
                    >
                        <Form.Item name="changePassword" label={<b>Change Password</b>}>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please input your Old Password!" },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Old Password"
                                onChange={this.onChange}
                                value={this.state.password}
                                // error={errors.password}
                                id="password"
                                type="password"
                            // className={classnames("", {
                            //     // invalid: errors.password || errors.passwordincorrect,
                            // })}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please input your Password!" },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Re-type Password"
                                onChange={this.onChange}
                                value={this.state.password}
                                // error={errors.password}
                                id="password"
                                type="password"
                            // className={classnames("", {
                            //     // invalid: errors.password || errors.passwordincorrect,
                            // })}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please input your New Password!" },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="New Password"
                                onChange={this.onChange}
                                value={this.state.password}
                                // error={errors.password}
                                id="password"
                                type="password"
                            // className={classnames("", {
                            //     // invalid: errors.password || errors.passwordincorrect,
                            // })}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="view-audit-buttons"
                                onClick={this.changePassword}
                            >
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
})(AccountInfo);
