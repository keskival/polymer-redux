import express from 'express';

const app = express();
const port = 8080;

app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static('node_modules'));
app.use('/components', express.static('components'));
app.use('/css', express.static('css'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

const server = app.listen(port, () => {
  console.log('Listening at ' + port + '.');
});
