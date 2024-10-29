import React, { useState, useEffect } from "react";
import style from "./TrackProgress.module.css";
import kcalImg from "../../png/kcal.png";
import proteinImg from "../../png/protein-powder.png";
import carbsImg from "../../png/carbohydrates.png";
import fatImg from "../../png/no-fat.png";
import video from "../../images/coverProgress.mp4";
import Calendar from "./Calendar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Meals from "../meals/Meals";
import axios from "axios";

function TrackProgress() {
  const [progress, setProgress] = useState(70);

  const [calories, setCalories] = useState(20);

  const [proteins, setProteins] = useState(90);

  const [carbs, setCarbs] = useState(50);

  const [fats, setFats] = useState(40);

  const getColor = (e) => {
    if (e < 40) {
      return "#ff0000";
    } else if (e < 60) return "#FFFF11";
    else if (e < 80) return "#ffa500";
    else return "#2ecc71";
  };

  const username = localStorage.getItem("username");

  const [profile, setProfile] = useState({
    age: "",
    bodyType: "",
    goal: "",
    weight: "",
    height: "",
    physicalActivity: "",
    gender: "",
    neck_cm: "",
    waist_cm: "",
    hips: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/auth/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.profile);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [username]);

  const calcCalories = () => {
    const { age, weight, height, gender, physicalActivity, goal } = profile;

    let BMR; //Basic metabolic rate

    if (gender === "male") {
      BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    let activityFactor;

    switch (physicalActivity) {
      case "sedentary":
        activityFactor = 1.2;
        break;
      case "moderate":
        activityFactor = 1.55;
        break;
      case "active":
        activityFactor = 1.72;
        break;
    }

    const TDE = BMR * activityFactor; // Total Daily Energy

    let caloricIntake;

    if (goal === "lose weight") {
      caloricIntake = TDE - 500; // lose weight -500 kcal
    } else {
      caloricIntake = TDE + 500; //muscle mass
    }

    return Math.round(caloricIntake);
  };

  const calcProteinIntake = (profile) => {
    // if (!profile) return 0;

    const { weight, goal } = profile;
    let proteinIntake;

    if (goal === "lose weight") {
      proteinIntake = weight * 1.6; // 1.6g proteine/kg pentru pierdere în greutate
    } else if (goal === "gain muscle") {
      proteinIntake = weight * 2.2; // 2.2g proteine/kg pentru câștig de masă musculară
    } else {
      proteinIntake = weight * 1.0; // 1.0g proteine/kg pentru menținerea greutății
    }

    return Math.round(proteinIntake);
  };
  const calcCarbIntake = (profile) => {
    const { weight, goal } = profile;

    if (!weight || !goal) {
      console.error("Profile data missing: weight or goal is undefined");
      return 0;
    }

    let carbIntake;

    if (goal === "lose weight") {
      carbIntake = weight * 3;
    } else if (goal === "gain muscle") {
      carbIntake = weight * 5;
    } else {
      carbIntake = weight * 4;
    }

    return Math.round(carbIntake);
  };

  const calcFatIntake = (profile) => {
    const { weight, goal } = profile;

    if (!weight || !goal) {
      console.error("Profile data missing: weight or goal is undefined");
      return 0;
    }

    let fatIntake;

    if (goal === "lose weight") {
      fatIntake = weight * 0.8;
    } else if (goal === "gain muscle") {
      fatIntake = weight * 1;
    } else {
      fatIntake = weight * 0.9;
    }

    return Math.round(fatIntake);
  };

  useEffect(() => {
    if (profile) {
      const calculatedCalories = calcCalories(profile);
      setCalories(calculatedCalories);

      const calculatedProteins = calcProteinIntake(profile);
      setProteins(calculatedProteins);

      const calculatedCarbs = calcCarbIntake(profile);
      setCarbs(calculatedCarbs);

      const calculatedFats = calcFatIntake(profile);
      setFats(calculatedFats);
    }
  }, [profile]);

  const [macrosData, setMacrosData] = useState(null);
  const [error, setError] = useState(null);
  const [choosedDate, setChoosedDate] = useState(null);

  const getMacrosData = async (date) => {
    const data = {
      username: username, // Numele utilizatorului primit prin props
      date: date || new Date().toISOString().split("T")[0], // Data curentă sau data specificată
    };
    console.log("data din track cand apelez functia este:", date);
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/get-macros`,
        {
          params: {
            username: data.username,
            date: data.date,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verificăm dacă răspunsul conține datele așteptate
      if (response.status === 200) {
        setMacrosData(response.data.macros); // Stocăm datele în stare
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Error fetching macros data:", err);
      setError("An error occurred while fetching macros data."); // Setăm mesajul de eroare
    }
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      console.log(
        "elementul din useEfect din TrackProgress este: ",
        storedDate
      );
      setChoosedDate(storedDate);
      getMacrosData(storedDate);
    }
  }, []);

  const calculatePercentage = (consumed, total) => {
    return total > 0 ? Math.min((consumed / total) * 100, 100) : 0;
  };

  let caloriesPercentage =
    macrosData && calories
      ? calculatePercentage(macrosData.calories || 0, calories)
      : 0;
  let proteinsPercentage =
    macrosData && proteins
      ? calculatePercentage(macrosData.proteins || 0, proteins)
      : 0;
  let carbsPercentage =
    macrosData && carbs ? calculatePercentage(macrosData.carbs || 0, carbs) : 0;
  let fatsPercentage =
    macrosData && fats ? calculatePercentage(macrosData.fats || 0, fats) : 0;

  const afisare = () => {
    // console.log("Macros pe pagina a 2 a :", macrosData);
    // console.log("protein percentage::", proteinsPercentage);
    console.log(choosedDate);
  };
  return (
    <>
      {<Header />}

      <div className={style.mainContainer}>
        <video
          className={style.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={style.overlay}></div>
        <div className={style.toodayProgress}>
          <div className={style.progressTitle}>
            <h2>Tooday Progress</h2>
          </div>

          <section className={style.progress}>
            <span>Calories:</span>
            {macrosData ? (
              <div className={style.totalMacros}>{macrosData.calories}</div>
            ) : (
              <div>Loading...</div>
            )}

            <div className={style.progressLine}>
              <div
                className={style.progressLineFill}
                style={{
                  width: `${caloriesPercentage}%`,
                  backgroundColor: getColor(caloriesPercentage),
                }}
              ></div>
              <div className={style.progressPercent}>
                {Math.round(caloriesPercentage)}%
              </div>
            </div>

            <span>Protein:</span>
            {macrosData ? (
              <div className={style.totalMacros}>{macrosData.proteins}</div>
            ) : (
              <div>Loading...</div>
            )}
            <div className={style.progressLine}>
              <div
                className={style.progressLineFill}
                style={{
                  width: `${proteinsPercentage}%`,
                  backgroundColor: getColor(proteinsPercentage),
                }}
              ></div>
              <div className={style.circlePercent}>
                {Math.round(proteinsPercentage)}%
              </div>
            </div>

            <span>Carbohidrates:</span>
            {macrosData ? (
              <div className={style.totalMacros}>{macrosData.carbs}</div>
            ) : (
              <div>Loading...</div>
            )}
            <div className={style.progressLine}>
              <div
                className={style.progressLineFill}
                style={{
                  width: `${carbsPercentage}%`,
                  backgroundColor: getColor(carbsPercentage),
                }}
              ></div>
              <div className={style.circlePercent}>
                {Math.round(carbsPercentage)}%
              </div>
            </div>

            <span>Fat:</span>
            {macrosData ? (
              <div className={style.totalMacros}>{macrosData.fats}</div>
            ) : (
              <div>Loading...</div>
            )}
            <div className={style.progressLine}>
              <div
                className={style.progressLineFill}
                style={{
                  width: `${fatsPercentage}%`,
                  backgroundColor: getColor(fatsPercentage),
                }}
              ></div>
              <div className={style.circlePercent}>
                {Math.round(fatsPercentage)}%
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className={style.detailsSection}>
        <h3 className={style.DetailsSectionTitle}>
          Totals of macros needs per day
        </h3>
        <div className={style.detailsContainer}>
          <div className={style.detailBox}>
            <img src={kcalImg} alt="Calories" className={style.detailImg} />
            <p>Calories: {calories}</p>
          </div>
          <div className={style.detailBox}>
            <img src={proteinImg} alt="Protein" className={style.detailImg} />
            <p>Protein: {proteins}</p>
          </div>
          <div className={style.detailBox}>
            <img src={carbsImg} alt="Carbs" className={style.detailImg} />
            <p>Carbs: {carbs}</p>
          </div>
          <div className={style.detailBox}>
            <img src={fatImg} alt="Fat" className={style.detailImg} />
            <p>Fat: {fats}</p>
          </div>
        </div>
      </section>
      <Meals username={username} sendDate={setChoosedDate} />
      <Footer />
    </>
  );
}

export default TrackProgress;
