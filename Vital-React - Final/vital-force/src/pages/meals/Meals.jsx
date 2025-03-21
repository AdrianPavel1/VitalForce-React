import styles from "./Meals.module.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FlameSvg from "../../assets/flame";
import Calendar from "../TrackProgress/Calendar";
function Meals(props) {
  const { username, sendDate } = props;

  const [editingIndex, setEditingIndex] = useState(null);
  const [visibleMeal, setVisibleMeal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempMealName, setTempMealName] = useState("");
  const [mealDetails, setMealDetails] = useState(false);
  const [showSaveBttn, setShowSetBttn] = useState(true);
  const [showMealsContainer, setShowMealsContainer] = useState(true);
  const [callSendMacrosData, setCallSendMacrosData] = useState(false);
  const [macrosData, setMacrosData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : null;
  });

  const dateSelect = (date) => {
    const nextDate = new Date(date);

    const formattedDate = nextDate.toISOString().split("T")[0];
    setCardMeal([]);
    fetchCardMeals(formattedDate);
    console.log("Selected date in Meals:", formattedDate);
    setSelectedDate(formattedDate);
    sendDate(formattedDate);
  };

  const [mealIndex, setMealIndex] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState({
    name: "",
    calories_per_100g: 0,
    fat_per_100g: 0,
    protein_per_100g: 0,
    carbs_per_100g: 0,
  });
  const [grams, setGrams] = useState(0);
  const [totalFoodsAdded, setTotalFoodsAdded] = useState([]);
  const [finalTotals, setFinalTotals] = useState({
    carbs: 0,
    protein: 0,
    fat: 0,
    calories: 0,
  });

  const [cardMeal, setCardMeal] = useState([]);
  const [uiTotals, setUiTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  //search food
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const addMealHandler = () => {
    const newMeal = {
      name: `Meal${cardMeal.length + 1}`,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
    setCardMeal((prevMeals) => [...prevMeals, newMeal]);
  };

  const deleteMealHandler = async (index) => {
    const mealToDelete = cardMeal[index];
    console.log("veri sa stergi", mealToDelete);
    try {
      const response = await axios.delete(
        "http://localhost:3000/auth/delete-meal",
        {
          data: {
            username: props.username,
            date: selectedDate || new Date().toISOString().split("T")[0],
            meal_name: mealToDelete.name,
          },
        }
      );

      if (response.status === 200) {
        console.log("Meal deleted successfully:", response.data.message);

        setCardMeal((prevMeal) => prevMeal.filter((_, i) => i !== index));

        setIsAnimating(true);
      }
    } catch (error) {
      console.error(
        "Error deleting meal:",
        error.response?.data || error.message
      );
      alert("Error: Unable to delete meal from the database.");
    }
    sendMacrosData();
  };

  const showMealEditor = (index) => {
    const selectedMeal = cardMeal[index];
    if (selectedMeal?.totalFoods) {
      setTotalFoodsAdded(selectedMeal.totalFoods);
    } else {
      setTotalFoodsAdded([]);
    }

    setVisibleMeal(true);
    setEditingIndex(index);
    setShowMealsContainer(false);
  };

  const editMealName = (e) => {
    setTempMealName(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/search-foods",
        {
          searchTerm: searchTerm,
        }
      );
      setSearchResults(response.data.foods);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const foodAtIndex = (index) => {
    const mealAtIndex = searchResults[index];
    if (mealAtIndex) {
      setSelectedMeal({
        name: mealAtIndex.name,
        calories_per_100g: mealAtIndex.calories_per_100g,
        fat_per_100g: mealAtIndex.fat_per_100g,
        protein_per_100g: mealAtIndex.protein_per_100g,
        carbs_per_100g: mealAtIndex.carbs_per_100g,
      });
    } else {
      console.log("Meal not found for the given index");
    }
  };

  const sendFoodDetails = (index) => {
    setMealIndex(index);
    setMealDetails(true);
    foodAtIndex(index);
    setShowSetBttn(false);
  };

  const calculateMacros = (grams) => {
    const calories = (selectedMeal.calories_per_100g * grams) / 100;
    const protein = (selectedMeal.protein_per_100g * grams) / 100;
    const fat = (selectedMeal.fat_per_100g * grams) / 100;
    const carbs = (selectedMeal.carbs_per_100g * grams) / 100;

    return {
      calories,
      protein,
      fat,
      carbs,
    };
  };

  const handleGramsChange = (event) => {
    const inputGrams = event.target.value;
    setGrams(inputGrams);
  };

  const [macros, setMacros] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  });

  useEffect(() => {
    const calculatedMacros = calculateMacros(grams);
    setMacros(calculatedMacros);
  }, [grams, selectedMeal]);

  const totalMacros =
    macros.calories + macros.fat + macros.protein + macros.carbs;

  const [isAnimating, setIsAnimating] = useState(false);

  const handleSendFood = () => {
    const newFoodItem = {
      name: selectedMeal.name,
      calories: macros.calories.toFixed(0),
      carbs: macros.carbs.toFixed(0),
      fat: macros.fat.toFixed(0),
      protein: macros.protein.toFixed(0),
    };

    setTotalFoodsAdded((prev) => [...prev, newFoodItem]);
    setGrams(0);

    setShowSetBttn(true);
    setIsAnimating(true);
    setMealDetails(false);
    scrollTo(800);
  };

  useEffect(() => {
    console.log("Valoarea actuală a isAnimating:", isAnimating);
  }, [isAnimating]);

  const calculateMealsTotals = () => {
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCalories = 0;

    totalFoodsAdded.forEach((meal) => {
      totalCarbs += parseFloat(meal.carbs);
      totalProtein += parseFloat(meal.protein);
      totalFat += parseFloat(meal.fat);
      totalCalories += parseFloat(meal.calories);
    });

    return {
      carbs: totalCarbs.toFixed(0),
      protein: totalProtein.toFixed(0),
      fat: totalFat.toFixed(0),
      calories: totalCalories.toFixed(0),
    };
  };

  const finalCalculateTotals = () => {
    const calculatedTotals = calculateMealsTotals();
    setFinalTotals(calculatedTotals);
  };

  useEffect(() => {
    finalCalculateTotals();
  }, [totalFoodsAdded]);

  //for scoll:
  const scrollTo = (elem) => {
    window.scrollTo({
      top: elem,
      behavior: "smooth",
    });
  };

  const handleSetCardMeal = () => {
    const currentName = tempMealName || cardMeal[editingIndex]?.name;

    const updatedMeals = cardMeal.map((meal, index) =>
      index === editingIndex
        ? {
            ...meal,
            name: currentName,
            calories: finalTotals.calories,
            protein: finalTotals.protein,
            carbs: finalTotals.carbs,
            fat: finalTotals.fat,
            totalFoods: totalFoodsAdded,
          }
        : meal
    );
    setCardMeal(updatedMeals);
    setTotalFoodsAdded([]);
    setTempMealName("");
    setIsEditingName(false);
    setSearchResults([]);
    setSearchTerm("");
    setMealDetails(false);
    setEditingIndex(null);
    setCallSendMacrosData(true);
    scrollTo(700);
    setShowMealsContainer(true);
  };

  useEffect(() => {
    handleAddToDatabse();
  }, [cardMeal]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchTerm != 0) {
        document.getElementById("searchButton").click();
      } else if (isEditingName === true) {
        const updatedMeals = cardMeal.map((meal, index) =>
          index === editingIndex
            ? {
                ...meal,
                name: tempMealName,
              }
            : meal
        );
        setCardMeal(updatedMeals);
        console.log("pana aici");
        setIsEditingName(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup la demontarea componentului
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [editingIndex, tempMealName, searchTerm]);

  const deleteFood = (index) => {
    setTotalFoodsAdded((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddToDatabse = () => {
    let calories1 = 0;
    let protein1 = 0;
    let carbs1 = 0;
    let fat1 = 0;
    // databaseTotals
    cardMeal.forEach((e) => {
      calories1 += parseInt(e.calories);
      protein1 += parseInt(e.protein);
      carbs1 += parseInt(e.carbs);
      fat1 += parseInt(e.fat);
    });

    setUiTotals((prev) => ({
      ...prev,
      calories: calories1,
      protein: protein1,
      carbs: carbs1,
      fat: fat1,
    }));
  };

  useEffect(() => {
    console.log("Updated uiTotals:", uiTotals);
  }, [uiTotals]);

  const sendMacrosData = async () => {
    const data = {
      username: props.username,
      calories: uiTotals.calories,
      proteins: uiTotals.protein,
      carbs: uiTotals.carbs,
      fats: uiTotals.fat,
      date: selectedDate || new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/auth/add-macros`,
        data
      );
      console.log("Macros data sent successfully:", response.data.message);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Unknown error occurred"}`
        );
      } else {
        console.error("Error sending macros data:", error.message);
        alert("Error: Unable to connect to the server.");
      }
    }
  };

  useEffect(() => {
    fetchCardMeals(selectedDate);
  }, []);

  const sendMealsData = async () => {
    const data = {
      username: props.username,
      date: selectedDate
        ? selectedDate
        : new Date().toISOString().split("T")[0],
      meals: cardMeal,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/auth/add-cardMeals`,
        data
      );
      console.log("Meals data sent successfully:", response.data.message);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Unknown error occurred"}`
        );
      } else {
        console.error("Error sending meals data:", error.message);
        alert("Error: Unable to connect to the server.");
      }
    }
  };

  const fetchCardMeals = async (date = null) => {
    const currentDate = date ? date : new Date().toISOString().split("T")[0];

    console.log("currentDate:", currentDate);
    console.log("seLECTAT::", selectedDate);
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/getCard-meals",
        {
          params: {
            username: props.username,
            date: currentDate,
          },
        }
      );

      const fetchedMeals = response.data;

      setCardMeal((prevMeals) => {
        const existingMealNames = prevMeals.map((meal) => meal.name);
        const newMeals = fetchedMeals
          .filter((meal) => !existingMealNames.includes(meal.meal_name))
          .map((meal) => ({
            name: meal.meal_name,
            calories: meal.calories,
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat,
            totalFoods: JSON.parse(meal.total_foods || "[]"),
          }));
        return [...prevMeals, ...newMeals];
      });
    } catch (error) {
      console.error(
        "Error fetching meals:",
        error.response?.data || error.message
      );
      alert("Error: Unable to fetch meals from the database.");
    }
  };

  const handleSendAllDataToDatabase = () => {
    setIsAnimating(false);
    sendMacrosData();
    sendMealsData();
    sendDate(selectedDate);
  };

  const afisare = () => {
    console.log("elementul din local Storage este: ", selectedDate);
  };

  return (
    <>
      <h2>{props.progress}</h2>
      <h2>{props.fats}</h2>
      <h2>{props.proteins}</h2>
      <h2>{props.carbs}</h2>
      <div className={styles.myMeals}>
        {showMealsContainer && (
          <div className={styles.firstContainer}>
            <h1>My Meals</h1>
            <div className={styles.modifyMealsButtons}>
              <button className={styles.addMealButton} onClick={addMealHandler}>
                Add Meal
              </button>
              <button
                className={`${styles.saveChanges} ${
                  isAnimating ? styles.animate : ""
                }`}
                onClick={() => handleSendAllDataToDatabase()}
              >
                Save Changes
              </button>
            </div>

            <div
              className={styles.mealsContainer}
              style={{ display: cardMeal.length > 0 ? "block" : "none" }}
            >
              {cardMeal.map((meal, index) => (
                <div key={index} className={styles.meal}>
                  <div className={styles.mealDetails}>
                    <div className={styles.mealName}>{meal.name}</div>
                    <div className={styles.mealDetails}>
                      {meal.calories} kcal
                    </div>
                  </div>
                  <div className={styles.mealBttns}>
                    <button onClick={() => showMealEditor(index)}>+</button>
                    <button onClick={() => deleteMealHandler(index)}>-</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {editingIndex !== null && (
          <div
            className={`${styles.editMeal} ${
              visibleMeal ? styles.visible : ""
            }`}
          >
            <div className={styles.editMealNameContent}>
              {isEditingName ? (
                <input
                  type="text"
                  value={tempMealName}
                  onChange={editMealName}
                  className={styles.editName}
                />
              ) : (
                <h1>{cardMeal[editingIndex]?.name}</h1>
              )}
              <button
                className={styles.iconBtn}
                onClick={() => setIsEditingName(true)}
              >
                <span className={`${styles.icon} material-symbols-outlined`}>
                  edit
                </span>
              </button>
            </div>

            <div className={styles.container}>
              <div className={styles.totals}>
                <h3>Meal Totals</h3>
                <ul className={styles.nutrientList}>
                  <li>Carbs: {finalTotals.carbs}g</li>
                  <li>Protein: {finalTotals.protein}g</li>
                  <li>Fat: {finalTotals.fat}g</li>
                  <li>Calories: {finalTotals.calories}</li>
                </ul>
              </div>
              <div className={styles.addedResults}>
                <h3>Added Foods</h3>
                {totalFoodsAdded.length > 0 && (
                  <div className={styles.foodContainer}>
                    {totalFoodsAdded.map((food, index) => (
                      <div key={index} className={styles.foodItem}>
                        <p>{food.name}</p>
                        <div className={styles.foodEdits}>
                          <button onClick={() => deleteFood(index)}>-</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search meals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button id="searchButton" onClick={handleSearch}>
                <span className={`${styles.search} material-symbols-outlined`}>
                  search
                </span>
              </button>
            </div>

            <div className={styles.allResults}>
              <div className={styles.searchresults}>
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div key={result.id} className={styles.result}>
                      {result.name} - {result.calories_per_100g} kcal/100g
                      <button
                        className={styles.resultButtonMenu}
                        onClick={() => sendFoodDetails(index)}
                      >
                        <span
                          className={`${styles.resultButtonMenuIcon} material-symbols-outlined`}
                        >
                          add
                        </span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div>No results found</div>
                )}
              </div>
            </div>
            {showSaveBttn && (
              <button
                className={`${styles.saveButtonMeal} ${
                  isAnimating ? styles.animate : ""
                }`}
                onClick={() => handleSetCardMeal()}
              >
                Save Meal
              </button>
            )}
          </div>
        )}

        {mealDetails && (
          <div className={styles.certainMealDetails}>
            <button
              className={styles.closeBtn}
              onClick={() => setMealDetails(false)}
            >
              <span className={`${styles.xSign} material-symbols-outlined`}>
                close
              </span>
            </button>

            <h2>{selectedMeal.name}</h2>
            <div className={styles.mealMacros}>
              <ul>
                <li>
                  <div className={styles.circleMacros}>
                    <FlameSvg className={styles.flameBackground} />{" "}
                    {/* SVG ca fundal */}
                    <h2>{macros.calories.toFixed(0)}</h2>
                    <p>Cal</p>
                  </div>
                </li>

                <li>
                  <div>
                    <span className={styles.carbsProcentage}>
                      {totalMacros
                        ? ((macros.carbs / macros.calories) * 100).toFixed(0)
                        : 0}
                      %
                    </span>
                    <h2>{macros.carbs.toFixed(0)}g</h2>
                    <p>Carbs</p>
                  </div>
                </li>

                <li>
                  <div>
                    <span className={styles.fatProcentage}>
                      {totalMacros
                        ? ((macros.fat / macros.calories) * 100).toFixed(0)
                        : 0}
                      %
                    </span>
                    <h2>{macros.fat.toFixed(0)}g</h2>
                    <p>Fat</p>
                  </div>
                </li>

                <li>
                  <div>
                    <span className={styles.proteinProcentage}>
                      {totalMacros
                        ? ((macros.protein / macros.calories) * 100).toFixed(0)
                        : 0}
                      %
                    </span>
                    <h2>{macros.protein.toFixed(0)}g</h2>
                    <p>Protein</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.howMuch}>
              <h2>How many grams?</h2>
              <input
                type="number"
                className={styles.enterGrams}
                value={grams}
                onChange={handleGramsChange}
              />
              <button onClick={handleSendFood} id="saveGrams">
                Add
              </button>
            </div>
          </div>
        )}
      </div>
      <Calendar onDateSelect={dateSelect} />
    </>
  );
}

export default Meals;
