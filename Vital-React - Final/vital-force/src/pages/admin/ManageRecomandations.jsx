import { useState, useEffect, useRef } from "react";
import styles from "./Admin.module.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const ManageRecomandations = ({ title }) => {
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  //add meal
  const [meal, setMeal] = useState({
    name: "",
    goal: "muscle gain",
    quantity: "",
    proteins: "",
    carbohydrates: "",
    fat: "",
    ingredients: "INGREDIENTS ",
    method: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (meal.name.trim() === "") {
      alert("Name is required.");
      return;
    }

    if (meal.quantity === "" || Number(meal.quantity) <= 0) {
      alert("Quantity must be a positive number.");
      return;
    }

    if (meal.proteins !== "" && Number(meal.proteins) < 0) {
      alert("Proteins must be a positive number.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/auth/${title}/add`,
        meal
      );
      if (response.status === 200) {
        setMeal({
          name: "",
          goal: "muscle gain",
          quantity: "",
          proteins: "",
          carbohydrates: "",
          fat: "",
          ingredients: "INGREDIENTS ",
          method: "",
          image: null,
        });

        setRefreshMealsTable((prev) => !prev);
        handleSubmitImage();
        setPreview(null);
        setImageName(null);
        setSelectedFile(null);
      }
    } catch (err) {
      setError("An error occured while getting foods data");
    }
  };

  //get all the meals

  //get data from backend:
  const getAllMeals = async (param) => {
    try {
      const response = await axios.get(`http://localhost:3000/auth/${param}`);

      if (response.status === 200) {
        if (param === "Breakfast") setBreakfastMeals(response.data);

        if (param === "Lunch") setLunchMeals(response.data);

        if (param === "Dinner") setDinnerMeals(response.data);

        setError(null);
      }
    } catch (err) {
      setError("An error occured while getting foods data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeMealInfo = (e) => {
    const { name, value } = e.target;
    setModifyItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => (prev < 4 ? prev + 1 : 4));
  };

  const handlePrev = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : 1));
  };

  //modify data-------------------------------
  const [modifyItem, setModifyItem] = useState({
    itemId: "",
    modifyOption: "",
    modifiedText: "",
  });
  const [refreshMealsTable, setRefreshMealsTable] = useState(false);

  const submitModifyedData = async (e) => {
    e.preventDefault();

    if (!modifyItem.itemId) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/auth/${title}/modify`,
        modifyItem
      );

      if (response.status === 200) {
        setModifyItem({
          itemId: "",
          modifyOption: "",
          modifiedText: "",
        });

        setRefreshMealsTable((prev) => !prev);
      }
    } catch (err) {
      console.error("Error", err);
    }
  };
  //Zoom on table----------------------------
  const [zoom, setZoom] = useState(0);

  const modifyContainer = useRef(null);
  const addContainer = useRef(null);
  const foodsContainer = useRef(null);
  const table = useRef(null);
  const modifyImage = useRef(null);
  const modifyText = useRef(null);

  const handleZoom = () => {
    if (zoom === 0) {
      modifyContainer.current.style.display = "none";
      addContainer.current.style.display = "none";
      foodsContainer.current.classList.add(styles.zoomed);
      table.current.style.width = "100%";
      table.current.style.height = "100%";
      setZoom(1);
    } else {
      modifyContainer.current.style.display = "";
      addContainer.current.style.display = "";
      foodsContainer.current.classList.remove(styles.zoomed);

      setZoom(0);
    }
  };
  useEffect(() => {
    if (zoom === 1) {
      const clickOutside = (event) => {
        if (table.current && !table.current.contains(event.target)) {
          handleZoom();
        }
      };

      document.addEventListener("mousedown", clickOutside);
      return () => {
        document.removeEventListener("mousedown", clickOutside);
      };
    }
  }, [zoom]);
  // table that  will be visible
  let [useThisTable, setUseThisTable] = useState([]);
  const [breakfastmeals, setBreakfastMeals] = useState([]);
  const [lunchmeals, setLunchMeals] = useState([]);
  const [dinnermeals, setDinnerMeals] = useState([]);

  let tableUsed = (title) => {
    if (title) {
      if (title === "Breakfast") return breakfastmeals;

      if (title === "Lunch") return lunchmeals;

      if (title === "Dinner") return dinnermeals;
    }
  };
  useEffect(() => {
    if (breakfastmeals.length || lunchmeals.length || dinnermeals.length) {
      const selectedTable = tableUsed(title);
      setUseThisTable(selectedTable);
    }
  }, [title, breakfastmeals, lunchmeals, dinnermeals, refreshMealsTable]);

  useEffect(() => {
    getAllMeals("Breakfast");

    getAllMeals("Lunch");

    getAllMeals("Dinner");
  }, [refreshMealsTable]);

  //logic for deleting rows from a table----------

  const deleteTableRow = async (id) => {
    console.log("am accesat acest", id);

    try {
      const response = await axios.post(
        `http://localhost:3000/auth/${title}/deleteRow`,
        { id }
      );

      if (response.status === 200) {
        console.log("sa sters!!");
        setRefreshMealsTable((prev) => !prev);
      }
    } catch (err) {
      setError("Error from databse trying to delete a meal");
    }
  };

  //logic for adding desired photo

  const [preview, setPreview] = useState(null);

  const [imageName, setImageName] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (accetedFild) => {
    const file = accetedFild[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageName(file.name);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleSubmitImage = async () => {
    if (!selectedFile) {
      alert("Add an image");
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/uploadImage",
        formData
      );
    } catch (err) {
      setError("Error while sending the image to DB.");
    }
  };

  const handleMeals = () => {
    return (
      <>
        <div ref={foodsContainer} className={styles.foodsContainer}>
          <div
            ref={table}
            className={`${styles.adminTables} ${styles.beakfastTable}`}
          >
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Goal</th>
                  <th>Quantity</th>
                  <th>Proteins</th>
                  <th>Carbohydrates</th>
                  <th>Fat</th>
                  <th>Ingredients</th>
                  <th>Method</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {useThisTable.map((food) => (
                  <tr key={food.id}>
                    <td>{food.id}</td>
                    <td>{food.Name}</td>
                    <td>{food.goal}</td>
                    <td>{food.Quantity}</td>
                    <td>{food.Proteins}</td>
                    <td>{food.Carbohydrates}</td>
                    <td>{food.Fat}</td>
                    <td>{food.Ingredients}</td>
                    <td>{food.Method}</td>
                    <td>
                      {food.img ? (
                        <img
                          src={`/${
                            title.charAt(0).toLowerCase() + title.slice(1)
                          }/${food.img}`}
                          alt={food.name}
                          width="50"
                          height="50"
                        />
                      ) : food.image ? (
                        <img
                          src={`data:image/jpeg;base64,${food.image}`}
                          alt="imagine"
                          style={{ width: "100px" }}
                        />
                      ) : (
                        "No image"
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => deleteTableRow(food.id)}
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className={styles.tableZoom} onClick={() => handleZoom()}>
              <span
                className={`${styles.tableZoomBtn} 
                      material-symbols-outlined
                    }`}
              >
                zoom_in_map
              </span>
            </button>
          </div>

          <form
            ref={modifyContainer}
            className={styles.modifyContainer}
            onSubmit={submitModifyedData}
          >
            <h3>Modify</h3>
            <label>Choose an item id</label>
            <input
              type="number"
              min={0}
              onChange={handleChangeMealInfo}
              name="itemId"
              value={modifyItem.itemId}
            />
            <label>What do you want to modify?</label>
            <select
              name="modifyOption"
              className={styles.modifySelect}
              value={modifyItem.modifyOption}
              onChange={handleChangeMealInfo}
            >
              <option value="ID">ID</option>
              <option value="Name">Name</option>
              <option value="Goal">Goal</option>
              <option value="Quantity">Quantity</option>
              <option value="Proteins">Proteins</option>
              <option value="Carbohydrates">Carbohydrates</option>
              <option value="Fat">Fat</option>
              <option value="Ingredients">Ingredients</option>
              <option value="Method">Method</option>
              <option value="Image">Image</option>
            </select>
            <div ref={modifyText} className={styles.modifyText}>
              <label>Add Your modified text</label>
              <input
                type="text"
                name="modifiedText"
                value={modifyItem.modifiedText}
                onChange={handleChangeMealInfo}
              />
            </div>

            <button className={styles.modifyMealBTN} type="submit">
              Done
            </button>
          </form>

          <form
            ref={addContainer}
            className={styles.addContainer}
            onSubmit={handleSubmit}
          >
            {step === 1 && (
              <div className={styles.stepPanel}>
                <h2>Add a Meal for {title}</h2>

                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={meal.name}
                  onChange={handleChange}
                />

                <label>Goal:</label>
                <select name="goal" value={meal.goal} onChange={handleChange}>
                  <option value="muscle gain">Muscle Gain</option>
                  <option value="weight loss">Weight Loss</option>
                </select>

                <label>Quantity:</label>
                <input
                  type="text"
                  name="quantity"
                  value={meal.quantity}
                  onChange={handleChange}
                />
              </div>
            )}
            {step === 2 && (
              <div className={styles.stepPanel}>
                <label>Proteins:</label>
                <input
                  type="text"
                  name="proteins"
                  value={meal.proteins}
                  onChange={handleChange}
                />

                <label>Carbohydrates:</label>
                <input
                  type="text"
                  name="carbohydrates"
                  value={meal.carbohydrates}
                  onChange={handleChange}
                />

                <label>Fat:</label>
                <input
                  type="text"
                  name="fat"
                  value={meal.fat}
                  onChange={handleChange}
                />
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepPanel}>
                <label>Ingredients:</label>
                <input
                  type="text"
                  name="ingredients"
                  value={meal.ingredients}
                  onChange={handleChange}
                />

                <label>Method:</label>
                <input
                  type="text"
                  name="method"
                  value={meal.method}
                  onChange={handleChange}
                />

                <div className={styles.addImage}>
                  <div {...getRootProps()} className={styles.dropZone}>
                    <input {...getInputProps()} />
                    {preview ? (
                      <img src={preview} className={styles.previewImage} />
                    ) : (
                      <p>Drop your image here or click to select one</p>
                    )}
                  </div>
                </div>

                <button className={styles.button} type="submit">
                  Add Meal
                </button>
              </div>
            )}
            <div className={styles.stepNav}>
              <button onClick={handlePrev} disabled={step === 1} type="button">
                Previous
              </button>
              <button onClick={handleNext} disabled={step === 3} type="button">
                Next
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };
  return <>{handleMeals()}</>;
};

export default ManageRecomandations;
