const express = require('express');

const db = require('./src/utils/database');
const uploadRoutes = require('./src/routes');

async function init() {
  try {
    await db.authenticate();
    console.log('DB Connected');

    const app = express();

    app.use('/v1', uploadRoutes);
    app.get('/', (req, res) => {
      res.json({ msg: 'API Running' });
    });

    app.listen(3000, () => {
      console.log('App Started');
    });
  } catch (error) {
    console.log(error);
  }
}

init();
