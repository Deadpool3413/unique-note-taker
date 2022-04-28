const { response } = require('express')

const store = require('../db/store')

const router = require('express').Router()


router.get('/notes', (req, res) => {
    store.getNotes().then((notes)=> {
        return res.json(notes)
    })
    .catch((err) => res.status(500).json(err))
})

module.exports = router