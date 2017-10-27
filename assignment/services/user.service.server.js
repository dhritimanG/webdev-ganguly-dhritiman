module.exports = function (app) {
  app.get("/api/user/hello", helloUser);
  app.get("/api/user", findUsers);
  app.get("/api/user/:userId", findUserById);
  app.post('/api/user', createUser);
  app.put('/api/user/:userId', updateUser);
  app.delete('/api/user/:userId', deleteUser);


  var users = [
    {_id: '123', username: 'alice', password: 'alice', email: 'alice.wonder@gmail.com', firstName: 'Alicia', lastName: 'Wonderland'},
    {_id: '234', username: 'bob', password: 'bob', email: 'bob.marley@gmail.com', firstName: 'Bob', lastName: 'Marley'},
    {_id: '345', username: 'charly',   password: 'charly', email: 'charly.garcia@gmail.com', firstName: 'Charly', lastName: 'Garcia'  },
    {_id: '456', username: 'jannunzi', password: 'jannunzi', email: 'j.annunzi@gmail.com', firstName: 'Jose',   lastName: 'Annunzi' }
  ];


  function findUserById(req, res){
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function  findUsers(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    if(username && password){
      var user = users.find(function (user) {
        return user.username === username && user.password === password;
      })
      if(user){
        return res.json(user);
      } else {
        return res.json({})
      }
      return;
    } else if(username){
      var user = users.find(function (user) {
        return user.username === username;
      });
      if(user){
        return res.json(user);
      } else {
        return res.json({})
      }
      return;
    }
    res.json(users);
  }

  function createUser(req, res) {
    var user = req.body;
    user['_id'] = Math.random();
    users.push(user);
    res.json(user);
  }


  function updateUser(req, res) {
    var userId = req.params['userId'];
    for (var x = 0; x < users.length; x++) {
      if (users[x]['_id'] === userId) {
        var editUser = req.body;
        users[x]['firstName'] = editUser.firstName;
        users[x]['lastName'] = editUser.lastName;
        users[x]['userName'] = editUser.userName;
        users[x]['email'] = editUser.email;
        res.json(users[x]);
        return;
      }
    }
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    for (var x = 0; x < users.length; x++) {
      if (users[x]['_id'] === userId) {
        delete users[x];
        return;
      }
    }
  }


  function helloUser(req, res) {
    res.send("Hello from user service");
  }

}
