import { MailEditor } from "../views/mail-editor"
import { mailService } from "../services/mail.service.js"
import { AppHeader, toogleSideBar } from "../../../js/cmps/app-header.jsx"
const { Link } = ReactRouterDOM

const defaltColor = "rgb(246, 248, 252)"
const selectedBtnColor = 'rgb(211, 227, 253)'
const myMail = "orielgrabli@gmail.com"


export class MailSideBar extends React.Component {

    state = {
        sidebarIcons:
            [{
                imgSrc: 'assets/pics/asset 13.png',
                btnName: "Inbox",
                filterBy: "all",
                color: selectedBtnColor,
                bold: '600',
                count: 0
            },
            {
                imgSrc: 'assets/pics/asset 63.png',
                btnName: "Sent",
                filterBy: "sent",
                color: defaltColor,
                bold: '400',
                count: 0
            },
            {
                imgSrc: 'assets/pics/asset 34.png',
                btnName: "UnRead",
                filterBy: "unread",
                color: defaltColor,
                bold: '400',
                count: 0
            },
            {
                imgSrc: 'assets/pics/asset 31.png',
                btnName: "Read",
                filterBy: "read",
                color: defaltColor,
                bold: '400',
                count: 0
            },
            {
                imgSrc: 'assets/pics/asset 27.png',
                btnName: "Starred",
                filterBy: "starred",
                color: defaltColor,
                bold: '400',
                count: 0
            },
            {
                imgSrc: 'assets/pics/asset 30.png',
                btnName: "Trash",
                filterBy: "trash",
                color: defaltColor,
                bold: '400',
                count: 0
            },
            ]
    }




    componentDidMount() {
        // this.countByFilter()
        if (mailService.loadFromStorage('filter')) {
            const filterBy = mailService.loadFromStorage('filter')
            let { sidebarIcons } = this.state
            sidebarIcons.map(icon => {
                if (icon.filterBy === filterBy) return icon.color = selectedBtnColor
                else return icon.color = defaltColor
            })
            this.setState({ sidebarIcons: sidebarIcons })
        }
    }




    // componentDidUpdate() {
    //     this.countByFilter()
    // }

    countByFilter = () => {
        if (!mailService._loadFromStorage()) return
        let mails = mailService._loadFromStorage()
        let { sidebarIcons } = this.state
        sidebarIcons.map(icon => icon.count = 0)


        mails.map(mail => {
            if (mail.from !== myMail && !mail.isRemoved) sidebarIcons[0].count++
            if (mail.from === myMail && !mail.isRemoved) sidebarIcons[1].count++
            if (!mail.isRead && !mail.isRemoved) sidebarIcons[2].count++
            if (mail.isRead && !mail.isRemoved) sidebarIcons[3].count++
            if (mail.isStarrad && !mail.isRemoved) sidebarIcons[4].count++
            if (mail.isRemoved) sidebarIcons[5].count++
        })
    }

    markSelected = (filterType, iconName) => {
        if (this.props.linkfrom) {
            var { linkfrom } = this.props
            if (linkfrom === 'info') window.location.href = "index.html#/mail"
            mailService.saveToStorage('filter', filterType)
        }

        const { onFilterBy } = this.props
        var { sidebarIcons } = this.state
        sidebarIcons.map(icon => {
            if (icon.btnName === iconName) {
                icon.color = selectedBtnColor
                icon.bold = '600'
            }
            else {
                icon.color = defaltColor
                icon.bold = '400'
            }
        })
        mailService.saveToStorage('filter', filterType)
        onFilterBy(filterType)
        // if (window.innerWidth < 400) document.querySelector('.mail-side-bar').style.display = "none"

    }


    render() {

        this.countByFilter()
        const { onFilterBy } = this.props
        const { sidebarIcons } = this.state
        const { listen } = this.props
        var styleTag = ''

        return <section className="mail-side-bar">
            <div className="side-bar-contect">

                <div className="compose flex">
                    <div className="compose-btn">
                        <img className="mail-icon" src="assets/pics/asset 12.png" />
                        <button className="Compose-Btn-text" onClick={listen}>Compose</button>
                    </div>
                </div>

                <div className="side-bar-padding">
                    {sidebarIcons.map(icon => {
                        return <div className="flex sidebar-icons" style={{ backgroundColor: icon.color }} key={icon.btnName}>
                            <img className="mail-icon" src={icon.imgSrc} />
                            <button className="side-bar-btn" style={{ fontWeight: icon.bold }} onClick={() => this.markSelected(icon.filterBy, icon.btnName)}>{icon.btnName}</button>
                            <p>{icon.count}</p>
                        </div>
                    })}

                </div>
            </div>
        </section>
    }
}

