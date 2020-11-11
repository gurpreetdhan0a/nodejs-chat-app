const users =[];

function userJoin(id,username){
    const user = {id, username}
    users.push(user);
    return users;
}

function getUser(id){
   return users.find(user=> user.id === id)
}

function userLeave(id){
    const index = users.findIndex(user=>user.id===id);

    if(index!==-1){
        return users.splice(index, 1)[0]
    }
}
module.exports = {
    userJoin,
    getUser,
    users, 
    userLeave
};
