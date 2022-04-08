// IMPORTS
const { Client } = require('pg');
const express = require('express');
const app = express();
const jwtGenerator = require("./jwtGenerator");

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

        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({ jwtToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

app.get("/", (req, res) => {
})

app.get("/calendar", (req, res) => {
    // check if user is admin
    res.send("admin.Calendar");

    //volunteer calendar view
    //volunteer day with times view

    //admin calendar page

})

//admin volunteer roster

app.get("/roster", (req, res) => {

})

//admin check in page




app.get("/allshifts/:id", (req, res) => {
    //use id to query database to find upcoming shifts
    //pass upcoming shifts to ejs file
    //ejs file displays shifts

    //check if user is admin or volunteer and adjust view accordingly

    //admin all shifts
    //admin add shifts
    //admin edit shifts

    //volunteer all shifts
    //volunteer your shifts
    //volunteer day with editing shift
})

