import "../App.css";
import { Collapse, Divider, DatePicker, Form, List, Input, Checkbox, Button, Modal } from "antd";
import React, { Component } from "react";
import importJSON from "../data/questionsDict.json";
import PhotoPop from "./photo/PhotoPop.js";
import { submit } from "../actions/auditActions.js";
import { uploadPhoto } from "../actions/photoActions";
import { modalGlobalConfig } from "antd/lib/modal/confirm";
const fileUpload = require('fuctbase64');
const nonFb = importJSON.non_fb;
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

class ChecklistNonFB extends Component {

  // not exactly dynamic
  state = {
    type: "Non-FB",
    checked: false,
    catCounts: [0, 0, 0],
    // counts[0]: for Professionalism & Staff Hygiene (20%),
    //counts[1]: for Housekeeping & General Cleanliness (40%)
    //counts[2]: for Workplace Safety & Health (40%)
    total_score: 0,
    image: null,
    date: null,
    description: "",
    location: "",
    visibleForm: false,
    visibleConfirm: false,
    visibleAudit: false,
  };

  submitAudit = () => {
    console.log(this.state);
    submit({
      type: "Non-FB",
      catCounts: this.state.catCounts,
      total_score:
        this.state.catCounts[0] +
        this.state.catCounts[1] +
        this.state.catCounts[2],
      image: this.state.image,
      date: this.state.date,
      description: this.state.description,
      location: this.state.location,
    });
    this.showAuditModal();
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeDate = (date, dateString) => {
    this.setState({ date: date });
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

  handleUploadOk = e => {
    console.log(e);
    this.setState({
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

  fileSelectedHandler = event => {
    // console.log(event.target.files[0]);
    fileUpload(event)
      .then((data) => {
        // console.log("base64: ", data.base64);
        this.setState({
          image: data.base64
        })
      })
  }

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
      <div>
        
        <h1>Non-FB Checlist</h1>
        <Form {...layout}
                    name="Non-FB Checklist"
                    className="nonfb_checklist"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="date"
                        label = "Date"
                        rules={[{ required: true, message: "Date of Incident" }]}
                    >
                        <DatePicker className="auditDate"
                            placeholder="Date"
                            onChange={this.onChangeDate}
                        />
                    </Form.Item>

                    <Form.Item
                        name="Comment"
                        label = "Comment"
                        rules={[
                            {
                                required: false,
                                message: "Description",
                            },
                        ]}
                    >
                        <Input className="commentBox"
                            //placeholder="Comment"
                            onChange={this.onChange}
                            value={this.state.description}
                            id="comment"
                            type="comment"
                        />
                    </Form.Item>
                    <Form.Item label="Total Score: ">
          <span className="total_score">{(this.state.catCounts[0]+this.state.catCounts[1]+this.state.catCounts[2])/2}</span>
        </Form.Item>
                </Form>

      <div 
      className="panels">
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
        {/* <Button
          className="submit-button"
          type="primary"
          onClick={this.onFinish}
        >
          SUBMIT
        </Button> */}
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
              name="description"
              rules={[
                {
                  required: true,
                  message: "Description",
                },
              ]}
            >
              <Input
                placeholder="Description"
                onChange={this.onChange}
                value={this.state.description}
                id="description"
                type="description"
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
            cancelButtonProps={{ disabled: true, visible: false, }}
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

export default ChecklistNonFB;
