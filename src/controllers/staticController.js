module.exports = {
	index(req, res, next){
		res.render("static/index", {title: "Welcome to Bloccit"});
	},

	//Assignment - controller for about router
	about (req, res, next){
		res.render('static/about', {title: "About Bloccit"});
	}
}