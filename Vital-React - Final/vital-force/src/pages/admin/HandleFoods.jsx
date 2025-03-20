import { useState, useEffect, useRef } from "react";
import styles from "./Admin.module.css";
import axios from "axios";
import { id } from "date-fns/locale";
const HandleFoods = ({ title }) => {
  // manage foods table
  const [refreshData, setRefreshData] = useState(false);
  const [error, setError] = useState("");
  const [allDBfoodItems, setallDBFoodItems] = useState([
    {
      id: 1,
      name: "",
      calories_per_100g: 0,
      fat_per_100g: 0,
      protein_per_100g: 0,
      carbs_per_100g: 0,
      category: "",
    },
  ]);

  const getAllFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/getAllFoods"
      );

      if (response.status === 200) {
        setallDBFoodItems(response.data);
      }
    } catch (err) {
      setError("Error while getting foods", err);
      console.log("error", err);
    }
  };

  const afisare = () => {
    console.log("");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFood((prev) => ({ ...prev, [name]: value }));
  };

  const allFoodsTable = useRef(null);
  const quickFoodAdd = useRef(null);
  const barchart = useRef(null);

  const [zoom, setZoom] = useState(0);

  const handleZoom = () => {
    if (zoom === 0) {
      quickFoodAdd.current.style.display = "none";
      barchart.current.style.display = "none";
      allFoodsTable.current.classList.add(styles.zoomed);
      setZoom(1);
    } else {
      quickFoodAdd.current.style.display = "";
      barchart.current.style.display = "";
      allFoodsTable.current.classList.remove(styles.zoomed);
      setZoom(0);
    }
  };

  //food categories numbers

  const [foodData, setFoodData] = useState({
    meat: 10,
    eggs: 20,
    dairy: 30,
    grains: 40,
    nuts: 50,
    vegetables: 60,
    fruits: 70,
    legumes: 80,
    plantBased: 90,
    seeds: 100,
    seafood: 110,
  });

  const getFoodChartTotals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/getFoodChartTotals"
      );

      if (response.status === 200) {
        setFoodData(response.data);
      }
    } catch (err) {
      setError("Error: can't get chart totals");
    }
  };

  //delete food

  const deleteFood = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/auth/deleteFood/${id}`
      );

      if (response.status === 200) {
        console.log("s-a sters");
        setRefreshData((prev) => !prev);
      }
    } catch (err) {
      setError("Error: Can't delete food");
    }
  };

  //ADD a new food in db:
  const [addFood, setAddFood] = useState({
    name: "",
    calories_per_100g: 0,
    fat_per_100g: 0,
    protein_per_100g: 0,
    carbs_per_100g: 0,
    category: "",
  });

  const addFoodInDb = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/addFood",
        addFood
      );
      if (response.status === 200) {
        console.log("Food added successfully");
        setRefreshData((prev) => !prev);

        setAddFood({
          name: "",
          calories_per_100g: 0,
          fat_per_100g: 0,
          protein_per_100g: 0,
          carbs_per_100g: 0,
          category: "",
        });
      }
    } catch (err) {
      setError("Error: Can't add food to DB");
      console.error("Error adding food:", err);
    }
  };

  useEffect(() => {
    getAllFoods();
    getFoodChartTotals();
  }, [refreshData, allDBfoodItems]);

  //bar chart

  useEffect(() => {
    google.charts.load("current", { packages: ["corechart", "bar"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      const dataArray = [
        ["Category", "Value"],
        ["meat", foodData.meat],
        ["eggs", foodData.eggs],
        ["dairy", foodData.dairy],
        ["grains", foodData.grains],
        ["nuts", foodData.nuts],
        ["vegetables", foodData.vegetables],
        ["fruits", foodData.fruits],
        ["legumes", foodData.legumes],
        ["plant-based", foodData.plantBased],
        ["seeds", foodData.seeds],
        ["seafood", foodData.seafood],
      ];

      const data = google.visualization.arrayToDataTable(dataArray);

      const options = {
        title: "Food Categories",
        titleTextStyle: {
          color: "#ffffff",
          bold: true,
          fontSize: 20,
        },
        backgroundColor: "transparent",
        chartArea: { width: "80%", height: "70%" },
        hAxis: {
          textStyle: { color: "#ffffff" },
          gridlines: { color: "#333333" },
          titleTextStyle: { color: "#ffffff" },
        },
        vAxis: {
          textStyle: { color: "#ffffff" },
          titleTextStyle: { color: "#ffffff" },
        },
        legend: { position: "none" },
        bars: "horizontal",
      };

      const chart = new google.visualization.BarChart(
        document.getElementById("barchart_div")
      );
      chart.draw(data, options);
    }
  }, [foodData]);
  return (
    <>
      <div className={styles.handleFoodsContainer}>
        <h3>{title}</h3>
        <div ref={allFoodsTable} className={styles.allFoodsTable}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Calories per 100g</th>
                <th>Fat per 100g (g)</th>
                <th>Protein per 100g (g)</th>
                <th>Carbs per 100g (g)</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {allDBfoodItems.map((food) => (
                <tr key={food.id}>
                  <td>{food.id}</td>
                  <td>{food.name}</td>
                  <td>{food.calories_per_100g}</td>
                  <td>{food.fat_per_100g}</td>
                  <td>{food.protein_per_100g}</td>
                  <td>{food.carbs_per_100g}</td>
                  <td>{food.category}</td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteFood(food.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={styles.tableZoom}
            onClick={() => handleZoom("Foods")}
          >
            <span
              className={`${styles.tableZoomBtn} 
                    material-symbols-outlined
                  }`}
            >
              zoom_in_map
            </span>
          </button>
        </div>

        <div className={styles.bottomSection}>
          <div ref={quickFoodAdd} className={styles.quickFoodAdd}>
            <h3>Add Meal:</h3>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={addFood.name}
              onChange={handleChange}
            />
            <label>Calories/100g:</label>
            <input
              type="text"
              name="calories_per_100g"
              value={addFood.calories_per_100g}
              onChange={handleChange}
            />

            <label>Fat/100g</label>
            <input
              type="text"
              name="fat_per_100g"
              value={addFood.fat_per_100g}
              onChange={handleChange}
            />
            <label>Proteins/100g</label>
            <input
              type="text"
              name="protein_per_100g"
              value={addFood.protein_per_100g}
              onChange={handleChange}
            />
            <label>Carbohydrates/100g</label>
            <input
              type="text"
              name="carbs_per_100g"
              value={addFood.carbs_per_100g}
              onChange={handleChange}
            />

            <label>Category</label>
            <select
              name="category"
              value={addFood.category}
              onChange={handleChange}
            >
              <option value="meat">meat</option>
              <option value="eggs">eggs</option>
              <option value="dairy">dairy</option>
              <option value="grains">grains</option>
              <option value="nuts">nuts</option>
              <option value="vegetables">vegetables</option>
              <option value="fruits">fruits</option>
              <option value="legumes">legumes</option>
              <option value="legumes">plant-based</option>
              <option value="legumes">seeds</option>
              <option value="legumes">seafood</option>
            </select>
            <button
              className={styles.saveFoodBtn}
              onClick={() => addFoodInDb()}
            >
              Save
            </button>
          </div>
          <div
            ref={barchart}
            id="barchart_div"
            className={styles.barChartContainer}
          ></div>
        </div>
      </div>
    </>
  );
};

export default HandleFoods;
