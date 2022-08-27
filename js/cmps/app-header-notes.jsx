import { eventBusService } from "../services/event-bus.service.js";
const { Link, NavLink, withRouter } = ReactRouterDOM

export function AppHeader() {

    function toggleBento() {
        const grid = document.querySelector('.grid')
        if (grid.style.display == 'none')
            grid.style.display = 'grid'
        else
            grid.style.display = 'none'
    }
    return <header className="app-header-notes">
        <Link to="/">
            <div className="flex">
                <h1 className=" note-logo">AppsUs</h1>
            </div>
        </Link>
        <nav>
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
    </header>
}

{/* <NavLink exact to="/">Home</NavLink>
<NavLink to="/about">About</NavLink>
<NavLink to="/mail">Mail</NavLink>
<NavLink to="/notes">Notes</NavLink> */}
function navigateTo(location) {
    console.log("l");
    window.location.href = `index.html#/${location}`
}

function onSearch(ev) {
    var value = ev.target.value
    eventBusService.emit('s', value)
}

