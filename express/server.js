const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('views', './www');
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  console.log('middleware called ....');
  //setTimeout(() => {
  next();
  //}, 5000);
});
app.get('/:title', (req, res) => {
  const { title } = req.params;
  const { school } = req.query;
  res.render('index', { pageTitle: title, school });
  //res.status(200).send('Hello welcome, shams route!!!');
});

app.use(express.static(__dirname + '/www'));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
