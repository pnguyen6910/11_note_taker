const path = require("path")
const express = require("express")
const fs = require("fs")
const db = require('./db/db.json')
const uniqId = require("uniqid")
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

app.get('/api/notes', (req, res) => {
    fs.readFile('.db/db.json', 'utf8', (err, data) => {
        if (err) {
            thow (err)
        } else {
            try {
                console.log(JSON.parse(data))
                res.json(JSON.parse(data))
            }
            catch (err) {
                console.log("Error")
            }
        }
    })
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    const randomId = uniqId

    fs.readFile('./db/db.json', 'utf8', (err, note) => {
        if (err) {
            throw err
        }

        let notes = JSON.parse(note)
        req.body.id += randomId
        notes.push(newNotes)

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err
            console.log('Saved')
            res.json(notes)
            console.log(notes)
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server listening to http://localhost:${PORT}`)
})