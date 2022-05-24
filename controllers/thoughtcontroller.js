const { Thought , User } = require('../models');

module.exports = {
    getThoughts(req , res){
        Thought.find()
        .then(thoughts=>res.json(thoughts))
        .catch((err)=> res.status(500).json(err));
    },
    
    getSingleThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thoughts)=>
            !thoughts
            ?res.status(404).json({message:'no thought found with that id'})
            : res.json(thoughts)
        )
        .catch((err)=> res.status(500).json(err));
    },

    createThought({body},res){
        Thought.create(body)
        .then((thoughts)=>{
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$addToSet: {thoughts: thoughts._id}},
                {new: true}
            )
        })
        .then((thoughtsData)=>
        !thoughtsData
            ?res.status(404).json({message:'no thought found '})
            : res.json(thoughtsData)
        )
        .catch((err)=> res.status(500).json(err))
    },

    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thoughts)=>
            !thoughts
            ? res.status(404).json({ message: 'no thought found with that id'})
            : User.deleteMany({_id: {$in: thoughts.users}})
        )
        .then(()=> res.json({message: 'thought and users deleted'}))
        .catch((err)=> res.status(500).json(err));
    },

    updateThought({params,body},res){
        Thought.findOneAndUpdate(
         {_id: params.thoughtId},
         {$set: body},
         {runValidators: true, new: true}  
        )
        .then((thoughts)=>
            !thoughts
            ?res.status(404).json({message: 'no thought with that id'})
            :res.json({message: 'success'})
        )
        .catch((err)=>res.status(500).json(err));
    },



    createReaction(req, res){
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