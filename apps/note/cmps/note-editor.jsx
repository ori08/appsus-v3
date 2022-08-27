import { eventBusService } from "../../../js/services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

export class NoteEditor extends React.Component {
    unsubscribe
    state = {
        note: null,

    }
    componentDidMount() {
        this.unsubscribe = eventBusService.on('show-user-msg', (msg) => this.setState({ msg }))

    }

    componentWillUnmount() {
        this.unsubscribe()
    }


    // info: {
    //     title,
    //     txt,
    //     url,
    //     yt,

    editNote = (ev) => {
        ev.preventDefault()
        document.querySelector('.note-editor').style.display = "none"
        document.querySelector('.darken').style.backgroundColor = 'rgba(0, 0, 0, 0)'
        const { updateNotes } = this.props

        const title = ev.target[0].value
        const txt = ev.target[1].value
        const url = ev.target[2].value
        const yt = ev.target[3].value
        let { note } = this.state
        noteService.editNote(note.id, title, txt, url, yt).then(note => {
            eventBusService.emit('s', note)
        })
    }

    render() {
        if (!this.state.isEdit) {
            eventBusService.on('currNote', (note) => {
                this.state.note = note

            })
        }




        return <form className="note-editor" onSubmit={() => {
            this.editNote(event)
            document.querySelector('.note-editor').reset()
        }



        } >
            <input className="note-txt-input2" type="text" name="title" placeholder="Title" />
            <textarea className="txtarea2" name="txt" placeholder="Take a note..."></textarea>
            <input className="img-url2" type="text" placeholder="Add img URL..." name="url" />
            <input className="yt-url2" type="text" placeholder="Add Youtube URL..." name="yt" />
            <button style={{ display: "none" }}>Add</button>
            <div className="form-controls2 flex">
                <img className="note-icon" src="assets/img/icons/upload-img.svg" alt="" onClick={toggleImg} />
                <img className="note-icon" src="assets/img/icons/checklist.svg" alt="" />
                <img className="note-icon youtube" src="assets/img/icons/youtube.svg" alt="" onClick={toggleYt} />
            </div>
        </form>
    }
}


function toggleImg() {
    const txt = document.querySelector('.txtarea2')
    const img = document.querySelector('.img-url2')
    const yt = document.querySelector('.yt-url2')
    txt.style.display = 'block'
    img.style.display = 'block'
    yt.style.display = 'none'
}
function toggleYt() {
    const txt = document.querySelector('.txtarea2')
    const img = document.querySelector('.img-url2')
    const yt = document.querySelector('.yt-url2')
    txt.style.display = 'block'
    img.style.display = 'none'
    yt.style.display = 'block'
}
