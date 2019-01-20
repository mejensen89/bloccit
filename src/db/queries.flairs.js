const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Flair = require("./models").Flair;

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

    getFlair(id, callback) {
    	return Flair.findById(id)
    	.then((flair)=>{
    		callback (null,flair);
    	})
    	.catch((err)=>{
    		callback(err);
    	});
    },

    deleteFlair( id, callback){
    	return flair.destroy({
    		where: { id },

    	})
    	.then((deletedFlair) => {
    		callback(null, deletedFlair);
    	})
    	.catch((err)=>{
    		callback(err);
    	});
    },

    updateFlair( id, updatedFlair, callback) {
    	return flair.findById(id).then((flair)=>{
    		if (!flair) {
    			return callback('Flair not found');
    		}
    		flair.update(updatedFlair, {
    			fields: Object.keys(updatedFlair),
    		})
    		.then(()=>{
    			callback(null, flair);
    		})
    		.catch((err)=>{
    			callback(err);
    		});
    	});
    }

    
}