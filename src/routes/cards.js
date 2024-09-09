const express = require('express');
const router = express.Router();
const cardsControllers = require('../controllers/cards');

router.post('/addHolder',cardsControllers.addHolder);
router.post('/addCard', cardsControllers.addCard);
router.get('/getCard', cardsControllers.searchCard);
router.put('/:id', cardsControllers.updateCard);
router.put('/:id', cardsControllers.deleteCard);

module.exports = router;