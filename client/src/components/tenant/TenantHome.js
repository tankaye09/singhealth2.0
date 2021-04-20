import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { Table, Input, Space, Button, Layout } from "antd";
import { display } from "../../actions/auditActions.js";
import { setSelectedTenant, getTenant } from "../../actions/tenantActions";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import store from "../../store.js";
import PropTypes from "prop-types";
import moment from "moment";
const { Column, ColumnGroup } = Table;

// const Audit = (props) => (
//   <tr>
//     <td>{props.audit.username}</td>
//     <td>{props.audit.image}</td>
//     <td>{props.audit.notes}</td>
//     <td>{props.audit.tags}</td>
//     <td>{props.audit.date.substring(0, 10)}</td>
//     <td>
//       <Link to={"/edit/" + props.audit._id}>edit</Link> |
//       <a
//         href="#"
//         onClick={() => {
//           props.deleteAudit(props.audit._id);
//         }}
//       >
//         delete
//       </a>
//     </td>
//   </tr>
// );

class TenantHome extends Component {
  constructor(props) {
    super(props);

    this.deleteAudit = this.deleteAudit.bind(this);
    this.state = {
      audits: [],
      actualAudits: [],
      tenantId: "",
    };
  }

  componentDidMount() {
    console.log("Mounted: ", store.getState().auth.user.id);
    getTenant((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].userId === store.getState().auth.user.id) {
          this.setState(
            { tenantId: data[i]._id },
            console.log(data[i]._id),
            this.props.display((displayData) => {
              // console.log("displayData is: ", displayData);
              var tempList = [];
              for (var i = 0; i < displayData.length; i++) {
                // console.log(displayData[i].tenantID);
                if (displayData[i].tenantID === this.state.tenantId) {
                  tempList.push(displayData[i]);
                }
              }
              // console.log(tempList);
              this.setState({ actualAudits: tempList });
            })
          );
        }
      }
    });

    // this.auditList();
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

  deleteAudit(id) {
    axios
      .delete("http://localhost:5000/audits/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      audits: this.state.audits.filter((el) => el._id !== id),
    });
  }

  onViewClick = (record) => {
    //pass to redux
    this.props.setSelectedTenant({ record });
    //if FB, go to FB | if non-FB go to non-FB
    this.props.history.push("/viewaudittenant");
    // this.props.tenantInfo = record;
    console.log({ record });
  };

  // auditList() {
  //   for (var i = 0; i < this.state.audits.length; i++) {
  //     console.log(this.state.audits[i]);
  //     if (this.state.audits[i].tenantID == "606d8d37f1c72db7882af5c4") {
  //       this.state.actualAudits.push(this.state.audits[i]);
  //     }
  //   }
  //   return this.state.actualAudits.map((currentaudit) => {
  //     return (
  //       <Audit
  //         audit={currentaudit}
  //         deleteAudit={this.deleteAudit}
  //         key={currentaudit._id}
  //       />
  //     );
  //   });
  // }

  render() {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: "40%",
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
        title: "Score",
        dataIndex: "total_score",
        key: "total_score",
        width: "25%",
        sorter: (a, b) => {
          if (a.score > b.score) return 1;
          else return -1;
        },
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        width: "35%",
        render: (record) => (
          <div>
            <Button
              className="action-buttons"
              size="small"
              onClick={() => this.onViewClick(record)}
            >
              View
              <br />
              Audit
            </Button>
          </div>
        ),
      },
    ];
    return (
      <Layout className="table">
        <h3>Your Audits</h3>
        <Table
          columns={columns}
          dataSource={this.state.actualAudits}
          rowClassName={(record) => (record.total_score < 95 ? "red" : "green")}
          scroll={{ y: "72vh" }}
        />
      </Layout>
    );
  }
}

TenantHome.propTypes = {
  setSelectedTenant: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  userID: state.auth.user.id,
});
export default connect(mapStateToProps, {
  setSelectedTenant,
  getTenant,
  display,
})(TenantHome);
