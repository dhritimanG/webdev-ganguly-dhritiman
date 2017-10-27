module.exports = function (app) {
  app.get("/api/user/:userId/website", findWebsitesByUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.post("/api/user/:userId/website", createWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);
  app.put('/api/website/:websiteId', updateWebsite);


  var WEBSITES = [
    {'_id': '123', 'name': 'Facebook', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '234', 'name': 'Tweeter', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '456', 'name': 'Gizmodo', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '890', 'name': 'Go', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '678', 'name': 'Checkers', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '789', 'name': 'Chess', 'developerId': '234', 'description': 'Lorem'}
  ];

  // function deleteWebsite(req, res) {
  //   var userId = req.params['userId'];
  //   var websiteId = req.params['websiteId'];
  //   for(var i = 0; i < WEBSITES.length; i++){
  //     if(WEBSITES[i]._id === websiteId){
  //       WEBSITES.splice(i,1);
  //       var websites = findWebsiteForUserId(userId);
  //       res.json(websites);
  //       return;
  //     }
  //   }
  // }

  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    website.developerId = userId;
    website._id = Math.random();
    WEBSITES.push(website);
    var websites = findWebsiteForUserId(userId);
    res.json(websites);
  }

  function findWebsitesByUser(req, res) {
    var userId = req.params['userId'];
    var websites = findWebsiteForUserId(userId)
    res.json(websites);
  }

  function findWebsiteForUserId(userId) {
    var websites = [];
    for(var i = 0; i < WEBSITES.length; i++){
      if(WEBSITES[i].developerId === userId){
        websites.push(WEBSITES[i]);
      }
    }
    return websites;
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    var website = WEBSITES.find(function (website) {
      return website['_id'] === websiteId;
    });
    res.json(website);
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    for (var x = 0; x < WEBSITES.length; x++) {
      if (WEBSITES[x]['_id'] === websiteId) {
        delete WEBSITES[x];
        return;
      }
    }
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;
    for (var x = 0; x < WEBSITES.length; x++) {
      if (WEBSITES[x]['_id'] === websiteId) {
        WEBSITES[x]['name'] = website.name;
        WEBSITES[x]['description'] = website.description;
        res.json(WEBSITES[x]);
        return;
      }
    }
  }

}
