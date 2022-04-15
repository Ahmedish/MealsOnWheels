// IMPORTS
const { Client } = require('pg');
const express = require('express');
const app = express();
const jwtGenerator = require("./jwtGenerator");
const authorize = require("./authorize");

//SETUP STUFF

const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

app.use(express.json())

app.listen(3000, () => {
    console.log("Listening on port 3000")
})

// ROUTES

app.post("/createshifts", async (req, res) => {
    const { email, start_time, end_time, shift_type } = req.body;

    try {
        const newShift = await client.query("INSERT INTO shifts(user_email, start_at, end_at, shift_type) VALUES ($1, $2, $3, $4);", [email, start_time, end_time, shift_type])
        res.status(201).send("Shift created!")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

app.post("/register", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await client.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists!")
        }

        const newUser = await client.query("INSERT INTO users(user_type, user_email, user_pass) VALUES ($1, $2, $3);", ["Volunteer", email, password])
        res.status(201).send("User created!")

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ jwtToken });

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//login route

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await client.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).send("User does not exist!")
        }

        if (password !== user.rows[0].user_password) {
            return res.status(401).json("Invalid Credential");
        }

        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({ jwtToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

app.post("/verify", authorize, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.post("/", authorize, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1",
            [req.user.id]
        );

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});





