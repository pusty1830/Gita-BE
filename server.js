const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db.config');
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    );
    next();
})

sequelize.authenticate().then(async () => {
    console.log('Database connected Successfully')
}).catch((err) => {
    console.log('Database connection failed', err)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})