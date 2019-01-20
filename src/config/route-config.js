module.exports = {
	init(app){


		const staticRoutes = require("../routes/static");
		const topicRoutes = require("../routes/topics");
		const flairRoutes = require("../routes/flairs");
		const postRoutes = require("../routes/posts")

		app.use(staticRoutes);
		app.use(topicRoutes);
		app.use(flairRoutes);
		app.use(postRoutes);
	}
}