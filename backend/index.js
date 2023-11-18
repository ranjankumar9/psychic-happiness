const express = require("express");
const { connection } = require("./server/server");
const { DataRouter, TodoRouter } = require("./routes/todo.route");
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.send("welcome to backend")
})

app.use("/", TodoRouter)

app.listen(process.env.port, async() => {
    try {
        await connection
        console.log('Server is Connected')
    } catch (err) {
        console.log('Server Connection Failed')
    }
    console.log(`Backend is Running on The Port ${process.env.port}`)
})