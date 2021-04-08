import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { Table, Tag, Space, Button } from "antd";
import { display } from "../../actions/auditActions.js";
import { auditInfo } from "../../actions/tenantActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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

class TenantHome extends Component {
  constructor(props) {
    super(props);

    this.deleteAudit = this.deleteAudit.bind(this);

    this.state = {
      audits: [],
      actualAudits: [],
    };
  }

  componentDidMount() {
    display((data) => {
      var tempList = [];
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (data[i].tenantID == "606d8d37f1c72db7882af5c4") {
          tempList.push(data[i]);
        }
      }
      this.setState({ actualAudits: tempList });
    });
    // this.auditList();
  }

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
    this.props.auditInfo({ record });
    //if FB, go to FB | if non-FB go to non-FB
    this.props.history.push("/viewaudittenant");
    // this.props.tenantInfo = record;
    console.log({ record });
  };

  auditList() {
    for (var i = 0; i < this.state.audits.length; i++) {
      console.log(this.state.audits[i]);
      if (this.state.audits[i].tenantID == "606d8d37f1c72db7882af5c4") {
        this.state.actualAudits.push(this.state.audits[i]);
      }
    }
    return this.state.actualAudits.map((currentaudit) => {
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
          dataSource={this.state.actualAudits}
          title={() => <div className="table-title">Audits</div>}
          scroll={{ x: 400 }}
        >
          <Column title="Type" dataIndex="type" key="type" />
          {/* <Column title="Tenant" dataIndex="tenantID" key="tenantID" /> */}
          <Column title="Date" dataIndex="date" key="date" />
          <Column
            title="Total Score"
            dataIndex="total_score"
            key="total_score"
          />
          <Column
            title="View Audit"
            dataIndex="view_audit"
            key="view_audit"
            render={(text, record) => (
              <Button
                className="action-buttons"
                type="primary"
                size="small"
                onClick={() => this.onViewClick(record)}
              >
                View Audit
              </Button>
            )} />
        </Table>
      </div>
    );
  }
}

TenantHome.propTypes = {
  auditInfo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  tenantID: state.tenantID,
});
export default connect(mapStateToProps, { auditInfo })(
  TenantHome
);