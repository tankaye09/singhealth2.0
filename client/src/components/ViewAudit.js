import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography, Progress, Image, Input, Comment, Form, Button } from "antd";
import dateformat from "dateformat";

const { Text } = Typography;
const { TextArea } = Input;

export default class ViewAuditAuditor extends Component {
    state = {
        input: "85",
        tenant: "tenant1",
        auditor: "auditor",
        // auditorComments: ["Bla", "blabla"],
        // tenantComments: ["Response", "response"],
        comments:
            [{
                "content": "blablabla",
                "date": "2017-05-29T15:30:17.983Z",
                "author": "auditor"
            },
            {
                "content": "blabla",
                "date": "2018-05-29T15:30:17.983Z",
                "author": "auditor"
            },
            {
                "content": "alab",
                "date": "2016-05-29T15:30:17.983Z",
                "author": "tenant1",
            },
            {
                "content": "ooga",
                "date": "2022-06-29T15:30:17.983Z",
                "author": "tenant1",
            },],
        image: [{ "base64": "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==", "date": "2018-05-29T15:30:17.983Z" }],
        decodedImage: "",
        newComment: "",
    };



    displayComments() {
        var output = [];
        var Comm = [];
        for (var i = 0; i < Math.max(this.state.comments.length, this.state.image.length); i++) {
            Comm.push(this.state.comments[i]);
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
        this.setState({
            newComment: value
        })
        console.log(this.state.newComment);
    };

    newComment = (values) => {
        // console.log(values.nativeEvent.explicitOriginalTarget.value);
        this.setState({
            newComment:
                [{
                    "content": values.nativeEvent.explicitOriginalTarget.value,
                    "date": dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"),
                    "author": "auditor",
                }]
        })
        // console.log(this.state.newComment)
    }

    submitComment = () => {
        var tempArray = this.state.comments;
        console.log(tempArray);
        tempArray.push(this.state.newComment[0]);
        console.log(tempArray);
        this.setState({
            comments: tempArray,
        })
        console.log(this.state.comments);
    }

    render() {
        return (
            <div>
                <p></p>
                <Progress className="score"
                    type="circle"
                    percent={this.state.input} width={200} />
                <div>
                    <Text className="name">
                        Tenant: {this.state.tenant}
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