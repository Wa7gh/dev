import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

class SideNav extends React.Component {
  state = { state: { showNav: false } };

  componentDidMount() {
    const token = localStorage.usertoken;

    if (token) {
      const decoded = jwt_decode(token);
      this.setState({ userType: decoded.user.role });
    }
  }
  logout = () => {
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  };
  openNavClick = e => {
    e.preventDefault();
    this.openNav();
  };
  closeNavClick = e => {
    e.preventDefault();
    this.closeNav();
  };
  openNav = () => {
    this.setState({
      showNav: true
    });
    document.addEventListener("keydown", this.handleEscKey);
  };
  closeNav = () => {
    this.setState({
      showNav: false
    });
    document.removeEventListener("keydown", this.handleEscKey);
  };
  handleEscKey = e => {
    if (e.key === "Escape") {
      this.closeNav();
    }
  };
  render() {
    const { showNav } = this.state;
    let navCoverStyle = { width: showNav ? "100%" : "0" };
    let sideNavStyle = { width: showNav ? "250px" : "0" };

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav">
          {" "}
          &#9776; Menu{" "}
        </span>
        <div
          onClick={this.navCoverClick}
          class="nav-cover"
          style={navCoverStyle}
        />
        <div name="side-nav" class="side-nav" style={sideNavStyle}>
          <a href="#" onClick={this.closeNavClick} class="close-nav">
            &times;
          </a>
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/Jobs">
            {" "}
            Jobs
          </Link>
          {this.state.userType === 1 ? (
            <Link className="link" to="/dashboard">
              {" "}
              Dashboard{" "}
            </Link>
          ) : null}
          {this.state.userType === 2 ? (
            <Link className="link" to="/empDash">
              {" "}
              Dashboard{" "}
            </Link>
          ) : null}

          {localStorage.usertoken ? null : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          {localStorage.usertoken ? null : (
            <Link className="link" to="/Signup-emp">
              Sign up as employer
            </Link>
          )}
          {localStorage.usertoken ? null : (
            <Link className="link" to="/RegisterDev">
              sign up as Developer
            </Link>
          )}
          {localStorage.usertoken ? (
            <Link className="link" onClick={this.logout} to="/">
              {" "}
              Logout
            </Link>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SideNav);
