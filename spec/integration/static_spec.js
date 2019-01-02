const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const marco = "http://localhost:3000/marco";
const about = "http://localhost:3000/about";

describe('routes : static', () => {

  describe('GET /', () => {
    it('should return status code 200 and have "Welcome to Bloccit" in the body of the response', (done) => {
      request.get(base, (err, res, body) => {
        expect(body).toContain('Welcome to Bloccit');
        done();
      });
    });
  });

  describe('GET /marco', () => {
    it('should return status code 200 and "POLO!" as the body', (done) => {
      request.get('http://localhost:3000/marco', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toBe('POLO!');
        done();
      });
    });
  })

  describe('GET /about', () => {
    it('should return status code 200 and have "About Us" in the body', (done) => {
      request.get('http://localhost:3000/about', (err,res,body) => {
        expect(res.statusCode).toBe(200);
      expect(body).toContain('About Us');
        done();
      });
    });
  });

});