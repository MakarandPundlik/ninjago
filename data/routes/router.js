const express = require('express');
const router = express.Router();
const NinjaModel = require('../models/ninja');

router.get('/ninjas', function(req, res, next){
    // Ninja.find({}).then(function(ninjas){
    //  res.send(ninjas);
    // });
    NinjaModel.aggregate([ { $geoNear: { near: {type:'Point',coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
     distanceField: "dist.calculated", maxDistance: 100000, spherical: true } } ])
     .then(function(ninjas){
      res.send(ninjas);
       }).catch(next);
   });
   

router.post('/ninjas',(req,res,next)=>{
    NinjaModel.create(req.body)
    .then((ninja)=>{
        res.send(ninja);
    })
    .catch(next);    
});

router.put('/ninjas/:id',(req,res,next)=>{
   NinjaModel.findByIdAndUpdate({_id:req.params.id},req.body)
   .then(()=>{
       NinjaModel.findOne({_id:req.params.id}).then((ninja)=>{
        res.send({
            ninja
        });
       });
        
   });
});

router.delete('/ninjas/:id',(req,res,next)=>{
    
    NinjaModel.findByIdAndRemove({_id:req.params.id})
    .then((ninja)=>{
        res.send({
         type:'delete',
         ninja
        });
    }).catch(next);
    
});

module.exports = router;