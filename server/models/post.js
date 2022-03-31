const userModel = require('./user')

let hieghstId = 3;

const list = [
    {
        src: 'https://www.reuters.com/resizer/-BAphy9mKfsDVAwuVfRiriYFgQw=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/VM6BEMA225PJDLN4EZN7WZDEIM.jpg',
        caption: 'Sea e-commerce unit Shopee to shut India operations',
        owner: 1,
        likes: [],
        comments: [],
        isPublic: true,
    },
    {
        src: 'https://www.reuters.com/resizer/-BAphy9mKfsDVAwuVfRiriYFgQw=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/VM6BEMA225PJDLN4EZN7WZDEIM.jpg',
        caption: 'Sea e-commerce unit Shopee to shut India operations',
        owner: 1,
        likes: [],
        comments: [],
        isPublic: true,
    },
    {
        src: 'https://www.reuters.com/resizer/-BAphy9mKfsDVAwuVfRiriYFgQw=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/VM6BEMA225PJDLN4EZN7WZDEIM.jpg',
        caption: 'Sea e-commerce unit Shopee to shut India operations',
        owner: 1,
        likes: [],
        comments: [],
        isPublic: true,
    },
];

function get(id){
    return {...list.find(x=>x.id == parseInt(id)), user: userModel.get(x.owner)};
}

function remove(id){
    const index = list.findIndex(x=>x.id == parseInt(id));
    const post = list.splice(index, 1);
    return {...post[0], user: userModel.get(post[0].owner)};
}

function update(id, updatedPost){
    const index = list.findIndex(x=>x.id == parseInt(id));
    const post = list[index];
    updatedPost = list[index] = {...post, ...updatedPost}
    return {...post[0], user: userModel.get(x.owner)};
}

module.exports = {
    create(user) {
        user.id = ++hieghstId;

        list.push(user);
        return {...user, password:undefined};
    },
    remove,
    update,
    get list(){
        return list.map(u=>({...u, password: undefined}));
    }
}

// module.exports.list = () => list.map(u=>({...u, password: undefined}));
module.exports.get = get;