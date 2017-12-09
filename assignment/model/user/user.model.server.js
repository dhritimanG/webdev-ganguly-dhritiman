var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server');
var db  = require('../models.server');

var UserModel = mongoose.model('UserModel', UserSchema);

UserModel.findUserById = findUserById;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUsername = findUserByUsername;
UserModel.createUser = createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.deleteUser = deleteUser;
UserModel.updateUser = updateUser;
UserModel.findUserByFacebookId = findUserByFacebookId;
<<<<<<< HEAD
UserModel.findUserByGoogleId = findUserByGoogleId
=======
UserModel.findUserByGoogleId = findUserByGoogleId;
>>>>>>> 9a48160d9e9e465313e8567476bb95d89d57bca3

module.exports = UserModel;

function findUserByFacebookId(facebookId) {
  return UserModel.findOne({'facebook.id': facebookId});
}

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function findUserById(id) {
  return UserModel.findOne({_id: id});
}

function findUserByUsername(username) {
  return UserModel.findOne({username: username});
}

function createUser(user) {
  return UserModel.create(user);
}

function findAllUsers() {
  return UserModel.find();
}

function deleteUser(id) {
  return UserModel.remove({_id: id});
}

function updateUser(id, user) {
  return UserModel.update({_id: id}, user);
}
function findUserByGoogleId(googleId) {
  return UserModel
    .findOne({"google.id": googleId});
}
