import styles from "./MainMenu.module.css";
import { Link } from "react-router-dom";
import mainMenuPhoto from "../../images/mainMenuPhoto.png";
import workoutPreview from "../../images/png1.png";
import Header from "../Header/Header";
import Thermes from "../Thermes/Thermes";
import TrackProgress from "../TrackProgress/TrackProgress";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import axios from "axios";

const MainMenu = () => {
  return (
    <div>
      <Header /> {/* Use the Header component here */}
      <section className={styles.pictureVisual}>
        <img
          src={mainMenuPhoto}
          alt="Fitness background"
          className={styles.pictureVisualImage}
        />
        <div className={styles.pictureVisualText}>
          <h2>Vital Force</h2>
          <p>Welcome to the ultimate fitness and conditioning space!</p>
        </div>
      </section>
      <section className={styles.fourElements}>
        <div className={styles.element}>
          <h3>AI Assistant</h3>
          <p>Ask Anything about fitness & nutrition</p>
        </div>
        <div className={styles.element}>
          <h3>Nutrition Plans</h3>
          <p>Personalized meal plans for your goals.</p>
          <button className={styles.btnExplore}>
            <Link to="/CustomEatingMeals">Explore</Link>
          </button>
        </div>
        <div className={styles.element}>
          <h3>Track Progress</h3>
          <p>Track with ease your progress</p>
          <button className={styles.btnExplore}>
            <Link to="/trackProgress">Go There</Link>
          </button>
        </div>
        <div className={`${styles.element} ${styles.vr}`}>
          <img src={workoutPreview} alt="Workout preview" />
          <div className={styles.textContainer}>
            <h3>AR Workouts</h3>
            <p>Challenge yourself with these AR workouts.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MainMenu;
