import { utilService } from '../../../js/services/util.service.js'
import { databaseMails } from './database-email.js'
export const mailService = {
    getById,
    query,
    getVendors,
    save,
    _loadFromStorage,
    saveToStorage,
    addNewMail,
    filterBy,
    markAsSelected,
    removeMail,
    loadFromStorage,
    filterBySearch,
    markAsRead,
    groupRemove
}

const KEY = 'mailsDB'
const myMail = "orielgrabli@gmail.com"



const defaultMails = {
    admin: {
        id: utilService.makeId(),
        from: 'Admin@gmail.com',
        username: 'Admin',
        subject: 'Welcome',
        massage: 'Im so glad you decide to try out MailBaba \n here few tips to get you up and running fast',
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    supportTeam: {
        id: utilService.makeId(),
        from: 'Support@gmail.com',
        username: 'Support Team:',
        subject: 'support',
        massage: 'Hi, Dani from MailBaba support team \n Thanks for chosen MailBaba \n Im here for any technical problem. \n U are welcome',
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    Spam: {
        id: utilService.makeId(),
        from: 'market@gmail.com',
        username: 'Spam',
        subject: 'Package from California',
        massage: ' Your package is pending: \n, we came across a package from a recent month pending for you',
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    }
}

// const database = databaseMails

function getCurrDate() {
    const date = new Date().toISOString().substring(0, 10).split('-');
    const dateFormat = `${date[2]}.${date[1]}.${date[0]}`
    return dateFormat
}

var gVendors = ['education', 'roman', 'music', 'philosophy', 'crime']

function query(filterBy) {

    let mails = _loadFromStorage()
    let mailsToDisplay = []
    if (!mails) {
        mails = _createMails()
        _saveToStorage(mails)
    }
    mails.map(mail => {
        if (!mail.isRemoved && mail.from !== myMail) mailsToDisplay.push(mail)
    })
    return Promise.resolve(mailsToDisplay)
}

function getById(mailId) {
    if (!mailId) return Promise.resolve(null)
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}


function filterBy(filterBy) {
    let mails = _loadFromStorage()
    var filterMails = []

    switch (filterBy) {
        case 'sent': {
            mails.map(mail => {
                if (mail.from === myMail && !mail.isRemoved) filterMails.push(mail)
            })
            return Promise.resolve(filterMails)
        }
            break
        case 'all': {
            mails.map(mail => {
                if (!mail.isRemoved && mail.from !== myMail) filterMails.push(mail)
            })
            return Promise.resolve(filterMails)

        }
            break
        case 'starred': {
            mails.map(mail => {
                if (mail.isStarrad && !mail.isRemoved) filterMails.push(mail)
            })
            return Promise.resolve(filterMails)
        }
            break
        case 'read': {
            mails.map(mail => {
                if (mail.isRead && !mail.isRemoved) filterMails.push(mail)
            })
            return Promise.resolve(filterMails)
        }
            break
        case 'unread': {
            mails.map(mail => {
                if (!mail.isRead && !mail.isRemoved) filterMails.push(mail)
            })
            return Promise.resolve(filterMails)
        }
            break
        case 'trash': {
            mails.map(mail => {
                if (mail.isRemoved) filterMails.push(mail)
            })
            return Promise.resolve(filterMails)
        }
            break
    }
}

function remove(mailId) {
    let mails = _loadFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(mails)
    return Promise.resolve()
}

function save(mail) {
    if (mail.id) return _update(mail)
    else return _add(mail)
}

function _update(mailToUpdate) {
    let mails = _loadFromStorage()
    mails = mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)
    _saveToStorage(mails)
    return Promise.resolve(mailToUpdate)
}

function getVendors() {
    return gVendors
}

function _createMail(username, subject, massage) {
    var mail = {
        id: utilService.makeId(),
        from: myMail,
        username,
        massage,
        subject,
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    }

    return mail
}

function markAsRead(mailId) {
    let mails = _loadFromStorage()
    mails.map(mail => {
        if (mail.id === mailId) mail.isRead = true
    })
    _saveToStorage(mails)
    return
}

function _createMails() {
    const mails = []

    for (let i = 0; i < databaseMails.length; i++) {
        mails.push(databaseMails[i])

    }
    saveToStorage('filter', 'all')
    return mails
}

function addNewMail(ev) {
    ev.preventDefault()
    let mails = _loadFromStorage()
    const username = ev.target[0].value
    const subject = ev.target[1].value
    const massage = ev.target[2].value
    const mail = _createMail(username, subject, massage)
    mails.unshift(mail)
    _saveToStorage(mails)
    return Promise.resolve()
}

function filterBySearch(value) {
    var lowercase = value.charAt(0).toLowerCase() + value.substring(1, value.length)

    let mails = _loadFromStorage()
    let mailsToDisplay = []
    mails.map(mail => {
        const txt = value.toLowerCase()
        const messege = mail.massage.toLowerCase()
        const subject = mail.subject.toLowerCase()
        const email = mail.from.toLowerCase()
        if (messege.includes(txt) || subject.includes(txt) || email.includes(txt)) mailsToDisplay.push(mail)
    })
    return Promise.resolve(mailsToDisplay)

}

function markAsSelected(mailId, type) {
    let mails = _loadFromStorage()
    let markedMail = null
    let selectedMailsCount = 0
    switch (type) {
        case 'starrad': {
            mails.map(mail => {
                if (mail.id === mailId) {
                    if (mail.isStarrad) mail.isStarrad = false
                    else mail.isStarrad = true
                    markedMail = mail
                }
            })
        }
            break
        case 'selected': {
            mails.map(mail => {
                if (mail.isSelected) selectedMailsCount++
                if (mail.id === mailId) {
                    if (mail.isSelected) {
                        mail.isSelected = false
                        selectedMailsCount--
                    }
                    else {
                        mail.isSelected = true
                        selectedMailsCount++
                    }
                    markedMail = mail
                }
            })
        }
            break
        case 'importent': {
            mails.map(mail => {
                if (mail.id === mailId) {
                    if (mail.isImportant) mail.isImportant = false
                    else mail.isImportant = true
                    markedMail = mail
                }
            })
        }
            break
    }
    let promisePack = {
        markedMail,
        selectedMailsCount
    }
    _saveToStorage(mails)
    return Promise.resolve(promisePack)
}

function removeMail(mailId, parameter) {
    let mails = _loadFromStorage()
    var isRemoved
    var isRestored
    mails.map(mail => {
        if (mail.id === mailId && parameter === 'restore') {
            mail.isRemoved = false
            isRestored = true
        }
        if (isRestored) return
        else if (mail.id === mailId && !mail.isRemoved) isRemoved = false
        else if (mail.id === mailId && mail.isRemoved) isRemoved = true
    })
    if (isRestored) {
        _saveToStorage(mails)
        return Promise.resolve(mails)
    }
    else {
        if (!isRemoved) {
            mails.map(mail => {
                if (mail.id === mailId) return mail.isRemoved = true
            })
            _saveToStorage(mails)
            return Promise.resolve(mails)
        }
        else {
            mails = mails.filter(mail => mail.id !== mailId)
            _saveToStorage(mails)
            return Promise.resolve()
        }
    }
}

function groupRemove() {
    let mails = _loadFromStorage()
    mails.map(mail => {
        if (mail.isSelected) mail.isRemoved = true
    })
    _saveToStorage(mails)
    return Promise.resolve()
}

function _saveToStorage(mails) {
    saveToStorage(KEY, mails)
}

function _loadFromStorage() {
    return loadFromStorage(KEY)
}


function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}