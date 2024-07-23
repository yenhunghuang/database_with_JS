import express from "express";
import mysql from "mysql2";

const app = express();
app.use(express.json()); // 解析 JSON 请求体
const port = 3000;

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "new_password",
    database: "TodoList",
});
// 使用 promise 版本的连接池
const promisePool = pool.promise();

//創建Todo
app.post("/", async (req, res) => {
    const { title } = req.body; // 从请求体中获取 title

    if (!title) {
        return res.status(400).send("Missing title.");
    }

    try {
        const [results] = await promisePool.query(
            "INSERT INTO Todo (title) VALUES (?)",
            [title]
        );
        res.status(201).send(
            `Todo item added successfully! ID: ${results.insertId}`
        );
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("An error occurred.");
    }
});

//取得所有Todo
app.get("/", async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Todo;");
        res.status(200).json(results);
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("An error occurred.");
    }
});

//取得某個Todo

app.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await promisePool.query(
            "SELECT * FROM Todo WHERE id = ?;",
            [id]
        );
        if (results.length === 0) {
            return res.status(404).send("The item is not found!");
        }

        res.status(200).json(results[0]);
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("An error occurred.");
    }
});

//刪除某個Todo
app.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await promisePool.query(
            "DELETE FROM Todo WHERE id = ?;",
            [id]
        );
        //result.affectedRows 表示被删除的记录数量。如果为 0，说明没有匹配到要删除的记录。
        //results.length 对于删除操作是不适用的，因为 DELETE 不会返回记录数组。
        if (result.affectedRows === 0) {
            res.status(404).send("Todo not found");
        } else {
            res.send("Todo deleted successfully");
        }
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("An error occurred.");
    }
});

//更新某個Todo
app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body; // 从请求体中获取 title

    if (!title) {
        return res.status(400).send("Missing title.");
    }

    try {
        const [result] = await promisePool.query(
            "UPDATE Todo SET title = ? WHERE id = ?",
            [title, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send("Todo item not found.");
        }

        res.status(200).send("Todo item updated successfully.");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("An error occurred.");
    }
});

app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body; // 从请求体中获取 title

    if (!title) {
        return res.status(400).send("Missing title.");
    }

    try {
        const [result] = await promisePool.query(
            "UPDATE Todo SET TITLE =? WHERE id = ?;",
            [title, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send("Todo updated not found");
        }
        res.send("Todo updated successfully");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("An error occurred.");
    }
});

app.listen(port, () => {
    console.log("Example app listening on port 3000!");
});

//Run app, then load http://localhost:3000 in a browser to see the output.
