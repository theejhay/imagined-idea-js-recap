const http = require("http");

const server = http.createServer((req, res) =>{
    if(req.url === "/"){
       res.end("Hello from Nodejs server") 
    }  else if (req.url === "/about"){
        res.end("About us Page")
    } else if (req.url === "/user" && req.method === "GET") {
        res.end("Get User using GET method")
    } else if (req.url === "/login" && req.method === "POST") {
        let body = "";
        req.on("data", userData => {
            body += userData;
        });

        req.on("end", () => {
            const user = JSON.parse(body);
            console.log(user)
            res.writeHead(201, { "Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "user created",
                user: user
            }))
        })
    } else {
        res.end("Page not Found")
    }
    
});

server.listen(3005, () => {
    console.log("Server running on port 3005")
})

// server.listen(3005);
