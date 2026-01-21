const express = require("express"); // importing express Module
const fs = require("fs");

const app = express(); // Creating an express application

// This enables req.body for JSON
app.use(express.json());

// File Path
const DATA_FILE = "./users.json";

function readUsers(){
    const data = fs.readFileSync(DATA_FILE, "utf8");
    if(!data.trim()){
        return [];
    }
    return JSON.parse(data);
}

function writeUsers(users){
    fs.writeFileSync(DATA_FILE, JSON.stringify(users));
}

// Route
app.get("/", (req, res) => {
    //res.send("Hello from Express");
    res.json({
        message: "Hello, Welcome to Express Class"
    })
});

app.get("/users", (req, res) => {
    const users = readUsers();
    res.json({
        success: true,
        data: users
    });
});

app.post("/users", (req, res) => {
    const users = readUsers();
    const {name, age, gender} = req.body;
    const date = new Date();
    const newUser = {
        id: Date.now(),
        name: name,
        age: age,
        gender: gender,
        dateAdded: date.toISOString()
    }

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
        success: true,
        data: newUser
    });

});




// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


