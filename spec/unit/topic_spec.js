const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", ()=>{

	beforeEach((done) => {
		this.post;
		this.topic;

		sequelize.sync({force: true}).then((res) =>{
			Topic.create({
				title: 'Byzantine family trees',
				description: 'They happened. Lets not justify it.'
			})
			.then((topic)=>{
				this.topic = topic;
				Post.create({
					title: "Alabama",
          			body: "would like to hear more",
          			topicId: this.topic.id
				})
				.then((post)=> {
					this.post = post;
					done();
				})
				.catch((err)=>{
					console.log(err);
					done();
				});
			});
		});
	});

	describe("#create()", ()=>{

		it("should create a topic object with a title and description", (done) =>{
			Topic.create({
				title: "Revisiting Hellenism",
				description: "Why did the hellenic religion cease to exist?"
			})
			.then((topic) =>{
				expect(topic.title).toBe("Revisiting Hellenism");
				expect(topic.description).toBe("Why did the hellenic religion cease to exist?");
				done();
			})
			.catch((err)=>{
				console.log(err);
				done();
			});
		});

		it("should not crate a topic with a missing title or description", (done)=>{
			Topic.create({
				title: "I have a bad feeling about this",
			})
			.then((topic)=>{
				done();
			})
			.catch((err)=>{
				expect(err.message).toContain("Topic.description cannot be null");
				done();
			})
		})
	});

	describe("#getPosts()", () => {
		it("should return the posts associated with a topic", (done) => {
			this.topic.getPosts().then((associatedPosts) => {
				expect(associatedPosts[0].title).toBe("Alabama");
				expect(associatedPosts[0].body).toBe("would like to hear more");
				expect(associatedPosts[0].topicId).toBe(this.topic.id);
				done();
			})
		})
	})
})