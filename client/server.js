import express from "express";
import cors from "cors";
import db from "./db.mjs";
import fs from "fs";
import multer from "multer";

const app = express();
const port = 3000;

app.use(cors());
// app.use(express.urlencoded({ extended: true }));

var emailOrUsername = "";



app.get( "/login", async (req, res) => {

    const { email, password } = req.query;
    emailOrUsername = email;

    let collection = db.collection("users");

    let user = await collection.find( {$or: [{"email": emailOrUsername, "password": password},
                                            {"username": emailOrUsername, "password": password }] }).toArray();

    res.send( user )
})



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



app.get( "/getPosts", async (req, res) => {
    
    let collection = db.collection("Posts");
    
    let posts = await collection.find().toArray();

    res.send( posts )
})


app.get( "/getUserPosts", async (req, res) => {

    let { username } = req.query;
    let coll = db.collection("Posts");
    let userPosts = await coll.find( { "username": username } ).toArray();
    res.send( userPosts )
})


app.put( "/updateLikes:username", async ( req, res ) => {

    let username = req.body.username;

    let collection = db.collection("Posts");
    // let updateLike = await collection.updateOne({ "username": username }, { $inc: { "likes": 1 } })
})


let emailU = "";
let usernameCred = "";

app.post( "/signup", (req, res) => {

    const { email, username, DOB, password } = req.body;
    emailU = email;
    usernameCred = username;

    let collection = db.collection("users");

    collection.insertOne({
        "email": email,
        "username": username,
        "DOB": DOB,
        "password": password
    })
        .then( () => {
            res.status(200).send("User Data is Inserted Successfully");
        })
        .catch( (error) => {
            res.status(400).send("User Data Insertion Failed", error);
        });

})



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post( "/post", upload.single('file'), async (req, res) => {

    const imageBuffer = req.file.buffer;

    if (!imageBuffer) {
        return res.status(400).send('No file uploaded');
    }

    let user;
    if ( emailOrUsername == undefined ) {
        user = await db.collection("users").find( { "email": emailU } ).toArray();
    }
    else {
        user = await db.collection("users").find( { $or: [ {"username": emailOrUsername}, 
                                                            {"email": emailOrUsername} ] } ).toArray();
    }
    console.log(user[0]);

    const imageDoc = {
        email: user[0].email,
        username: user[0].username,
        time: new Date(),
        image: imageBuffer,
        likes: 0,
        comments: []
    };

    const postCollection = db.collection("Posts");

    await postCollection.insertOne(imageDoc)
        .then( () => {
            res.status(200).send("Post uploaded successfully")
        })
        .catch( (e) => {
            console.error('Error uploading post:', error);
            res.status(500).send("Internal server error");
        })
})



app.listen( port, () => {
    console.log(`http://localhost:${port}`);
})