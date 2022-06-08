const router = require('express').Router();
const notesDatabase = require('../../db/notes.json');
const { v4: uuidv4 } = require("uuid");
const path = require("path")
const fs = require("fs");
const { parse } = require('path');

router.get("/notes", (req, res) => {
    //res.json(notesDatabase)
    res.sendFile(path.join(__dirname, "../../db/notes.json"))
});

router.post("/notes", (req, res) => {
    req.body.id = uuidv4();
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: req.body.id
    }

    fs.readFile(path.join(__dirname, "../../db/notes.json"), 'utf-8', function (err, data) {
        if (err) throw err;
       // console.log("data from json file", data)
        console.log("parsed data from json file", JSON.parse(data))
        const parsedNotes = JSON.parse(data)
        console.log(parsedNotes)
         parsedNotes.push(newNote);

        fs.writeFile(path.join(__dirname, "../../db/notes.json"), JSON.stringify(parsedNotes), function (err) {
            if (err) throw err;
            console.log("note saved to DB!")

           
        });

    })
    
    res.sendFile(path.join(__dirname, "../../db/notes.json"))
  
});

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile(path.join(__dirname, "../../db/notes.json"), 'utf-8', function (err, data) {
        if (err) throw err;
     
        const parsedNotes = JSON.parse(data)
      
        const notesDatabase = parsedNotes.filter(notes => notes.id != id);

        fs.writeFile(path.join(__dirname, "../../db/notes.json"), JSON.stringify(notesDatabase), function (err) {
            if (err) throw err;
            console.log("note deleted from DB!")


        });

    })

    res.sendFile(path.join(__dirname, "../../db/notes.json"))

});

module.exports = router;