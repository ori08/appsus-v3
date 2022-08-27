
import { onAddMail } from "./mail-index.jsx"

export class MailEditor extends React.Component {




    render() {
        const { onAddMail } = this.props
        const { isNewMail } = this.props
        console.log(isNewMail);
        var display = "none"
        if (isNewMail) display = "flex"

        return <section className="editor" style={{ display: display }} >

            <div className="editor-header" >
                <h3 className="editor-header-messege">New Message</h3>
                <img onClick={() => onAddMail('close')} className="mail-icon exitBtn" src='assets/pics/asset 40.png' />
            </div>
            <form className="form-editor" onSubmit={() => onAddMail(event)}>
                <div className="editor-line flex">
                    <h1 className="input-text">To</h1>
                    <input className="editor-input" type="mail" />
                </div>
                <div className="editor-line flex">
                    <h1 className="input-text">Subject</h1>
                    <input className="editor-input" type="text" />
                </div>
                <textarea name="" id="" cols="100" rows="20"></textarea>

                <div className="toolbar-editor">
                    <div className="send-btn-design">
                        <button className="send-btn">send</button>
                    </div>
                    <img className="mail-icon " src='assets/pics/asset 50.png' />
                    <img className="mail-icon " src='assets/pics/asset 55.png' />
                    <img className="mail-icon " src='assets/pics/asset 57.png' />
                    <img className="mail-icon " src='assets/pics/asset 58.png' />

                </div>
            </form>
        </section >
    }
}

