var express = require('express');
var app =  express();

var mongoJs = require('mongojs');
var bodyParser = require('body-parser');

var db = mongoJs('contactList' , ['contactlist']);
console.log(db);
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.get('/contactList', function(req, res){
     db.contactlist.find(function(err, docs){
        res.json(docs);
     });
});

app.post('/contactList', function(req, res){
 console.log(req.body);
    db.contactlist.insert( {
        name: req.body.name, 
        email: req.body.email, 
        number: req.body.number 
    }, 
        function(err, doc){
        res.json(doc);
    });
});

app.delete('/contactList/:id', function(req, res){
    var id = req.params.id;
    db.contactlist.remove({
        _id: mongoJs.ObjectId(id)
    }, 
        function(err, doc){
        res.json(doc);
    });
});

app.get('/contactList/:id', function(req, res){
    var id = req.params.id;
    db.contactlist.findOne( {
        _id: mongoJs.ObjectId(id)
    }, 
        function(err, doc){
        res.json(doc);
    });
});

app.put('/contactList/:id', function(req, res){
    var id = req.params.id;
    db.contactlist.findAndModify( {
        query:{
            _id: mongoJs.ObjectId(id)},
            update: {$set: {
                name: req.body.name, 
                email: req.body.email, 
                number: req.body.number 
            }
                    },
            new: true
    },
        function(err, doc){
        res.json(doc);
    });
});

app.listen(3000);

console.log('server running on port 3000');