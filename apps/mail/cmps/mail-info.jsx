
import { mailService } from '../services/mail.service.js';
import { MailSideBar } from './side-bar.jsx';
import { AdditionalApp } from '../cmps/additional-app.jsx';
import { AppHeader } from '../../../js/cmps/app-header.jsx';


export class MailInfo extends React.Component {

    state = {
        mail: null,
        ShowUp: false
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getById(mailId)
            .then(mail => {
                console.log(mail);
                this.setState(mail = { mail })
            })
    }


    render() {
        const { mail } = this.state
        if (!mail) return

        var linkFrom = 'info'
        // var classs = null
        // if (window.innerWidth < 450) classs = 'mail-side-bar'
        // else classs = "hide"
        console.log(document.querySelector('.mail-info'));
        if (window.innerWidth > 450) {
            if (document.querySelector('.mail-info-container')) document.querySelector('.mail-info-container').style.display = 'flex'
        }

        return <section >
            <AppHeader />
            {(window.innerWidth < 450) && <MailSideBar linkfrom={linkFrom} />}
            <div className="mail-info  ">
                {<div className="mail-side-bar">
                    <MailSideBar linkfrom={linkFrom} />
                </div>}

                <div className="mail-info-container">


                    <div className="padding-mail-info">
                        <h1>Sent From: {mail.username} </h1>
                        <h4>Subject: {mail.subject}</h4>
                        <p>{mail.massage}</p>
                    </div>

                    {/* <button onClick={() => this.toogleReply()}>reply</button> */}
                </div>
                {/* <ReplyEditor /> */}
                {/* <div className="additional-app">
                    <AdditionalApp />
                </div> */}
                {/* </div> */}

            </div>
        </section >
    }
}



function replyEditor() {



}