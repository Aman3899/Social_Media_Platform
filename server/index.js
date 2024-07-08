const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");

const multer = require("multer");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT.js");
const port = 3001;

dotenv.config();

const app = express();
const Users = require("./models/Users.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db();


var emailOrUsername = "";

app.get( "/searchAccounts", async (req, res) => {

  const { username } = req.query;

  let collection = db.collection("users");

  let users;
  if ( username ) {
      users = await collection.find( { "username": username } ).toArray();
  }
  else {
      users = await collection.find().toArray();
  }
  res.send( users )
})

app.get("/getPosts", async (req, res) => {
  let collection = db.collection("Posts");

  let posts = await collection.find().toArray();

  res.send(posts);
});
app.get("/getUserPosts", async (req, res) => {
  let { username } = req.query;
  let coll = db.collection("Posts");
  let userPosts = await coll.find({ username: username }).toArray();
  res.send(userPosts);
});
app.put("/updateLikes", async (req, res) => {
  try {
    let username = req.body.username;
    let collection = db.collection("Posts");
    let updateLike = await collection.updateOne(
      { username: username },
      { $inc: { likes: 1 } }
    );
    res.status(200).send({ message: "Like updated successfully", updateLike });
  } catch (error) {
    res.status(500).send({ message: "Error updating like", error });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/post", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const imageBuffer = req.file.buffer;
    const userId = req.headers.authorization.split(" ")[1];
    const username = req.body.username;

    const imageDoc = {
      userId: userId,
      username: username,
      time: new Date(),
      image: imageBuffer,
      likes: 0,
      comments: [],
    };

    const postCollection = db.collection("Posts");

    await postCollection.insertOne(imageDoc);
    res.status(200).send("Post uploaded successfully");
  } catch (error) {
    console.error("Error uploading post:", error);
    res.status(500).send("Internal server error");
  }
});

app.use(express.json());
app.use(cookieParser());
// Enable CORS for all origins (not recommended for production)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  console.log("Server running");
  res.send("Server is up and running");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = {
      username: username,
      password: hash,
    };
    const usersCollection = db.collection("users");
    await usersCollection.insertOne(user);
    const token = createTokens(user);
    res.json({ message: "USER REGISTERED", token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ error: "User Doesn't Exist" });
    }

    emailOrUsername = username;
    const usernameOrEmail = await usersCollection.findOne({
      $or: [
        { email: emailOrUsername, password: password },
        { username: emailOrUsername, password: password }
      ]
    });

    const dbPassword = user.password;
    const match = await bcrypt.compare(password, dbPassword);
    if (!match) {
      return res
        .status(400)
        .json({ error: "Wrong Username and Password Combination!" });
    }

    const accessToken = createTokens(user);

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
      httpOnly: true,
    });

    res.json({ message: "Logged in successfully", accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profile", validateToken, (req, res) => {
  // Assuming validateToken middleware verifies and decodes JWT from access-token cookie
  res.json("profile");
});

app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
