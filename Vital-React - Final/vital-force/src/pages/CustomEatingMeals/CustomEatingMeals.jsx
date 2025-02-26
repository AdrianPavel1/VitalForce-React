import styles from "./CustomEatingMeals.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import backgroundVideo from "../../images/customEating.mp4";
import { useEffect, useState } from "react";
import waveSvg from "../../assets/wave.svg";
import axios from "axios";
import muscleGainPic from "../../png/muscleGain.png";
import weightLossPic from "../../png/weightLoss.png";
function CustomEatingMeals() {
  const [user, setUser] = useState(null);
  const [userGoal, setUserGoal] = useState(null);
  const [goalPicture, setGoalPicture] = useState(null);
  const [selectedDailyMeal, setSelectedDailyMeal] = useState(null);
  const [dailyMealResults, setDailyMealResults] = useState(null);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);
  const [displayAll, setDisplayAll] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("username");
    setUser(currentUser);
  }, []);

  const getUserGoal = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/getUser-goal`,
        {
          params: { username: username },
        }
      );

      if (response.status === 200 && response.data) {
        setUserGoal(response.data);
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Error: can't get user goal", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUserGoal(user);
    }
  }, [user]);

  const changeGoalPic = () => {
    if (userGoal === "muscle gain") {
      setGoalPicture(muscleGainPic);
    } else {
      setGoalPicture(weightLossPic);
    }
  };
  useEffect(() => {
    if (userGoal) {
      changeGoalPic();
    }
  }, [userGoal]);

  const handleMealChange = (e) => {
    setSelectedDailyMeal(e.target.value);
    setDisplayAll(true);
  };

  useEffect(() => {
    const getMealsExamples = async () => {
      if (selectedDailyMeal && userGoal) {
        console.log("Selected Daily Meal:", selectedDailyMeal);
        console.log("User Goal:", userGoal);
        try {
          const response = await axios.get(
            `http://localhost:3000/auth/get-mealsExamples`,
            {
              params: {
                dailyMeal: selectedDailyMeal,
                goal: userGoal,
              },
            }
          );
          console.log("Response data:", response.data);
          setDailyMealResults(response.data);
        } catch (error) {
          console.error("Error fetching meals examples:", error);
          setDailyMealResults(null);
        }
      }
    };

    getMealsExamples();
  }, [selectedDailyMeal]);

  const handleNext = () => {
    if (dailyMealResults && currentMealIndex < dailyMealResults.length - 1) {
      setCurrentMealIndex(currentMealIndex + 1);
    }
  };

  const handlePrev = () => {
    if (dailyMealResults && currentMealIndex > 0) {
      setCurrentMealIndex(currentMealIndex - 1);
    }
  };

  //meal image logic:
  const funnyMessages = [
    "Delicious, right?",
    "Tasty, isn't it?",
    "Yummy, what do you think?",
    "Looks good enough to eat!",
    "Can you smell that deliciousness?",
    "This is a feast for the eyes!",
    "Bet you can't eat just one!",
    "Warning: May cause extreme hunger!",
    "Who knew healthy could taste this good?",
    "It's not just food, it's a masterpiece!",
    "I could eat this every day!",
    "Your taste buds called—they're thrilled!",
    "Feast your eyes on this beauty!",
    "One bite and you'll be hooked!",
    "Food so good, it should be illegal!",
    "Prepare your taste buds for a party!",
    "This is what dreams are made of!",
    "You just leveled up your meal game!",
    "It's like a flavor explosion!",
    "Savor every bite, it's worth it!",
    "Get ready for a taste sensation!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCurrentMessageIndex(
      (prevIndex) => (prevIndex + 1) % funnyMessages.length
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [backgroundImagePath, setBackgroundImagePath] = useState(null);

  useEffect(() => {
    if (
      selectedDailyMeal &&
      dailyMealResults &&
      dailyMealResults.length > currentMealIndex &&
      dailyMealResults[currentMealIndex]
    ) {
      const imgPath = `/${selectedDailyMeal}/${dailyMealResults[currentMealIndex].img}`;
      console.log(
        `/${selectedDailyMeal}/${dailyMealResults[currentMealIndex].img}`
      );
      setBackgroundImagePath(imgPath);
    }
  }, [selectedDailyMeal, dailyMealResults, currentMealIndex]);

  const afisare = async () => {
    console.log(selectedDailyMeal);
    console.log(dailyMealResults[currentMealIndex].img);
  };

  return (
    <>
      <Header />
      <div className={styles.videoContainer}>
        <video autoPlay loop muted className={styles.backgroundVideo}>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.gradientOverlay}></div>

        <div className={styles.intro}>
          <h1>Custom Eating Meals</h1>
          <div className={styles.Line}></div>
          <p className={styles.firstP}>
            We created custom eating plans for your goal!
          </p>
          <p>Just select one of the options below and see what it brings</p>
        </div>
      </div>

      <div className={styles.userProfileSection}>
        <h1 className={styles.mainUserH1}>
          Meals for <span>{user}</span>
        </h1>
      </div>
      <div className={styles.menuItem}>
        <div className={styles.photoSpace}>
          <img
            src={goalPicture}
            alt="User Goal"
            className={styles.roundImage}
          />
        </div>
        <div className={styles.aboutYou}>
          <h2>
            Goal: <span>{userGoal}</span>
          </h2>
        </div>
        <div className={styles.overlay3}></div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.orderSection}>
            <div className={styles.itemInfo}>
              <p>Choose one option</p>
              <select className={styles.mealSelect} onChange={handleMealChange}>
                <option value="" disabled selected>
                  Choose
                </option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            {displayAll && (
              <div className={styles.orderPanel}>
                <h2 className={styles.mealName}>
                  {dailyMealResults && dailyMealResults[currentMealIndex]
                    ? dailyMealResults[currentMealIndex].Name
                    : "Meal Name"}
                </h2>
                <div className={styles.detalis}>
                  <div className={styles.ingredients}>
                    <ul>
                      {dailyMealResults &&
                      dailyMealResults[currentMealIndex] ? (
                        dailyMealResults[currentMealIndex].Ingredients.split(
                          ","
                        ).map((ingredient, index) => (
                          <li key={index}>{ingredient.trim()}</li>
                        ))
                      ) : (
                        <li>Ingredients</li>
                      )}
                    </ul>
                  </div>

                  <div className={styles.methods}>
                    {dailyMealResults && dailyMealResults[currentMealIndex]
                      ? dailyMealResults[currentMealIndex].Method.split(
                          "STEP"
                        ).map((step, index) => (
                          <p key={index}>
                            STEP {step.trim()}
                            <br />
                            <br />
                          </p>
                        ))
                      : "Method"}
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.navButton} ${styles.leftButton}`}
                    onClick={handlePrev}
                  >
                    &lt; Prev
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.rightButton}`}
                    onClick={handleNext}
                  >
                    Next &gt;
                  </button>
                </div>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity (grams)</th>
                        <th>Proteins</th>
                        <th>Carbohydrates</th>
                        <th>Fat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyMealResults &&
                        dailyMealResults[currentMealIndex] && (
                          <tr>
                            <td dataLabel="Column ">
                              {dailyMealResults[currentMealIndex].Name}
                            </td>
                            <td dataLabel="Quantity ">
                              {dailyMealResults[currentMealIndex].Quantity}
                            </td>
                            <td dataLabel="Proteins">
                              {dailyMealResults[currentMealIndex].Proteins}
                            </td>
                            <td dataLabel="Carbohydrates">
                              {dailyMealResults[currentMealIndex].Carbohydrates}
                            </td>
                            <td dataLabel="Fat">
                              {dailyMealResults[currentMealIndex].Fat}
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          {displayAll && (
            <div className={styles.mealContainer}>
              <h2>Here is an image of how your meal is supposed to look</h2>
              <div
                className={styles.mealPicture}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundImage: backgroundImagePath
                    ? `url(${backgroundImagePath})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  color: "white",
                }}
              >
                {isHovered && (
                  <div className={styles.overlay}>
                    <p className={styles.message}>
                      {funnyMessages[currentMessageIndex]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CustomEatingMeals;
