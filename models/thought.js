const { Schema, model } = require('mongoose');
const ReactionSchema = require('./reaction');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            Required: true,
            maxlength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm:a')
        },
        username:{
            type: String,
            Required: true,
        },
        reactions:[ReactionSchema]
    },
    {
        toJSON:{
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

const Thought = model('Thought', ThoughtSchema)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

module.exports = Thought;