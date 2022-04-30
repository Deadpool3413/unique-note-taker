// const { response } = require('express')

const store = require('../db/store')

const router = require('express').Router()


router.get('/notes', (req, res) => {
    store.getNotes().then((notes)=> {
        return res.json(notes)
    })
    .catch((err) => res.status(500).json(err))
})
//function for saving notes
router.post("/notes", (req, res) => {
    let request = req.body;
    req.body.id = nanoid(10);
    notes.push(request);
    res.json(notes);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes))
})

//function for deleting notes
router.delete("/notes/:id", (req, res) => {
    const { id } = req.params;
    let deletedNote = notes.find(notes => notes.id === id);
    if (deletedNote) {
        notes = notes.filter(notes => notes.id != id)
        res.end()
        res.status(200)
    }
    //sends error if not working
    else {
        res.status(404)
    }
});

module.exports = router