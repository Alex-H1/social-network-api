const { Thought , User } = require('../models');

module.exports = {
    getThoughts(req , res){
        Thought.find()
        .then((thoughts)=>res.json(thoughts))
        .catch((err)=> res.status(500).json(err));
    },
    
    getSingleThought(req, res){
        Thought.findone({__id: req.params.courseId})
        .select('-__v')
        .then((thoughts)=>
            !thoughts
            ?res.status(404).json({message:'no thought found with that id'})
            : res.json(thoughts)
        )
        .catch((err)=> res.status(500).json(err));
    },

    createThought(req, res){
        Thought.create(req, res)
        .then((thoughts) => res.json(thoughts))
        .catch((err)=>{
            console.log(err);
            return res.status(500).json(err);
        });
    },

    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.courseId })
        .then((thoughts)=>
            !thoughts
            ? res.status(404).json({ message: 'no thought found with that id'})
            : User.deleteMany({_id: {$in: thoughts.users}})
        )
        .then(()=> res.json({message: 'thought and users deleted'}))
        .catch((err)=> res.status(500).json(err));
    },

    updateThought(req, res){
        Thought.findOneAndUpdate(
         {_id: req.params.thoughts.id},
         {$set: req.body},
         {runValidators: true, new: true}  
        )
        .then((thoughts)=>
            !thoughts
            ?res.status(404).json({message: 'no thought with that id'})
            :res.json(thoughts)
        )
        .catch((err)=>res.status(500).json(err));
    },

    createReaction(req, res){
        console.log('you are adding a reaction');
        console.log(req.body);
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {reactions : req.body}},
            {runValidators: true, new: true}
        )
        .then((user)=>
        !user
            ?res
                .status(404)
                .json({message: 'no user found with that id'})
            :res.json(user)
        )
        .catch((err)=> res.status(500).json(err))
    },

    removeReaction(req, res){
        User.findOneAndUpdate(
            {__id : req.params.userId},
            {$pull: {reaction: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((user)=>
        !user
            ?res   
                .status(404)
                .json({message: 'no user found with that id'})
            :res.json(user)
        )
        .catch((err)=> res.json(500).json(err));
    },
};