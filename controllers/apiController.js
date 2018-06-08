var Todos = require('../models/todoModel');
var bodyParser =  require('body-parser');
module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    // get by user name
    app.get('/api/todos/:uname', function (req, res) {
        Todos.find({username:req.params.uname}, function (err, todos) {
            if(err) throw err;
            res.send(todos);
        });
    });
    // get by id
    app.get('/api/todo/:id', function (req, res) {
        Todos.findById({ _id:req.params.id}, function (err, todo) {
            if(err) throw err;
            res.send(todo);
        });
    });
    // adding data

    app.post('/api/todo', function (req, res) {
        if(req.body.id) { // if id exist its an update
            Todos.findByIdAndUpdate(req.body.id, {
                todo:req.body.todo,
                isDone:req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function (err, todo) {
                if(err) throw err;
                res.send('success');
            });
        }
        else { // ekse its create
            var newTodo = Todos({
                username: 'test',
                todo:req.body.todo,
                isDone:req.body.isDone,
                hasAttachment:req.body.hasAttachment
            });
            newTodo.save(function (err) {
                if(err) throw err;
                res.send('success');
            });
        }
    });

    // delete data
    app.delete('/api/todo', function (req, res) {
        Todos.findByIdAndRemove(req.body.id, function (err) {
            if(err) throw err;
            res.send('Removed');
        });
    });
};