import { NotePreview } from "./note-preview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, selectedNote }) {

    return <Link to={"/notes/"}>

        <section className="note-list">
            {notes.map(note => <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} selectedNote={selectedNote} />)}
        </section>
    </Link>
}


