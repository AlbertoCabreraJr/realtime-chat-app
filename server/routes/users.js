import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

import User from "../models/user.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(400).send({ message: "Invalid credentials." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).send({ message: "Invalid credentials." });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        name: existingUser.name,
      },
      "test"
    );

    res
      .status(200)
      .send({ result: _.pick(existingUser, ["_id", "name"]), token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).send({ message: "User already exist." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { email: result.email, id: result._id, name: result.name },
      "test"
    );

    res
      .status(200)
      .send({ result: _.pick(result, ["_id", "name", "email"]), token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
  }
});

export default router;
