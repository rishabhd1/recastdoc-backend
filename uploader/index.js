const express = require('express');

const db = require('./utils/database');
const uploadRoutes = require('./routes');

db.authenticate()
  .then((success) => {
    console.log('DB Connected:', success);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use('/v1', uploadRoutes);

app.listen(3000, () => {
  console.log('App Started');
});
