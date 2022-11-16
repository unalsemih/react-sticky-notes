import { useContext, useState } from "react";
import MainContext from "../MainContext";

function LeaveNoteText (props) {
    const { position } = useContext(MainContext);
    return (
        <div className="leave-note-text" style={{ position: 'fixed', left: position.x, top: position.y }}>Please Click to create a note!</div>
    )
}

export default LeaveNoteText;