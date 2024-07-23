import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "new_password",
    database: "TodoList",
});

// 使用 promise 版本的连接池
const promisePool = pool.promise();

app.get("/", async (req, res) => {
    const todoId = req.query.todo_id;
    const todoTitle = req.query.todo_title;

    try {
        const [results] = await promisePool.query(
            "INSERT INTO Todo (id, title) VALUES (?, ?)",
            [todoId, todoTitle]
        );
        // 使用 results 中的数据
        res.send(`Todo item added successfully! ID: ${results.insertId}`);
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("An error occurred.");
    }
});

app.listen(port, () => {
    console.log("Example app listening on port 3000!");
});

//Run app, then load http://localhost:3000 in a browser to see the output.
