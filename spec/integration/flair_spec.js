const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("routes: flair", ()=> {

	beforeEach((done)=>{
		this.topic;
		this.post;
		this.flair;

		sequelize.sync({force:true}).then((res)=> {

			Topic.create({
				title: "National Parks",
				description: "Which would win in a fight"
			})
			.then((topic)=>{
				this.topic = topic;

				Post.create({
					title: 'YellowStone VS that volcano in hawaii',
					body: 'YellowStone is dormant with potential, but Hawaii is active with flair'
					topicId: this.topic.id,
				})
				.then((post)=>{
					this.post = post;
					flair.create({
						name: 'Fuschia Flair',
						colore: 'Fuschia',
						topicId: this.topic.id,
						postId: this.post.id
					})
					.then((flair)=>{
						this.flair = flair;
						done();
					})
					.catch((err)=>{
						console.log(err);
						done();
					});
				});
			});
		});
	});

	describe("GET /posts/:postId/flair/new", ()=>{

		it("should render a new flair form", (done)=>{
			request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/new`, (err, res, body)=>{
				expect(err).toBeNull();
				expect(body).toContain('New Flair');
				done();
			});
		});
	});

	
})