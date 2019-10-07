const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

const Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://[username]:[password]@atlastcluster.mongodb.net/todos?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB Database connection started successfully");
})

todoRoutes.route('/').get(function(req, res) { 
    Todo.find(function(err, todos){
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;

    Todo.findById(id, function(err, todo){
        if (err) {
            console.log(err);
        } else {
            res.json(todo);
        }
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);

    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res){
    Todo.findByIdAndUpdate(req.params.id, req.body, function(err){
        if(err){
            return res.json({success: false, error: err});
        }
        else{
            return res.json({ success: true });
        }
    });
});

app.use('/todos', todoRoutes)

app.listen(PORT, function(){
    console.log("Server is running on Port: " + PORT);
});