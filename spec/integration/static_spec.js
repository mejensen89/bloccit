const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return status code 200", (done) => {
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
});