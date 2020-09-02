const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const Favorites = require('../models/favorite');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Favorites.find({"user":req.user._id})
    .populate('user','dishes')
    .then((favdishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favdishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Favorites.findOne({user:req.user._id})
            .then(res=>{
                if(res!=null)
                {
                    Favorites.create({user:req.user._id,dishes:req.body})
                            .then((favdishes) => {
                                console.log('Favorite Dishes Created ', favdishes);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favdishes);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                }
                else
                {
                    Favorites.findOneAndUpdate({user:req.user._id},{$set:{"dishes":req.body}})
                            .then(res=>{
                                console.log('Favorite Dishes Updated ', res);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(res);
                            })
                            .catch(err=>{
                                next(err);
                            })
                }
            })
            .catch(err=>{
                next(err)
            })
    
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Favorites.remove({"user":req.user._id})
    .then((resp) => {
        console.log("All Favorites are removed");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

favoriteRouter.route('/favorites/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Favorites.find({"user":req.user._id})
            .then(data=>{
                if(data.dishes.indexOf(req.params.dishId)==-1)
                data.dishes.push(req.params.dishId);
                res.save()
                    .then(ds=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(ds);
                    })
                    .catch(err=>{
                        next(err);
                    })
            })
            .catch(err=>{
                next(err);
            })

})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favorites.find({"user":req.user._id})
            .then(data=>{
                var index=data.dishes.indexOf(req.params.dishId)
                data.dishes.splice(index,1);
                data.save()
                    .then(saved=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(saved);
                    })
                    .catch(err=>{
                        next(err);
                    })
            })
            .catch(err=>{
                next(err);
            })
})