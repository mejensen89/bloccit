const flairQueries = require('../db/queries.flairs.js');

module.exports = {

	new(req, res, next) {
		res.render('flair/new', {topicId: req.params.topicId, postId: req.params.postId});
	},

	create(req, res, next){
		let newFlair = {
			name: req.body.name,
			color: req.body.color,
			topicId: req.params.topicId,
			postId: req.params.postId,
		};
		flairQueries.addFlair(newFlair, (err, flair)=>{
			if (err) {
				console.log(err)
				res.redirect(500, "flairs/new");
			} else {
				res.redirect(303, `/topics/${newFlair.postId}/flairs/${flair.id}`);
			}
		});
	},

	show(req, res, next) {
		flairQueries.getFlair(req.params.id, (err, flair)=>{
			if (err || flair == null) {
				res.redirect(404, '/')
			} else {
				res.render('flairs/show', {flair});
			}
		});
	},

	destroy(req, res, next) {
		flairQueries.deleteFlair(req.params.id, (err, deletedFlair) =>{
			if (err){
				res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.id}`);
			} else {
				res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.id}`);
			}
		});
	}, 

	edit( req, res, next) {
		flairQueries.getFlair(req.params.id, (err, flair) => {
			if (err || flair == null) {
				res.redirect(404, '/');
			} else {
				res.render('flairs/edit', {flair});
			}
		});
	},

	update (req, res, next) {
		flairQueries.updateFlair(req.params.id, req.body, (err, flair)=>{
			if(err || flair == null){
				res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.postId}/flair/${req.params.id}/edit`)
			} else {
				res.redirect(`/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.id}`);
			}
		});
	},
}