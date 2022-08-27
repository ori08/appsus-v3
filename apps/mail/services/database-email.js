

const myMail = "orielgrabli@gmail.com"
const me = "Ori Elgarbli"
export const databaseMails =
    [{
        id: makeId(),
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
    {
        id: makeId(),
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
    {
        id: makeId(),
        from: 'market@gmail.com',
        username: 'Spam',
        subject: 'Package from California',
        massage: ' Your package is pending: \n, we came across a package from a recent month pending for you',
        pics: [],
        isRead: false,
        isStarrad: true,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    {
        id: makeId(),
        from: 'reply@dropbox.com',
        username: 'Dropbox',
        subject: 'Shared folders',
        massage: `Activity in Shared Folders

        Here's what happened in your shared folders last week
        
        Follow specific folders and get focused updates

        Follow folders to get more detailed insights, reported instantly or once per day.
        
        Choose a folder to follow

        Don’t want these weekly digests? Unsubscribe

        1800 Owens St, San Francisco, CA 94158 © 2022 Dropbox`,
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    {
        id: makeId(),
        from: 'security@instagram.com',
        username: 'Instagram',
        subject: 'New login to Instagram',
        massage: ` 
        We noticed a new login, orielgrabli
         
        We noticed a login from a device you don't usually use.
        
        If this was you, you can safely disregard this email.
        
        If this wasn't you, you can secure your account here.
 
        Learn more about keeping your account secure

        `,
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    {
        id: makeId(),
        from: 'service@paypal.co.il ',
        username: 'Paypal',
        subject: 'Receipt for Your Payment',
        massage: `Issues with this transaction? \n
    You have 180 days from the date of the transaction to open a dispute in the Resolution Center.\nLearn about Buyer Protection`,
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    {
        id: makeId(),
        from: myMail,
        username: me,
        subject: 'Business',
        massage: `I am emailing you today to let you know I have written the post [add title of the post + link]. I think you will find it useful`,
        pics: [],
        isRead: false,
        isStarrad: true,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    {
        id: makeId(),
        from: myMail,
        username: me,
        subject: 'New project ',
        massage: `Hi there ,I’m emailing you today to let you know we have created a new project called appsus.

        In this app, you’ll learn how to create mails.
        
        If you know anybody else who’ll find this useful, please forward the email to them.
        
        Let us know if you face any problems accessing the appsus by replying to this email. 
        
        We’ll get back to you ASAP and ensure you gain access to it immediately.
        
        Thank you,`,
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    {
        id: makeId(),
        from: myMail,
        username: me,
        subject: 'AppSus',
        massage: `Hi 

        I hope you’re having a wonderful day!
        
        I am emailing you today to let you know we have opened doors to our AppSus.
        
        It helps you .
        
        Make sure you buy it before Agust.
        
        If you have any questions about the product, please respond to this email or use the live chat on the product page. Our staff is waiting to respond to you.
        
        Thank you,`,
        pics: [],
        isRead: false,
        isStarrad: false,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    {
        id: makeId(),
        from: myMail,
        username: me,
        subject: 'Could you please help me out?',
        massage: `Hi,

        I just read your post [add post title]. 
        
        It’s both well written and useful. I especially like how you.
        
        I am emailing you today to let you know I have written the post.
        
        I think you will find it useful, as it is relevant to your post on .
        
        Could you take a quick peek at it and let me know what you think?
        
        Enjoy!`,
        pics: [],
        isRead: false,
        isStarrad: true,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    },
    {
        id: makeId(),
        from: 'contact@mix.com',
        username: 'Mix with the Masters',
        subject: `New Paris Masterclass with Andrew Scheps!`,
        massage: `Hi !
        Join Andrew Scheps in Paris for a special one-day Masterclass on music mixing on September 20th!
        Andrew revolutionized the sound of modern rock and pop with his signature approach to compression and saturation. 
        The Grammy award-winning engineer has collaborated with dozens of era-defining artists including Micheal Jackson, 
        Metallica, Red Hot Chili Pepper, Adele, Jay-Z and many more.`,
        pics: [],
        isRead: false,
        isStarrad: true,
        isImportant: false,
        isRemoved: false,
        isSelected: false,
        date: getCurrDate()
    }
    ]



function getCurrDate() {
    const date = new Date().toISOString().substring(0, 10).split('-');
    const dateFormat = `${date[2]}.${date[1]}.${date[0]}`
    return dateFormat
}


function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}