const dbOperation = require("./src/dbFiles/dbOperation");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

const multer = require("multer");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO, this is the root URL!!!");
});
app.post("/save_login", async (req, res) => {
  const { username, emailID, password } = req.body;
  try {
    console.log("Received login: ", req.body);
    console.log("username: ", username);
    console.log("emailID: ", emailID);
    console.log("password: ", password);
    await dbOperation.saveLoginCredentials(username, emailID, password);
    res.status(200).json({ message: "User is successfully registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to register" });
  }
});


app.post('/register', async (req, res) => {
  const { username, email, passwordHash } = req.body;
  console.log('Received email:', email); 
  console.log('Received password:', passwordHash);
  try {
    // Check if the email already exists in the database
    const existingUser = await dbOperation.getUserByEmail(email);
    if (existingUser) {
      // If the email already exists, send an error response
      return res.status(400).json({ error: 'Email already exists' });
    }
    // If the email doesn't exist, proceed with user registration
    await dbOperation.registerUser(username, email, passwordHash);
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, passwordHash } = req.body;
  try {
    const isAuthenticated = await dbOperation.loginUser(email, passwordHash);
    if (isAuthenticated) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to login user' });
  }
});

// --------------------------------- PORT ---------------
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

