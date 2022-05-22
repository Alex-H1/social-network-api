const { Schema, model }=require('mongoose');
const thoughtsSchema = require('./thought');

// schema to create user model
const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email:{
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      thoughts: [
          {
            type: Schema.Types.ObjectID,
            ref: 'Thought'
          },
      ],
      friends:[
          {
              type: Schema.Types.ObjectId,
              ref: 'User'
          },
      ],
    },
    {
        toJSON: {
        virtuals: true,
        getters: true,
        },
        id: false,
    },
);

const User = model('user', userSchema);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

module.exports = User;