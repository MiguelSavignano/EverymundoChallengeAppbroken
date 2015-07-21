var express    = require('express'),
    router     = express.Router(),
    jsonParser = require('body-parser').json(),
    moviesCtrl = require('../controllers/movies.server.controller');

/* GET Movies list */
router.get('/movies/:id', moviesCtrl.one);

/* GET Movies list */
router.get('/movies', moviesCtrl.all);

/* POST creates a Movie document */
router.post('/movies', jsonParser, moviesCtrl.create);

/* put updates Movie document */
router.put('/movies/:id', moviesCtrl.update);

/* DELETE removes a Movie document. */
router.delete('/movies/:id', moviesCtrl.one);


module.exports = router;
