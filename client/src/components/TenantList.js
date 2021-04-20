import React, { Component } from "react";
import axios from "axios";
import { Input, Button, Space, Table, Modal, Layout } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import {
  getTenants,
  setSelectedTenant,
  delTenant,
} from "../actions/tenantActions";
import { deleteAudit } from "../actions/auditActions";
import PropTypes from "prop-types";
import { FormProvider } from "antd/lib/form/context";
import { deleteTenant } from "../actions/authActions";

class Directory extends Component {
  constructor() {
    super();
    this.state = {
      tenantData: [],
      searchText: "",
      searchedColumn: "",
      tenantInfo: {},
      visible: false,
      userId: null,
      rerender: "",
    };

    // this.delTenant = this.delTenant.bind(this);
    this.deleteAudit = deleteAudit.bind(this);
    // this.deleteTenant = this.deleteTenant.bind(this);
    // this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.getTenantFunction();
  }

  getTenantFunction() {
    console.log("data");
    this.props.getTenants((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].type === "Non-FB") {
          data[i].total_score = (data[i].total_score / 34) * 100;
        } else {
          data[i].total_score = (data[i].total_score / 96) * 100;
        }
      }
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

  // confirmDelete = () => {
  //   // this.setState({
  //   //   visible: true,
  //   // });
  //   this.onDeleteClick();
  // }

  onDeleteClick = async () => {
    this.hideModal();
    var tenantList = this.state.tenantData;
    // function sleep(ms) {
    //   return new Promise((resolve) => setTimeout(resolve, ms));
    // }
    for (var i = 0; i < tenantList.length; i++) {
      if (tenantList[i].userId == this.state.userId) {
        console.log(this.state.userId);
        delTenant({ _id: tenantList[i]._id });
        deleteTenant({ _id: this.state.userId });
        this.deleteAudit({ tenantID: tenantList[i]._id }).then(() => {
          // this.setState(this.state); // this should rerender the component but it does not
          this.getTenantFunction(); // this gets the new data from database and sets the state of tenantData to the updated one
        });
        console.log("sent for deletion");
        break;
      }
    }
    // console.log("sleeping");
    // await sleep(1000);
    // console.log("slept");
    // this.forceUpdate();
  };

  showModal = (record) => {
    this.setState({
      visible: true,
      userId: record.userId,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

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
        title: "Type",
        dataIndex: "type",
        key: "type",
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
              className="action-buttons-normalwidth"
              size="small"
              onClick={() => this.onCreateClick(record)}
            >
              Create
              <br />
              Audit
            </Button>
            <Button
              className="action-buttons-normalwidth"
              size="small"
              onClick={() => this.showModal(record)}
            >
              Delete
              <br />
              Tenant
            </Button>

            <Modal
              title="Confirm Delete"
              visible={this.state.visible}
              onOk={this.onDeleteClick.bind(this)}
              onCancel={this.hideModal}
              okText="Confirm"
              cancelText="Cancel"
            >
              <p>Are you sure you want to delete this Tenant?</p>
            </Modal>
          </div>
        ),
      },
    ];
    return (
      <Layout>
        <div className="table">
          <h3>Tenants</h3>
          <Table
            columns={columns}
            dataSource={this.state.tenantData}
            scroll={{ x: 400, y: "68vh" }}
          />
        </div>
      </Layout>
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
