
import { noteService } from "../services/note.service.js"

// function handleChange(ev) {
//     console.log(ev.target.name)
// }


function toggleInputs() {
    const txt = document.querySelector('.txtarea')
    txt.style.display = 'block'
}

function toggleImg() {
    const txt = document.querySelector('.txtarea')
    const img = document.querySelector('.img-url')
    const yt = document.querySelector('.yt-url')
    txt.style.display = 'block'
    img.style.display = 'block'
    yt.style.display = 'none'
}
function toggleYt() {
    const txt = document.querySelector('.txtarea')
    const img = document.querySelector('.img-url')
    const yt = document.querySelector('.yt-url')
    txt.style.display = 'block'
    img.style.display = 'none'
    yt.style.display = 'block'
}
export function CreateNote({ note, onAddNote }) {
    return (
        <div>

            <form className="note-form" onSubmit={() => {
                onAddNote(event)
                document.querySelector('.note-form').reset()
            }}>
                <input className="note-txt-input" type="text" name="title"
                    placeholder="Title" onClick={toggleInputs} />

                <textarea className="txtarea" name="txt" placeholder="Take a note..."></textarea>
                <input className="img-url" type="text" placeholder="Add img URL..." name="url" />
                <input className="yt-url" type="text" placeholder="Add Youtube URL..." name="yt" />
                <div className="form-controls flex space-between">
                    <button style={{ display: "none" }}>Add</button>
                    <img className="note-icon" src="assets/img/icons/upload-img.svg" alt="" onClick={toggleImg} />
                    <img className="note-icon youtube" src="assets/img/icons/youtube.svg" alt="" onClick={toggleYt} />
                </div>
            </form>
        </div>
    )
}