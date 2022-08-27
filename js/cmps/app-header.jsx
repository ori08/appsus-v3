import { eventBusService } from "../services/event-bus.service.js";
const { Link, NavLink, withRouter } = ReactRouterDOM
var sidebarMode = false
export function AppHeader() {

    function toggleBento() {
        const grid = document.querySelector('.grid')
        if (grid.style.display == 'none')
            grid.style.display = 'grid'
        else
            grid.style.display = 'none'
    }


    return <header className="app-header">

        <div className="logo-conatiner flex">
            <div className="flex">
                <img className="burger-icon" onClick={() => toogleSideBar()} src="assets/pics/asset 73.svg" />
                <h1 className="logo">AppsUs</h1>
            </div>

            <nav class="nav-hide">
                <div className="apps-modal grid flex align-center" style={{ display: 'none' }}>
                    <i class="fa-solid fa-book bento-icon" title="Books"></i>
                    <NavLink className="note-nav" to="/mail"><i class="fa-solid fa-at bento-icon" title="Email">
                    </i></NavLink>
                    <NavLink className="note-nav" to="/notes"><i class="fa-solid fa-note-sticky bento-icon" title="Keep">
                    </i></NavLink>

                    <NavLink className="note-nav" exact to="/"><i class="fa-solid fa-house bento-icon" title="Home">
                    </i></NavLink>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="blank"><i class="fa-brands fa-trello bento-icon" title="Trello"></i></a>
                </div>
                <img className="apps-icons" src="/assets/img/icons/appss.svg" alt="" onClick={toggleBento} />
            </nav>


        </div>



        <input className="email-search-input" onChange={() => onSearch(event)} type="text" placeholder="🔍 Search in mail" />

        <nav class="nav">
            <nav className="flex">
                <p onClick={() => navigateTo('')}>Home</p>
                <p onClick={() => navigateTo('mail')}>Mail</p>
                <p onClick={() => navigateTo('notes')}>Notes</p>
            </nav>
        </nav>


        <div className="addion-app"></div>
    </header>
}


function navigateTo(location) {
    window.location.href = `index.html#/${location}`
    sidebarMode = false
}

function onSearch(ev) {
    var value = ev.target.value
    eventBusService.emit('s', value)
}

function toogleSideBar() {
    var location = window.location.href
    var idx = location.indexOf('index.html')
    var currLocation = location.substring(idx, location.length)

    console.log("sidebar :" + sidebarMode + " " + window.innerWidth);

    if (!sidebarMode) {
        if (currLocation === 'index.html#/mail') {
            document.querySelector('.mail-list-container ').style.display = "none"
            document.querySelector('.mail-side-bar').style.display = "flex"
        }
        else {
            document.querySelector('.mail-info-container').style.display = "none"
            document.querySelector('.mail-side-bar').style.display = "flex"
        }
    }
    else {
        if (currLocation === 'index.html#/mail') {
            document.querySelector('.mail-list-container ').style.display = "flex"
            document.querySelector('.mail-side-bar').style.display = "none"
        }
        else {
            document.querySelector('.mail-info-container').style.display = "flex"
            document.querySelector('.mail-side-bar').style.display = "none"
        }
    }
    sidebarMode = !sidebarMode
}


{/* <div className="nav">
            <p onClick={() => navigateTo('')}>Home</p>
            <p onClick={() => navigateTo('about')} >About</p>
            <p onClick={() => navigateTo('mail')}>Mail</p>
            <p onClick={() => navigateTo('notes')}>Notes</p>
        </div> */}