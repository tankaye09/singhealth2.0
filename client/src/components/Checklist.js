import "../App.css";
import { Collapse, Divider, List, Input, Checkbox, Button, Modal } from "antd";
import React, { Component } from "react";
import importJSON from "../data/questionsDict.json";
import PhotoPop from "./photo/PhotoPop.js"
import { submit, display } from "../actions/auditActions.js"
import { FB } from './questionsData'
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
<<<<<<< HEAD
      onChange={(e) => this.handleCount(e, catIndex)}
=======
      onChange={e => this.handlegcCheckCount(e)}
>>>>>>> week9cw
    />
  )
  handlegcCheckCount = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState(state => state.gc_count++)
    } else {
      this.setState(state => state.gc_count--)
    }
  }
  //for food hygiene cat
  createfoodCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={e => this.handlefoodCheckCount(e)}
    />
  )
  handlefoodCheckCount = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState(state => state.food_count++)
    } else {
      this.setState(state => state.food_count--)
    }
  }

<<<<<<< HEAD
  // not exactly dynamic
  state = {
    checked: false,
    catCounts: [0, 0, 0, 0, 0], // counts[0]: for Professionalism & Staff Hygiene (10%), counts[1]: for Housekeeping & General Cleanliness (20%)
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

=======
  updateItems = () => {
    display((data) => {
      // console.log(data);
      this.setState({ ...this.state, items: data });
    });
  }

  //for healthier choice cat 
  createhealthCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={e => this.handlehealthCheckCount(e)}
    />
  )
  handlehealthCheckCount = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState(state => state.health_count++)
    } else {
      this.setState(state => state.health_count--)
    }
  };

  submitAudit = () => {
    submit({
      type: "FB",
      profcount: Math.round(this.state.profcount / 2),
      gc_count: Math.round(this.state.gc_count / 2),
      food_count: Math.round(this.state.food_count / 2),
      health_count: Math.round(this.state.health_count / 2),
      safety_count: Math.round(this.state.safety_count / 2),
      total_score: Math.round(20 / 2 / (safety_cat_size) * (this.state.safety_count)
        + 15 / 2 / (health_cat_size) * (this.state.health_count)
        + 35 / 2 / (food_cat_size) * (this.state.food_count)
        + 20 / 2 / (housekeeping_cat_size) * (this.state.gc_count)
        + 10 / 2 / (prof_cat_size) * (this.state.profcount)),
    });
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
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  //for workplace safety cat
  createsafetyCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={e => this.handlesafetyCheckCount(e)}
    />
  )
  handlesafetyCheckCount = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState(state => state.safety_count++)
    } else {
      this.setState(state => state.safety_count--)
    }
  }

>>>>>>> week9cw
  render() {
    console.log(this.state.items);
    return (
<<<<<<< HEAD
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
        <Button
          className="submit-button"
          type="primary"
          onClick={this.onFinish}
        >
=======
      <>
        <h1 className="start">F&B Checklist</h1>

        <Divider />

        <div>
          <Collapse accordion defaultActiveKey="1" >

            <Panel header="Professionalism & Staff Hygiene (10%)" key="1" className="bg-orange text-white">
              <Collapse accordion defaultActiveKey="1" >
                <Panel header="Professionalism" key="1" className="bg-orange text-white">
                  <List
                    dataSource={FB.Professionalism} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        {this.createprofCheckbox()}
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Staff Hygiene" key="2" className="bg-orange text-white">
                  <List
                    dataSource={FB.Staff_Hygiene} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        <div>{this.createprofCheckbox()}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
              <div class="pt-10 font-bold text-right">Score: {Math.round(10 / 2 / (prof_cat_size) * (this.state.profcount))}/10</div>
            </Panel>

            <Panel header="Housekeeping & General Cleanliness (20%)" key="2" className="bg-orange text-white">
              <Collapse accordion defaultActiveKey="1" >
                <Panel header="General Environment Cleanness" key="1" className="bg-orange text-white">
                  <List
                    dataSource={FB.General_Environment_Cleanliness} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        <div>{this.creategcCheckbox()}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Hand Hygiene Facilities" key="2" className="bg-orange text-white">
                  <List
                    dataSource={FB.Hand_Hygiene_Facilities} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        <div>{this.creategcCheckbox()}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
              <div class="pt-10 font-bold text-right">Score: {Math.round(20 / 2 / (housekeeping_cat_size) * (this.state.gc_count))}/20</div>
            </Panel>

            <Panel header="Food Hygiene (35%)" key="3" className="bg-orange text-white">
              <Collapse accordion defaultActiveKey="1">
                <Panel header="Storage & Preparation of Food" key="1" className="bg-orange text-white">
                  <List
                    dataSource={FB.Storage_Preparation_Food} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        <div>{this.createfoodCheckbox()}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Storage of Food in Refrigerator/ Warmer" key="2" className="bg-orange text-white">
                  <List
                    dataSource={FB.Storage_Food_Refrigerator_Warmer} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        <div>{this.createfoodCheckbox()}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
              <div class="pt-10 font-bold text-right">Score: {Math.round(35 / 2 / (food_cat_size) * (this.state.food_count))}/35</div>
            </Panel>

            <Panel header="Healthier Choice in line with HPB’s Healthy Eating’s Initiative (15%)" key="4" className="bg-orange text-white">
              <Collapse accordion defaultActiveKey="1" >
                <Panel header="Food" key="1" className="bg-orange text-white">
                  <List
                    dataSource={FB.Food} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        {this.createhealthCheckbox()}
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Beverage" key="2" className="bg-orange text-white">
                  <List
                    dataSource={FB.Beverage} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        <div>{this.createhealthCheckbox()}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
              <div class="pt-10 font-bold text-right">Score: {Math.round(15 / 2 / (health_cat_size) * (this.state.health_count))}/15</div>
            </Panel>

            <Panel header="Workplace Safety & Health (20%)" key="5" className="bg-orange text-white">
              <Collapse accordion defaultActiveKey="1" >
                <Panel header="General Safety" key="1" className="bg-orange text-white">
                  <List
                    dataSource={FB.General_Safety} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        {this.createsafetyCheckbox()}
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Fire & Emergency Safety" key="2" className="bg-orange text-white">
                  <List
                    dataSource={FB.Fire_Emergency_Safety} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        <div>{this.createsafetyCheckbox()}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Electrical Safety" key="3" className="bg-orange text-white">
                  <List
                    dataSource={FB.Electrical_Safety} // Questions
                    renderItem={(item) => (
                      <List.Item>
                        <div className="create-audit-row">{item}</div>
                        <div>{this.createsafetyCheckbox()}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
              <div class="pt-10 font-bold text-right">Score: {Math.round(20 / 2 / (safety_cat_size) * (this.state.safety_count))}/20</div>
            </Panel>
          </Collapse>
        </div>

        <div class="pt-10 font-bold text-centre">Total Score:{Math.round(20 / 2 / (safety_cat_size) * (this.state.safety_count)
          + 15 / 2 / (health_cat_size) * (this.state.health_count)
          + 35 / 2 / (food_cat_size) * (this.state.food_count)
          + 20 / 2 / (housekeeping_cat_size) * (this.state.gc_count)
          + 10 / 2 / (prof_cat_size) * (this.state.profcount))} </div>
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
        <Button onClick={() => this.submitAudit()} className="submit-button" type="primary" htmlType="submit">
>>>>>>> week9cw
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
      </>
    )


  }
}
export default Checklist;








