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
  Modal,
} from "antd";
import dateformat from "dateformat";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { display, updateAudit, updateAuditImage } from "../actions/auditActions.js";
const fileUpload = require("fuctbase64");

const { Text } = Typography;
const { TextArea } = Input;

class ViewAudit extends Component {
  state = {
    _id: "",
    audit: "",
    total_score: "",
    tenantID: "",
    auditor: "auditor",
    // auditorComments: ["Bla", "blabla"],
    // tenantComments: ["Response", "response"],
    comment: "",
    image: "",
    date: "",
    catCounts: "",
    type: "",
    decodedImage: "",
    newComment: "",
    tempImageBase64: [],
    tempImageCaption: null,
    imageUpload: [],
    visibleConfirm: false,
    testState: "",
  };

  componentDidMount() {
    this.setState({
      _id: this.props.tenantInfo.record._id,
      total_score: this.props.tenantInfo.record.total_score,
      tenantID: this.props.tenantInfo.record.tenantID,
      comment: this.props.tenantInfo.record.comment,
      image: this.props.tenantInfo.record.image,
      date: this.props.tenantInfo.record.date,
      catCounts: this.props.tenantInfo.record.catCounts,
      type: this.props.tenantInfo.record.type,
    });
    console.log(this.state);
  }

  fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    fileUpload(event).then((data) => {
      console.log("base64: ", data.base64);
      this.setState({
        // image: [{ "base64": data.base64, "date": dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"), "caption": "" }]
        tempImageBase64: [
          {
            base64: data.base64,
            date: dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"),
          },
        ],
      });
    });
  };

  onChangeCaption = (caption) => {
    console.log(this.state);
    this.setState({
      tempImageCaption: caption.nativeEvent.explicitOriginalTarget.value,
    });
  };

  handleUploadOk = (e) => {
    console.log(e);
    console.log(this.state);
    var tempArray = this.state.image;
    console.log(tempArray);
    tempArray.push([
      {
        base64: this.state.tempImageBase64[0].base64,
        date: this.state.tempImageBase64[0].date,
        caption: this.state.tempImageCaption,
      },
    ]);
    console.log(tempArray);
    this.setState({
      image: tempArray,
      visibleConfirm: false,
    });
    this.updateImage();
  };

  displayComments() {
    var output = [];
    var Comm = [];
    for (
      var i = 0;
      i < Math.max(this.state.comment.length, this.state.image.length);
      i++
    ) {
      if (this.state.comment[i] != null) {
        Comm.push(this.state.comment[i]);
      }

      if (this.state.image[i] != null) {
        Comm.push(this.state.image[i]);
      }
    }
    Comm = Comm.sort((a, b) => a.date > b.date);
    console.log(Comm);

    for (var j = 0; j < Comm.length; j++) {
      if (Comm[j].content) {
        output.push(
          <div>
            <Comment
              author={<a>{Comm[j].author}</a>}
              className="comment"
              content={<p>{Comm[j].content}</p>}
            />
            <p></p>
            <p></p>
          </div>
        );
      } else {
        output.push(
          <div className="image">
            <p></p>
            <Comment
              author={<a>{Comm[j].uploader}</a>}
              className="caption"
              content={<p>{Comm[j].caption}</p>} >

            </Comment>
            <Image
              width={100}
              src={`data:image/jpeg;base64,${Comm[j].base64}`}
            />
            <p></p>
            <p></p>
          </div>
        );
      }
    }
    return <div>{output}</div>;
  }

  onChange = (value) => {
    console.log(value.Text);
    console.log(this.state.newComment);
  };

  handleFormOk = (e) => {
    console.log(e);
    this.setState({
      imageUpload: [
        {
          base64: this.state.tempImageBase64[0].base64,
          date: this.state.tempImageBase64[0].date,
          caption: this.state.tempImageCaption,
          uploader: "auditor",
        },
      ],
      // image: tempArray,
      // visibleConfirm: false,
      testState: "Test Passed",
    });
    this.showConfirmModal();
  };

  showConfirmModal = () => {
    this.setState({
      visibleConfirm: true,
    });
  };

  newComment = (values) => {
    // console.log(values.nativeEvent.explicitOriginalTarget.value);
    this.setState({
      newComment: [
        {
          content: values.nativeEvent.explicitOriginalTarget.value,
          date: dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"),
          author: "auditor",
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
    this.updateComment();
  };

  updateComment = () => {
    console.log(this.state);
    updateAudit({
      _id: this.props.tenantInfo.record._id,
      type: this.props.tenantInfo.record.type,
      catCounts: this.props.tenantInfo.record.catCounts,
      total_score: this.props.tenantInfo.record.total_score,
      image: this.props.tenantInfo.record.image,
      date: this.props.tenantInfo.record.date,
      comment: this.state.newComment,
      location: this.props.tenantInfo.record.location,
      tenantID: this.props.tenantInfo.record.tenantID,
    });
  };

  updateImage = () => {
    console.log(this.state);
    updateAuditImage({
      _id: this.props.tenantInfo.record._id,
      type: this.props.tenantInfo.record.type,
      catCounts: this.props.tenantInfo.record.catCounts,
      total_score: this.props.tenantInfo.record.total_score,
      image: this.state.imageUpload,
      date: this.props.tenantInfo.record.date,
      comment: this.props.tenantInfo.record.comment,
      location: this.props.tenantInfo.record.location,
      tenantID: this.props.tenantInfo.record.tenantID,
    });
  };

  render() {
    return (
      <div>
        <p></p>
        <Progress
          className="score"
          type="circle"
          percent={this.state.total_score}
          width={200}
        />
        <div>
          <Text className="name">Tenant: {this.state.tenantID}</Text>
          <div />
          <Text className="name">Auditor: {this.state.auditor}</Text>
          <div />
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
            <Form.Item>
              <Input type="file" onChange={this.fileSelectedHandler} />
            </Form.Item>

            <Form.Item
              name="caption"
              rules={[
                {
                  required: true,
                  message: "Description",
                },
              ]}
            >
              <Input
                placeholder="Caption"
                onChange={this.onChangeCaption}
                value={this.state.caption}
                id="caption"
                type="caption"
              />
            </Form.Item>
            <Button
              onClick={this.handleFormOk}>
              Submit Photo
            </Button>
          </Form>
          <Modal
            title="Upload Confirm"
            destroyOnClose={true}
            visible={this.state.visibleConfirm}
            onOk={this.handleUploadOk}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: true, visible: false }}
          >
            <p>Photo Added!</p>
          </Modal>
        </div>
      </div >
    );
  }
}

ViewAudit.propTypes = {
  tenantInfo: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tenantInfo: state.tenantInfo,
});
export default connect(mapStateToProps)(ViewAudit);
