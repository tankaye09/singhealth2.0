import "../App.css";
import { Collapse, Divider, List, Input, Checkbox } from "antd";
import React, { Component } from "react";
import Questions from "../data/questions.json";

const { Panel } = Collapse;

class ChecklistNonFB extends Component {
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
      onChange={(e) => this.handleprofCheckCount(e)}
    />
  );

  state = {
    checked: false,
    profcount: 0,
  };
  handleprofCheckCount = (e) => {
    const { checked, type } = e.target;
    if (type === "checkbox" && checked === true) {
      this.setState((state) => state.profcount++, this.logCount);
    } else {
      this.setState((state) => state.profcount--, this.logCount);
    }
  };

  render() {
    return (
      <div className="panels">
        <Collapse defaultActiveKey="1">
          <Panel
            header="1. Professionalism & Staff Hygiene"
            key="1"
            className="bg-orange text-white"
          >
            <Collapse defaultActiveKey="1">
              <Panel
                header="Professionalism"
                key="1"
                className="bg-orange text-white"
              >
                <List
                  dataSource={[
                    "Shop is open and ready to service patients/visitors according to operating hours.",
                    "Staff Attendance: adequate staff for peak and non-peak hours.",
                    "At least one clearly assigned person in-charge on site.",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="create-audit-row">{item}</div>
                      <div>{this.createprofCheckbox()}</div>
                    </List.Item>
                  )}
                />
              </Panel>

              <Panel
                header="Staff Hygiene"
                key="2"
                className="bg-orange text-white"
              >
                <List
                  dataSource={[
                    "Staff uniform/attire is not soiled.",
                    "Staff who are unfit for work due to illness should not report to work",
                    "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="create-audit-row">{item}</div>
                      <div>{this.createprofCheckbox()}</div>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
            <div class="pt-10 font-bold text-right">
              Score: {Math.round((20 / 6) * this.state.profcount)}/20
            </div>
          </Panel>

          <Panel
            header="2. Housekeeping & General Cleanliness"
            key="2"
            className="bg-orange text-white"
          >
            <Collapse defaultActiveKey="1">
              <Panel
                header="General Environment Cleanliness"
                key="1"
                className="bg-orange text-white"
              >
                <List
                  // dataSource={dataNonFB.data2_1}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="create-audit-row">{item}</div>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
            <div class="pt-10 font-bold text-right">Score: __/40</div>
          </Panel>

          <Panel
            header="3. Workplace Safety & Health"
            key="3"
            className="bg-orange text-white"
          >
            <Collapse defaultActiveKey="1">
              <Panel
                header="General Safety"
                key="1"
                className="bg-orange text-white"
              >
                <List
                  // dataSource={dataNonFB.data3_1}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="create-audit-row">{item}</div>
                    </List.Item>
                  )}
                />
              </Panel>

              <Panel
                header="Fire & Emergency Safety"
                key="2"
                className="bg-orange text-white"
              >
                <List
                  // dataSource={dataNonFB.data3_2}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="create-audit-row">{item}</div>
                    </List.Item>
                  )}
                />
              </Panel>

              <Panel
                header="Electrical Safety"
                key="3"
                className="bg-orange text-white"
              >
                <List
                  // dataSource={dataNonFB.data3_3}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="create-audit-row">{item}</div>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
            <div class="pt-10 font-bold text-right">Score: __/40</div>
          </Panel>
        </Collapse>
      </div>

      // {/*  <div class="pt-20">
      //         <TextArea placeholder="Remarks" allowClear onChange={onChange} />
      //     </div>
      //     <Divider />
      //     <div class="create-audit-row">
      //         <div>Professionalism & Staff Hygiene</div>
      //         <div>__/20%</div>
      //     </div>
      //     <div class="create-audit-row">
      //         <div>Housekeeping & General Cleanliness</div>
      //         <div>__/40%</div>
      //     </div>
      //     <div class="create-audit-row">
      //         <div>Workplace Safety & Health</div>
      //         <div>__/40%</div>
      //     </div>
      //     <div class="create-audit-row font-bold">
      //         <div>Total</div>
      //         <div>__/100%</div>
      //     </div> */}
    );
  }
}
export default ChecklistNonFB;
