import React, { Component } from "react";
import axios from "axios";
import { Table } from "antd";
import { getData } from "../data/StoreData.ts";

const { Column, ColumnGroup } = Table;

export default class Directory extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //code runs before the page loads
    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.username),
          username: response.data[0].username, //set username as the first username in the database
        });
      }
    });
  }

  render() {
    return (
      <div class="table">
        <Table
          // columns={columns}
          dataSource={data}
          title={() => <div className="table-title">CGH</div>}
          size="middle"
          pagination={{ position: "bottomLeft" }}
        >
          <Column
            title="Store Name"
            dataIndex="name"
            key="name"
            render={(text, record) => (
              <a>
                <td onClick={() => window.open(record.image, "_blank")}>
                  {text}
                </td>
              </a>
            )}
          />
          <Column title="Location" dataIndex="location" key="location" />
          <Column title="Terms" dataIndex="terms" key="terms" />
          <Column title="Expiry" dataIndex="expiry" key="expiry" />
        </Table>
      </div>
    );
  }
}

// const columns = [
//     {
//         title: 'Store Name',
//         dataIndex: 'name',
//         key: 'name',
//         render: (text, record) => <a>
//             <td onClick={() => window.open(text, "_blank")} /> {text} </a>,
//     },
//     {
//         title: 'Location',
//         dataIndex: 'location',
//         key: 'location',
//     },
//     {
//         title: 'Terms',
//         dataIndex: 'terms',
//         key: 'terms',
//     },
//     {
//         title: 'Expiry',
//         dataIndex: 'expiry',
//         key: 'expiry',
//     },
// ];

const data = getData("");
