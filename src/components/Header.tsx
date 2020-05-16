import React from "react";
import logo from "./images/rakbank-logo.jpg";
import styles from "../styles/header.module.css";
import { userService } from "../services";

interface IHeaderProps {
  history?: any;
}

class Header extends React.Component<IHeaderProps> {
  handleLogout = () => {
    userService.logout();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className={`container ${styles.headerDiv}`}>
        <div className={`col-sm-9`}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
      </div>
    );
  }
}

export default Header;
