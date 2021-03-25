import "../App.css";
import { Collapse, Divider, List, Input, Checkbox, Button } from "antd";
import React, { Component } from "react";
import { FB } from './questionsData'
const { Panel } = Collapse;


var prof_cat_size = FB.Professionalism.length + FB.Staff_Hygiene.length;
var housekeeping_cat_size = FB.General_Environment_Cleanliness.length + FB.Hand_Hygiene_Facilities.length;
var food_cat_size = FB.Storage_Food_Refrigerator_Warmer.length + FB.Storage_Preparation_Food.length
var health_cat_size = FB.Food.length + FB.Beverage.length;
var safety_cat_size = FB.General_Safety.length + FB.Electrical_Safety.length + FB.Fire_Emergency_Safety.length;



class Checklist extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  }



  state = {
    checked: false,
    profcount: 0,
    gc_count: 0,
    food_count: 0,
    health_count: 0,
    safety_count: 0,
  }

  //for professionalism and staff hygiene cat
  createprofCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={e => this.handleprofCheckCount(e)}
    />
  )
  handleprofCheckCount = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState(state => state.profcount++)
    } else {
      this.setState(state => state.profcount--)
    }
  }
  //for housekeeping and general cleanliness cat
  creategcCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onChange={e => this.handlegcCheckCount(e)}
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
  }

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








  render() {
    return (
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
        +15 / 2 / (health_cat_size) * (this.state.health_count)
        +35 / 2 / (food_cat_size) * (this.state.food_count)
        +20 / 2 / (housekeeping_cat_size) * (this.state.gc_count)
        +10 / 2 / (prof_cat_size) * (this.state.profcount))} </div>
        <Button className="submit-button" type="primary" htmlType="submit">
          SUBMIT
    </Button>
      </>
    )


  }
}
export default Checklist;








