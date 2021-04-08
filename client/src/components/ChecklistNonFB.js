import "../App.css";
import {
  Collapse,
  Divider,
  DatePicker,
  Form,
  List,
  Input,
  Checkbox,
  Button,
  Modal,
} from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import importJSON from "../data/questionsDict.json";
import { submit } from "../actions/auditActions.js";
import store from "../store";
import dateformat from "dateformat";
const fileUpload = require("fuctbase64");
const nonFb = importJSON.non_fb;
const { Panel } = Collapse;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const mapDispatchToProps = {
  submit,
};

// TODO: Take score from json file => Update the score, replace the json file

class ChecklistNonFB extends Component {
  // not exactly dynamic
  state = {
    tenantInfo: {},
    type: "Non-FB",
    checked: false,
    catCounts: [0, 0, 0],
    // counts[0]: for Professionalism & Staff Hygiene (20%),
    //counts[1]: for Housekeeping & General Cleanliness (40%)
    //counts[2]: for Workplace Safety & Health (40%)
    total_score: 0,
    image: null,
    tempImageBase64: [],
    tempImageCaption: null,
    date: null,
    comment: null,
    location: "",
    visibleForm: false,
    visibleConfirm: false,
    visibleAudit: false,
  };

  submitAudit = () => {
    console.log(this.state);
    console.log(typeof this.state.date);
    console.log(typeof this.props.tenantInfo.record._id);
    this.props.submit({
      type: "Non-FB",
      catCounts: this.state.catCounts,
      total_score:
        this.state.catCounts[0] +
        this.state.catCounts[1] +
        this.state.catCounts[2],
      image: this.state.image,
      date: this.state.date,
      comment: this.state.comment,
      location: this.state.location,
      tenantID: this.props.tenantInfo.record._id,
    });
    this.showAuditModal();
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

  showFormModal = () => {
    this.setState({
      visibleForm: true,
    });
  };

  showAuditModal = () => {
    this.setState({
      visibleAudit: true,
    });
  };

  showConfirmModal = () => {
    this.setState({
      visibleConfirm: true,
    });
  };

  handleFormOk = (e) => {
    console.log(e);
    this.showConfirmModal();
  };

  handleAuditOk = (e) => {
    console.log(e);
    this.setState({
      visibleAudit: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visibleForm: false,
    });
  };

  handleUploadOk = (e) => {
    console.log(e);
    console.log(this.state);
    this.setState({
      image: [
        {
          base64: this.state.tempImageBase64[0].base64,
          date: this.state.tempImageBase64[0].date,
          caption: this.state.tempImageCaption,
        },
      ],
      visibleConfirm: false,
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

      default:
        break;
    }
  };

  render() {
    return (
      <div className="table">
        <h3>
          Non-F&B Audit for Tenant at Address:{" "}
          <b>
            {this.props.tenantInfo.record._id !== null
              ? this.props.tenantInfo.record._id
              : ""}
          </b>
        </h3>

        <Form
          // {...layout}
          name="Non-FB Checklist"
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
            name="Comment"
            rules={[{ required: true, message: "Description" }]}
          >
            <TextArea
              placeholder="Notes or Comments"
              onChange={this.onChange}
              value={this.state.comment}
              id="comment"
              type="comment"
              rows={4}
            />
          </Form.Item>
        </Form>

        <Button
          type="dashed"
          className="submit-button"
          onClick={this.showFormModal}
        >
          Upload Photo
        </Button>

        <div className="panels">
          {nonFb.map((cat, catIndex) => {
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
                                    <div className="create-audit-row">
                                      {item}
                                    </div>
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
                  <div>Score: {this.state.catCounts[catIndex] / 2}</div>
                </Panel>
              </Collapse>
            );
          })}
          <b>
            Total Score:{" "}
            <span className="total_score">
              {(this.state.catCounts[0] +
                this.state.catCounts[1] +
                this.state.catCounts[2]) /
                2}
            </span>
          </b>

          <Modal
            title="Upload Photo"
            visible={this.state.visibleForm}
            onOk={this.handleFormOk}
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
              {/* <Form.Item
              name="date"
              rules={[{ required: true, message: "Date of Incident" }]}
            >
              <DatePicker
                placeholder="Date"
                onChange={this.onChangeDate}
              />
            </Form.Item> */}

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

              {/* <Form.Item
              name="location"
              rules={[{ required: true, message: "Location of Incident" }]}
            >
              <Input
                placeholder="Location"
                onChange={this.onChange}
                value={this.state.location}
                id="location"
                type="location"
              />
            </Form.Item> */}
            </Form>
            {/* <Form>
            <Button
              type="primary"
              htmlType="submit"
              className="upload-photo-button"
              onClick={() => { this.upload(this.state); }}
            >
              Upload
                    </Button>
          </Form> */}
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
          </Modal>
          <Button
            onClick={() => this.submitAudit()}
            className="submit-button"
            type="primary"
            htmlType="submit"
          >
            SUBMIT
          </Button>
          {/* <Button onClick={() => this.updateItems()} className="submit-button" type="primary" htmlType="submit">
          TEST
        </Button> */}
          {/* <Modal
            title=""
            visible={this.state.visibleAudit}
            onOk={this.handleAuditOk}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: true, visible: false }}
          >
            <p>Audit Uploaded!</p>
          </Modal> */}
        </div>
      </div>
    );
  }
}
ChecklistNonFB.propTypes = {
  tenantInfo: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tenantInfo: state.tenantInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChecklistNonFB);
