const { db, ObjectId } = require('./mongo');
const userModel = require('./user');

const collection = db.db("postCluster").collection('posts');

let hieghstId = 3;

const list = [
    {
        src: 'https://www.reuters.com/resizer/-BAphy9mKfsDVAwuVfRiriYFgQw=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/VM6BEMA225PJDLN4EZN7WZDEIM.jpg',
        caption: 'Sea e-commerce unit Shopee to shut India operations',
        owner: "vp",
        likes: [],
        comments: [],
        isPublic: true,
    },
    {
        src: 'https://www.reuters.com/resizer/-BAphy9mKfsDVAwuVfRiriYFgQw=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/VM6BEMA225PJDLN4EZN7WZDEIM.jpg',
        caption: 'Sea e-commerce unit Shopee to shut India operations',
        owner: "vp",
        likes: [],
        comments: [],
        isPublic: true,
    },
    {
        src: 'https://www.reuters.com/resizer/-BAphy9mKfsDVAwuVfRiriYFgQw=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/VM6BEMA225PJDLN4EZN7WZDEIM.jpg',
        caption: 'Sea e-commerce unit Shopee to shut India operations',
        owner: "johndoe",
        likes: [],
        comments: [],
        isPublic: true,
    },
];

const includeUser = async post => ({ ...post, user: await userModel.get(post.owner) });

async function get(id){
    const post = await collection.findOne({ _id: ObjectId(id) });
    if(!post){
        throw { status: 404, message: 'Post not found' };
    }
    return includeUser(post) ;
}

async function remove(id){
    const post = await collection.findOneAndDelete({ _id: ObjectId(id) });
    
    return includeUser(post.value);
}

async function update(id, newPost){
    newPost= await collection.findOneAndUpdate(
        { _id: ObjectId(id) }, 
        { $set: newPost }, 
        {returnDocument: "after"}
    );

    //console.log(list);
    
    return includeUser(newPost.value);
}

module.exports = {
    async create(post) {
        post.id = ++hieghstId;

        const result = await collection.insertOne(post);
        post = await get(result.insertedId);

        return  includeUser(post);
    },
    remove,
    update,
    async getList(){
        const posts = await collection.find({}).toArray();
        return Promise.all(posts.map(async x=> await includeUser(x)));
    }
}
module.exports.get = get;