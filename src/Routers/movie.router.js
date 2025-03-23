const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const movieController = require('../controllers/movie.controller');

router.get('/action', movieController.actioncontroller);
router.get('/adventure', movieController.adventurecontroller);
router.get('/awardwinning', movieController.awardwinningcontroller);
router.get('/biography', movieController.biographycontroller);
router.get('/comedy', movieController.comedycontroller);
router.get('/drama', movieController.dramacontroller);
router.get('/horror', movieController.horrorcontroller);
router.get('/mystery', movieController.mysterycontroller);
router.get('/romance', movieController.romancecontroller);
router.get('/scifi', movieController.scificontroller);
router.get('/thriller', movieController.thrillercontroller);
router.get('/war', movieController.warcontroller);
router.get('/documentary', movieController.documentarycontroller);
router.get('/fantasy', movieController.fantasycontroller);
router.get('/search', [query('SearchQuery').isString().withMessage('the search query must be in string')], movieController.getmoviesbysearchparamcontroller);

module.exports = router;
