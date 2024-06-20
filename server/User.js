const users = [];
const addUser = ({id,name,room}) =>{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const exsitingUser = users.find((user)=> user.room === room && user.name ===name);
    if(exsitingUser){
        return {
            error: 'Username Not Available....'
        }
    }
    const user = {id,name,room};
    users.push(user);
    return {user};
}

const removeUser = (id)=> {
    const index = users.findIndex((user)=> user.id === id);
    if(index !==-1){
        return users.splice(index,1)[0];
    }
    else{
        return{error: 'User Not Found'}
    }
}

const getUser = (id)=>{
    return users.find((user)=> user.id === id);
}

getUserInRoom = (room) =>{
    return users.filter((user)=> user.room === room);
}

module.exports = {addUser, removeUser, getUser, getUserInRoom};