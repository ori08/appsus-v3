import { AppHeader } from "./js/cmps/app-header.jsx"
import { About } from "./js/views/about.jsx"
import { Home } from "./js/views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailInfo } from "./apps/mail/cmps/mail-info.jsx"
import { CreateNote } from "./apps/note/cmps/note-create.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            {/* <AppHeader /> */}

            <Switch>
                <Route path="/mail/info/:mailId?" component={MailInfo} />
                <Route path="/mail" component={MailIndex} />
                <Route path="/notes" component={NoteIndex} />
                <Route path="/notes/edit" component={CreateNote} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
