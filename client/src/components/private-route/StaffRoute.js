import React, { Component } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const StaffRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        auth.user.usertype === "staff" ? ( // check for staff usertype
          <Component {...props} />
        ) : (
          <div>
            <h1>Sorry, you are not authorised to view this page</h1>
          </div>
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

StaffRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(StaffRoute);
