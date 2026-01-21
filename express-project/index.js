const express = require("express");
const userRoutes = require('./routes/users.routes');
const fs = require("fs");

const app = express();
app.use(express.json()); // to enable our req.body

app.use("/users", userRoutes);


// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


// Client (PostMan) - > Routes -> Controller -> Service -> Data (JSON File)