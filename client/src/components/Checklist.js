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
const fileUpload = require("fuctbase64");
const Fb = importJSON.fb;
const { Panel } = Collapse;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

// TODO: Take score from json file => Update the score, replace the json file

class Checklist extends Component {
  // componentWillMount = () => {
  //   this.selectedCheckboxes = new Set();
  // };

  // toggleCheckbox = (label) => {
  //   if (this.selectedCheckboxes.has(label)) {
  //     this.selectedCheckboxes.delete(label);
  //   } else {
  //     this.selectedCheckboxes.add(label);
  //   }
  // };

  // handleFormSubmit = (formSubmitEvent) => {
  //   formSubmitEvent.preventDefault();

  //   for (const checkbox of this.selectedCheckboxes) {
  //     console.log(checkbox, "is selected.");
  //   }
  // };

  // onFinish = () => {
  //   var newState = [];
  //   for (var i = 0; i < this.state.catCounts.length; i++) {
  //     newState.push(this.state.catCounts[i] / 2);
  //   }
  //   const submitData = {
  //     catCounts: newState,
  //   };

  //   console.log(submitData);
  // };

  submitAudit = () => {
    console.log(this.state);
    submit({
      type: "FB",
      catCounts: this.state.catCounts,
      total_score:
        this.state.catCounts[0] +
        this.state.catCounts[1] +
        this.state.catCounts[2] +
        this.state.catCounts[3] +
        this.state.catCounts[4],
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
    this.setState({ comment: [{ "content": comment.nativeEvent.explicitOriginalTarget.value, "date": dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"), }] });
  };

  onChangeCaption = (caption) => {
    console.log(this.state);
    this.setState({
      tempImageCaption: caption.nativeEvent.explicitOriginalTarget.value
    });
  };

  onChangeDate = (date, dateString) => {
    this.setState({ date: dateformat(date._d.toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ") });
  };

  fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    fileUpload(event).then((data) => {
      console.log("base64: ", data.base64);
      this.setState({
        // image: [{ "base64": data.base64, "date": dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ"), "caption": "" }]
        tempImageBase64: [{ "base64": data.base64, "date": dateformat(Date().toString(), "yyyy-mm-dd'T'HH:MM:ss.sssZ") }]
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
    this.setState({
      image: [{ "base64": this.state.tempImageBase64[0].base64, "date": this.state.tempImageBase64[0].date, "caption": this.state.tempImageCaption }],
      visibleConfirm: false,
    });
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
  handlegcCheckCount = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState((state) => state.gc_count++);
    } else {
      this.setState((state) => state.gc_count--);
    }
  };
  //for food hygiene cat
  createfoodCheckbox = (label) => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={(e) => this.handlefoodCheckCount(e)}
    />
  );
  handlefoodCheckCount = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState((state) => state.food_count++);
    } else {
      this.setState((state) => state.food_count--);
    }
  };

  // not exactly dynamic
  state = {
    checked: false,
    catCounts: [0, 0, 0, 0, 0], // counts[0]: for Professionalism & Staff Hygiene (10%), counts[1]: for Housekeeping & General Cleanliness (20%)
    image: null,
    tempImageBase64: [],
    tempImageCaption: null,
    date: null,
    comment: null,
    location: "",
    visibleForm: false,
    visibleConfirm: false,
    visibleAudit: false,
    tenantInfo: {},
    type: "FB",
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
    return (
      <div className="table">
        <h3>
          F&B Audit for Tenant at Address:{" "}
          <b>
            {this.props.tenantInfo !== null ? this.props.tenantInfo.record._id !== null
              ? this.props.tenantInfo.record._id
              : "" : ""}
          </b>
        </h3>

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
                <div>Score: {this.state.catCounts[catIndex] / 2}</div>
              </Panel>
            </Collapse>
          );
        })}
        <Button type="primary" onClick={this.showFormModal}>
          Upload Photo
        </Button>
        <Modal
          title="Upload Photo"
          visible={this.state.visibleForm}
          onOk={this.handleFormOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Date of Incident" }]}
          >
            <DatePicker className="auditDate"
              placeholder="Date"
              onChange={this.onChangeDate}
            />
          </Form.Item>

          <Form.Item
            name="Comment"
            label="Comment"
            rules={[
              {
                required: false,
                message: "Description",
              },
            ]}
          >
            <Input className="commentBox"
              //placeholder="Comment"
              onChange={this.onChangeComment}
              value={this.state.comment}
              id="comment"
              type="comment"
            />
          </Form.Item>
          <Form.Item label="Total Score: ">
            <span className="total_score">{(this.state.catCounts[0] + this.state.catCounts[1] + this.state.catCounts[2] + this.state.catCounts[3] + this.state.catCounts[4]) / 2}</span>
          </Form.Item>
        </Modal>
        <div className="panels">
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
                                  <div className="create-audit-row">{item}</div>
                                  <div>{this.createCheckbox(item, catIndex)}</div>
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
          <Button type="primary" onClick={this.showFormModal}>
            Upload Photo
        </Button>
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
                  type="capyion"
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
            className="submit-button"
            type="primary"
            onClick={() => this.submitAudit()}
          >
            SUBMIT
        </Button>

          <Modal
            title=""
            visible={this.state.visibleAudit}
            onOk={this.handleAuditOk}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: true, visible: false }}
          >
            <p>Audit Uploaded!</p>
          </Modal>
        </div>
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
export default connect(mapStateToProps)(Checklist);
