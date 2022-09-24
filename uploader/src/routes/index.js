const express = require('express');
const uploadRoutes = express.Router();

const { upload } = require('../handler/upload');
const { s3Upload } = require('../utils/s3Multer');

uploadRoutes.post('/upload', s3Upload.array('files', 10), upload);

module.exports = uploadRoutes;
