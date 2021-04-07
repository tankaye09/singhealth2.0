import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Alert } from "antd";

class ErrorDisplay extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      visible: true,
    };
  }

  // might be deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onClose = () => {
    this.setState({
      errors: {},
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        {Object.keys(errors).length !== 0 ? (
          <Alert
            message={Object.values(errors)}
            type="warning"
            className="error-message"
            closable
            onClose={this.onClose}
            afterClose={this.handleClose}
            banner
          /> // Error shown when redux state errors is not empty
        ) : (
          ""
        )}
      </div>
    );
  }
}
ErrorDisplay.propTypes = {
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps)(ErrorDisplay);
