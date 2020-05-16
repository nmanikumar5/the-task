import React from "react";
import styles from "../styles/landingPage.module.css";
import logo from "./images/logo.png";
import { Redirect } from "react-router-dom";
import { ProgressBar, LoginPage } from "../components";

interface ILandingPageProps {
  history?: any;
}

interface ILandingPageState {
  isLoading: boolean;
  percentage: number;
}

let intervalId: any = null;

class LandingPage extends React.Component<
  ILandingPageProps,
  ILandingPageState
> {
  constructor(props: ILandingPageProps) {
    super(props);

    this.state = {
      isLoading: true,
      percentage: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: this.state.percentage !== 100,
      });
      intervalId = setInterval(() => {
        this.nextStep();
      }, 500);
    }, 1000);
  }

  nextStep() {
    if (this.state.percentage === 100) return clearInterval(intervalId);
    this.setState((prevState) => ({ percentage: prevState.percentage + 20 }));
  }

  render() {
    const { percentage, isLoading } = this.state;
    return (
      <>
        {!localStorage.getItem("user") ? (
          <div className={styles.mainDiv}>
            {percentage < 100 && isLoading ? (
              <div className={styles.loaderDiv}>
                <div className={styles.imageDiv}>
                  <img alt="Loader" src={logo} />
                </div>
                <ProgressBar percentage={percentage} />
                <p>Loading...</p>
              </div>
            ) : (
              <div className={styles.loginDiv}>
                <LoginPage history={this.props.history} />
              </div>
            )}
          </div>
        ) : (
          <Redirect to="/home" />
        )}
      </>
    );
  }
}

export default LandingPage;
