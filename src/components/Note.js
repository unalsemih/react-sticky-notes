import { useState } from "react";
import Draggable from "react-draggable";
import { useContext } from "react";
import MainContext from "../MainContext";
import { FaTrash } from 'react-icons/fa';

function Note (note) {
    const { setNoteBoxVisibility, setNotes, notes, setMode , mode} = useContext(MainContext);
    const [ noteDetailVisibility, setNoteDetailVisibility ] = useState(!!note.isOnboarding);
    const [ clickable, setClickable ] = useState(true);

    const changeNoteVisibility = e => {
        clickable && setNoteDetailVisibility(!noteDetailVisibility);
    };

    const setNotePosition = (e, data) => {
        const newNotes = notes.map(n => {
            if (n.id === note.id) {
                n.position = {
                    x: data.x,
                    y: data.y
                }
            }

            return n;
        });

        setNotes(newNotes);

        setMode(false);
        setNoteBoxVisibility(false);
    }

    const removeNote = (noteId) => {
        setNotes(notes.filter(note => note.id !== noteId));
    }

    return (
        <Draggable onDrag={ () => setClickable(false) } onStart={ () => setClickable(true) } onStop={ setNotePosition } 
            defaultPosition={{ x: note.position.x, y: note.position.y }}>
            <div className="note-container" style={{ '--color': note.color, position: 'absolute', left: 0, top: 0, display: note.visibility ? 'block' : 'none' }}>
                <span className='note-box-number' onClick={changeNoteVisibility}>{ note.id }</span>
                {
                    noteDetailVisibility && (
                        <div className="note" >
                            { note.note }

                            <FaTrash onClick={ () => removeNote(note.id)  } className="remove-note" />
                        </div>
                    )
                }

            </div>
        </Draggable>
    )
}

export default Note;