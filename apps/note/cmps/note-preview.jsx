import { eventBusService } from "../../../js/services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
import { NoteEditor } from "./note-editor.jsx"


export class NotePreview extends React.Component {

    state = {
        note: this.props.note,
        note2Edit: 'not null',
        selectedNote: this.props.selectedNote
    }
    updateSelectedNote = () => {
        this.setState(this.props.selectedNote = note)
    }


    componentDidMount() {
        let x = null
        eventBusService.on('s', note => {
            console.log(note);
            if (!note) return
            if (this.state.note.id === note.id) this.setState({ note })

        })
        // console.log('last print ');
        // if(x)console.log(x);


    }


    onColorPicker = (color) => {
        const { note } = this.state
        noteService.colorPicker(note.id, color).then(note => {
            return Promise.resolve(this.setState({ note: note })).then(
                document.querySelector(`.${note.id}`).style.display = "none"
            )
        })
    }



    onRemove = (note) => {
        const { onRemoveNote } = this.props
        onRemoveNote(note.id)
    }

    showColorModal = () => {
        const { note } = this.state
        var el = document.querySelector(`.${note.id}`)
        if (el.style.display === "none") el.style.display = 'flex'
        else el.style.display = "none"
    }

    printThisNote = () => {
        const { note } = this.state
        noteService.getById(note.id)
            .then(note => {
                this.setState({ note2Edit: note })
            })
        // console.log('NOTE 2 EDIT:', this.state.note2Edit)
    }

    toggleDarken = (noteValue) => {
        const dark = document.querySelector('.darken')
        const editor = document.querySelector('.note-editor')
        editor.style.display = 'flex'
        if (dark.style.backgroundColor === 'rgba(0, 0, 0, 0.5)')
            dark.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        else
            dark.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    }

    render() {
        var isColorBtnClick = false
        var display = 'flex'
        const color = "red"

        const { note } = this.state
        return <article className="note-preview" style={{ backgroundColor: note.style.backgroundColor }
        } onClick={() => {
            const note = this.state.note
            eventBusService.emit('currNote', note)
        }
        } >
            {note.info.url && <img className='note-url' src={note.info.url} alt="" onClick={this.toggleDarken} />}
            {
                note.info.yt && <iframe src={note.info.yt}
                    frameborder="0" allow="autoplay; encrypted-media"
                    allowfullscreen title="video" />
            }
            < h1 className='note-title' onClick={() => this.toggleDarken('edit')} > {note.info.title}</h1 >
            <p className='note-txt' onClick={this.toggleDarken}>{note.info.txt}</p>
            <div className='note-controls flex' >
                <img className="note-icon" onClick={() => this.showColorModal()} src="assets/img/icons/color-palette.svg" alt="" />
                <img className="note-icon" src="assets/img/icons/trash-can.svg" alt="" onClick={() => this.onRemove(note)} />

            </div>
            <div className={note.id} style={{ display: 'none' }}>
                <div className="color-palette">
                    <button className="btn-color" onClick={() => this.onColorPicker('#add8e6')} style={{ backgroundColor: "#add8e6" }} value="#add8e6"></button>
                    <button className="btn-color" onClick={() => this.onColorPicker('#f08080')} style={{ backgroundColor: "#f08080" }} value="#f08080"> </button>
                    <button className="btn-color" onClick={() => this.onColorPicker('#fafad2')} style={{ backgroundColor: "#fafad2" }} value="#fafad2"> </button>
                    <button className="btn-color" onClick={() => this.onColorPicker('#90ee90')} style={{ backgroundColor: "#90ee90" }} value="#90ee90"> </button>
                    <button className="btn-color" onClick={() => this.onColorPicker('#ffa07a')} style={{ backgroundColor: "#ffa07a" }} value="#ffa07a"> </button>
                </div>
            </div>

        </article >
    }
}

// function toggleDarken(noteValue) {
//     var value = noteValue
//     var isEdit=true
//     this.setState({ isEdit: isEdit} )
//     const dark = document.querySelector('.darken')
//     const editor = document.querySelector('.note-editor')
//     editor.style.display = 'flex'
//     if (dark.style.backgroundColor === 'rgba(0, 0, 0, 0.5)')
//         dark.style.backgroundColor = 'rgba(0, 0, 0, 0)'
//     else
//         dark.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
// }