import React from "react";
import styles from "../styles/progressbar.module.css";

interface IProgressBarProps {
  percentage: number;
}

class ProgressBar extends React.Component<IProgressBarProps> {
  render() {
    return (
      <>
        <div className={styles.progressBar}>
          <div
            className={styles.filler}
            style={{ width: `${this.props.percentage}%` }}
          />
        </div>
      </>
    );
  }
}

export default ProgressBar;
