const Post = require("./models").Post;
const Topic = require("./models").Topic;

module.exports = {

    addFlair(newFlair, callback){
        return flair.create(newFlair)
        .then((flair)=>{
            callback(null, flair);
        })
        .catch((err)=>{
            callback(err);
        })
    },

    
}