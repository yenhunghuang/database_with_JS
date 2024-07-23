import express from "express";
import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "new_password",
    database: "TodoList",
});

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

const app = express();

app.get("/", async (req, res) => {
    connection.query(
        "INSERT INTO Todo Value(1, 'My First Todo')",
        (err, results, field) => {
            res.send("Hello World!");
            res.end();
        }
    );
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});

//Run app, then load http://localhost:3000 in a browser to see the output.
