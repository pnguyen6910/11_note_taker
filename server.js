const path = require("path")
const express = require("express")
const fs = require("fs")
const db = require('./db/db.json')
const uniqId = require("uniqid")
const app = express()
var PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
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

    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, note) => {
        if (err) {
            throw err
        }
        let notes = JSON.parse(note)
        req.body.id += randomId
        notes.push(newNote)
        

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err
            console.log('Saved')
            res.json(notes)
            console.log(notes)
        })
    })
})

app.delete('/api/notes/:id', (req, res) => {
    // if (err) {
    //     throw err
    // }

    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, note) => {
        if (err) {
            throw err
        }
        const savedNote = JSON.parse(note)
        const index = savedNote.findIndex((notes) => {return req.params.id === notes.id})
        savedNote.splice(index, 1)
        console.log(index)

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(savedNote), (err) => {
            if (err) {
                throw err
            }
            console.log("Saved")
            res.json(JSON.stringify(savedNote))
            console.log(savedNote)
    })
    })



})

app.listen(PORT, () => {
    console.log(`Server listening to http://localhost:${PORT}`)
})