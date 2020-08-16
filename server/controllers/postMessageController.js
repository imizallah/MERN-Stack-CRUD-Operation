const express = require("express");
var router = express.Router()
var ObjectID = require("mongoose").Types.ObjectId;
const { PostMessage } = require("../models/postMessage");

router.get("/", (req, res) => {
  PostMessage.find({}, (err, docs) => {
    if(!err) res.send(docs)
      else console.log(`Error while retrieving all records : ${JSON.stringify(err, undefined, 2)}`)
  });
});

router.post("/", (req, res) => {
  var newRecord = new PostMessage({ 
    title : req.body.title,
    message: req.body.message
  });

  newRecord.save((err, doc) => {
    if(!err) res.send(doc)
      else console.log(`Error while saving record : ${JSON.stringify(err, undefined, 2)}`)
  });
});

router.put("/:id", (req, res) => {
  

  if(!ObjectID.isValid(req.params.id))
    return res.status(400).send(`No record found with id: ${req.params.id}`);

  var updatedRecord = { 
    title : req.body.title,
    message: req.body.message
  }

  PostMessage.findByIdAndUpdate(req.params.id, {$set: updatedRecord}, {new:true}, (err, doc) => { 
    if(!err) res.send(doc)
      else console.log(`Error while updating record : ${JSON.stringify(err, undefined, 2)}`)
  })
  
})

router.delete("/:id", (req, res) => {
  
  if(!ObjectID.isValid(req.params.id))
    return res.status(400).send(`No record found with id: ${req.params.id}`);

  PostMessage.findByIdAndRemove(req.params.id, (err, doc) => {
    if(!err) res.send(doc)
      else console.log(`Error while deleting record : ${JSON.stringify(err, undefined, 2)}`)
  })
  
})


module.exports = router;