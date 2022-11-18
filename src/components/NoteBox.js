import React, { useContext, useState } from 'react'
import MainContext from '../MainContext'
import Draggable from 'react-draggable';

export default function NoteBox() {
    const { noteBoxPosition, setMode, notes, setNotes, setNoteBoxVisibility } = useContext(MainContext);
    const [ noteValue, setNoteValue ] = useState();

    const noteTypes = [
        {
            name: 'High',
            color: '#df405a',
            text: 'High'
        },
        {
            name: 'Medium',
            color: '#fcbe32',
            text: 'Medium'
        },
        {
            name: 'Low',
            color: '#004e66',
            text: 'Low'
        },
        {
            name: 'Comment',
            color: '#ff5f2e',
            text: 'Comment'
        }
    ];

    const [color, setColor] = useState(noteTypes[0].color);
    const [type, setType] = useState(noteTypes[0].name);

    const changeNoteTypeColor = (e) => {
        setColor(e.target.value);
        setType(e.target.selectedOptions[0].text);
    }

    const addNote = event => {
        const currentNote = {
            id: notes.length + 1,
            note: noteValue,
            color,
            position: noteBoxPosition,
            visibility: true,
            type,
        }

        setNotes([...notes, currentNote]);
        setNoteBoxVisibility(false);
    }

    return (
        <div onMouseEnter={ () => setMode(false)} onMouseLeave={ () => setMode(true)} className='note-box' style={{ '--color': color, position: 'absolute', left: noteBoxPosition.x, top: noteBoxPosition.y }}>
            <span className='note-box-number'>{ notes.length + 1 }</span>
            <select onChange={changeNoteTypeColor}>
                {noteTypes.map(noteType => (
                    <option value={noteType.color}>
                        {noteType.text}
                    </option>
                ))}
            </select>
            <textarea cols="30" rows="5" onChange={(e) => setNoteValue(e.target.value)}></textarea>
            <button onClick={addNote} disabled={!noteValue}>Create</button>
        </div>
    )
}
