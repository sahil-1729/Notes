const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const helper = require('./test_helper')

const initialNotes = [
  {
    content : 'HTML is easy',
    important : false,
  },
  {
    content : 'Browser can execute only Javascript',
    important : true,
  }
]

beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

  const noteObject = helper.initialNotes
  .map(note => new Note(note))
  const promiseArray = noteObject.map(note => note.save())

  await Promise.all(promiseArray)
  // helper.initialNotes.forEach(async (note) => {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  //   console.log(`saved`)
  // })
  // console.log(`done`)

  // let noteObject = new Note(helper.initialNotes[0])
  // await noteObject.save()
  // noteObject = new Note(helper.initialNotes[1])
  // await noteObject.save()
})

test('notes to be returned as json', async () => {
  console.log(`entered test`)
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type',/application\/json/)
},100000)

test('all notes are returned', async() => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')
  const content = response.body.map(val => val.content)
  expect(content).toContain('Browser can execute only Javascript')
})


test('a valid note can be added', async () => {
  const newNote = {
    content : 'async/await simplifies the async calls',
    important : true,
  }
  await api.post('/api/notes')
  .send(newNote)
  .expect(201)
  .expect('Content-Type',/application\/json/)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
  // const response = await api.get('/api/notes')
  const contents = notesAtEnd.map(val => val.content)
  expect(contents).toContain('async/await simplifies making async calls')
})
test('note without content is not added', async () => {
  const newNote = {
    important : true
  }
  await api
  .post('/api/notes')
  .send(newNote)
  .expect(400)
  
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]
  const resultNote = await api
  .get(`/api/notes/${noteToView.id}`)
  .expect(200)
  .expect('Content-Type',/application\/json/)

  expect(resultNote.body).toEqual(noteToView)
})

test('a note to be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]
  await api
  .delete(`/api/notes/${noteToDelete.id}`)
  .expect(204)
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
  const contents = notesAtEnd.map(r => r.content)
  expect(contents).not.toContain(noteToDelete.content)
})
afterAll(async () => {
  await mongoose.connection.close()
})