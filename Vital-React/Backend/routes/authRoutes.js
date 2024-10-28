import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
});

export default router;
