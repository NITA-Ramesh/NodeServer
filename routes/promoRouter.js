const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Promotion to you!');
})
.post((req, res, next) => {
    res.end('Will add the Promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the Details of promotion: '+req.params.promoId);
})
.post((req, res, next) => {
    res.statusCode=403;
    res.end('Post Operation not supported on /:promoId');
})
.put((req, res, next) => {
    res.end('Will Update the Promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting the Promotion'+req.params.promoId);
});

module.exports = promoRouter;