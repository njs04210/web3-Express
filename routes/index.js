var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

router.get('/', function (request, response) {   //'/' 에서 그냥 ''로 바꿔도 됨
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
      <h2>${title}</h2>
      ${description}
      <img src="/images/beach.jpeg" style="width:300px; margin-top:10px; display:block;">
      `,
    `<a href="/topic/create">create</a>`
  );
  response.send(html);
});

module.exports = router;
