const userModel = require('./user');

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

const includeUser = post => ({ ...post, user: userModel.get(post.owner) });

function get(id){
    const post = list.find(x => x.id === parseInt(id));
    if(!post){
        throw { status: 404, message: 'Post not found' };
    }
    return includeUser(post) ;
}

function remove(id){
    const index = list.findIndex(x => x.id === parseInt(id));
    const post = list.splice(index,1);
    
    return includeUser(post[0]);
}

function update(id, newPost){
    const index = list.findIndex(x => x.id === parseInt(id));
    const oldPost = list[index];

    newPost = list[index] = { ...oldPost, ...newPost };

    //console.log(list);
    
    return includeUser(newPost);
}

module.exports = {
    create(post) {
        post.id = ++hieghstId;

        list.push(post);
        return  includeUser(post);
    },
    remove,
    update,
    get list(){
        return list.map(x=> includeUser(x) );
    }
}
module.exports.get = get;