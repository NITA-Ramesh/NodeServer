const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

dishRouter.route('/:dishid')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the Details of Dish'+req.params.dishid);
})
.post((req, res, next) => {
    res.statusCode=403;
    res.end('Post Operation not supported on /:dishid');
})
.put((req, res, next) => {
    res.end('Will Update the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting the Dish'+req.params.dishid);
});

module.exports = dishRouter;