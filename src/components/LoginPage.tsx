import React from "react";
import { userService } from "../services";
import { Redirect } from "react-router-dom";
import rakBankLogo from "./images/rakbank-logo.jpg";
import styles from "../styles/loginPage.module.css";
import { LABELS } from "../helpers/constants";

interface ILoginPageProps {
  history: any;
}

interface ILoginPageState {
  username: string;
  password: string;
  submitted: boolean;
  loading: boolean;
  error: string;
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor(props: ILoginPageProps) {
    super(props);

    // Logout
    userService.logout();

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: "",
    };
  }

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as any);
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    // Validation Check
    if (!(username && password)) {
      return;
    }

    this.setState({ loading: true });
    userService.login(username, password).then(
      (user) => {
        this.props.history.push({ pathname: "/home" });
      },
      (error) => this.setState({ error, loading: false })
    );
  };

  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
      <>
        {localStorage.getItem("user") ? (
          <Redirect to="/home" />
        ) : (
          <div className={`col-md-6 col-md-offset-3 ${styles.mainDiv}`}>
            <form name="form" onSubmit={this.handleSubmit}>
              <div
                className={`form-group has-feedback has-feedback-left ${
                  submitted && !username ? "has-error" : ""
                }`}
              >
                <i
                  className={`form-control-feedback glyphicon glyphicon-user ${styles.icon}`}
                />
                <input
                  type="text"
                  placeholder="User Id"
                  className={`form-control ${styles.input}`}
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
                {submitted && !username && (
                  <div className="help-block">Username is required</div>
                )}
              </div>

              <div
                className={`form-group has-feedback has-feedback-left ${
                  submitted && !password ? "has-error" : ""
                }`}
              >
                <i
                  className={`form-control-feedback glyphicon glyphicon-lock ${styles.icon}`}
                />
                <input
                  placeholder="Password"
                  type="password"
                  className={`form-control ${styles.input}`}
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                {submitted && !password && (
                  <div className="help-block">Password is required</div>
                )}
              </div>
              <div className="form-group">
                <button className={`btn ${styles.button}`} disabled={loading}>
                  {LABELS.LOGIN}
                  <i
                    className={`glyphicon glyphicon-arrow-right ${styles.buttonIcon}`}
                  />
                </button>
                {loading && (
                  <img
                    alt="Loader"
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  />
                )}
              </div>
              <div className={styles.imageDiv}>
                <img alt="Loader" src={rakBankLogo} />
              </div>
              {error && <div className={"alert alert-danger"}>{error}</div>}
            </form>
          </div>
        )}
      </>
    );
  }
}

export default LoginPage;
