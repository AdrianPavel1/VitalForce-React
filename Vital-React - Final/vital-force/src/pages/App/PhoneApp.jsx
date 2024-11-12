import React from "react";
import workoutPreview from "./appBckgr.png";
import Header from "../Header/Header"; // Import Header component
import styles from "./PhoneApp.module.css"; // Import CSS Module

const PhoneApp = () => {
  return (
    <div>
      <div
        className={styles.mainDiv}
        style={{ backgroundImage: `url(${workoutPreview})` }}
      >
        <Header />
        <div className={styles.appDescription}>
          <h1 className={styles.appTitle}>Download Our App</h1>
          <p className={styles.appInfo}>
            1. AR fitness app brings workouts directly into your home, offering
            interactive exercises that guide you in real-time.
          </p>
          <button className={styles.downloadButton}>DOWNLOAD AR APP</button>
        </div>
      </div>
    </div>
  );
};

export default PhoneApp;
