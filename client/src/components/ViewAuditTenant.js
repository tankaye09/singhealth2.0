import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography, Progress, Image, Input, Comment, Form, Button } from "antd";
import dateformat from "dateformat";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { display, updateAudit } from "../actions/auditActions.js";

const { Text } = Typography;
const { TextArea } = Input;


class ViewAuditTenant extends Component {
    state = {
        _id: this.props.tenantInfo.record._id,
        audit: null,
        total_score: this.props.tenantInfo.record.total_score,
        tenantID: this.props.tenantInfo.record.tenantID,
        auditor: "auditor",
        // auditorComments: ["Bla", "blabla"],
        // tenantComments: ["Response", "response"],
        comment: this.props.tenantInfo.record.comment,
        image: this.props.tenantInfo.record.image,
        date: this.props.tenantInfo.record.date,
        catCounts: this.props.tenantInfo.record.catCounts,
        type: this.props.tenantInfo.record.type,
        decodedImage: "",
        newComment: "",
    };

    displayComments() {
        var output = [];
        var Comm = [];
        for (var i = 0; i < Math.max(this.state.comment.length, this.state.image.length); i++) {
            Comm.push(this.state.comment[i]);
            if (this.state.image[i] != null) {
                Comm.push(this.state.image[i])
            }
        }
        Comm = Comm.sort((a, b) => a.date > b.date);
        console.log(Comm);

        for (var j = 0; j < Comm.length; j++) {
            if (Comm[j].content) {
                output.push(<div>
                    <Comment
                        author={<a>{Comm[j].author}</a>}
                        className="comment"
                        content={
                            <p>{Comm[j].content}</p>
                        } />
                </div>);
            }
            else {
                output.push(<div className="image">
                    <Image
                        width={100}
                        src={`data:image/jpeg;base64,${Comm[j].base64}`}
                    />
                </div>);
            }
        }
        return (
            <div>
                {output}
            </div>
        )
    }

    onChange = value => {
        console.log(value.Text);
        console.log(this.state.newComment);
    };

    newComment = (values) => {
        // console.log(values.nativeEvent.explicitOriginalTarget.value);
        this.setState({
            newComment:
                [{
                    "content": values.nativeEvent.explicitOriginalTarget.value,
                    "date": dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"),
                    "author": "tenant",
                }]
        })
        // console.log(this.state.newComment)
    }

    submitComment = () => {
        var tempArray = this.state.comment;
        console.log(tempArray);
        tempArray.push(this.state.newComment[0]);
        console.log(tempArray);
        this.setState({
            comment: tempArray,
        })
        console.log(this.state.comment);
        this.update();

    }

    update = () => {
        console.log(this.state);
        updateAudit({
            _id: this.props.tenantInfo.record._id,
            type: this.props.tenantInfo.record.type,
            catCounts: this.props.tenantInfo.record.catCounts,
            total_score: this.props.tenantInfo.record.total_score,
            image: this.props.tenantInfo.record.image,
            date: this.props.tenantInfo.record.date,
            comment: this.state.comment,
            location: this.props.tenantInfo.record.location,
            tenantID: this.props.tenantInfo.record.tenantID,
        });
    };

    render() {
        return (
            <div>
                <p></p>
                <Progress className="score"
                    type="circle"
                    percent={this.state.total_score} width={200} />
                <div>
                    <Text className="name">
                        Tenant: {this.state.tenantID}
                    </Text>
                    <div />
                    <Text className="name">
                        Auditor: {this.state.auditor}
                    </Text>
                    <div />
                    {this.displayComments()}
                    <div />
                    <Form className="addComment" onChange={this.newComment} initialValues={{
                        remember: false,
                    }}>
                        <Form.Item name="addComment" label="Add Comment">
                            <TextArea className="addCommentText" placeholder="Add Comment" rows={4} allowClear={true} />
                        </Form.Item>
                        <Form.Item>
                            <Button className="submit-comment" onClick={this.submitComment}>
                                Submit Comment
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        );
    }
}

ViewAuditTenant.propTypes = {
    tenantInfo: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    tenantInfo: state.tenantInfo,
});
export default connect(mapStateToProps)(ViewAuditTenant);