const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const marco = "http://localhost:3000/marco";
const about = "http://localhost:3000/about";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", () => {
   request.get(base, (err, res, body) => {
     expect(res.statusCode).toBe(200);
     expect(body).toContain("Welcome to Bloccit");
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
  describe("GET /marco", ()=> {
  	const url = base + "marco";
  	it("should return body containing string \"polo\"", ( done )=> {
  		request.get(url, (err, res, body)=>{
  			expect (res.statusCode).toBe( 200 );
  			expect(body.toLowerCase()).toContain( "polo" );
  			done();
  		});
  	});
  });
  describe("GET about", ()=> {
  	it ('should return a string containing "About Us" in the view', (done)=>{
  		request.get(about, (err, res, body) =>{
  			expect(body).toContain("About Us")
  		})
  	})
  })
});