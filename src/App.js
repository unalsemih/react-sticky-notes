import { useRef, useEffect, useState } from 'react'; 
import './App.css';
import MainContext from './MainContext';
import LeaveNoteText from './components/LeaveNoteText';
import Note from './components/Note';
import NoteBox from './components/NoteBox';
import Header from './components/Header';

function App() {
  const screen = useRef({});
  const [mode, setMode] = useState(false);
  const [noteBoxVisibility, setNoteBoxVisibility] = useState(false);
  const [noteBoxPosition, setNoteBoxPosition] = useState({
      x: 0,
      y: 0,
  });
  const [notes, setNotes] = useState(localStorage.notes && JSON.parse(localStorage.notes) || [
    {
        id: 1,
        note: 'Hello! Welcome to the this App.',
        color: '#2a4858',
        type: 'Comment',
        position: {
          x: 100,
          y: 150,
        },
        isOnboarding: true,
        visibility: true,
    },
    {
        id: 2,
        note: 'Please open the edit mode to create a new note! You can click C letter.',
        color: '#2a4858',
        type: 'Comment',
        position: {
          x: 300,
          y: 150,
        },
        isOnboarding: true,
        visibility: true,
    },
    {
        id: 3,
        note: 'After that, write something and enjoy this app!!',
        color: '#2a4858',
        type: 'Comment',
        position: {
          x: 500,
          y: 150,
        },
        isOnboarding: true,
        visibility: true,
    }
  ])

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    screen.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleMouseMove = (e) => {
    if (!mode) {
      return;
    }

    setPosition({
      x: e.pageX,
      y: e.pageY,
    });
  }

  const handleClick = (e) => {
    if (mode) {
      setNoteBoxPosition({
        x: position.x,
        y: position.y,
      })
      
      setNoteBoxVisibility(true);
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'c') {
      setMode(!mode);
      setNoteBoxVisibility(false);
    }

    if (e.key === 'Escape') {
      setMode(false);
      setNoteBoxVisibility(false);
    }
  };


  const data = {
      position,
      noteBoxPosition,
      mode,
      setMode,
      notes,
      setNotes,
      setNoteBoxVisibility
  }

  return (
    <MainContext.Provider value={data}>
        <Header></Header>
        <div ref={screen} tabIndex={0} onMouseUp={handleClick} onKeyUp={handleKeyUp} onMouseMove={handleMouseMove} className={`main-screen ${mode && 'editable'}`}>
          {mode && <LeaveNoteText></LeaveNoteText>}
          {notes && notes.map(note => <Note {...note} />)}
          {noteBoxVisibility && <NoteBox></NoteBox>}
        </div>
    </MainContext.Provider>
  );
}

export default App;
