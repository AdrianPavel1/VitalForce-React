import React from "react";
import workoutPreview from "../../images/App.jpg";
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
          <h1 className={styles.appTitle}>Download Our Apps</h1>
          <p className={styles.appInfo}>
            1. AR fitness app brings workouts directly into your home, offering
            interactive exercises that guide you in real-time.
            <br />
            <br />
            2. This macronutrient calculator app helps you track your daily
            intake of proteins, fats, and carbohydrates.
          </p>
          <button className={styles.downloadButton}>DOWNLOAD AR</button>
          <button className={styles.downloadButton}>DOWNLOAD APP</button>
        </div>
      </div>
    </div>
  );
};

export default PhoneApp;
