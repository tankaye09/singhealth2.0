import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "./../actions/errorActions";
import { clearMessages } from "./../actions/errorActions";

import { Alert } from "antd";

class MessageDisplay extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      messages: {},
    };
  }

  // might be deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        messages: nextProps.messages,
      });
    }
  }

  onClose = () => {
    this.setState({
      errors: {},
      messages: {},
    });
    this.props.clearErrors();
    this.props.clearMessages();
  };

  render() {
    const { errors } = this.state;
    const { messages } = this.state;
    return (
      <div>
        {Object.keys(errors).length !== 0 ? (
          <Alert
            message={Object.values(errors)}
            type="warning"
            className="error-message"
            closable
            onClose={this.onClose}
            banner
          /> // Error shown when redux state errors is not empty
        ) : (
          ""
        )}
        {Object.keys(messages).length !== 0 ? (
          <Alert
            message={Object.values(messages)}
            type="success"
            className="error-message"
            closable
            onClose={this.onClose}
            banner
          /> // Message shown when redux state messages is not empty
        ) : (
          ""
        )}
      </div>
    );
  }
}
MessageDisplay.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  messages: state.messages,
});
export default connect(mapStateToProps, { clearErrors, clearMessages })(
  MessageDisplay
);
