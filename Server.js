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
// Configure multer to handle FormData
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

app.get('/gettablename', async (req, res) => {
  try {
    const Tablename = await dbOperation.getTablenames();
    res.json(Tablename.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error for Tablename' });
  }
});

app.post('/tablenamecategories', async (req, res) => {
  const { tableName } = req.body;
  console.log("Received POST request with tableName:", tableName); // Log to see if you received the table name correctly
  try {
    console.log("Fetching categories for tableName:", tableName); // Log to see if you're attempting to fetch categories
    const categories = await dbOperation.getCategoriesForTable(tableName);
    console.log("Fetched categories:", categories); // Log the fetched categories
    res.json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/insertData',upload.none(), async (req, res) => {
  const { tableName, dataToInsert } = req.body; // Extract tableName and dataToInsert from the request body
  console.log("Received POST request with tableName:", req.body); // Log to see if you received the table name correctly
  try {
    // Assuming you have a function to insert data into your database
    await dbOperation.insertData(tableName, dataToInsert); // Provide both tableName and dataToInsert

    res.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// --------------------------------- PORT ---------------
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

