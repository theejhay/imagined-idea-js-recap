const express = require("express"); // importing express Module
const app = express(); // Creating an express application

// Route
app.get("/", (req, res) => {
    //res.send("Hello from Express");
    res.json({
        message: "Hello, Welcome to Express Class"
    })
});

app.get("/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Henry",
            age: 13
        },
        {
            id: 2,
            name: "John",
            age: 30
        },
    ];
    res.json({
        success: true,
        data: users
    });
});


// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


