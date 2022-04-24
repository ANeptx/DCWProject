const bcrypt = require('bcrypt')

let users = {
    users: [
        { id: 1, username: '6135512056', password: '$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO', email: 's6135512056@phuket.psu.ac.th' },
        { id: 2, username: 'john', password: '$2b$10$1Bu4tImM/Ms9rtU.8/n/COWpzUAGFB6YlsO5xZqFih1JUxafyFFXa', email: 'john@gmail.com' },
    ]
}

let lists = {
    lists: [
        { id: 1, name: "Spy x Family", author: "Tatsuya Endo", release: "10/04/2022", episode: 2.5 }
    ]
}

const SECRET = 'your_jwt_secret'
const NOT_FOUND = -1
exports.users = users 
exports.lists = lists
exports.SECRET = SECRET
exports.NOT_FOUND = NOT_FOUND

exports.setLists = function(_lists) {
    lists = _lists;
}

exports.setUsers = function(_users) { 
  users = _users;
}

// === validate username/password ===
exports.isValidUser = async (username, password) => { 
    const index = users.users.findIndex(item => item.username === username) 
    return await bcrypt.compare(password, users.users[index].password)
}

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
    return users.users.findIndex(item => item.username === username)
}