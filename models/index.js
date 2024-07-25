import { Sequelize, DataTypes } from "sequelize";

// 创建 Sequelize 实例，连接到你的 MySQL 数据库
const sequelize = new Sequelize("TodoList", "root", "new_password", {
    host: "localhost",
    dialect: "mysql",
});

// 定义模型
const Todo = sequelize.define("Todos", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export { sequelize, Todo };
