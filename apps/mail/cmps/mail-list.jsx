const { Link } = ReactRouterDOM
import { MailInfo } from "./mail-info"
import { mailService } from "../services/mail.service.js"
var isSelected = false

export class MailList extends React.Component {

    state = {
        mail: this.props.mail
    }

    mark = (mailID, type) => {

        mailService.markAsSelected(mailID, type).then((PromisePack) => {
            const { selectedMailsCount } = PromisePack
            const mail = PromisePack.markedMail
            if (selectedMailsCount > 0) document.querySelector('.group-editor-mail-list').style.display = 'flex'
            else document.querySelector('.group-editor-mail-list').style.display = 'none'
            this.setState({ mail: mail })
        })
    }



    navigateTo = () => {
        const { mail } = this.state
        mailService.markAsRead(mail.id)
        window.location.href = `index.html#/mail/info/${this.state.mail.id}`
    }

    render() {
        const { mail } = this.state
        const { onRemoveMail } = this.props

        var textWeight = null
        if (mail.isRead) textWeight = '500'
        else textWeight = '600'


        var iconsImg = {
            selected: 'assets/pics/asset 21.png',
            starrad: 'assets/pics/asset 27.png',
            importent: 'assets/pics/asset 28.png'
        }
        // mail-icon delete
        var restoreBtn
        const filterType = mailService.loadFromStorage('filter')
        if (filterType === 'trash') restoreBtn = 'mail-icon delete'
        else restoreBtn = 'hide'

        if (mail.isStarrad) iconsImg.starrad = 'assets/pics/star-colord.png'
        if (mail.isSelected) iconsImg.selected = 'assets/pics/selected-box.png'
        return <article className="email-container flex" >

            <div className="mail-link-icons">
                <img className="mail-icon first filter" onClick={() => this.mark(mail.id, 'selected')} src={iconsImg.selected} />
                <img className="mail-icon filter" onClick={() => this.mark(mail.id, 'starrad')} src={iconsImg.starrad} />
                <img className="mail-icon last filter" onClick={() => this.mark(mail.id, 'important')} src="assets/pics/asset 28.png" />
            </div>
            <h5 className="username" onClick={this.navigateTo} style={{ fontWeight: textWeight }}>{mail.username} </h5>
            <p className="massage" onClick={this.navigateTo} style={{ fontWeight: textWeight }}>{mail.massage}</p>
            <p className="date" onClick={this.navigateTo} style={{ fontWeight: textWeight }}>{mail.date}</p>
            <img className={restoreBtn} onClick={() => onRemoveMail(mail.id, 'restore')} src="assets/pics/asset 20.png" />
            <img className="mail-icon delete " onClick={() => onRemoveMail(mail.id, 'remove')} src="assets/pics/asset 30.png" />
        </article>
    }
}

