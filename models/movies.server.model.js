var mongoose     = require( 'mongoose' );

var MoviesSchema = new mongoose.Schema({
    title:        {type: String, required: false},
    releaseYear:  {type: String, required: true },
    director:     {type: String, required: true },
    genre:        {type: String, required: true },
    created_on:   {type: Date  , required: true, default: Date.now},
});

module.exports = mongoose.model( 'Movies', MoviesSchema );