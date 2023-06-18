//.env will come first
require('dotenv').config()
const express = require('express')

// const app = express()
const app = require('./app')

// const cors = require('cors')
// const Note = require('./models/note')

const config = require('./utils/config')
const logger = require('./utils/logger')

// var morgan = require('morgan')
// const note = require('./models/note')

// if(process.argv.length<3){
//     console.log(`give password as argument`)
//     process.exit(1)
// }
// const password = process.argv[2]

// app.use(cors())
// app.use(express.static('build'))
// app.use(morgan('dev'))

//REQUEST LOGGER
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }


//this is json parser, this will take the data from the request and convert into object
// app.use(express.json())



// app.get('/api/notes',(request,response) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//     // console.log(`mongo one`)
//   })
// })

// app.post('/api/notes',(request,response,next) => {
//   const body = request.body
//   // console.log(`Here's the body ${body}`)
//   if(body.content === undefined){
//     return response.status(400).json({ error : 'content hi nai hai' })
//   }
//   const nNote = new Note({
//     content : body.content,
//     important : body.important || false
//   })
//   console.log(`Here's the new note${nNote}`)
//   nNote.save().then(savedNote => {
//     response.send(savedNote)
//   })
//     .catch(error => next(error))
// })
// app.get('/api/notes/:id',(request,response,next) => {
//   Note.findById(request.params.id).then(note => {
//     if(note){
//       response.json(note)
//     }else{
//       response.status(400).end()
//     }
//   })
//     .catch(error => next(error))
// })

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)
//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   }
//   else if(error.name === 'ValidationError'){
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }


// const generateId = () => {
//     const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//     return maxId + 1
// }

// app.post('/api/notes',(request,response)=>{
//     const body = request.body
//     if(!body.content){
//         return response.status(400).json(
//             {
//                 error : 'content missing'
//             }
//         )
//     }
//     const note = {
//         content : body.content,
//         important : body.important || false,
//         id : generateId(),
//     }

//     notes = notes.concat(note)
//     console.log(...notes)
//     //This will print on the terminal
//     // console.log(note)
//     //This will give the response when we do the post request
//     response.json(note)
// })

//Here below are the routes, wherein in the first, there are two parameters, request contains the detailed information of the get method, the the response tells what to do after getting the request, in this case(in first route) its sending hello world
// app.get('/',(request,response) => {
//   response.send('<h1>Hello World</h1>')
// })

// app.delete('/api/notes/:id',(request,response,next) => {
//   Note.findByIdAndDelete(request.params.id).then(result => {
//     response.status(204).end()
//   })
//     .catch(error => {
//       next(error)
//     })
// })
// app.delete('/api/notes/:id',(request,response)=>{
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)
//     response.status(204).end()
// })

// app.put('/api/notes/:id',(request,response,next) => {
//   const { content,important } = request.body
//   // console.log(body)
//   // const nNote = {
//   //     content : body.content,
//   //     important : body.important
//   // }
//   Note.findByIdAndUpdate(request.params.id,{ content,important },{ new: true,runValidators: true,context: 'query' })
//     .then(result => response.json(result))
//     .catch(error => next(error))
// })
//the inverted commas makes the url unique, i.e its a combination of the resource type and a unique number
// app.get('/api/notes/:id',(request,response)=>{
//     const id = Number(request.params.id)
//     const note = notes.find(note => {
//         console.log(note.id, typeof note.id, id, typeof id, note.id === id)
//         return note.id === id
//     })
//     if(note){
//         console.log(note)
//         response.json(note)
//     }
//     else{
//         console.log(`Not found`)

//         response.status(404).send(`Error 404 NOT FOUND`)

//         //setting the status of code with .status               and not sending any data with end()
//         // response.status(400).end()
//     }
// })

//Following below is called middleware, this handles the request and response objects
// app.get('/api/notes',(request,response)=>{
//     response.json(notes)
// })

// app.use(errorHandler)
// //This will bind the server to port 3001
const PORT = process.env.PORT || 3001
app.listen(config.PORT,() => {
  logger.info(`Server running on port ${PORT}`)
})





//WITHOUT USING EXPRESS
//import node's web server module
// const http = require('http')
// creates a server, where saare req ek hi particular address me jaega
// const app = http.createServer((request,response) => {
//     response.writeHead(200,{'Content-Type':'text/plain'})
//     response.end(JSON.stringify(notes))
// })

// app.getConnections('/',(request,response)=>{
//     response.send('<h1>Hello world</h1>')
// })
// app.getConnections('/api/notes',(request,response)=>{
//     response.json(notes)
// })