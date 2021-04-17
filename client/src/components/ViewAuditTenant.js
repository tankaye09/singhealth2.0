import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Progress,
  Image,
  Input,
  Comment,
  Form,
  Button,
  Row,
  Col,
  Card,
} from "antd";
import dateformat from "dateformat";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { display, updateAudit } from "../actions/auditActions.js";
import moment from "moment";

const { Text } = Typography;
const { TextArea } = Input;

class ViewAuditTenant extends Component {
  state = {
    _id: "",
    audit: "",
    total_score: "",
    tenantID: "",
    auditor: "auditor",
    auditorId: "",
    // auditorComments: ["Bla", "blabla"],
    // tenantComments: ["Response", "response"],
    comment: "",
    image: "",
    date: "",
    catCounts: "",
    type: "",
    decodedImage: "",
    newComment: "",
  };

  componentDidMount() {
    this.setState({
      _id: this.props.tenantInfo.record._id,
      total_score: this.props.tenantInfo.record.total_score,
      tenantID: this.props.tenantInfo.record.tenantID,
      comment: this.props.tenantInfo.record.comment,
      image: this.props.tenantInfo.record.image,
      date: this.props.tenantInfo.record.date,
      rectifyDate: this.props.tenantInfo.record.rectifyDate,
      auditor: this.props.tenantInfo.record.auditor,
      auditorId: this.props.tenantInfo.record.auditorId,
      catCounts: this.props.tenantInfo.record.catCounts,
      type: this.props.tenantInfo.record.type,
    });
  }

  displayComments() {
    var output = [];
    var Comm = [];
    for (
      var i = 0;
      i <
      Math.max(
        this.state.comment.length,
        this.state.image === null ? 0 : this.state.image.length
      );
      i++
    ) {
      Comm.push(this.state.comment[i]);
      if (this.state.image != null && this.state.image[i] != null) {
        Comm.push(this.state.image[i]);
      }
    }
    Comm = Comm.sort((a, b) => a.date > b.date);
    console.log(Comm);

    for (var j = 0; j < Comm.length; j++) {
      if (Comm[j].content) {
        console.log("if: ", Comm[j].content);
        output.push(
          <Card size="small">
            <Comment
              author={<a>{Comm[j].author}</a>}
              className="comment"
              content={<p>{Comm[j].content}</p>}
            />
          </Card>
        );
      } else {
        console.log("else: ", typeof Comm[j]);
        output.push(
          <Card className="image" size="small">
            <Image
              width={100}
              src={`data:image/jpeg;base64,${Comm[j].base64}`}
            />
          </Card>
        );
      }
    }
    return <div>{output}</div>;
  }

  onChange = (value) => {
    console.log(value.Text);
    console.log(this.state.newComment);
  };

  newComment = (values) => {
    // console.log(values.nativeEvent.explicitOriginalTarget.value);
    this.setState({
      newComment: [
        {
          content: values.nativeEvent.explicitOriginalTarget.value,
          date: dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"),
          author: "Tenant(You)",
        },
      ],
    });
    // console.log(this.state.newComment)
  };

  submitComment = () => {
    var tempArray = this.state.comment;
    console.log(tempArray);
    tempArray.push(this.state.newComment[0]);
    console.log(tempArray);
    this.setState({
      comment: tempArray,
    });
    console.log(this.state.comment);
    this.update();
  };

  update = () => {
    console.log(this.state);
    updateAudit({
      _id: this.props.tenantInfo.record._id,
      type: this.props.tenantInfo.record.type,
      catCounts: this.props.tenantInfo.record.catCounts,
      total_score: this.props.tenantInfo.record.total_score,
      image: this.props.tenantInfo.record.image,
      date: this.props.tenantInfo.record.date,
      rectifyDate: this.props.tenantInfo.record.rectifyDate,
      comment: this.state.newComment,
      location: this.props.tenantInfo.record.location,
      tenantID: this.props.tenantInfo.record.tenantID,
      auditorId: this.props.tenantInfo.record.auditorId,
    });
  };

  render() {
    return (
      <div className="table">
        <Card size="small">
          <Row>
            <Col span={15} style={{ display: "block" }}>
              <div
                style={{ "text-align": "left", clear: "both", width: "100%" }}
              >
                Tenant ID:{" "}
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
                Rectification Deadline:
              </div>
              <div className="name">
                <b>
                  {moment(
                    this.state.rectifyDate,
                    "YYYY-MM-DDTHH:mm:ss.SSS"
                  ).format("Do MMMM, YYYY")}
                </b>
              </div>
            </Col>
            <Col span={9}>
              <Progress
                className="score"
                type="circle"
                percent={this.state.total_score}
                width={"18vh"}
                strokeWidth={"10"}
              />
            </Col>
          </Row>
        </Card>
        {this.displayComments()}
        <div />
        <Form
          className="addComment"
          onChange={this.newComment}
          initialValues={{
            remember: false,
          }}
        >
          <Form.Item name="addComment" label="Add Comment">
            <TextArea
              className="addCommentText"
              placeholder="Add Comment"
              rows={4}
              allowClear={true}
            />
          </Form.Item>
          <Form.Item>
            <Button className="submit-comment" onClick={this.submitComment}>
              Submit Comment
            </Button>
          </Form.Item>
        </Form>
      </div>
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
