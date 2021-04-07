import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Tag, Space } from "antd";
import { getAudits } from "../data/AuditData.ts";

const { Column, ColumnGroup } = Table;

const Audit = (props) => (
  <tr>
    <td>{props.audit.username}</td>
    <td>{props.audit.image}</td>
    <td>{props.audit.notes}</td>
    <td>{props.audit.tags}</td>
    <td>{props.audit.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.audit._id}>edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteAudit(props.audit._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class AuditList extends Component {
  constructor(props) {
    super(props);

    this.deleteAudit = this.deleteAudit.bind(this);

    this.state = { audits: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/audits")
      .then((response) => {
        this.setState({ audits: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteAudit(id) {
    axios
      .delete("http://localhost:5000/audits/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      audits: this.state.audits.filter((el) => el._id !== id),
    });
  }

  auditList() {
    return this.state.audits.map((currentaudit) => {
      return (
        <Audit
          audit={currentaudit}
          deleteAudit={this.deleteAudit}
          key={currentaudit._id}
        />
      );
    });
  }
  render() {
    return (
      <div className="table">
        <Table
          dataSource={data}
          title={() => <div className="table-title">Audits</div>}
          scroll={{ x: 400 }}
        >
          <Column title="Username" dataIndex="username" key="username" />
          <Column
            title="Image"
            dataIndex="image"
            key="image"
            render={(text, record) => (
              <a>
                <td onClick={() => window.open(text, "_blank")}>View Image</td>
              </a>
            )}
          />
          <Column title="Notes" dataIndex="notes" key="notes" />
          <Column title="Date" dataIndex="date" key="date" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
              <>
                {tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
        </Table>
      </div>
    );
  }
}

const data = getAudits("Pamela");
