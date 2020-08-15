var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var indexRouter = require('./routes/index.js');
var topicRouter = require('./routes/topic.js');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  })
});

app.use('/', indexRouter);

app.use('/topic', topicRouter);

app.use(function (req, res, next) { //404
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) { //500 에러 핸들러(4개의 파라미터가지면 무조건)
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, function () {
  console.log(`Example app listening port 3000!`)
});
