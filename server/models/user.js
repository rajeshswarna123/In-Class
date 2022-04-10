const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let hieghstId = 3;

const list = [
    {
        firstName: 'John',
        lastName: 'Doe',
        handle: 'johndoe',
        password: 'password',
        email: 'jhon@doe.com',
        pic: 'https://randomuser.me/api/portraits/men/1.jpg',
        id: 1,
    },
    {
        firstName: 'Vladimir',
        lastName: 'Putin',
        handle: 'russian_dictator',
        password: 'long table',
        email: 'jhon@doe.com',
        pic: 'https://randomuser.me/api/portraits/men/2.jpg',
        id: 2,
    },
    {
        firstName: 'Kamala',
        lastName: 'Harris',
        handle: 'vp',
        password: 'password',
        email: 'kamala@whitehouse.org',
        pic: 'https://randomuser.me/api/portraits/women/3.jpg',
        id: 3,
    },
];

function get(id){
    return {...list.find(u=>u.id == parseInt(id)), password: undefined};
}

function remove(id){
    const index = list.findIndex(u=>u.id == parseInt(id));
    const user = list.splice(index, 1);
    return {...user[0], password: undefined};
}

async function update(id, updatedUser){
    const index = list.findIndex(u=>u.id == parseInt(id));
    const user = list[index];
    
    updatedUser = list[index] = {...user, ...updatedUser}
    return {...user[0], password: undefined};
}

async function login(email, password){
    const user = list.find(u=>u.email == email);

    if(!user) 
        throw {status: 404, message: "User not found"};

    if(!await bcrypt.compare(password, user.password))
        throw {status: 401, message: "Invalid password"};

    const data = {...user, password: undefined};
    console.log(data);
    console.log("------------------------------------");
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(data, process.env.JWT_SECRET);

    return {...data, token};
}

function fromToken(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err) 
                reject(err);
            else
                resolve(decoded);
        });
    });
}

module.exports = {
    async create(user) {
        user.id = ++hieghstId;

        user.password = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS);  

        list.push(user);
        return {...user, password:undefined};
    },
    remove,
    update,
    login,
    fromToken,
    get list(){
        return list.map(u=>({...u, password: undefined}));
    }
}

// module.exports.list = () => list.map(u=>({...u, password: undefined}));
module.exports.get = get;