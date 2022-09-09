const express = require('express');

const db = require('./utils/database');
const uploadRoutes = require('./routes');

db.authenticate()
  .then((success) => {
    console.log(success);
  })
  .catch((err) => {
    console.log(error);
  });

const app = express();

app.use('/v1', uploadRoutes);

app.listen(3000, () => {
  console.log('App Started');
});
