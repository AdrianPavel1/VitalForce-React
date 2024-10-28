import styles from "./Meals.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FlameSvg from "../../assets/flame";

function Meals() {
  const [meals, setMeals] = useState([
    { name: "Meal", calories: 0, proteins: 0, carbs: 0, fat: 0 },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [visibleMeal, setVisibleMeal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempMealName, setTempMealName] = useState("");
  const [mealDetails, setMealDetails] = useState(false);
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
  const [cardMeal, setCardMeal] = useState([
    { calories: 0, protein: 0, carbs: 0, fat: 0, totalFoods: [] },
  ]);
  //search food
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const addMealHandler = () => {
    const newMeal = {
      name: `Meal${meals.length + 1}`,
      calories: 0,
      proteins: 0,
      carbs: 0,
      fat: 0,
    };
    setMeals((prevMeals) => [...prevMeals, newMeal]);
  };

  const deleteMealHandler = (index) => {
    setMeals((prevMeal) => prevMeal.filter((_, i) => i !== index));
  };

  const showMealEditor = (index) => {
    setVisibleMeal(true);
    setEditingIndex(index);
  };

  const editMealName = (e) => {
    setTempMealName(e.target.value); // actualizează numele temporar pe măsură ce se tastează
  };

  const saveMealName = () => {
    const updatedMeals = meals.map((meal, index) =>
      index === editingIndex ? { ...meal, name: tempMealName } : meal
    );
    setMeals(updatedMeals);
    setIsEditingName(false);
    // handleSetCardMeal();
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

  const afisamContinut = () => {
    console.log(mealIndex);
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
    setGrams(inputGrams); // Actualizează starea cu gramajul introdus
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
      calories: macros.calories.toFixed(1),
      carbs: macros.carbs.toFixed(1),
      fat: macros.fat.toFixed(1),
      protein: macros.protein.toFixed(1),
    };

    setTotalFoodsAdded((prev) => [...prev, newFoodItem]);
    // aici s-a adaugat ceva pentru a functiona dar nu functiona corect in toatalitate
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
      carbs: totalCarbs.toFixed(1),
      protein: totalProtein.toFixed(1),
      fat: totalFat.toFixed(1),
      calories: totalCalories.toFixed(1),
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
    saveMealName();
    const foods = totalFoodsAdded;
    setCardMeal((prev) => ({
      ...prev,
      calories: finalTotals.calories,
      protein: finalTotals.protein,
      carbs: finalTotals.carbs,
      fat: finalTotals.fat,
      totalFoods: foods,
    }));
  };

  const afisare = () => {
    console.log(finalTotals.calories);
    console.log(cardMeal);
  };
  return (
    <>
      <button onClick={() => afisare()}>sall12222</button>
      <div className={styles.myMeals}>
        <h1>My Meals</h1>
        <button className={styles.addMealButton} onClick={addMealHandler}>
          Add Meal
        </button>
        <div className={styles.mealsContainer}>
          {meals.map((meal, index) => (
            <div key={index} className={styles.meal}>
              <div className={styles.mealDetails}>
                <div className={styles.mealName}>{meal.name}</div>
                <div className={styles.mealDetails}>
                  {cardMeal.calories} kcal
                </div>
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
                <h1>{meals[editingIndex]?.name}</h1>
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
                          <button>-</button>
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
            <button
              className={styles.saveButtonMeal}
              onClick={() => handleSetCardMeal()}
            >
              Save
            </button>
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
                    <h2>{macros.calories.toFixed(1)}</h2>
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
                    <h2>{macros.carbs.toFixed(1)}g</h2>
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
                    <h2>{macros.fat.toFixed(1)}g</h2>
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
                    <h2>{macros.protein.toFixed(1)}g</h2>
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
              <button onClick={handleSendFood}>Save</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Meals;
