const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const apiController = require('./apiController');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', express.static('build'));

app.route('/api')
    .get(apiController.get)
    .post(apiController.calculate);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
