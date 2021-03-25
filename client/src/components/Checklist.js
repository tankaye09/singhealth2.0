import "../App.css";
import { Collapse, Divider, List, Input, Checkbox, Button, Modal } from "antd";
import React, { Component } from "react";
import importJSON from "../data/questionsDict.json";
import PhotoPop from "./photo/PhotoPop.js"
import { submit, display } from "../actions/auditActions.js"

const Fb = importJSON.fb;
const { Panel } = Collapse;

class Checklist extends Component {
  state = {
    checked: false,
    cat0count: 0, // count for Professionalism & Staff Hygiene (10%)
    cat1count: 0, // count for Housekeeping & General Cleanliness (20%)
    cat2count: 0,
    cat3count: 0,
    cat4count: 0,
    items: [],
    visible: false,
    visible2: false,
  };

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, "is selected.");
    }
  };

  createprofCheckbox = (label) => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={(e) => this.handleCat0Count(e)}
    />
  );

  updateItems = () => {
    display((data) => {
      // console.log(data);
      this.setState({ ...this.state, items: data });
    });
  }

  handleCat0Count = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState((state) => state.cat0count++, this.logCount);
    } else {
      this.setState((state) => state.cat0count--, this.logCount);
    }
  };

  submitAudit = () => {
    submit();
    this.showModal2();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleOk2 = e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log(this.state.items);
    return (
      <div className="panels">
        {Fb.map((cat, catIndex) => {
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
                                <div>{this.createprofCheckbox()}</div>
                              </List.Item>
                            )}
                          />
                        </Panel>
                      </Collapse>
                    );
                  })}
                </div>
              </Panel>
            </Collapse>
          );
        })}
        <div>{this.state.cat0count}</div>
        <Button type="primary" onClick={this.showModal}>
          Upload Photo
        </Button>
        <Modal
          title="Upload Photo"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
        >
          <PhotoPop />
        </Modal>
        <Button onClick={() => this.submitAudit()} className="submit-button" type="primary" htmlType="submit">
          SUBMIT
        </Button>
        {/* <Button onClick={() => this.updateItems()} className="submit-button" type="primary" htmlType="submit">
          TEST
        </Button> */}
        <Modal
          title=""
          visible={this.state.visible2}
          onOk={this.handleOk2}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: true, visible: false, }}
        >
          <p>Audit Uploaded!</p>
        </Modal>
      </div >
    );
  }
}


export default Checklist;
