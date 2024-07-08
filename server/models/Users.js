const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],  
    ref: 'Users',
    default: []  
},
following: {
    type: [mongoose.Schema.Types.ObjectId],  
    ref: 'Users',
    default: []  
}

});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
