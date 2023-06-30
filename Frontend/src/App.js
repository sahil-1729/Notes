import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user , setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const value = window.localStorage.getItem('loggedNoteappUser')
    if(value){
      const result = JSON.parse(value)
      setUser(result)
      noteService.setToken(result.token)
    }
  },[])
  const addNote = (noteObject) => {
    // event.preventDefault()
    // const noteObject = {
    //   content: newNote,
    //   important: Math.random() > 0.5,
    // }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

   const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

    const loginForm = () => {
      const hideWhenVisible = { display : loginVisible ? 'none' : ''}
      const showWhenVisible = { display : loginVisible ? '' : 'none'}
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        </div>
      )
    }

    //While storing the html tags in a function, user curly braces () instead of this -> {}
    const noteForm = () => (
      // <form onSubmit={addNote}>
      // {/* <input value={newNote} onChange={handleNoteChange} />
      // <button type="submit">save</button> */}
      // </form>
       <Togglable buttonLabel='new note'>
       <NoteForm createNote={addNote} />
     </Togglable>
    )
    const handleLogin = async (event) => {
      event.preventDefault()
      console.log(`logging in with ${username} ${password}`)
      try{
        const user = await loginService.login({username,password})
        
        window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))

        noteService.setToken(user.token)
        console.log(user)
        setUser(user)
        setUsername('')
        setPassword('')
      }catch(exception){
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      }
    }
    const logout = (event) => {
      event.preventDefault()
      window.localStorage.clear()
      window.location.reload()
    } 
    
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      
      {/* {user === null && loginForm}
      {user !== null && noteForm} */}
      {/* {user === null ? loginForm() : noteForm()} */}
      {console.log(`Value of user `,user)}
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        {noteForm()}
        <button onClick={(event) => logout(event)} >logout</button>
              </div>}


      <h2>Notes</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </ul>
     
    </div>
  )
}

export default App

