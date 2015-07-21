require('dotenv').load({path: __dirname + '/.env'});

var should    = require('chai').should(),
    supertest = require('supertest'),
    app       = require('../server-app.js');

var requestApp  = supertest(app);

describe('request /', function(){

  var result;

  beforeEach(function(){
    result = requestApp.get('/');
  });

  it('should have status 200', function(done){
    result.expect(200)
    .end(function(error){
      if(error) throw error;

      done();
    });
  });

  it('should have content/type text/html', function(done){
    result.expect('Content-type', /html/, done);
  });
});

describe('/api', function() {

  var testMovie = {
    title:       "Test Title",
    director:    "Test Director",
    releaseYear: "Test Release Year",
    genre:       "Test Genre"
  };

  before(function(done){
    var moviesCtrl = require('../models/movies.server.model');
    moviesCtrl.remove({}, function(err, response){
      if(err){
        console.error(err);
        process.exit();
      }
      moviesCtrl.create(testMovie, function(err, movie){
        if(err){
          console.error(err);
          process.exit();
        }
        testMovie = movie.toObject();
        console.log('testMovie:', testMovie);
        done();
      });
    });
  });

  it('returns movies as JSON ', function(done) {
    requestApp.get('/api/movies')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);

      res.body.should.be.instanceof(Array);
      res.body.should.have.property('length', 1);
      done();
    });
  });

  it('returns 404 when request a non existing movie', function(done) {
    requestApp.get('/api/movies/000000000000')
    .expect(404, done);
  });

  it('returns specific movie as JSON', function(done) {
    requestApp.get('/api/movies/' + testMovie._id)
    .expect(200)
    .end(function(err, res) {
      if (err) return done('ERROR:' + err);
      console.log('res.body = ', res.body);
      res.body.should.have.property('_id'  , testMovie._id.toString());
      res.body.should.have.property('title', testMovie.title);
      res.body.should.have.property('genre', testMovie.genre);
      done();
    });
  });
});