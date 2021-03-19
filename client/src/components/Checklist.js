import "../App.css";
import { Collapse, Divider, List, Input, Checkbox, Button } from "antd";
import React, { Component } from "react";
import importJSON from "../data/questionsDict.json";
const Fb = importJSON.fb;
const { Panel } = Collapse;

class Checklist extends Component {
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

  state = {
    checked: false,
    cat0count: 0, // count for Professionalism & Staff Hygiene (10%)
    cat1count: 0, // count for Housekeeping & General Cleanliness (20%)
    cat2count: 0,
    cat3count: 0,
    cat4count: 0,
  };
  handleCat0Count = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState((state) => state.cat0count++, this.logCount);
    } else {
      this.setState((state) => state.cat0count--, this.logCount);
    }
  };
  render() {
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
        <Button className="submit-button" type="primary" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    );
  }
}

export default Checklist;
