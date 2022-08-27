
import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { CreateNote } from "../cmps/note-create.jsx"
import { NoteEditor } from "../cmps/note-editor.jsx"
import { AppHeader } from "../../../js/cmps/app-header-notes.jsx"
export class NoteIndex extends React.Component {
    state = {
        notes: [],
        filterBy: null,
        selectedNote: 'this is for a test okay?'
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then((notes) => this.setState({ notes }))
    }

    onSelectedBook = (noteId) => {
        noteService.getById(noteId)
            .then(note => {
                // console.log({selectedNote})
                this.setState({ selectedNote: note })
                // noteService.getById(noteId)
            })
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId).then(() => {
            console.log(this.state.notes)
            console.log('deleted!')
            this.loadNotes()
        })
    }



    // onChangeColor = (noteId) => {
    // onSetFilter = (filterBy) => {
    //     this.setState({ filterBy }, this.loadNotes)
    // }

    onAddNote = (ev) => {
        ev.preventDefault()
        noteService.addNote(ev).then(note =>
            this.loadNotes()
        )
    }

    onFilterBy = (filterBy) => {
        console.log('filtering...')
        this.state.filterBy = filterBy
        console.log(this.state.filterBy);
        noteService.query(filterBy).then(notes => {
            this.setState(notes = { notes })
        })


        // noteService.filterBy(filterBy).then(notes => {
        //     this.setState(notes = { notes })
        // })
    }

    render() {
        const { notes, selectedNote } = this.state
        console.log(notes)
        return (
            <section >
                <AppHeader />
                <div className="main-index main-layout">
                    <NoteEditor selectedNote={selectedNote} updateNotes={this.updateNotes} />
                    <CreateNote onAddNote={this.onAddNote} />
                    <section className="filter-selection">
                        <button onClick={() => this.onFilterBy(null)}><i class="fa-solid fa-xmark"></i></button>
                        <button onClick={() => this.onFilterBy('text')}><i class="fa-solid fa-font"></i></button>
                        <button onClick={() => this.onFilterBy('img')}><i class="fa-solid fa-image"></i></button>
                        <button onClick={() => this.onFilterBy('yt')}><i class="fa-brands fa-youtube"></i></button>
                    </section>
                    <NoteList notes={notes} onRemoveNote={this.onRemoveNote} selectedNote={selectedNote} />
                    <div className="darken full"></div>
                </div>
            </section>
        )
    }
}