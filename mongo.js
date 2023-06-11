const mongoose = require('mongoose')
if(process.argv.length<3){
    console.log(`give password as argument`)
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://sahil_1729:${password}@cluster0.wl8k81y.mongodb.net/NoteApp?retryWrites=true&w=majority`
mongoose.set(`strictQuery`,false)
mongoose.connect(url)
//above are the steps for connection to database

//Below we are defining the schema of the database
const noteSchema = new mongoose.Schema({
    content : String,
    important : Boolean,
})
const Note = mongoose.model('Note',noteSchema)
// creating the new object with help of Note
const note = new Note({
    content : 'GET and POST are the most important methods of HTTP protocol',
    important : true,
})



Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
//for saving the object in the database, using save method
// note.save().then(result=>{
//     console.log('note saved!')
//     //here it is closing the connection, because if we don't, then the program will never finish its execution
//     mongoose.connection.close()
// })