import { useContext, useState } from "react";
import MainContext from "../MainContext";

function NoteType (props) {
    const { notes, setNotes } = useContext(MainContext);

    const filterByNoteType = e => {
        const selectedColor = e.target.getAttribute('data-color');

        setNotes(notes.map((note) => {
            if (note.color === selectedColor || !selectedColor) {
                note.visibility = true;
            } else {
                note.visibility = false;
            }

            return note;
        }));
    };

    return (
        <div>
            { <button className="note-type" onClick={filterByNoteType} data-color={ props.noteColor } style={{ '--color':  props.noteColor }}>{ props.noteType }</button> }
        </div>
    )
}

export default NoteType;