import express, { request, response } from "express";
import { connectToDataBase } from "../lib/db.js";
import bcrypt from "bcrypt";
import multer from "multer";
const router = express.Router();
router.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
    age,
    bodyType,
    goal,
    weight,
    height,
    physicalActivity,
    gender,
    neck_cm,
    waist_cm,
    hips,
  } = req.body;

  try {
    const db = await connectToDataBase();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashPassword]
    );

    await db.query(
      "INSERT INTO user_profiles (username, age, bodyType, goal, weight, height, physicalActivity, gender, neck_cm, waist_cm, hips) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        age || null,
        bodyType || "average",
        goal || "maintenance",
        weight || null,
        height || null,
        physicalActivity || "sedentary",
        gender || null,
        neck_cm || null,
        waist_cm || null,
        hips || null,
      ]
    );

    res
      .status(201)
      .json({ message: "User created successfully!", username: username });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDataBase();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const [profile] = await db.query(
      "SELECT * FROM user_profiles WHERE username = ?",
      [rows[0].username]
    );

    return res.status(200).json({
      user: {
        username: rows[0].username,
        email: rows[0].email,
        profile: profile[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//update
router.post("/updateProfile", async (req, res) => {
  const {
    username,
    age,
    bodyType,
    goal,
    weight,
    height,
    physicalActivity,
    gender,
    neck_cm,
    waist_cm,
    hips,
  } = req.body;

  try {
    const db = await connectToDataBase();

    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    await db.query(
      "UPDATE user_profiles SET age = ?, bodyType = ?, goal = ?, weight = ?, height = ?, physicalActivity = ?, gender = ?, neck_cm = ?, waist_cm = ?, hips = ? WHERE username = ?",
      [
        age,
        bodyType,
        goal,
        weight,
        height,
        physicalActivity,
        gender,
        neck_cm,
        waist_cm,
        hips,
        username,
      ]
    );

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/profile", async (req, res) => {
  const { username } = req.body;

  try {
    const db = await connectToDataBase();

    const [rows] = await db.query(
      "SELECT age,bodyType, goal, weight, height, physicalActivity, gender, neck_cm, waist_cm, hips FROM user_profiles WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Profile not found in order to get user infos" });
    }

    return res.status(200).json({
      profile: rows[0],
    });
  } catch (err) {
    res.status(500),
      json({
        message: "Internal server error",
      });
  }
});

router.post("/search-foods", async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const db = await connectToDataBase();

    const [rows] = await db.query("SELECT * FROM foods WHERE name LIKE ?", [
      `%${searchTerm}%`,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No foods found" });
    }

    return res.status(200).json({
      foods: rows,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-macros", async (req, res) => {
  const { username, date } = req.query;

  try {
    const db = await connectToDataBase();

    const targetDate = date || new Date().toISOString().split("T")[0];

    const [rows] = await db.query(
      "SELECT * FROM user_meals WHERE username = ? AND date = ?",
      [username, targetDate]
    );

    if (rows.length === 0) {
      return res.status(200).json({
        macros: [],
        message: "No macros found for this date.",
      });
    }

    return res.status(200).json({
      macros: rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add-macros", async (req, res) => {
  const { username, calories, proteins, carbs, fats, date } = req.body;

  try {
    const db = await connectToDataBase();

    const [existingEntry] = await db.query(
      "SELECT * FROM user_meals WHERE username = ? AND date = ?",
      [username, date]
    );

    if (existingEntry.length > 0) {
      const [updateResult] = await db.query(
        "UPDATE user_meals SET calories = ?, proteins = ?, carbs = ?, fats = ? WHERE username = ? AND date = ?",
        [calories, proteins, carbs, fats, username, date]
      );

      if (updateResult.affectedRows === 1) {
        return res
          .status(200)
          .json({ message: "Macros updated successfully!" });
      } else {
        return res.status(400).json({ message: "Failed to update macros" });
      }
    } else {
      const [insertResult] = await db.query(
        "INSERT INTO user_meals (username, date, calories, proteins, carbs, fats) VALUES (?, ?, ?, ?, ?, ?)",
        [username, date, calories, proteins, carbs, fats]
      );

      if (insertResult.affectedRows === 1) {
        return res.status(200).json({ message: "Macros added successfully!" });
      } else {
        return res.status(400).json({ message: "Failed to add macros" });
      }
    }
  } catch (err) {
    console.error("Backend error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.post("/add-cardMeals", async (req, res) => {
  const { username, date, meals } = req.body;

  if (!meals || !Array.isArray(meals)) {
    return res.status(400).json({ message: "invalid meals data format" });
  }

  try {
    const db = await connectToDataBase();

    for (const meal of meals) {
      const meal_name = meal.name;
      const calories = Number(meal.calories);
      const protein = Number(meal.protein);
      const carbs = Number(meal.carbs);
      const fat = Number(meal.fat);
      const totalFoods = meal.totalFoods;

      const [existingEntry] = await db.query(
        "SELECT * FROM card_meal WHERE username = ? AND date = ? AND meal_name = ?",
        [username, date, meal_name]
      );

      if (existingEntry.length > 0) {
        await db.query(
          "UPDATE card_meal SET calories = ?, protein = ?, carbs = ?, fat = ?, total_foods = ? WHERE username = ? AND date = ? AND meal_name = ?",
          [
            calories,
            protein,
            carbs,
            fat,
            JSON.stringify(totalFoods),
            username,
            date,
            meal_name,
          ]
        );
      } else {
        await db.query(
          "INSERT INTO card_meal (username, date, meal_name, calories, protein, carbs, fat, total_foods) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            username,
            date,
            meal_name,
            calories,
            protein,
            carbs,
            fat,
            JSON.stringify(totalFoods),
          ]
        );
      }
    }

    res.status(200).json({ message: "Meals added successfully!" });
  } catch (err) {
    console.error("Backend error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.delete("/delete-meal", async (req, res) => {
  const { username, date, meal_name } = req.body;

  if (!username || !date || !meal_name) {
    return res
      .status(400)
      .json({ message: "Username, date, and meal_name are required" });
  }

  try {
    const db = await connectToDataBase();

    const [deleteResult] = await db.query(
      "DELETE FROM card_meal WHERE username = ? AND date = ? AND meal_name = ?",
      [username, date, meal_name]
    );

    if (deleteResult.affectedRows === 1) {
      res.status(200).json({ message: "Meal deleted successfully!" });
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (err) {
    console.error("Backend error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/getCard-meals", async (req, res) => {
  const { username, date } = req.query;

  const currentDate = date || new Date().toISOString().split("T")[0];

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const db = await connectToDataBase();

    const [meals] = await db.query(
      "SELECT meal_name, calories, protein, carbs, fat, total_foods FROM card_meal WHERE username = ? AND date = ?",
      [username, currentDate]
    );

    res.status(200).json(meals);
  } catch (err) {
    console.error("Backend error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.post("/is-green", async (req, res) => {
  const { username, date, green } = req.query;

  try {
    const db = await connectToDataBase();

    const greenValue = parseInt(green, 10);
    if (isNaN(greenValue)) {
      return res.status(400).json({
        message: "No valid green element sent",
      });
    }

    const [existingEntry] = await db.query(
      "select * from card_meal where username = ? and date = ?",
      [username, date]
    );

    if (existingEntry) {
      await db.query(
        "update card_meal set green = ? where username = ? and date = ?",
        [greenValue, username, date]
      );
      return res.status(200).json({ message: "Green updated successfully!" });
    } else {
      return res.status(404).json({ message: "Entry not found" });
    }
  } catch (err) {
    console.error("Backend error on green:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/take-greens", async (req, res) => {
  const { username } = req.query;
  try {
    const db = await connectToDataBase();

    const [result] = await db.query(
      "select date_format(date, '%y-%m-%d') as date from card_meal where green = ? and username = ?",
      [1, username]
    );

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "server error", err });
  }
});

router.get("/getUser-goal", async (req, res) => {
  const { username } = req.query;

  try {
    const db = await connectToDataBase();
    const [rows] = await db.query(
      "select goal from user_profiles where username = ?",
      [username]
    );

    if (rows.length > 0) {
      return res.status(200).json(rows[0].goal);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "server error", err });
  }
});

router.get("/get-mealsExamples", async (req, res) => {
  const { dailyMeal, goal } = req.query;

  try {
    const db = await connectToDataBase();

    const query = `select * from ${dailyMeal} where goal = ?`;
    const [rows] = await db.query(query, goal);

    const results = rows.map((row) => ({
      ...row,
      image: row.image ? row.image.toString("base64") : null,
    }));

    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: "No meals found" });
    }
  } catch (err) {
    console.error("Error fetching meals examples:", err);
    return res.status(500).json({ message: "server error", err });
  }
});

//---------------Admin page section----------------

router.get("/getUsers", async (req, res) => {
  try {
    const db = await connectToDataBase();

    const query = `select * from users`;
    const [rows] = await db.query(query);

    if (rows.length > 0) {
      const users = rows.map((user) => [user.username, user.email]);
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "server error", err });
  }
});

router.get("/getUsersDetails", async (req, res) => {
  try {
    const db = await connectToDataBase();
    const query =
      "select profile_id, username, age, bodyType, goal,weight, height, physicalActivity, gender FROM user_profiles";
    const [rows] = await db.query(query);

    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ message: "No user profiles found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
});

router.get("/Breakfast", async (req, res) => {
  try {
    const db = await connectToDataBase();
    const query = "select * from breakfast";
    const [rows] = await db.query(query);

    const results = rows.map((row) => ({
      ...row,
      image: row.image ? row.image.toString("base64") : null,
    }));

    console.log(results);

    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: "No foods registered" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
});

router.get("/Lunch", async (req, res) => {
  try {
    const db = await connectToDataBase();
    const query = "select * from lunch";
    const [rows] = await db.query(query);

    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ message: "No foods registered" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
});

router.get("/Dinner", async (req, res) => {
  try {
    const db = await connectToDataBase();
    const query = "select * from dinner";
    const [rows] = await db.query(query);

    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ message: "No foods registered" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
});

router.put("/:mealType/modify", async (req, res) => {
  try {
    const db = await connectToDataBase();
    const { mealType } = req.params;

    const tableName = await (mealType.charAt(0).toLowerCase() +
      mealType.slice(1));

    const { itemId, modifyOption, modifiedText } = req.body;
    const query = `update ${tableName} set ${modifyOption} = ? where id = ?`;

    const [result] = await db.query(query, [modifiedText, itemId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Update successsfully" });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error", err });
  }
});

router.post("/:mealType/add", async (req, res) => {
  try {
    const { mealType } = req.params;

    const tableName = mealType.charAt(0).toLowerCase() + mealType.slice(1);
    console.log(tableName);
    const {
      name,
      goal,
      quantity,
      proteins,
      carbohydrates,
      fat,
      ingredients,
      method,
      image,
    } = req.body;

    const db = await connectToDataBase();

    const query = `
    insert into ${tableName} 
    (name, goal, quantity, proteins, carbohydrates, fat, ingredients, method, img) 
    values (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const [result] = await db.query(query, [
      name,
      goal,
      quantity,
      proteins,
      carbohydrates,
      fat,
      ingredients,
      method,
      image,
    ]);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Meal added successfully",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

router.post("/:mealType/deleteRow", async (req, res) => {
  try {
    const { mealType } = req.params;

    const tableName = mealType.charAt(0).toLowerCase() + mealType.slice(1);

    console.log(tableName);
    const { id } = req.body;

    const db = await connectToDataBase();

    const query = `delete from ${tableName} where id = ?`;

    const [result] = await db.query(query, [id]);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Meal deleted successfully",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

router.get("/getHomeDetails", async (req, res) => {
  try {
    const db = await connectToDataBase();

    const queryUsers = `
      select count(*) as totalProfiles,
       sum(case when goal = 'weight loss' then 1 else 0 end) as weightLossCount,
       sum(case when goal = 'muscle gain' then 1 else 0 end) as muscleGainCount
from user_profiles;
    `;
    const [results] = await db.query(queryUsers);

    const queryFoods = `select count(*) as foodsNumber from foods `;

    const [foodsResults] = await db.query(queryFoods);

    const homePageDetails = {
      userNumbers: results[0].totalProfiles,
      weightLossCount: results[0].weightLossCount,
      muscleGainCount: results[0].muscleGainCount,
      foodsTotal: foodsResults[0].foodsNumber,
    };

    return res.status(200).json(homePageDetails);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
});

router.get("/getAllFoods", async (req, res) => {
  try {
    const db = await connectToDataBase();

    const query = "select * from foods";

    const [response] = await db.query(query);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
});

router.get("/getFoodChartTotals", async (req, res) => {
  try {
    const db = await connectToDataBase();

    const query =
      "select category, count(*) as count from foods group by category";
    const [result] = await db.query(query);

    const foodTotals = {
      meat: 0,
      eggs: 0,
      dairy: 0,
      grains: 0,
      nuts: 0,
      vegetables: 0,
      fruits: 0,
      legumes: 0,
      plantBased: 0,
      seeds: 0,
      seafood: 0,
    };

    result.forEach((element) => {
      foodTotals[element.category] = element.count;
    });
    return res.status(200).json(foodTotals);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      err,
    });
  }
});

router.delete("/deleteFood/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectToDataBase();

    const query = "delete from foods where id =?";
    const [response] = await db.query(query, id);
    console.log(id);

    if (response.affectedRows > 0) {
      return res.status(200);
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      err,
    });
  }
});

router.post("/addFood", async (req, res) => {
  const food = req.body;
  try {
    const db = await connectToDataBase();

    const query = `insert into foods 
      (name, calories_per_100g, fat_per_100g, protein_per_100g, carbs_per_100g, category) 
      values (?, ?, ?, ?, ?, ?)`;
    const [response] = await db.query(query, [
      food.name,
      food.calories_per_100g,
      food.fat_per_100g,
      food.protein_per_100g,
      food.carbs_per_100g,
      food.category,
    ]);

    return res
      .status(200)
      .json({ message: "Food added successfully", response });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    const title = req.body.title;

    const tableName = title.charAt(0).toLowerCase() + title.slice(1);

    const db = await connectToDataBase();

    const query = `update ${tableName} set image = ? where id = (select max(id) from ${tableName})`;

    const [response] = await db.query(query, [req.file.buffer]);

    return res.status(200).json({
      message: "Image successfully added",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Eroare de server",
      error: err.message,
    });
  }
});

export default router;
