import React, { Component, TextArea } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input, Table, Button, Tag, Space } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { display } from "../actions/auditActions.js";

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

const mapDispatchToProps = {
  display,
};

class AuditList extends Component {
  constructor(props) {
    super(props);

    this.deleteAudit = this.deleteAudit.bind(this);
    this.state = { audits: [] };
  }

  componentDidMount() {
    // axios
    //   .get("http://localhost:5000/api/audits")
    //   .then((response) => {
    //     this.setState({ audits: response.data });
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.props.display((data) => {
      console.log(data);
      this.setState({ audits: data });
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

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    // console.log(this.state.audits);
    const columns = [
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        fixed: "left",
        width: "150",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        width: "150",
        ...this.getColumnSearchProps("location"),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: "150",
        ...this.getColumnSearchProps("date"),
      },
      {
        title: "Audit Score",
        dataIndex: "total_score",
        key: "total_score",
        width: "150",
        ...this.getColumnSearchProps("total_score"),
      },
      {
        title: "View Audit",
        dataIndex: "",
        key: "x",
        render: (record) => (
          <div>
            <Button
              onClick={() =>
                window.open(
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                )
              }
            >
              View Image
            </Button>
          </div>
        ),
      },
    ];

    return (
      <div className="table">
        <Table
          columns={columns}
          dataSource={this.state.audits}
          title={() => <div className="table-title">Audits</div>}
          scroll={{ x: 400, y: 300 }}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AuditList);
