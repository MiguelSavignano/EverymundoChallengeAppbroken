var mongoose     = require( 'mongoose' );

var MoviesSchema = new mongoose.Schema({
    title:        {type: String, required: false},
    releaseYear:  {type: String, required: false },
    director:     {type: String, required: false },
    genre:        {type: String, required: false },
    created_on:   {type: Date  , required: true, default: Date.now},
});

module.exports = mongoose.model( 'Movies', MoviesSchema );