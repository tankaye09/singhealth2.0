import React, { Component } from "react";
import axios from "axios";
import { Col, Table } from "antd";
import { getTenants } from "../actions/authActions";

const { Column, ColumnGroup } = Table;

// const hardData = [
//   {
//     _id: "60631883a28310df640dcfe9",
//     userId: "60631883a28310df640dcfe8",
//     address: "addtenent7",
//     institution: "CGH",
//     auditor: "1",
//     __v: 0,
//   },
//   {
//     _id: "60631d491b5182a0d81d3942",
//     userId: "60631d491b5182a0d81d3941",
//     address: "tenant1",
//     institution: "SGH",
//     auditor: "staff1",
//     __v: 0,
//   },
// ];
export default class Directory extends Component {
  state = {
    tenantData: [],
  };

  // TODO: can't get data to assign to state before rendering
  componentDidMount() {
    getTenants((data) => {
      this.setState({ tenantData: data });
      console.log(this.state.tenantData);
    });
  }

  render() {
    return (
      <div className="table">
        <Table
          dataSource={this.state.tenantData}
          scroll={{ x: 400 }}
          title={() => <div className="table-title">Tenants</div>}
        >
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Institution"
            dataIndex="institution"
            key="institution"
          />
          <Column title="Auditor" dataIndex="auditor" key="auditor" />
          <Column title="User Id" dataIndex="userId" key="userId" />
        </Table>
      </div>
    );
    //     <div className="panels">
    //       {/* <Table> */}
    //       {this.state.tenants.map((tenant, tenIndex) => {
    //         console.log(tenant);
    //         return <div>{tenant}</div>;
    //       })}
    //       {/* </Table> */}
    //     </div>
    //   );
    // }
  }
}
