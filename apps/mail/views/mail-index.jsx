
import { mailService } from '../services/mail.service.js';
import { MailContainer } from '../cmps/mail-container.jsx';
import { MailSideBar } from '../cmps/side-bar.jsx';
import { AdditionalApp } from '../cmps/additional-app.jsx';
import { MailEditor } from './mail-editor.jsx';
import { MailInfo } from '../cmps/mail-info.jsx';
import { AppHeader } from '../../../js/cmps/app-header.jsx';
import { eventBusService } from '../../../js/services/event-bus.service.js';

const { Link } = ReactRouterDOM
export class MailIndex extends React.Component {
    state = {
        mails: [],
        filterBy: 'all',
        isNewMail: false,
    }

    componentDidMount() {
        if (mailService.loadFromStorage('filter')) {
            const filterBy = mailService.loadFromStorage('filter')
            this.onFilterBy(filterBy)
        }
        else this.loadMails()
    }

    componentDidUpdate() {
        eventBusService.on('s', value => {
            if (value) this.onSearch(value)
            else this.loadMails()
        })


    }

    onSearch = (value) => {
        console.log(value);
        mailService.filterBySearch(value).then(mails => {
            this.setState({ mails })
        })
    }


    loadMails = () => {

        mailService.query(this.state.filterBy)
            .then((mails) => this.setState({ mails }))
    }


    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }

    onNewMail = () => {
        this.setState({ isNewMail: true })
    }

    onFilterBy = (filterBy) => {
        this.state.filterBy = filterBy
        console.log(this.state.filterBy);
        mailService.filterBy(filterBy).then(mails => {
            this.setState(mails = { mails })
        })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    onRemoveMail = (mailId, parameter) => {

        mailService.removeMail(mailId, parameter).then(this.onFilterBy(this.state.filterBy))

    }

    listen = () => {
        var { isNewMail } = this.state
        this.setState({ isNewMail: !isNewMail })

    }


    onAddMail = (ev) => {
        if (ev === 'close') {
            Promise.resolve(this.onFilterBy(this.state.filterBy)).then(this.setState({ isNewMail: false }))
        }
        else {
            ev.preventDefault()
            mailService.addNewMail(ev).then(
                Promise.resolve(this.onFilterBy(this.state.filterBy)).then(this.setState({ isNewMail: false }))
            )
        }
    }

    hideMain = () => {
        this.listen()
    }

    onGroupRemove = () => {
        mailService.groupRemove().then(this.onFilterBy(this.state.filterBy))
    }

    render() {
        var mailDisplay = "flex"
        var editorDisplay = "none"
        const { mails } = this.state
        const { isNewMail } = this.state

        if (isNewMail) mailDisplay = "none"
        else mailDisplay = "flex"

        return <section className="mail-app">
            <AppHeader />
            <div className="flex">

                <MailSideBar mails={mails} onFilterBy={this.onFilterBy} listen={this.listen} />

                <MailContainer mails={mails} onRemoveMail={this.onRemoveMail}
                    hideMain={this.hideMain} onGroupRemove={this.onGroupRemove} />

                {/* <MailInfo mails={mails} /> */}

                <MailEditor onAddMail={this.onAddMail} isNewMail={isNewMail} />

                <AdditionalApp />
                <div className="darken-email"></div>
            </div>
        </section>
    }
}
