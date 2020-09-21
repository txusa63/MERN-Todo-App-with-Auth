const router = require('express').Router();
const auth = require('../middleware/auth');
const Todo = require('../models/todoModel')

router.post('/', auth, async (req, res) => {
    try {
        const {title} = req.body;

        if(!title) {
            return res.status(400).json({msg: "Not all fields have been entered"});
        }

        const newTodo = new Todo({
            title,
            userId: req.user
        });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    }

    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/all', auth, async (req, res) => {
    const todos = await Todo.find({userId: req.user});
    res.json(todos);
});

router.delete('/:id', auth, async (req, res) => {
    const todo = await Todo.findOne({userId: req.user, _id: req.params.id});
    if(!todo) {
        return res.status(400).json({msg: "No todo found with given id that belongs to the current user"});
    }

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
});

router.post('/delete', auth, async (req, res) => {
    try {
        await Todo.deleteMany({userId: req.user}, function(err, result) {
            if(err) {
                res.send(err);
            }
            else {
                res.send(result)
            }
        });
    }
   
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;



