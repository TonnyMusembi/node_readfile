const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [{
        username: "user1",
        password: "password1",
    },
    {
        username: "user2",
        password: "password2",
    },
];

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(401).json({
            message: "User not found",
        });
    }

    if (user.password !== password) {
        return res.status(401).json({
            message: "Wrong password",
        });
    }

    return res.json({
        message: "Login successful",
    });
});

app.listen(3006, () => {
    console.log("Server started on http://localhost:3006");
});