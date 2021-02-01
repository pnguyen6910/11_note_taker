const path = require("path")
const express = require("express")
const fs = require("fs")
const db = require(./db/db.json)
const uniqid = require("uniqid")
const app = express()

app.use(express.urlencoded({extended: true}))