// IMPORTS
const { Client } = require('pg');
const express = require('express');
const app = express();

//SETUP STUFF

app.set('view engine', 'ejs');

const client = new Client({
    connectionString: /* put url here*/,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

app.listen(3000, () => {
    console.log("Listening on port 3000")
})

// ROUTES

app.get("/", (req, res) => {
    res.render('home');
})

app.get("/calendar", (req, res) => {
    res.send("Calendar");
})

