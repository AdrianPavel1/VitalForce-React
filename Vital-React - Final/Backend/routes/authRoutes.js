import express from "express";
import { connectToDataBase } from "../lib/db.js";
import bcrypt from "bcrypt";

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
  console.log("Request body:", req.body);
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

//backend meals:
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
      console.log("No valid green element sent");
      return res.status(400).json({
        message: "No valid green element sent",
      });
    }

    const [existingEntry] = await db.query(
      "SELECT * FROM card_meal WHERE username = ? AND date = ?",
      [username, date]
    );

    if (existingEntry) {
      await db.query(
        "UPDATE card_meal SET green = ? WHERE username = ? AND date = ?",
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
  try {
    const { username } = req.query;
    console.log("Param username received:", username);
    const db = await connectToDataBase();

    const [result] = await db.query(
      "SELECT DATE_FORMAT(date, '%Y-%m-%d') AS date FROM card_meal WHERE green = 1 AND username = ?",
      [username]
    );

    return res.status(200).json(result);
  } catch (err) {
    console.log("error on green meals", err);
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
  console.log("Received parameters:", { dailyMeal, goal });

  try {
    const db = await connectToDataBase();

    const query = `select * from ${db.escapeId(dailyMeal)} where goal = ?`;
    const [rows] = await db.query(query, [goal]);

    console.log("Database rows:", rows);

    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ message: "No meals found" });
    }
  } catch (err) {
    console.error("Error fetching meals examples:", err);
    return res.status(500).json({ message: "server error", err });
  }
});

export default router;
