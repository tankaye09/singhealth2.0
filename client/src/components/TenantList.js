import React, { Component } from "react";
import axios from "axios";
import { Input, Button, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { getTenants } from "../actions/tenantActions";
import PropTypes from "prop-types";

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
class Directory extends Component {
  constructor() {
    super();
    this.state = {
      tenantData: [],
      searchText: "",
      searchedColumn: "",
    };
  }

  componentDidMount() {
    console.log("data");

    this.props.getTenants((data) => {
      this.setState({ tenantData: data });
      console.log(this.state.tenantData);
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
    const columns = [
      {
        title: "Addr.",
        dataIndex: "address",
        key: "address",
        fixed: "left",
        ...this.getColumnSearchProps("address"),
      },
      {
        title: "Inst.",
        dataIndex: "institution",
        key: "institution",
        ...this.getColumnSearchProps("address"),
      },
      {
        title: "Auditor",
        dataIndex: "auditor",
        key: "auditor",
        ...this.getColumnSearchProps("auditor"),
      },
      {
        title: "ID",
        dataIndex: "userId",
        key: "userId",
        ...this.getColumnSearchProps("auditor"),
      },
      {
        title: "Create",
        dataIndex: "",
        key: "x",
        fixed: "right",
        render: () => (
          <div>
            <a>FB</a> / <a>Non-FB</a> Audit
          </div>
        ),
      },
    ];
    return (
      <div className="table">
        <Table
          columns={columns}
          dataSource={this.state.tenantData}
          scroll={{ x: 400, y: 300 }}
          title={() => <div className="table-title">Tenants</div>}
        />
      </div>
    );
  }
}

Directory.propTypes = {
  getTenants: PropTypes.func.isRequired,
  tenantData: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tenantData: state.tenantData,
});
export default connect(mapStateToProps, { getTenants })(Directory);
