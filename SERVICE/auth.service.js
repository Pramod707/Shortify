const sessionIdToUserMap = new Map();

function setUser(user,id){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
    sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}