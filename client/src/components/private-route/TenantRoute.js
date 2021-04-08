import React, { Component } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const TenantRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        auth.user.usertype === "tenant" ? ( // check for tenant usertype, maybe can change such that both tenant and staff can view tenant pages
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

TenantRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(TenantRoute);
