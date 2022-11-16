import { useContext, useState } from "react";
import MainContext from "../MainContext";
import NoteType from "./NoteType";
import { useEffect } from "react";

function Header (props) {
    const { notes, setNotes } = useContext(MainContext);
    const uniqueNoteTypes = {};

    notes.forEach((item) => {
        uniqueNoteTypes[item.color] = item.type;
    });

    return (
        <div className="header">
            {
                <NoteType  noteColor="" noteType="Clear Filter" />
            }
            {

                Object.keys(uniqueNoteTypes).map(noteType => <NoteType noteColor={noteType} noteType={uniqueNoteTypes[noteType]} />)
            }
        </div>

    )
}

export default Header;