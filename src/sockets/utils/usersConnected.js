const users = []

const addUser = (id, username) =>{
    username = username.trim()
    if (!username) {
        return {
            error: 'Username is required!'
        }
    }

    const user = {id, username}
    users.push(user)
    return { user }
}

const removeUser = (id) =>{
    const index = users.findIndex((user)=>user.id === id)
    
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id)=>{
    return users.find((user)=>user.id===id)
}

const getOnlineUsers = (id)=>{
    return users.filter((user)=>user.id!==id)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getOnlineUsers
}