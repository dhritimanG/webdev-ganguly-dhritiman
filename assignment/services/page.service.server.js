module.exports = function(app) {
  app.get('/api/website/:websiteId/page', findPagesInWebsite);
  app.get('/api/page/:pageId', findPageById);
  app.post('/api/website/:websiteId/page', createPage);
  app.delete('/api/page/:pageId', deletePage);
  app.put('/api/page/:pageId', updatePage);

  PAGES = [
    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
  ];

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;
    page['_id'] = Math.random();
    page['websiteId'] = websiteId;
    PAGES.push(page);
    res.json(pages);
  }

  function findPagesInWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var result = PAGES.filter(function (page) {
      return page['websiteId'] === websiteId;
    });
    res.json(result);
  }

  function findPagesByWebsiteId(websiteId) {
    var pages = [];
    for(var i = 0; i < PAGES.length; i++){
      if(PAGES[i].websiteId === websiteId){
        pages.push(PAGES[i]);
      }
    }
    return pages;
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    var page = PAGES.find(function (page) {
      return page['_id'] === pageId;
    });
    res.json(page);
  }

  function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var page = req.body;
    for (var x = 0; x < PAGES.length; x++) {
      if (PAGES[x]['_id'] === pageId) {
        PAGES[x]['name'] = page.name;
        PAGES[x]['description'] = page.description;
        res.json(PAGES[x]);
        return;
      }
    }
  }

  function deletePage(req, res) {
    var pageId = req.param('pageId');
    for (var x = 0; x < PAGES.length; x++) {
      if (PAGES[x]['_id'] === pageId) {
        delete PAGES[x];
        return;
      }
    }
  }

}
