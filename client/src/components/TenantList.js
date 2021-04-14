import React, { Component } from "react";
import axios from "axios";
import { Input, Button, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { getTenants, setSelectedTenant } from "../actions/tenantActions";
import PropTypes from "prop-types";
import { FormProvider } from "antd/lib/form/context";

class Directory extends Component {
  constructor() {
    super();
    this.state = {
      tenantData: [],
      searchText: "",
      searchedColumn: "",
      tenantInfo: {},
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

  onCreateClick = (record) => {
    //pass to redux
    this.props.setSelectedTenant({ record });
    //if FB, go to FB | if non-FB go to non-FB
    if (record.type === "F&B") {
      this.props.history.push("/checklistFB");
    } else this.props.history.push("/checklistNonFB");
    // this.props.tenantInfo = record;
    console.log({ record });
  };
  onDeleteClick = () => ({
    //pass props to checklist
    //if FB, go to FB | if non-FB go to non-FB
  });

  render() {
    const columns = [
      {
        title: "Addr.",
        dataIndex: "address",
        key: "address",
        fixed: "left",
        width: "150",
        ...this.getColumnSearchProps("address"),
      },
      {
        title: "Inst.",
        dataIndex: "institution",
        key: "institution",
        width: "150",
        ...this.getColumnSearchProps("institution"),
      },
      // {
      //   title: "Auditor",
      //   dataIndex: "auditor",
      //   key: "auditor",
      //   width: "150",
      //   ...this.getColumnSearchProps("auditor"),
      // },
      {
        title: "ID",
        dataIndex: "userId",
        key: "userId",
        width: "150",
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "FB/NonFB",
        dataIndex: "type",
        key: "type",
        width: "150",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        fixed: "right",
        width: "20%",
        render: (record) => (
          <div>
            <Button
              className="action-buttons"
              type="primary"
              size="small"
              onClick={() => this.onCreateClick(record)}
            >
              Create {"\n"} Audit
            </Button>
            <p></p>
            <Button
              className="action-buttons"
              type="primary"
              size="small"
              onClick={() => this.onDeleteClick(record)}
            >
              Delete Tenant
            </Button>
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
  setSelectedTenant: PropTypes.func.isRequired,
  tenantData: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tenantData: state.tenantData,
});
export default connect(mapStateToProps, { getTenants, setSelectedTenant })(
  Directory
);
