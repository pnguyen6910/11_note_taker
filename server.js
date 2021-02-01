const path = require("path")
const express = require("express")
const fs = require("fs")
const db = require(./db/db.json)
const uniqid = require("uniqid")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
})


