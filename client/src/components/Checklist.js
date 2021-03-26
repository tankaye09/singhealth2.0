import "../App.css";
import { Collapse, Divider, List, Input, Checkbox, Button, Modal } from "antd";
import React, { Component } from "react";
import importJSON from "../data/questionsDict.json";
import PhotoPop from "./photo/PhotoPop.js"
import { submit, display } from "../actions/auditActions.js"
import { FB } from '../data/questionsData'
const Fb = importJSON.fb;
const { Panel } = Collapse;

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
    submit({
      type: "Non-FB",
      catCounts: this.state.catCounts,
      total_score:
        this.state.catCounts[0] +
        this.state.catCounts[1] +
        this.state.catCounts[2] +
        this.state.catCounts[3] +
        this.state.catCounts[4],
    });
    this.showModal2();
  };

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

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleOk2 = (e) => {
    console.log(e);
    this.setState({
      visible2: false,
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
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
    type: "FB",
    checked: false,
    catCounts: [0, 0, 0, 0, 0], // counts[0]: for Professionalism & Staff Hygiene (10%), counts[1]: for Housekeeping & General Cleanliness (20%)
    total_score: 0,
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
    console.log(this.state.items);
    return (
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
        {/* <Button
          className="submit-button"
          type="primary"
          onClick={this.onFinish}
        >
          SUBMIT
        </Button> */}
        {/* <Button onClick={() => this.updateItems()} className="submit-button" type="primary" htmlType="submit">
          TEST
        </Button> */}
        <Button type="primary" onClick={this.showModal}>
          Upload Photo
        </Button>
        <Modal
          title="Upload Photo"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: false }}
        >
          <PhotoPop />
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
          visible={this.state.visible2}
          onOk={this.handleOk2}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: true, visible: false }}
        >
          <p>Audit Uploaded!</p>
        </Modal>
      </div>
    );
  }
}
export default Checklist;
