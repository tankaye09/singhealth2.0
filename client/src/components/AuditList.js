import React, { Component, TextArea } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input, Table, Button, Layout, Space } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { setSelectedTenant, getTenants } from "../actions/tenantActions";
import { sendEmailReminder } from "../actions/auditActions";
import PropTypes from "prop-types";

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
  sendEmailReminder,
  setSelectedTenant,
  getTenants,
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
      for (var i = 0; i < data.length; i++) {
        if (data[i].type === "Non-FB") {
          data[i].total_score = ((data[i].total_score / 34) * 100).toFixed(2);
        } else {
          data[i].total_score = ((data[i].total_score / 96) * 100).toFixed(2);
        }
      }
      this.setState({ audits: data });
    });
  }

  onViewClick = (record) => {
    //pass to redux
    this.props.setSelectedTenant({ record });
    //if FB, go to FB | if non-FB go to non-FB
    this.props.history.push("/viewaudit");
    // this.props.tenantInfo = record;
    console.log({ record });
  };

  onReminderClick = (record) => {
    console.log({ record });
    this.props.sendEmailReminder({ record });
  };

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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : "#a35709" }} />
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
    // if (this.state.audits.length > 0) {
    //   console.log("before: ", this.state.audits[0].date);
    //   const someDate = moment(this.state.audits[0].date);
    //   console.log("after: ", someDate);
    // }
    const columns = [
      {
        title: "Addr.",
        dataIndex: "location",
        key: "location",
        width: "20%",
        ...this.getColumnSearchProps("location"),
      },
      {
        title: "Tenant ID",
        dataIndex: "tenantID",
        key: "itenantID",
        width: "20%",
        ...this.getColumnSearchProps("tenantID"),
      },
      {
        title: "Inst.",
        dataIndex: "institution",
        key: "institution",
        width: "15%",
        ...this.getColumnSearchProps("institution"),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: "15%",
        sorter: (a, b) => {
          if (a.date > b.date) return 1;
          else return -1;
        },
        defaultSortOrder: "descend",
        ...this.getColumnSearchProps("date"),
        render: (text) =>
          moment(text, "YYYY-MM-DDTHH:mm:ss.SSS").format("DD/MM/YYYY"),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "10%",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "Audit Score",
        dataIndex: "total_score",
        key: "total_score",
        fixed: "right",
        width: "10%",
        sorter: (a, b) => {
          if (a.score > b.score) return 1;
          else return -1;
        },
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        fixed: "right",
        width: "10%",
        render: (record) => (
          <div>
            <Button
              className="action-buttons"
              size="small"
              onClick={() => this.onViewClick(record)}
            >
              View
            </Button>
            <Button
              className="action-buttons"
              size="small"
              onClick={() => this.onReminderClick(record)}
            >
              Reminder
            </Button>
          </div>
        ),
      },
    ];

    return (
      <Layout>
        <div className="table">
          <h3>Your Audits</h3>
          <Table
            rowClassName={(record) =>
              record.total_score < 95 ? "red" : "green"
            }
            columns={columns}
            dataSource={this.state.audits}
            scroll={{ x: 800, y: 300 }}
          />
        </div>
      </Layout>
    );
  }
}

AuditList.propTypes = {
  setSelectedTenant: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  userID: state.auth.user.id,
});
export default connect(mapStateToProps, mapDispatchToProps)(AuditList);
