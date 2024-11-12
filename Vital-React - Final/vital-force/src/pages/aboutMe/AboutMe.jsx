import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AboutMe.module.css";
import mainVideo from "../../images/AboutMeVideo.mp4";
import { useNavigate } from "react-router-dom";

const AboutMe = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    bodyType: "average",
    goal: "muscle gain",
    weight: "",
    height: "",
    physicalActivity: "sedentary",
    gender: "",
    neck_cm: "",
    waist_cm: "",
    hips: "",
  });

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      console.log("Username from localStorage:", username);
    } else {
      console.log("No username found in localStorage");
    }
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    console.log("Username from localStorage:", username);

    if (!username) {
      console.error("Username not found in localStorage");
      alert("Username not found. Please log in again.");
      return;
    }

    const updatedFormData = {
      ...formData,
      username: username,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/updateProfile",
        updatedFormData
      );

      if (response.status === 200) {
        navigate("/MainMenu");
      }
    } catch (error) {
      console.error("Error saving profile:", error.response?.data);
    }
  };

  return (
    <div className="main">
      <div className={styles.header}>
        <video autoPlay loop muted className={styles.backgroundVideo}>
          <source src={mainVideo} type="video/mp4" />
        </video>
        <div className={styles.gradientOverlay}></div>
        <h1 className={styles.title}>Tell Us More About You</h1>
      </div>

      {}
      <div className={styles.container}>
        <h1 className={styles.heading}>About Me</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bodyType">Body Type</label>
            <select
              id="bodyType"
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              required
            >
              <option value="average">Average</option>
              <option value="slim">Slim</option>
              <option value="fat">Fat</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="goal">Goal</label>
            <select
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
            >
              <option value="muscle gain">Muscle Gain</option>
              <option value="weight loss">Weight Loss</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="physicalActivity">Physical Activity</label>
            <select
              id="physicalActivity"
              name="physicalActivity"
              value={formData.physicalActivity}
              onChange={handleChange}
              required
            >
              <option value="sedentary">
                Sedentary (Little or none exercice)
              </option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="intense">Intense(6-7 days/week)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your gender
              </option>{" "}
              {}
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="neck_cm">
              Neck (cm){" "}
              <span className={styles.optionalText}>
                (optional but good for accuracy)
              </span>
            </label>
            <input
              type="number"
              id="neck_cm"
              name="neck_cm"
              value={formData.neck_cm}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="waist_cm">
              Waist (cm){" "}
              <span className={styles.optionalText}>
                (optional but good for accuracy)
              </span>
            </label>
            <input
              type="number"
              id="waist_cm"
              name="waist_cm"
              value={formData.waist_cm}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hips">
              Hips (cm){" "}
              <span className={styles.optionalText}>
                (optional but good for accuracy)
              </span>
            </label>
            <input
              type="number"
              id="hips"
              name="hips"
              value={formData.hips}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutMe;
