const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded({ extended: true });

const app = express()
app.use("/assets",express.static("assets"));

const connection = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1",       //This is your localhost IP
    user: "joël",         // "newuser" created in Step 1(e)
    password: "qweQWE123",  // password for the new user
    database: "userdb",      // Database name
    port: "3306"             // port name, "3306" by default
});

connection.getConnection(function(error){
    if (error) throw error
    else console.log("Connected to the database!")
});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder, function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    connection.query("select * from usertable where email = ? and password = ? ",[email,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})

app.listen(4000);