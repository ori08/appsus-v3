import { MailList } from './mail-list.jsx';

export function MailContainer({ mails, onRemoveMail, hideMain, onGroupRemove }) {

    return <section className="mail-list-container" >
        <div className="group-editor-mail-list">
            <img onClick={onGroupRemove} className="mail-icon last filter" src="assets/pics/asset 30.png" />
        </div>
        {mails.map(mail =>
            <MailList
                key={mail.id}
                mail={mail} onRemoveMail={onRemoveMail}
                hideMain={hideMain} />)}

    </section>
}


