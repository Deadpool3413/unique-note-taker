const util = require('util')
const fs = require('fs')

const readFileAsync = util.promisify(fs.readFile)
const uuid = require('uuid')

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8')
    }
    getNotes() {
        return this.read().then((notes)=> {
            let parsedNotes
            try{
                parsedNotes = [].concat(JSON.parse(notes))

            } catch(err){
                parsedNotes = []
            }
            return parsedNotes
        })
    }
    addNote(note) {
        const notes = { noteTitle , noteText, id: uuid() }
        return this.getNotes().then((notes) => {

        })
    }

    removeNotes() {

    }
}

module.exports = new Store()