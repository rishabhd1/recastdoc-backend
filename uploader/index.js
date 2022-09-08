const express = require('express');

const uploadRoutes = require('./routes');

const app = express();

app.use('/v1', uploadRoutes);

app.listen(3000, () => {
  console.log('App Started');
});
