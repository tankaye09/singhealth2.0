import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography, Progress, Image, Input, Comment, Form, Button } from "antd";

const { Text } = Typography;
const { TextArea } = Input;


export default class ViewAudit extends Component {
    state = {
        input: "85",
        tenant: "tenant1",
        auditor: "auditor",
        auditorComments: ["Bla", "blabla"],
        tenantComments: ["Response", "response"],
        image: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
        decodedImage: "",
        newComment: "",
    };



    displayComments() {
        var Comm = [];
        for (var i = 0; i < Math.max(this.state.auditorComments.length, this.state.tenantComments.length); i++) {
            if (this.state.auditorComments[i] != null) {
                Comm.push(<div>
                    <Comment
                        author={<a>{this.state.auditor}</a>}
                        className="comment"
                        content={
                            <p>{this.state.auditorComments[i]}</p>
                        } />
                </div>);
            }
            if (this.state.tenantComments[i] != null) {
                Comm.push(<div>
                    <Comment
                        author={<a>{this.state.tenant}</a>}
                        className="comment"
                        content={
                            <p>{this.state.tenantComments[i]}</p>
                        } />
                </div>);
            }
        }
        return (
            <div>
                {Comm}
            </div>
        )
    }

    onChange = value => {
        console.log(value.Text);
        this.setState({
            newComment: value
        })
        console.log(this.state.newComment);
    };

    newComment = (values) => {
        // console.log(values.nativeEvent.explicitOriginalTarget.value);
        this.setState({
            newComment: values.nativeEvent.explicitOriginalTarget.value
        })
        // console.log(this.state.newComment)
    }

    submitComment = () => {
        var tempArray = this.state.auditorComments;
        console.log(tempArray);
        tempArray.push(this.state.newComment);
        console.log(tempArray);
        this.setState({
            auditorComments: tempArray,
        })
        console.log(this.state.auditorComments);
    }

    render() {
        return (
            <div>
                <p></p>
                <Progress className="score"
                    type="circle"
                    percent={this.state.input} width={300} />
                <div>
                    <Text className="name">
                        Tenant: {this.state.tenant}
                    </Text>
                    <div />
                    <Text className="name">
                        Auditor: {this.state.auditor}
                    </Text>
                    <div />
                    <p className="name2">ImageList:</p>
                    <Image
                        width={200}
                        src={`data:image/jpeg;base64,${this.state.image}`}
                    />
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