import "../App.css";
import {
  Collapse,
  Divider,
  List,
  Input,
  Checkbox,
  Button,
  Modal,
  Form,
  DatePicker,
} from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import importJSON from "../data/questionsDict.json";
import { submit, display } from "../actions/auditActions.js";
import dateformat from "dateformat";
import store from "../store";
const fileUpload = require("fuctbase64");
const Fb = importJSON.fb;
const { Panel } = Collapse;
const { TextArea } = Input;

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

const mapDispatchToProps = {
  submit,
};

// TODO: Take score from json file => Update the score, replace the json file

class Checklist extends Component {
  // not exactly dynamic
  state = {
    tenantInfo: {},
    type: "FB",
    auditor: store.getState().auth.user.name,
    auditorId: store.getState().auth.user.id,
    checked: false,
    catCounts: [0, 0, 0, 0, 0], // counts[0]: for Professionalism & Staff Hygiene (10%), counts[1]: for Housekeeping & General Cleanliness (20%)
    total_score: 0,
    weightage: [20, 40, 45], //newly added for cal
    //total_checkboxes_count:[Fb.subcategories[0].questions.length(),Fb.subcategories[1].questions.length(), Fb.subcategories[2].questions.length(),Fb.subcategories[3].questions.length(),],
    image: [],
    tempImageBase64: [],
    tempImageCaption: null,
    date: null,
    rectifyDate: null,
    comment: null,
    location: "",
    visibleForm: false,
    visibleConfirm: false,
    visibleAudit: false,
  };

  componentDidMount() {
    console.log("props: ", this.props.tenantInfo);
    if (typeof this.props.tenantInfo !== "undefined") {
      this.setState({ tenantInfo: this.props.tenantInfo.record });
    }
  }

  imageUploaded = () => {
    if (this.state.image.length > 0) {
      return <div className="red">Image Uploaded!</div>;
    }
  };

  submitAudit = () => {
    // console.log(this.state);
    this.props.submit(
      {
        type: "FB",
        auditor: store.getState().auth.user.name,
        auditorId: store.getState().auth.user.id,
        catCounts: this.state.catCounts,
        total_score: this.state.total_score,
        image: this.state.image,
        date: this.state.date,
        comment: this.state.comment,
        rectifyDate: this.state.rectifyDate,
        location: this.props.tenantInfo.record.address,
        tenantID: this.props.tenantInfo.record._id,
        institution: this.props.tenantInfo.record.institution,
      },
      this.props.history
    );
    this.showAuditModal();
    window.scrollTo(0, 0); // Scroll to top
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeComment = (comment) => {
    this.setState({
      comment: [
        {
          content: comment.nativeEvent.explicitOriginalTarget.value,
          date: dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"),
          author: store.getState().auth.user.name,
        },
      ],
    });
  };

  onChangeCaption = (caption) => {
    console.log(this.state);
    this.setState({
      tempImageCaption: caption.nativeEvent.explicitOriginalTarget.value,
    });
  };

  onChangeDate = (date, dateString) => {
    this.setState({
      date: dateformat(date._d.toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"),
    });
  };

  onChangeRectifyDate = (rectifyDate, dateString) => {
    this.setState({
      rectifyDate: dateformat(
        rectifyDate._d.toString(),
        "yyyy-mm-dd'T'HH:MM:ss.sssZ"
      ),
    });
  };

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

  showAuditModal = () => {
    this.setState({
      visibleAudit: true,
    });
  };

  showFormModal = () => {
    this.setState({
      visibleForm: true,
    });
  };

  showConfirmModal = () => {
    this.setState({
      visibleConfirm: true,
    });
  };

  handleAuditOk = (e) => {
    console.log(e);
    this.setState({
      visibleAudit: false,
    });
  };

  handleFormOk = (e) => {
    console.log(e);
    this.showConfirmModal();
  };

  handleUploadOk = (e) => {
    console.log(e);
    console.log(this.state);
    if (this.state.tempImageBase64.length > 0) {
      this.setState({
        image: [
          {
            base64: this.state.tempImageBase64[0].base64,
            date: this.state.tempImageBase64[0].date,
            caption: this.state.tempImageCaption,
            uploader: this.state.auditor,
          },
        ],
        visibleForm: false,
        visibleConfirm: false,
      });
    }
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visibleForm: false,
    });
  };

  createCheckbox = (label, catIndex) => (
    <Checkbox
      label={label}
      // handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={(e) => this.handleCount(e, catIndex)}
    />
  );
  //// for food hygiene cat
  // createfoodCheckbox = (label) => (
  //   <Checkbox
  //     label={label}
  //     handleCheckboxChange={this.toggleCheckbox}
  //     key={label}
  //     onChange={(e) => this.handlefoodCheckCount(e)}
  //   />
  // );
  // handlefoodCheckCount = (e) => {
  //   const { checked, type } = e.target;
  //   if (type === "checkbox" && checked === true) {
  //     this.setState((state) => state.food_count++);
  //   } else {
  //     this.setState((state) => state.food_count--);
  //   }
  // };

  handleCount = (e, catIndex) => {
    const { checked, type } = e.target;
    switch (catIndex) {
      case 0:
        if (type === "checkbox" && checked === true) {
          this.setState((state) => state.catCounts[0]++);
        } else {
          this.setState((state) => state.catCounts[0]--);
        }
        break;
      case 1:
        if (type === "checkbox" && checked === true) {
          this.setState((state) => state.catCounts[1]++);
        } else {
          this.setState((state) => state.catCounts[1]--);
        }
        break;
      case 2:
        if (type === "checkbox" && checked === true) {
          this.setState((state) => state.catCounts[2]++);
        } else {
          this.setState((state) => state.catCounts[2]--);
        }
        break;
      case 3:
        if (type === "checkbox" && checked === true) {
          this.setState((state) => state.catCounts[3]++);
        } else {
          this.setState((state) => state.catCounts[3]--);
        }
        break;
      case 4:
        if (type === "checkbox" && checked === true) {
          this.setState((state) => state.catCounts[4]++);
        } else {
          this.setState((state) => state.catCounts[4]--);
        }
        break;
      default:
        break;
    }
  };

  render() {
    // console.log(this.state.tenantInfo);
    const rectifyLabel = (
      <div>If there are no non-compliances, put {<b>today's</b>} date</div>
    );
    return (
      <div className="table">
        <h3>
          F&B Audit for Tenant at Address:{" "}
          <b>
            {typeof this.state.tenantInfo !== "undefined"
              ? this.state.tenantInfo.address
              : ""}
          </b>
        </h3>

        <Form
          // {...layout}
          name="FB Checklist"
          className="login-register-form"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Date of Incident" }]}
          >
            <DatePicker
              className="auditDate"
              placeholder="Date"
              onChange={this.onChangeDate}
            />
          </Form.Item>

          <Form.Item
            name="recitfyDate"
            label={rectifyLabel}
            rules={[
              {
                required: true,
                message: "Please enter the timeframe to rectify non-compliance",
              },
            ]}
          >
            <DatePicker
              className="auditDate"
              placeholder="Rectification Deadline"
              onChange={this.onChangeRectifyDate}
            />
          </Form.Item>

          <Form.Item
            name="Comment"
            rules={[{ required: true, message: "Description" }]}
          >
            <TextArea
              placeholder="Notes or Comments"
              onChange={this.onChangeComment}
              value={this.state.comment}
              id="comment"
              type="comment"
              rows={4}
            />
          </Form.Item>
        </Form>
        {this.imageUploaded()}

        <Button
          type="dashed"
          className="submit-button"
          onClick={this.showFormModal}
        >
          Upload Photo
        </Button>

        {Fb.map((cat, catIndex) => {
          // var catScore = cat.score;
          return (
            // Category
            <Collapse defaultActiveKey={["1"]}>
              <Panel
                header={<div catIndex={catIndex}>{cat.name}</div>}
                key={catIndex + 1}
                className="bg-orange"
              >
                <div catIndex={catIndex}>
                  {cat.subcategories.map((subCat, subCatIndex) => {
                    return (
                      // SubCategory
                      <Collapse defaultActiveKey={["1"]}>
                        <Panel
                          header={
                            <div subCatIndex={subCatIndex}>{subCat.name}</div>
                          }
                          key={subCatIndex + 1}
                          className="bg-orange"
                        >
                          <List
                            dataSource={subCat.questions} // Questions
                            renderItem={(item) => (
                              <List.Item>
                                <div className="checklist-item">
                                  <div className="create-audit-row">{item}</div>
                                  <div className="checklist-checkbox">
                                    {this.createCheckbox(item, catIndex)}
                                  </div>
                                </div>
                              </List.Item>
                            )}
                          />
                        </Panel>
                      </Collapse>
                    );
                  })}
                </div>
                <b>
                  Total Score:{" "}
                  <span className="total_score">
                    {Math.round(
                      (this.state.weightage[0] / 6) *
                        (this.state.catCounts[0] / 2)
                    ) +
                      Math.round(
                        (this.state.weightage[1] / 12) *
                          (this.state.catCounts[1] / 2)
                      ) +
                      Math.round(
                        (this.state.weightage[2] / 16) *
                          (this.state.catCounts[2] / 2)
                      )}
                    /100
                  </span>
                </b>
              </Panel>
            </Collapse>
          );
        })}
        <b>
          Total Score:{" "}
          <span className="total_score">
            {(this.state.catCounts[0] +
              this.state.catCounts[1] +
              this.state.catCounts[2] +
              this.state.catCounts[3] +
              this.state.catCounts[4]) /
              2}
          </span>
        </b>

        <Modal
          title="Upload Photo"
          destroyOnClose={true}
          visible={this.state.visibleForm}
          onOk={this.handleUploadOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          <Form
            name="photo_upload"
            className="photo-upload"
            onFinish={this.onFinish}
          >
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
          </Form>

          {/* <Modal
            title="Upload Confirm"
            destroyOnClose={true}
            visible={this.state.visibleConfirm}
            onOk={this.handleUploadOk}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: true, visible: false }}
          >
            <p>Photo Added!</p>
          </Modal> */}
        </Modal>
        <Button
          className="submit-button"
          type="primary"
          onClick={() => this.submitAudit()}
        >
          SUBMIT
        </Button>
      </div>
    );
  }
}

Checklist.propTypes = {
  tenantInfo: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tenantInfo: state.tenantInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
