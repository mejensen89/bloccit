const request = require("request");
const server = require ("../../src/server");
const base = "http://localhost:3000/advertisement/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisement", ()=>{

    beforeEach((done) =>{
        this.advertisement;
        sequelize.sync({force:true}).then((res) =>{
            Advertisement.create({
                title: "Bachelor Chow",
                description: "It used to be meat"
            })
            .then((advertisement)=>{
                this.advertisement = advertisement;
                done();
            })
            .catch((err) =>{
                console.log(err);
                done();
            });

        });
    });
    describe("GET /advertisement", () =>{
        it("should return a status code 200 and all advertisements", (done) =>{
            request.get(base, (err,res,body) =>{
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Advertisements");
                expect(body).toContain("Bachelor Chow");
                done();
            });
        });

    });

    describe("GET /advertisement/new", () =>{
        it("should render a new advertisement form", (done) =>{
            request.get(`${base}new`, (err,res,body) =>{
                expect(err).toBeNull();
                expect(body).toContain("New Advertisement");
                done();
            });
        });
    });

    describe("POST /advertisement/create", () =>{
        const options ={
            url:`${base}create`,
            form:{
                title:"Lettuce Empire",
                description:"glory to romaine!!!"
            }
        };

        it("should create a new topic and redirect", (done) =>{
            request.post(options, (err,res,body) =>{
                Advertisement.findOne({where: {title: "Lettuce Empire"}})
                .then((advertisement) =>{
                    expect(res.statusCode).toBe(303);
                    expect(advertisement.title).toBe("Lettuce Empire");
                    expect(advertisement.description).toBe("glory to romaine!!!");
                    done();
                })
                .catch((err) =>{
                    console.log(err);
                    done();
                });
            });
        })

    });

    describe("GET /advertisement/:id", () =>{
        it("should render a view with the selected advertisement", (done) =>{
            request.get(`${base}${this.advertisement.id}`, (err,res,body) =>{
                expect(err).toBeNull();
                expect(body).toContain("Bachelor Chow" );
                done();
            });
        });
    });

    describe("POST /advertisement/:id/destroy", () =>{
        it("should delete the advertisement with the associated ID", (done) =>{
            Advertisement.all()
            .then((advertisement) =>{
                const advertisementCountBeforeDelete = advertisement.length;
                expect(advertisementCountBeforeDelete).toBe(1);

                request.post(`${base}${this.advertisement.id}/destroy` , (err,res,body) =>{
                    Advertisement.all()
                    .then((advertisement) =>{
                        expect(err).toBeNull();
                        expect(advertisement.length).toBe(advertisementCountBeforeDelete - 1);
                        done();
                    });
                });
            });
        });
    });

    describe('GET /advertisement/:id/edit', () =>{
        it("should render a view with an edit advertisement form", (done) =>{
            request.get(`${base}${this.advertisement.id}/edit`, (err,res,body)=>{
                expect(err).toBeNull();
                expect(body).toContain("Edit Advertisement");
                expect(body).toContain("Bachelor Chow")
                done();
            });
        });

    });

    describe("POST /advertisement/:id/update", () => {

        it("should update the advertisement with the given values", (done) => {
           const options = {
              url: `${base}${this.advertisement.id}/update`,
              form: {
                title: "Dunder Mifflin",
                description: "Paper and stuff"
              }
            }
            request.post(options,
              (err, res, body) => {
   
              expect(err).toBeNull();
              Advertisement.findOne({
                where: { id: this.advertisement.id }
              })
              .then((advertisement) => {
                expect(advertisement.title).toBe("Dunder Mifflin");
                done();
              });
            });
        });
   
      });
});