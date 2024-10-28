import styles from "./Meals.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FlameSvg from "../../assets/flame";

function Meals(props) {
  const username = props.username;

  const [editingIndex, setEditingIndex] = useState(null);
  const [visibleMeal, setVisibleMeal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempMealName, setTempMealName] = useState("");
  const [mealDetails, setMealDetails] = useState(false);
  const [callSendMacrosData, setCallSendMacrosData] = useState(false);

  //folosit pentru indexul cautarii in baza de date:
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

  const [cardMeal, setCardMeal] = useState(
    []
    //   [
    //   { name: "Meal", calories: 0, protein: 0, carbs: 0, fat: 0, totalFoods: [] },
    // ]
  );
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

    try {
      // Cerere de ștergere către backend
      const response = await axios.delete(
        "http://localhost:3000/auth/delete-meal",
        {
          data: {
            username: props.username,
            date: new Date().toISOString().split("T")[0], // Date-ul zilei curente
            meal_name: mealToDelete.name,
          },
        }
      );

      if (response.status === 200) {
        console.log("Meal deleted successfully:", response.data.message);
        // Actualizează UI după ștergerea reușită
        setCardMeal((prevMeal) => prevMeal.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error(
        "Error deleting meal:",
        error.response?.data || error.message
      );
      alert("Error: Unable to delete meal from the database.");
    }
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
  }, [grams, selectedMeal]); // Recalculează când gramajul sau meal-ul selectat se schimbă

  const totalMacros =
    macros.calories + macros.fat + macros.protein + macros.carbs;

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
  };

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
  };

  useEffect(() => {
    if (cardMeal.length > 0) {
      handleAddToDatabse();
      // sendMacrosData();
    }
    // sendMealsData();
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

  // Adaugă event listener la apăsarea tastelor
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

  //trimiterea catre backend si server a macro:
  const sendMacrosData = async () => {
    const data = {
      username: props.username,
      calories: uiTotals.calories,
      proteins: uiTotals.protein,
      carbs: uiTotals.carbs,
      fats: uiTotals.fat,
      date: new Date().toISOString().split("T")[0],
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

  const [macrosData, setMacrosData] = useState(null);
  const [error, setError] = useState(null);

  const getMacrosData = async (date) => {
    const data = {
      username: props.username, // Numele utilizatorului primit prin props
      date: date || new Date().toISOString().split("T")[0], // Data curentă sau data specificată
    };

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
    getMacrosData();
    fetchMeals();
  }, []);

  const sendMealsData = async () => {
    const data = {
      username: props.username,
      date: new Date().toISOString().split("T")[0], // Sau specifică data dorită
      meals: cardMeal, // Array-ul de mese din useState
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/auth/add-cardMeals`, // Endpoint-ul backend
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

  // Funcția pentru a obține mesele
  const fetchMeals = async (date = null) => {
    const currentDate = date || new Date().toISOString().split("T")[0]; // Data curentă

    try {
      const response = await axios.get("http://localhost:3000/auth/get-meals", {
        params: {
          username: props.username,
          date: currentDate,
        },
      });

      const fetchedMeals = response.data;

      // Adăugăm mesele în cardMeal, fără duplicate
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
            totalFoods: JSON.parse(meal.total_foods || "[]"), // Parsează total_foods dacă există
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
    console.log(cardMeal);
    sendMacrosData();
    sendMealsData();
  };

  // useEffect(() => {
  //   console.log("apelata");
  //   if (callSendMacrosData) {
  //     sendMacrosData();
  //     setCallSendMacrosData(false);
  //   }
  // }, [callSendMacrosData]);

  return (
    <>
      <h2>{props.progress}</h2>
      <h2>{props.fats}</h2>
      <h2>{props.proteins}</h2>
      <h2>{props.carbs}</h2>
      <button onClick={() => afisare()}>sall12222</button>
      <button onClick={() => handleSendAllDataToDatabase()}>backENDD</button>
      <div className={styles.myMeals}>
        <h1>My Meals</h1>
        <button className={styles.addMealButton} onClick={addMealHandler}>
          Add Meal
        </button>
        <div
          className={styles.mealsContainer}
          // style={{ display: cardMeal.length > 0 ? "flex" : "none" }}
        >
          {cardMeal.map((meal, index) => (
            <div key={index} className={styles.meal}>
              <div className={styles.mealDetails}>
                <div className={styles.mealName}>{meal.name}</div>
                <div className={styles.mealDetails}>{meal.calories} kcal</div>
              </div>
              <div className={styles.mealBttns}>
                <button onClick={() => showMealEditor(index)}>+</button>
                <button onClick={() => deleteMealHandler(index)}>-</button>
              </div>
            </div>
          ))}
        </div>

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
                Search
              </button>
            </div>
            {/* aici---------------------------------------------------------------------------------------------------------------------- */}
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
                Save
              </button>
            </div>
            <button
              className={`${styles.saveButtonMeal} ${
                visibleMeal ? styles.visible : ""
              }`}
              onClick={() => handleSetCardMeal()}
            >
              Save All Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Meals;
