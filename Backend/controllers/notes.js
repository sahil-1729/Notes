const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const {info} = require('../utils/logger')
notesRouter.get('/', async (request, response) => {
  // Note.find({}).then(notes => {
  //   response.json(notes)
  // })
  //used async await instead of .then, bc it can lead to callback hell, also for using async await, await must be inside async block
  const notes = await Note.find({}).populate('user',{username : 1, name : 1})
  response.json(notes)
})

notesRouter.get('/:id',async (request, response, next) => {
  try{
    const note = await Note.findById(request.params.id)
    if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }
  }catch(error){
    next(error)
  }
  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ','')
  }
  return null
}

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  // const user = await User.findById(body.userId)

  const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
  info(decodedToken)
  if(!decodedToken.id){
    return response.status(401).json({error : "invalid token"})
  }
  const user = await User.findById(decodedToken.id)
  const note = new Note({
    content: body.content,
    important: body.important || false,
    user : user.id
  })

  try{
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote)
  }catch(exception){
    next(exception)
  }
  // note.save()
  //   .then(savedNote => {
  //     response.status(201).json(savedNote)
  //   })
  //   .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response) => {
  // try{
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  // }catch(exception){
  //   next(exception)
  // }
  // Note.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter