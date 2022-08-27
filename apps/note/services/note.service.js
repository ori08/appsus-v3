import { utilService } from "../../../js/services/util.service.js"

const KEY = 'notesDB'
let notes = []

export const noteService = {
    query,
    getById,
    addNote,
    removeNote,
    colorPicker,
    editNote,
    _loadFromStorage
}

function query(filterBy) {
    notes = _loadFromStorage()
    if (!notes) {
        notes = _createNotes()
        _saveToStorage(notes)
    }

    if (filterBy) {
        let filteredNotes = notes.filter(note => note.type === filterBy)
        return Promise.resolve(filteredNotes)
    }

    return Promise.resolve(notes)
}

function _createNote(title, txt, url = null, yt = null, backgroundColor = 'transparent', type = 'text') {
    if (url)
        type = 'img'
    if (yt)
        type = 'yt'
    return {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info: {
            title,
            txt,
            url,
            yt,
        },
        style: {
            backgroundColor
        },
        todos: []
    }
}

function editNote(noteId, title, txt, url, yt) {
    let notes = _loadFromStorage()

    notes.map(note => {
        if (note.id === noteId) {
            if (title) note.info.title = title
            if (txt) note.info.txt = txt
            if (url) {
                note.type = 'img'
                note.info.url = url
            }
            if (yt) {
                if (yt.includes('youtube')) {
                    note.type = 'yt'
                    const embed = yt.split('=')
                    note.info.yt = 'https://www.youtube.com/embed/' + embed[1]
                }
            }
        }
    })
    _saveToStorage(notes)
    let selectedNote
    notes.map(note => {
        if (note.id === noteId) selectedNote = note
    })
    return Promise.resolve(selectedNote)
}

function colorPicker(noteId, color) {
    let notes = _loadFromStorage()
    var selectedNote = null
    notes.map(note => {
        if (note.id === noteId) {
            selectedNote = note
            return note.style.backgroundColor = color
        }
    })
    _saveToStorage(notes)
    return Promise.resolve(selectedNote)
}

function _createNotes() {
    const notes = []
    for (let i = 0; i < expNotes.length; i++) {
        notes.push(expNotes[i])
    }
    return notes
}

function getById(noteId) {
    if (!noteId) return Promise.resolve(null)
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}

function addNote(ev) {
    ev.preventDefault()

    const note = []
    const noteTest = []
    let name
    let value



    console.log(ev)
    // for (var i = 0; i < ev.target.length - 1; i++) {
    //     console.log('Target:' + i, ev.target[i].value)
    // }
    // for (var i = 0; i < ev.target.length - 1; i++) {
    //     {
    //         if (ev.target[i].value.includes('youtube')) {
    //             const embed = ev.target[i].value.split('=')
    //             note.push(embed[1])
    //         }
    //         if (ev.target[i].value !== '') {
    //             name = ev.target[i].name
    //             value = ev.target[i].value
    //             console.log('THIS IS THE TEST: ', { [name]: value })
    //             note.push(value)
    //             noteTest.push({ [name]: value })
    //         }

    //     }
    // }

    let title = ev.target[0].value ? ev.target[0].value : null
    let txt = ev.target[1].value ? ev.target[1].value : null
    let url = ev.target[2].value ? ev.target[2].value : null
    let yt = ev.target[3].value ? ev.target[3].value : null
    if (ev.target[3].value.includes('youtube')) {
        const embed = ev.target[3].value.split('=')
        yt = 'https://www.youtube.com/embed/' + embed[1]
    }

    notes.push(_createNote(title, txt, url, yt))

    saveToStorage(KEY, notes)
    return Promise.resolve()

    // const value = ev.target.value
    // const mail = _createMail(username, subject, massage)
    // mails.unshift(mail)
    // _saveToStorage(mails)
    // return Promise.resolve(mails)
}

function removeNote(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)

    return Promise.resolve()
}

function _saveToStorage(notes) {
    saveToStorage(KEY, notes)
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function _loadFromStorage() {
    return loadFromStorage(KEY)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

const expNotes = [
    {
        id: utilService.makeId(),
        type: "text",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Code4Life👨‍💻👨‍💻👨‍💻"
        },
        style: {
            backgroundColor: "lavender"
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        info: {
            url: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DD91/production/_125912765_nasas-webb-reveals-cosmic-cliffs-glittering-landscape-of-star-birth_52211883534_o.png",
            txt: 'Space is so cool',
            title: "SPACE"
        },
        style: {
            backgroundColor: "orange"
        }
    },

    {
        id: utilService.makeId(),
        type: "text",
        info: {
            txt: "Driving liscence",
            title: "My Info",
        },
        style: {
            backgroundColor: "grey"
        }
    },
    {
        id: utilService.makeId(),
        type: "text",
        info: {
            title: 'To buy',
            txt: 'milk, bread, flour, ice cream?\n',
            url: null,
            yt: null
        },
        isPinned: false,
        style: {
            backgroundColor: 'lightblue'
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        info: {
            title: '"Damn"',
            txt: null,
            url: "https://i.guim.co.uk/img/media/2660674fa67d85b657ad9f725f9e6edaf07b69d3/0_45_650_390/master/650.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=9f79f147254143c941d074c91bed6ede",
            yt: null
        },
        isPinned: false,
        style: {
            backgroundColor: 'lightblue'
        }
    }
    ,
    {
        id: utilService.makeId(),
        type: "img",
        info: {
            title: null,
            txt: null,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSomOoFyHqGjnAL8lrcASOzntwO_YX5mUnkSQ&usqp=CAU",
            yt: null
        },
        isPinned: false,
        style: {
            backgroundColor: 'orange'
        }
    }
    ,
    {
        id: utilService.makeId(),
        type: "yt",
        info: {
            title: null,
            txt: null,
            url: null,
            yt: "https://www.youtube.com/embed/F5tSoaJ93ac"
        },
        isPinned: false,
        style: {
            backgroundColor: 'transparent'
        }
    }
    ,
    {
        id: utilService.makeId(),
        type: "text",
        info: {
            title: "Dont forget!!!",
            txt: "i think i forgot...",
            url: null,
            yt: null
        },
        isPinned: false,
        style: {
            backgroundColor: 'transparent'
        }
    }
    ,
    {
        id: utilService.makeId(),
        type: "img",
        info: {
            title: "🌌🌌🌌🌌",
            txt: "🛰🛰",
            url: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2013/05/ring_nebula/12827475-1-eng-GB/Ring_Nebula_pillars.jpg",
            yt: null
        },
        isPinned: false,
        style: {
            backgroundColor: 'yellow'
        }
    }
    ,
    {
        id: utilService.makeId(),
        type: "img",
        info: {
            title: null,
            txt: null,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSflV_XHV1azkLR0Th-B5K8NFToyIk5u_zBHA&usqp=CAU",
            yt: null
        },
        isPinned: false,
        style: {
            backgroundColor: 'purple'
        }
    },
    {
        id: utilService.makeId(),
        type: "img",
        info: {
            title: null,
            txt: null,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSflV_XHV1azkLR0Th-B5K8NFToyIk5u_zBHA&usqp=CAU",
            yt: null
        },
        isPinned: false,
        style: {
            backgroundColor: 'purple'
        }
    },
    {
        id: utilService.makeId(),
        type: "yt",
        info: {
            title: "💫",
            txt: null,
            url: null,
            yt: "https://www.youtube.com/embed/BAH2EX1fpGY"
        },
        isPinned: false,
        style: {
            backgroundColor: 'lightgreen'
        }
    },
    {
        id: utilService.makeId(),
        type: "yt",
        info: {
            title: "💜💜💜👆",
            txt: null,
            url: null,
            yt: "https://www.youtube.com/embed/1tk1pqwrOys"
        },
        isPinned: false,
        style: {
            backgroundColor: 'transparent'
        }
    },
    {
        id: utilService.makeId(),
        type: "yt",
        info: {
            title: "React Sux💀💀💀",
            txt: null,
            url: null,
            yt: "https://www.youtube.com/embed/HyWYpM_S-2c"
        },
        isPinned: false,
        style: {
            backgroundColor: 'grey'
        }
    },
    {
        id: utilService.makeId(),
        type: "text",
        info: {
            title: "Password",
            txt: "1234567",
            url: null,
            yt: null
        },
        isPinned: false,
        style: {
            backgroundColor: 'transparent'
        }
    }
]

