import "../App.css";
import { Collapse, Divider, List, Input, Checkbox, Button } from "antd";
import React, { Component } from "react";
import importJSON from "../data/questionsDict.json";
const nonFb = importJSON.non_fb;
const { Panel } = Collapse;

// TODO: Take score from json file => Update the score, replace the json file

class ChecklistNonFB extends Component {
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

  onFinish = () => {
    var newState = [];
    for (var i = 0; i < this.state.catCounts.length; i++) {
      newState.push(this.state.catCounts[i] / 2);
    }
    const submitData = {
      catCounts: newState,
    };

    console.log(submitData);
  };

  createCheckbox = (label, catIndex) => (
    <Checkbox
      label={label}
      // handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={(e) => this.handleCount(e, catIndex)}
    />
  );

  // not exactly dynamic
  state = {
    checked: false,
    catCounts: [0, 0, 0], 
    // counts[0]: for Professionalism & Staff Hygiene (20%), 
    //counts[1]: for Housekeeping & General Cleanliness (40%)
    //counts[2]: for Workplace Safety & Health (40%)
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
        <Button
          className="submit-button"
          type="primary"
          onClick={this.onFinish}
        >
          SUBMIT
        </Button>
      </div>
    );
  }
}

export default ChecklistNonFB;